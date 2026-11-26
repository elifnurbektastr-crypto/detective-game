// Çalıştır: node tests/story.test.js
"use strict";
var assert = require("assert");
var Engine = require("../js/engine.js");
var CASE = require("../js/story.js");

var fails = 0, passes = 0;
function test(name, fn) {
  try { fn(); passes++; console.log("  ✓ " + name); }
  catch (e) { fails++; console.log("  ✗ " + name + "\n      " + e.message); }
}
function fresh() { return new Engine.Game(CASE); }

console.log("\nVeri bütünlüğü");
test("tüm bilgi referansları tanımlı", function () {
  var g = fresh(), missing = [];
  function chk(id, where) { if (!g.facts[id]) missing.push(id + " (" + where + ")"); }
  CASE.startFacts.forEach(function (f) { chk(f, "startFacts"); });
  CASE.links.forEach(function (l) { l.when.forEach(function (w) { chk(w, "link " + l.id); }); });
  CASE.solution.strong.forEach(function (f) { chk(f, "solution"); });
  Object.keys(CASE.characters).forEach(function (cid) {
    var all = g.topics[cid].concat(Object.keys(g.shows[cid]).map(function (k) { chk(k, cid + " show"); return g.shows[cid][k]; }));
    all.forEach(function (t) {
      t.variants.forEach(function (v) {
        (v.gives || []).concat(v.req || [], v.any || []).forEach(function (f) { chk(f, cid + "/" + t.id); });
      });
    });
    CASE.characters[cid].deflect.forEach(function (d) { if (d.until) chk(d.until, cid + " deflect"); });
  });
  assert.deepStrictEqual(missing, []);
});

console.log("\nTürkçe normalleştirme");
test("büyük İ / I ve Türkçe karakterler", function () {
  assert.strictEqual(Engine.norm("İRMAK Işık ÇĞÖŞÜ"), "irmak isik cgosu");
  assert.strictEqual(Engine.norm("Murat'ın odası?"), "muratin odasi");
});

console.log("\nÖrnek sorular kendi konusuna gidiyor");
Object.keys(CASE.characters).forEach(function (cid) {
  var g = fresh();
  g.topics[cid].forEach(function (t) {
    if (!t.ask) return;
    test(cid + ": “" + t.ask + "” → " + t.id, function () {
      var m = g.match(cid, t.ask);
      assert.ok(m, "eşleşme yok");
      assert.strictEqual(m.id, t.id);
    });
  });
});

console.log("\nSerbest yazılmış sorular");
var free = [
  ["defne", "babanı kim öldürdü sence", "katil"],
  ["defne", "Nerdeydin o gece?", "nerede"],
  ["defne", "amcan hakkında ne düşünüyorsun", "hakkinda_kenan"],
  ["defne", "MURAT NASIL BİRİ", "hakkinda_murat"],
  ["hulya", "murat beyin kapısını çaldınız mı", "murat_oda"],
  ["hulya", "merdivende kimi gördün", "merdiven"],
  ["hulya", "oğlunuz barış ne oldu", "baris"],
  ["hulya", "emre hakkında ne biliyorsun", "hakkinda_emre"],
  ["emre", "cesedi nasıl buldun", "ceset"],
  ["emre", "selim bey seni kovdu mu", "kovulma"],
  ["emre", "defneyle sevgili misiniz", "birlikte"],
  ["kenan", "abini sen mi öldürdün", "katil"],
  ["kenan", "kuyu meselesi ne", "arazi"],
  ["kenan", "yalan söylüyorsun", "yalan"],
  ["murat", "hesaplarda açık var mı, para nereye gitti", "hesap"],
  ["murat", "selim nasıl öldü", "nasil"],
  ["murat", "lavanta kolonyası mı kullanıyorsunuz", "koku"]
];
free.forEach(function (f) {
  test(f[0] + ": “" + f[1] + "” → " + f[2], function () {
    var m = fresh().match(f[0], f[1]);
    assert.ok(m, "eşleşme yok");
    assert.strictEqual(m.id, f[2]);
  });
});

