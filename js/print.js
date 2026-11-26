/*
 * Yazdırılabilir vaka seti: kapak, kurallar, zarflar (belgeler + sorgu tutanakları),
 * çalışma sayfası, suçlama formu, ters çevrilmiş geçiş cevapları ve mühürlü çözüm.
 * Veriler cases/*.js içindeki "print" bölümünden gelir.
 */
(function () {
  "use strict";
  var CASES = window.CASES || [];
  var want = new URLSearchParams(location.search).get("vaka");
  var C = CASES.filter(function (c) { return c.id === want; })[0] || CASES[0];
  var LEVEL = { kolay: "Kolay", orta: "Orta", zor: "Zor" };
  var book = document.getElementById("book");
  var pageNo = 0;

  document.title = C.title + " · Yazdırılabilir Vaka Dosyası";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function page(cls, label) {
    var p = el("section", "page " + (cls || ""));
    pageNo++;
    var foot = el("div", "page-foot");
    foot.appendChild(el("span", null, C.title.toUpperCase() + " · " + (label || "")));
    foot.appendChild(el("span", null, String(pageNo)));
    p.appendChild(foot);
    book.appendChild(p);
    return p;
  }
  function face(cid, size) { return Portre.portrait(C.looks[cid], size); }
  function lines(n) { var w = el("div", "write-lines"); for (var i = 0; i < n; i++) w.appendChild(el("div", "wl")); return w; }

  /* ---------- Kapak ---------- */
  var cover = page("cover", "Kapak");
  cover.appendChild(el("div", "stamp", "GİZLİ · SORUŞTURMA DOSYASI"));
  cover.appendChild(el("div", "cover-kicker", C.place));
  cover.appendChild(el("h1", null, C.title));
  cover.appendChild(el("div", "cover-sub", C.subtitle));
  cover.appendChild(el("p", "cover-tag", C.tagline));
  var faces = el("div", "cover-faces");
  Object.keys(C.characters).forEach(function (cid) { faces.appendChild(face(cid, 70)); });
  cover.appendChild(faces);
  var meta = el("div", "cover-meta");
  [["Zorluk", LEVEL[C.difficulty]], ["Süre", C.duration], ["Oyuncu", C.players]].forEach(function (m) {
    var d = el("div"); d.appendChild(el("small", null, m[0])); d.appendChild(el("b", null, m[1])); meta.appendChild(d);
  });
  cover.appendChild(meta);
  var toc = el("ol", "toc");
  toc.appendChild(el("li", null, "Kurallar ve vaka özeti"));
  C.print.envelopes.forEach(function (e) { toc.appendChild(el("li", null, "Zarf " + e.id + ": " + e.title)); });
  ["Çalışma sayfası", "Suçlama formu", "Geçiş cevapları (ters)", "Çözüm (en son açın)"].forEach(function (t) { toc.appendChild(el("li", null, t)); });
  cover.appendChild(toc);

  /* ---------- Kurallar + vaka özeti ---------- */
  var r = page("", "Kurallar");
  r.appendChild(el("h2", "pg-title", "Nasıl oynanır"));
  var ol = el("ol", "rules");
  C.print.rules.forEach(function (t) { ol.appendChild(el("li", null, t)); });
  r.appendChild(ol);
  r.appendChild(el("div", "tip", "İpucu: Kesip zarflara koymak isterseniz her zarf yeni bir sayfadan başlar. Zarf başlık sayfalarını zarfın üstüne yapıştırabilirsiniz."));
  r.appendChild(el("h2", "pg-title", "Vaka özeti"));
  C.intro.forEach(function (p) { r.appendChild(el("p", "lead", p)); });

  var cast = page("", "Şüpheliler");
  cast.appendChild(el("h2", "pg-title", "Evdekiler"));
  var grid = el("div", "cast-grid");
  Object.keys(C.characters).forEach(function (cid) {
    var ch = C.characters[cid];
    var card = el("div", "cast-card");
    card.appendChild(face(cid, 92));
    var t = el("div");
    t.appendChild(el("h3", null, ch.name));
    t.appendChild(el("div", "cast-role", ch.role + " · " + ch.age + " yaşında"));
    t.appendChild(el("p", null, ch.bio));
    card.appendChild(t);
    grid.appendChild(card);
  });
  cast.appendChild(grid);
  var victim = el("div", "victim");
  victim.appendChild(el("b", null, "Maktul: " + C.print.victim.name));
  victim.appendChild(document.createTextNode(" · " + C.print.victim.line));
  cast.appendChild(victim);

  /* ---------- Zarflar ---------- */
  var puzzleById = {};
  (C.puzzles || []).forEach(function (z) { puzzleById[z.id] = z; });
  var docsById = {};
  (C.documents || []).forEach(function (d) { docsById[d.id] = d; });

  C.print.envelopes.forEach(function (env, ei) {
    var cv = page("envelope", "Zarf " + env.id);
    cv.appendChild(el("div", "env-letter", env.id));
    cv.appendChild(el("h2", null, "ZARF " + env.id));
    cv.appendChild(el("div", "env-title", env.title));
    cv.appendChild(el("p", "env-note", env.note));
    var inside = el("ul", "env-list");
    env.docs.forEach(function (d) { inside.appendChild(el("li", null, "Belge: " + docsById[d].title)); });
    (env.puzzles || []).forEach(function (z) { inside.appendChild(el("li", null, "Bulmaca: " + puzzleById[z].title)); });
    env.interviews.forEach(function (iv) { inside.appendChild(el("li", null, "Sorgu tutanağı: " + C.characters[iv.cid].name)); });
    if (env.gate) inside.appendChild(el("li", null, "Geçiş sorusu"));
    cv.appendChild(inside);

    env.docs.forEach(function (d) {
      var p = page("doc-page", "Zarf " + env.id + " · Belge");
      p.appendChild(Belgeler.render(C, docsById[d]));
    });

    var p = page("", "Zarf " + env.id + " · Sorgular");
    env.interviews.forEach(function (iv, ii) {
      var ch = C.characters[iv.cid];
      var block = el("div", "transcript");
      var head = el("div", "tr-head");
      head.appendChild(face(iv.cid, 54));
      var ht = el("div");
      ht.appendChild(el("div", "tr-kicker", "SORGU TUTANAĞI · " + env.id + "-" + (ii + 1)));
      ht.appendChild(el("h3", null, ch.name));
      ht.appendChild(el("div", "tr-role", ch.role + " · " + C.print.where));
      head.appendChild(ht);
      block.appendChild(head);
      iv.items.forEach(function (it) {
        var qa = Belgeler.resolveItem(C, iv.cid, it);
        var row = el("div", "qa");
        var q = el("p", "q" + (qa.shown ? " shown" : ""));
        q.appendChild(el("b", null, qa.shown ? "D (kanıt gösterir): " : "D: "));
        q.appendChild(document.createTextNode(qa.q));
        var a = el("p", "a");
        a.appendChild(el("b", null, ch.short.toUpperCase() + ": "));
        a.appendChild(document.createTextNode(qa.a));
        row.appendChild(q); row.appendChild(a);
        block.appendChild(row);
      });
      p.appendChild(block);
    });

    (env.puzzles || []).forEach(function (id) {
      var z = puzzleById[id];
      var pz = page("puzzle-page", "Zarf " + env.id + " · Bulmaca");
      pz.appendChild(el("div", "gate-kicker", z.kind === "kasa" ? "KASA" : "BULMACA"));
      pz.appendChild(el("h2", "pg-title", z.title));
      pz.appendChild(el("p", "lead", z.sub + ". " + (z.kind === "kasa" ? z.desc + " Şifreyi sorgu tutanaklarındaki ipuçlarından bulun." : "Parçaları kesip doğru yöne çevirerek birleştirin.")));
      if (z.kind === "kasa") {
        var safe = el("div", "print-safe");
        safe.innerHTML = '<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="220" height="180" rx="14" fill="#3a3f45"/><rect x="30" y="28" width="180" height="40" rx="6" fill="#0d1a0f"/>' +
          [0, 1, 2, 3].map(function (i) { return '<rect x="' + (44 + i * 40) + '" y="36" width="30" height="24" rx="3" fill="#fff"/>'; }).join("") +
          '<circle cx="120" cy="130" r="40" fill="#8d949a"/><circle cx="120" cy="130" r="10" fill="#3a3f45"/></svg>';
        pz.appendChild(safe);
        pz.appendChild(el("p", "lead center", "Şifreyi kutulara yazın. Doğru olup olmadığını en sondaki ters çevrilmiş cevap sayfasından kontrol edin, sonra bir sonraki sayfadaki kasa içeriğine bakın."));
        var inside2 = (C.documents || []).filter(function (d) { return (z.gives || []).indexOf(d.unlock) >= 0; })[0];
        if (inside2) {
          var pd = page("doc-page", "Kasa içeriği");
          pd.appendChild(el("div", "gate-kicker", "KASA İÇERİĞİ · ŞİFREYİ BULMADAN BAKMAYIN"));
          pd.appendChild(Belgeler.render(C, inside2));
        }
      } else {
        var grid = el("div", "cut-pieces");
        var svgInner = '<rect width="400" height="400" fill="#fffdf5"/><path d="M0 105h400M0 183h400M0 261h400M0 339h400" stroke="#c8d6e5"/><path d="M40 0v400" stroke="#e3a1a8"/>' +
          z.lines.map(function (l, i) { return '<text x="30" y="' + (95 + i * 78) + '" font-family="Caveat, cursive" font-size="' + (i === 2 ? 38 : 32) + '" fill="' + (i === z.lines.length - 1 ? "#a8323f" : "#1f2f5c") + '">' + l.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text>"; }).join("");
        [[0, 0, 180], [200, 0, 90], [0, 200, 270], [200, 200, 0]].forEach(function (o) {
          var pc = el("div", "cut-piece");
          pc.innerHTML = '<svg viewBox="' + o[0] + " " + o[1] + ' 200 200" style="transform:rotate(' + o[2] + 'deg)">' + svgInner + "</svg>";
          grid.appendChild(pc);
        });
        pz.appendChild(grid);
        pz.appendChild(el("p", "lead center", "Kesik çizgilerden kesin."));
      }
    });

    if (env.gate) {
      var g = page("gate", "Zarf " + env.id + " · Geçiş");
      g.appendChild(el("div", "gate-kicker", "GEÇİŞ SORUSU · ZARF " + env.id));
      g.appendChild(el("h2", null, env.gate.q));
      g.appendChild(el("p", "lead", "Cevabınızı yazın. Emin olduğunuzda Zarf " + C.print.envelopes[ei + 1].id + "'yi açın. Cevabı dosyanın sonundaki ters çevrilmiş sayfadan kontrol edebilirsiniz."));
      g.appendChild(lines(8));
    }
  });

  /* ---------- Çalışma sayfası ---------- */
  var w = page("", "Çalışma sayfası");
  w.appendChild(el("h2", "pg-title", "Zaman çizelgesi çalışma sayfası"));
  w.appendChild(el("p", "lead", "Her şüphelinin hangi saatte nerede olduğunu kendi bildiğiniz kadarıyla doldurun. Boşluklar ve çakışmalar çoğu zaman yalanları gösterir."));
  var tbl = el("table", "work");
  var hr = el("tr"); hr.appendChild(el("th", null, "Saat"));
  Object.keys(C.characters).forEach(function (cid) { hr.appendChild(el("th", null, C.characters[cid].short)); });
  tbl.appendChild(hr);
  C.print.sheetTimes.forEach(function (t) {
    var tr = el("tr"); tr.appendChild(el("td", "t", t));
    Object.keys(C.characters).forEach(function () { tr.appendChild(el("td")); });
    tbl.appendChild(tr);
  });
  w.appendChild(tbl);

  /* ---------- Suçlama formu ---------- */
  var f = page("form", "Suçlama formu");
  f.appendChild(el("h2", "pg-title", "Suçlama formu"));
  f.appendChild(el("p", "lead", "Çözüm sayfasını açmadan önce doldurun."));
  f.appendChild(el("h3", null, "1. Katil"));
  var ks = el("div", "checks");
  Object.keys(C.characters).forEach(function (cid) { ks.appendChild(el("span", "check", C.characters[cid].name)); });
  f.appendChild(ks);
  f.appendChild(el("h3", null, "2. Sebep"));
  var ms = el("div", "checks col");
  C.motives.forEach(function (m) { ms.appendChild(el("span", "check", m.label)); });
  f.appendChild(ms);
  f.appendChild(el("h3", null, "3. En güçlü üç kanıt"));
  [1, 2, 3].forEach(function (n) { var l = el("div", "num-line"); l.appendChild(el("b", null, n + ".")); f.appendChild(l); });
  f.appendChild(el("h3", null, "4. Olay nasıl gerçekleşti?"));
  f.appendChild(lines(6));

  /* ---------- Geçiş cevapları (ters) ---------- */
  var ans = page("answers", "Geçiş cevapları");
  var inner = el("div", "upside");
  inner.appendChild(el("h2", "pg-title", "Geçiş soruları: cevaplar"));
  (C.puzzles || []).filter(function (z) { return z.kind === "kasa"; }).forEach(function (z) {
    var d = el("div", "ans");
    d.appendChild(el("b", null, "Kasa şifresi (" + z.title + ")"));
    d.appendChild(el("p", null, z.code + (z.why ? ". " + z.why : "")));
    inner.appendChild(d);
  });
  C.print.envelopes.forEach(function (e) {
    if (!e.gate) return;
    var d = el("div", "ans");
    d.appendChild(el("b", null, "Zarf " + e.id + ": " + e.gate.q));
    d.appendChild(el("p", null, e.gate.a));
    inner.appendChild(d);
  });
  ans.appendChild(inner);

  /* ---------- Çözüm ---------- */
  var seal = page("seal", "Çözüm");
  seal.appendChild(el("div", "seal-mark", "MÜHÜRLÜ"));
  seal.appendChild(el("h2", null, "ÇÖZÜM"));
  seal.appendChild(el("p", "lead center", "Bu sayfayı yalnızca suçlama formunu doldurduktan sonra çevirin."));

  var sol = page("", "Çözüm");
  sol.appendChild(el("h2", "pg-title", C.endings.win.title + ": " + C.characters[C.solution.killer].name));
  C.endings.win.text.forEach(function (p) { sol.appendChild(el("p", "lead", p)); });
  sol.appendChild(el("h3", null, "Gerçek zaman çizelgesi"));
  var tl = el("table", "timeline");
  C.print.timeline.forEach(function (row) {
    var tr = el("tr"); tr.appendChild(el("td", "t", row[0])); tr.appendChild(el("td", null, row[1])); tl.appendChild(tr);
  });
  sol.appendChild(tl);
  sol.appendChild(el("h3", null, "Çözümü kanıtlayan çelişkiler"));
  var ul = el("ul", "proof");
  C.links.filter(function (l) { return C.solution.strong.indexOf(l.id) >= 0; }).forEach(function (l) {
    var li = el("li"); li.appendChild(el("b", null, l.title + ": ")); li.appendChild(document.createTextNode(l.text)); ul.appendChild(li);
  });
  sol.appendChild(ul);

  document.body.classList.add("ready");
})();
