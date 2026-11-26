// Çalıştır: node tests/story.test.js   (veya npm test)
"use strict";
var assert = require("assert");
var Engine = require("../js/engine.js");
var CASE = require("../cases/son-hasat.js");

var fails = 0, passes = 0;
function test(name, fn) {
  try { fn(); passes++; console.log("  ok   " + name); }
  catch (e) { fails++; console.log("  HATA " + name + "\n      " + e.message); }
}
function fresh(over) { return new Engine.Game(over ? Object.assign({}, CASE, over) : CASE); }

console.log("\nVeri bütünlüğü");
test("tüm bilgi referansları tanımlı", function () {
  var g = fresh(), missing = [];
  function chk(id, where) { if (!g.facts[id]) missing.push(id + " (" + where + ")"); }
  CASE.startFacts.forEach(function (f) { chk(f, "startFacts"); });
  CASE.links.forEach(function (l) { l.when.forEach(function (w) { chk(w, "link " + l.id); }); });
  CASE.solution.strong.forEach(function (f) { chk(f, "solution"); });
  Object.keys(CASE.facts).forEach(function (id) {
    var f = CASE.facts[id];
    (f.confirm || []).concat(f.deny || []).forEach(function (x) { chk(x, id + " confirm/deny"); });
  });
  (CASE.documents || []).forEach(function (d) { if (d.unlock) chk(d.unlock, "belge " + d.id); });
  Object.keys(CASE.characters).forEach(function (cid) {
    var all = g.topics[cid].concat(Object.keys(g.shows[cid]).map(function (k) { chk(k, cid + " show"); return g.shows[cid][k]; }));
    all.forEach(function (t) {
      t.variants.forEach(function (v) {
        (v.gives || []).concat(v.req || [], v.any || []).forEach(function (f) { chk(f, cid + "/" + t.id); });
      });
    });
    CASE.characters[cid].deflect.forEach(function (d) {
      if (d.until) chk(d.until, cid + " deflect");
      (d.gives || []).forEach(function (f) { chk(f, cid + " deflect"); });
    });
    if (!CASE.looks[cid]) missing.push("portre " + cid);
  });
  assert.deepStrictEqual(missing, []);
});

test("yazdırma setindeki her tutanak satırı bir cevaba çözülüyor", function () {
  var g = fresh(), bad = [];
  CASE.print.envelopes.forEach(function (env) {
    env.docs.forEach(function (d) { if (!CASE.documents.some(function (x) { return x.id === d; })) bad.push("belge " + d); });
    env.interviews.forEach(function (iv) {
      iv.items.forEach(function (it) {
        var t = it.show ? g.shows[iv.cid][it.show] : g.topics[iv.cid].filter(function (x) { return x.id === it.t; })[0];
        if (!t) { bad.push(env.id + "/" + iv.cid + "/" + (it.t || it.show)); return; }
        var v = t.variants[it.v || 0];
        if (!v || !v.a) bad.push(env.id + "/" + iv.cid + "/" + (it.t || it.show) + " v" + it.v);
        if (!it.show && !it.q && !t.ask) bad.push(env.id + "/" + iv.cid + "/" + it.t + " soru metni yok");
      });
    });
  });
  assert.deepStrictEqual(bad, []);
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
    test(cid + ": '" + t.ask + "' -> " + t.id, function () {
      var m = g.match(cid, t.ask);
      assert.ok(m, "eşleşme yok");
      assert.strictEqual(m.id, t.id);
    });
  });
});

console.log("\nSerbest yazılmış sorular");
[
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
  ["kenan", "abini sen mi öldürdün", "sucla"],
  ["defne", "siz mi öldürdünüz", "sucla"],
  ["defne", "babanızı kim öldürdü", "katil"],
  ["murat", "katil sen misin", "sucla"],
  ["kenan", "kuyu meselesi ne", "arazi"],
  ["kenan", "yalan söylüyorsun", "yalan"],
  ["murat", "hesaplarda açık var mı, para nereye gitti", "hesap"],
  ["murat", "selim nasıl öldü", "nasil"],
  ["murat", "lavanta kolonyası mı kullanıyorsunuz", "koku"]
].forEach(function (f) {
  test(f[0] + ": '" + f[1] + "' -> " + f[2], function () {
    var m = fresh().match(f[0], f[1]);
    assert.ok(m, "eşleşme yok");
    assert.strictEqual(m.id, f[2]);
  });
});

