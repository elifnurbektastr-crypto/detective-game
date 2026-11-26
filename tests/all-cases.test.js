// Her vaka için ortak kontroller. Çalıştır: npm test
"use strict";
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var Engine = require("../js/engine.js");

var fails = 0, passes = 0;
function test(name, fn) {
  try { fn(); passes++; console.log("  ok   " + name); }
  catch (e) { fails++; console.log("  HATA " + name + "\n      " + e.message); }
}

var dir = path.join(__dirname, "..", "cases");
var CASES = fs.readdirSync(dir).filter(function (f) { return /\.js$/.test(f); }).map(function (f) { return require(path.join(dir, f)); });

CASES.forEach(function (C) {
  console.log("\n" + C.title + " (" + C.difficulty + ")");
  function fresh() { return new Engine.Game(C); }

  test("referanslar tanımlı", function () {
    var g = fresh(), miss = [];
    function chk(id, w) { if (!g.facts[id]) miss.push(id + " (" + w + ")"); }
    C.startFacts.forEach(function (f) { chk(f, "start"); });
    C.links.forEach(function (l) { l.when.forEach(function (w) { chk(w, l.id); }); });
    C.solution.strong.forEach(function (f) { chk(f, "solution"); });
    Object.keys(C.facts).forEach(function (id) { (C.facts[id].confirm || []).concat(C.facts[id].deny || []).forEach(function (x) { chk(x, id); }); });
    (C.documents || []).forEach(function (d) { if (d.unlock) chk(d.unlock, "belge " + d.id); });
    (C.puzzles || []).forEach(function (z) { if (z.unlock) chk(z.unlock, "bulmaca " + z.id); (z.gives || []).forEach(function (f) { chk(f, "bulmaca " + z.id); }); });
    (C.hints || []).forEach(function (h) { chk(h.until, "ipucu"); (h.after || []).forEach(function (a) { chk(a, "ipucu"); }); });
    Object.keys(C.characters).forEach(function (cid) {
      var all = g.topics[cid].concat(Object.keys(g.shows[cid]).map(function (k) { chk(k, cid + " show"); return g.shows[cid][k]; }));
      all.forEach(function (t) {
        t.variants.forEach(function (v) {
          (v.gives || []).concat(v.req || [], v.any || []).forEach(function (f) { chk(f, cid + "/" + t.id); });
          if (v.f && typeof v.f === "object") (v.f.gives || []).forEach(function (f) { chk(f, cid + "/" + t.id + " devam"); });
        });
      });
      C.characters[cid].deflect.forEach(function (d) { if (d.until) chk(d.until, cid); (d.gives || []).forEach(function (f) { chk(f, cid); }); });
      if (!C.looks[cid]) miss.push("portre " + cid);
      if (!C.endings.wrong[cid]) miss.push("yanlış son " + cid);
    });
    assert.deepStrictEqual(miss, []);
  });

  test("örnek sorular kendi konusuna gidiyor", function () {
    var g = fresh(), bad = [];
    Object.keys(C.characters).forEach(function (cid) {
      g.topics[cid].forEach(function (t) {
        if (!t.ask) return;
        var m = g.match(cid, t.ask);
        if (!m || m.id !== t.id) bad.push(cid + ": '" + t.ask + "' -> " + (m && m.id) + " (beklenen " + t.id + ")");
      });
    });
    assert.deepStrictEqual(bad, []);
  });

  test("yazdırma setindeki satırlar çözülüyor", function () {
    var g = fresh(), bad = [];
    C.print.envelopes.forEach(function (env) {
      env.docs.forEach(function (d) { if (!C.documents.some(function (x) { return x.id === d; })) bad.push("belge " + d); });
      (env.puzzles || []).forEach(function (z) { if (!C.puzzles.some(function (x) { return x.id === z; })) bad.push("bulmaca " + z); });
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

  test("her bilgiye ulaşılabiliyor ve vaka çözülebiliyor", function () {
    var g = fresh(), before = -1;
    while (g.s.known.length !== before) {
      before = g.s.known.length;
      Object.keys(C.characters).forEach(function (cid) {
        g.topics[cid].forEach(function (t) { g._respond(cid, t); });
        C.characters[cid].deflect.forEach(function () { g._deflect(cid); });
        g.s.known.slice().forEach(function (f) { g.show(cid, f); });
      });
      g.puzzles().forEach(function (p) { g.solvePuzzle(p.def.id, p.def.code != null ? p.def.code : true); });
    }
    var missing = Object.keys(g.facts).filter(function (f) { return !g.has(f); });
    assert.deepStrictEqual(missing, []);
    var res = g.accuse(C.solution.killer, C.solution.motive, C.solution.strong.slice(0, 3));
    assert.ok(res.win, "çözüm kabul edilmedi");
    var ev = g.evaluate();
    assert.ok(ev.score >= 0 && ev.stars >= 1);
  });

  test("ipucu sırası ilerliyor", function () {
    var g = fresh(), seen = {};
    for (var i = 0; i < (C.hints || []).length; i++) {
      var h = g.hint();
      assert.ok(h.text);
      if (h.spent) {
        var hint = C.hints.filter(function (x) { return x.text === h.text; })[0];
        if (seen[h.text]) break;
        seen[h.text] = 1;
        g.add([hint.until]);
      }
    }
    assert.strictEqual(g.hint().spent, false, "ipuçları bitince 'yeterli' demeli");
  });

  test("saat ilerliyor", function () {
    if (!C.clock) return;
    var g = fresh();
    var t0 = g.clock().left;
    g.ask(Object.keys(C.characters)[0], "merhaba");
    assert.ok(g.clock().left < t0);
  });
});

console.log("\nGece Treni çözüm yolu");
test("oyuncu gibi oynayınca çözülüyor", function () {
  var C = CASES.filter(function (c) { return c.id === "gece-treni"; })[0];
  var g = new Engine.Game(C);
  g.ask("cemal", "Nazmi Bey'e çay götürdünüz mü?");
  assert.ok(g.has("i_cemal_misafir"));
  g.ask("oguz", "Sevgi Hanım'ı gördünüz mü, kırmızı atkısı var mıydı?");
  assert.ok(g.has("d_misafir"), "misafir çıkarımı yok");
  g.ask("sevgi", "dün gece neredeydiniz");
  assert.ok(g.has("c_sevgi_oda"));
  g.ask("oguz", "gece koridorda fotoğraf çektiniz mi?");
  assert.ok(g.has("k_foto"));
  g.ask("cemal", "kompartımanda bir şey buldunuz mu");
  assert.ok(g.puzzles().length === 1);
  assert.ok(g.solvePuzzle("yirtik", true).ok);
  assert.ok(g.has("k_not"));
  assert.ok(g.accuse("sevgi", "satis", ["k_foto", "k_not"]).win);
});

test("rütbe avantajı soru süresini kısaltıyor", function () {
  var C = CASES.filter(function (c) { return c.id === "gece-treni"; })[0];
  var a = new Engine.Game(C), b = new Engine.Game(C, null, { timeBonus: 2 });
  a.ask("cemal", "merhaba"); b.ask("cemal", "merhaba");
  assert.ok(b.clock().left > a.clock().left);
  assert.strictEqual(Engine.rankOf(0).label, "Stajyer");
  assert.ok(Engine.rankOf(9).timeBonus >= 2);
});

console.log("\nGünün sorgusu");
test("her bulmacada 3 ifade, geçerli bir yalan ve açıklama var", function () {
  var D = require("../js/daily.js"), bad = [];
  D.POOL.forEach(function (z, i) {
    if (z.ifadeler.length !== 3 || !(z.yalan >= 0 && z.yalan < 3) || !z.neden || !z.kanit || !z.look) bad.push(i);
  });
  assert.deepStrictEqual(bad, []);
  assert.ok(D.puzzle(new Date(2026, 0, 1)) !== D.puzzle(new Date(2026, 0, 2)), "her gün farklı olmalı");
});

console.log("\n" + passes + " geçti, " + fails + " başarısız\n");
process.exit(fails ? 1 : 0);