console.log("\nYönlendirme ve kilitler");
test("anlamsız soru yönlendirme cevabı alır ve bulunmamış bilgiye işaret eder", function () {
  var g = fresh();
  var r = g.ask("hulya", "hava nasıl yarın");
  assert.strictEqual(r.kind, "yonlendirme");
  assert.ok(/mum/.test(r.text), r.text);
  var r2 = g.ask("hulya", "futbol sever misiniz");
  assert.notStrictEqual(r2.text, r.text, "yönlendirmeler dönmeli");
});
test("kilitli konu kaçamak cevap verir, bilgi verilmez", function () {
  var g = fresh();
  var r = g.ask("defne", "babanın çalışma odasından ajandayı aldın mı");
  assert.strictEqual(r.kind, "kilitli");
  assert.ok(!g.has("k_ajanda"));
});
test("yalan çelişkiyle kırılır", function () {
  var g = fresh();
  g.ask("defne", "o gece neredeydin");
  g.ask("hulya", "defneye ıhlamur götürdüğünüzde ne oldu");
  assert.ok(g.has("c_defne"));
  var r = g.ask("defne", "o gece neredeydin");
  assert.ok(g.has("i_defne_iskele"), r.text);
});

console.log("\nÇözüm yolu");
test("oyun baştan sona çözülebiliyor", function () {
  var g = fresh();
  g.ask("emre", "o gece neredeydin");
  g.ask("hulya", "laboratuvardan bir ses duydunuz mu");
  g.show("emre", "c_emre");
  g.ask("defne", "nerdeydin");
  g.ask("hulya", "defnenin odası boş muydu");
  g.show("defne", "c_defne");
  g.ask("emre", "kiminleydin");
  assert.ok(g.has("k_kenan_alibi"), "Kenan'ın mazereti açılmadı");
  g.show("hulya", "k_kenan_alibi");
  assert.ok(g.has("k_dugme") && g.has("i_hulya_lavanta"));
  g.ask("defne", "murat nasıl biri");
  assert.ok(g.has("d_merdiven"));
  g.show("murat", "k_dugme");
  assert.ok(g.has("c_murat_dugme"));
  g.ask("murat", "selim nasıl öldü");
  assert.ok(g.has("c_murat_sise"));
  g.ask("defne", "babanın hesapları");
  g.ask("hulya", "murat bey ile selim bey neden tartıştı");
  assert.ok(g.has("d_motive"));
  assert.strictEqual(g.accuse("kenan", "arazi", []).win, false);
  assert.strictEqual(g.accuse("murat", "miras", ["k_dugme", "c_murat_sise"]).win, false);
  assert.strictEqual(g.accuse("murat", "zimmet", ["i_kenan_tehdit"]).win, false);
  assert.strictEqual(g.accuse("murat", "zimmet", ["k_dugme", "c_murat_sise", "d_motive"]).win, true);
});

test("her bilgiye ulaşılabiliyor (tüm soru ve kanıtları dene)", function () {
  var g = fresh(), before = -1;
  while (g.s.known.length !== before) {
    before = g.s.known.length;
    Object.keys(CASE.characters).forEach(function (cid) {
      g.topics[cid].forEach(function (t) { g._respond(cid, t); });
      g.s.known.slice().forEach(function (f) { g.show(cid, f); });
    });
  }
  var missing = Object.keys(g.facts).filter(function (f) { return !g.has(f); });
  assert.deepStrictEqual(missing, []);
});

test("kayıt/yükleme durumu korur", function () {
  var g = fresh();
  g.ask("defne", "o gece neredeydin");
  var g2 = new Engine.Game(CASE, JSON.parse(JSON.stringify(g.s)));
  assert.ok(g2.has("i_defne_oda"));
});

console.log("\n" + passes + " geçti, " + fails + " başarısız\n");
process.exit(fails ? 1 : 0);