console.log("\nKaçamak cevaplar, iddialar ve kilitler");
test("kaçamak cevap hedef göstermek yerine bildiğini söyler ve deftere ekler", function () {
  var g = fresh();
  var r = g.ask("hulya", "hava nasıl yarın");
  assert.strictEqual(r.kind, "yonlendirme");
  assert.ok(r.gained.length > 0, "bilgi vermedi: " + r.text);
  var r2 = g.ask("hulya", "futbol sever misiniz");
  assert.notStrictEqual(r2.text, r.text, "kaçamak cevaplar dönmeli");
});
test("hiçbir kaçamak cevap 'ona sorun' diye yönlendirmiyor", function () {
  var bad = [];
  Object.keys(CASE.characters).forEach(function (cid) {
    CASE.characters[cid].deflect.forEach(function (d) { if (/\bsorun\b|sorsanız|sorarsanız/i.test(d.a)) bad.push(cid + ": " + d.a); });
  });
  assert.deepStrictEqual(bad, []);
});
test("iddia başka şüpheliden teyit edilir, yalan çürütülür", function () {
  var g = fresh();
  g.ask("defne", "en sevdiğin renk ne");
  assert.strictEqual(g.status("ii_tehdit"), "bekliyor");
  g.ask("kenan", "yemekte neden kavga ettiniz");
  assert.strictEqual(g.status("ii_tehdit"), "teyit");
  g.ask("defne", "o gece neredeydin");
  g.ask("hulya", "defne hanım odasında mıydı");
  assert.strictEqual(g.status("i_defne_oda"), "curutuldu");
});
test("kilitli konu kaçamak cevap verir, bilgi verilmez", function () {
  var g = fresh();
  var r = g.ask("defne", "babanın çalışma odasından ajandayı aldın mı");
  assert.strictEqual(r.kind, "kilitli");
  assert.ok(!g.has("k_ajanda"));
  assert.ok(!r.hint, "orta seviyede kilit ipucu verilmemeli");
});
test("yalan çelişkiyle kırılır", function () {
  var g = fresh();
  g.ask("defne", "o gece neredeydin");
  g.ask("hulya", "defneye ıhlamur götürdüğünüzde ne oldu");
  assert.ok(g.has("c_defne"));
  var r = g.ask("defne", "o gece neredeydin");
  assert.ok(g.has("i_defne_iskele"), r.text);
});
test("belgeler kanıtla açılır", function () {
  var g = fresh();
  var ids = function () { return g.documents().map(function (d) { return d.id; }); };
  assert.deepStrictEqual(ids(), ["otopsi", "kroki", "sise"]);
  g.add(["k_dugme"]);
  assert.ok(ids().indexOf("dugme") >= 0);
});

test("'kim peki' önceki konunun devamı olarak anlaşılır", function () {
  var g = fresh();
  g.ask("defne", "babanızı kim öldürdü");
  var r = g.ask("defne", "kim peki");
  assert.ok(/Amcam/.test(r.text), r.text);
  assert.ok(g.has("ii_tehdit"));
});
test("'tamam' teşekkür sayılmaz", function () {
  var r = fresh().ask("defne", "tamam");
  assert.ok(!/Rica/.test(r.text), r.text);
  assert.strictEqual(r.kind, "onay");
});
test("aynı soru tekrar sorulunca cevap kelimesi kelimesine tekrarlanmaz", function () {
  var g = fresh();
  var a = g.ask("defne", "o gece neredeydin").text;
  var b = g.ask("defne", "o gece neredeydin").text;
  assert.ok(b.indexOf(a) < 0, b);
  var c = g.ask("defne", "o gece neredeydin");
  assert.notStrictEqual(c.text, b);
});
test("kullanıcının gönderdiği konuşma artık mantıklı", function () {
  var g = fresh();
  var r1 = g.ask("defne", "siz mi öldürdünüz");
  var r2 = g.ask("defne", "kim peki");
  var r3 = g.ask("defne", "babanızı kim öldürdü");
  assert.ok(/Hayır/.test(r1.text), r1.text);
  assert.ok(!/Teşekkür|Rica/.test(r2.text), r2.text);
  assert.ok(!/Babamı mı/.test(r3.text), r3.text);
});

console.log("\nZorluk");
test("zor: öneri yok, suçlama hakkı sınırlı", function () {
  var g = fresh({ difficulty: "zor" });
  assert.strictEqual(g.suggestions("defne").length, 0);
  for (var i = 0; i < 3; i++) g.accuse("kenan", "arazi", ["k_otopsi"]);
  assert.strictEqual(g.accusationsLeft(), 0);
  assert.strictEqual(g.accuse("murat", "zimmet", ["k_dugme", "c_murat_sise", "d_motive"]).over, true);
});
test("kolay: kilitli konu neyin eksik olduğunu söyler", function () {
  var r = fresh({ difficulty: "kolay" }).ask("defne", "babanın çalışma odasından ajandayı aldın mı");
  assert.ok(r.hint && /İskeledeki tanıklar/.test(r.hint), r.hint);
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
  assert.strictEqual(g.accuse("murat", "zimmet", ["ii_tehdit"]).win, false);
  assert.strictEqual(g.accuse("murat", "zimmet", ["k_dugme", "c_murat_sise", "d_motive"]).win, true);
});

test("her bilgiye ulaşılabiliyor (tüm sorular, kanıtlar ve kaçamak cevaplar)", function () {
  var g = fresh(), before = -1;
  while (g.s.known.length !== before) {
    before = g.s.known.length;
    Object.keys(CASE.characters).forEach(function (cid) {
      g.topics[cid].forEach(function (t) { g._respond(cid, t); });
      CASE.characters[cid].deflect.forEach(function () { g._deflect(cid); });
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
