/*
 * Belgeler: otopsi raporu (vücut şemalı), SVG deliller/kroki, el yazısı notlar,
 * ve yazdırılabilir set için sorgu tutanağı çözümleyici.
 * Hem oyunda (modal) hem de print.html'de kullanılır.
 */
(function (root) {
  "use strict";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var MARK_COLORS = { olumcul: "#a8323f", ps: "#6c5a8a", iz: "#b8892f", not: "#3f6f9a", yok: "#4f8a6e" };

  function figure(view, marks) {
    var out = ['<svg viewBox="0 0 100 232" xmlns="http://www.w3.org/2000/svg" class="body-svg" font-family="Inter, Arial, sans-serif">'];
    out.push('<g fill="#f6f0e4" stroke="#2a221b" stroke-width="1.2" stroke-linejoin="round">');
    out.push('<path d="M30 37 L16 80 L14 120 L21 121 L24 82 L33 54 Z"/><path d="M70 37 L84 80 L86 120 L79 121 L76 82 L67 54 Z"/>');
    out.push('<path d="M31 100 L29 160 L32 224 L45 224 L47 160 L50 110 L53 160 L55 224 L68 224 L71 160 L69 100 Z"/>');
    out.push('<path d="M29 37 Q50 31 71 37 L72 102 Q50 108 28 102 Z"/>');
    out.push('<rect x="45" y="27" width="10" height="9"/><ellipse cx="50" cy="16" rx="11" ry="13"/>');
    out.push('</g>');
    if (view === "on") out.push('<path d="M46 15 h1 M53 15 h1 M47 21 Q50 23 53 21" stroke="#2a221b" stroke-width=".8" fill="none"/>');
    else out.push('<path d="M41 10 Q50 4 59 10" stroke="#2a221b" stroke-width=".6" fill="none"/><path d="M50 40 L50 98" stroke="#2a221b" stroke-width=".5" stroke-dasharray="2 2"/>');
    marks.filter(function (m) { return m.view === view; }).forEach(function (m) {
      var c = MARK_COLORS[m.kind] || "#a8323f";
      if (m.kind === "ps") out.push('<ellipse cx="' + m.x + '" cy="' + m.y + '" rx="12" ry="16" fill="' + c + '" opacity=".25"/>');
      out.push('<circle cx="' + m.x + '" cy="' + m.y + '" r="5.5" fill="' + c + '" stroke="#fff" stroke-width="1"/>');
      out.push('<text x="' + m.x + '" y="' + (m.y + 2.4) + '" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">' + m.n + '</text>');
    });
    out.push('<text x="50" y="231" text-anchor="middle" font-size="8" fill="#6d5a45">' + (view === "on" ? "ÖN" : "ARKA") + '</text>');
    out.push('</svg>');
    return out.join("");
  }

  function autopsy(CASE) {
    var A = CASE.autopsy;
    var d = el("div", "doc doc-report");
    var head = el("div", "doc-letterhead");
    head.appendChild(el("div", "lh-org", "ADLİ TIP BİRİMİ · ÇANAKKALE"));
    head.appendChild(el("div", "lh-no", "Rapor No: " + A.no + " · " + A.date));
    d.appendChild(head);
    d.appendChild(el("h2", "doc-title", "Ön Otopsi Raporu"));
    var tbl = el("table", "doc-table");
    A.subject.forEach(function (r) {
      var tr = el("tr"); tr.appendChild(el("th", null, r[0])); tr.appendChild(el("td", null, r[1])); tbl.appendChild(tr);
    });
    d.appendChild(tbl);

    var dia = el("div", "doc-diagram");
    var figs = el("div", "doc-figs");
    figs.innerHTML = figure("on", A.marks) + figure("arka", A.marks);
    dia.appendChild(figs);
    var legend = el("ol", "doc-legend");
    A.marks.forEach(function (m) {
      var li = el("li");
      var dot = el("span", "lg-dot", String(m.n)); dot.style.background = MARK_COLORS[m.kind];
      li.appendChild(dot); li.appendChild(document.createTextNode(m.label));
      legend.appendChild(li);
    });
    dia.appendChild(legend);
    d.appendChild(dia);

    A.sections.forEach(function (s) {
      var sec = el("div", "doc-sec");
      sec.appendChild(el("h4", null, s[0]));
      sec.appendChild(el("p", null, s[1]));
      d.appendChild(sec);
    });
    var c = el("div", "doc-conclusion");
    c.appendChild(el("b", null, "SONUÇ: ")); c.appendChild(document.createTextNode(A.conclusion));
    d.appendChild(c);
    var sig = el("div", "doc-sign");
    sig.appendChild(el("span", "sign-script", A.doctor.split(",")[0]));
    sig.appendChild(el("span", null, A.doctor));
    d.appendChild(sig);
    return d;
  }

  function svgDoc(doc) {
    var d = el("div", "doc doc-evidence");
    d.appendChild(el("h2", "doc-title", doc.title));
    if (doc.sub) d.appendChild(el("div", "doc-sub", doc.sub));
    var art = el("div", "doc-art"); art.innerHTML = doc.svg; d.appendChild(art);
    if (doc.notes) {
      var ul = el("ul", "doc-notes");
      doc.notes.forEach(function (n) { ul.appendChild(el("li", null, n)); });
      d.appendChild(ul);
    }
    return d;
  }

  function noteDoc(doc) {
    var d = el("div", "doc doc-note");
    d.appendChild(el("div", "note-head", doc.head || doc.title));
    doc.lines.forEach(function (l) {
      var p = el("p", "hand" + (l.big ? " big" : "") + (l.u ? " u" : "") + (l.red ? " red" : "") + (l.s ? " strike" : ""), l.t);
      d.appendChild(p);
    });
    var cap = el("div", "doc-sub", doc.title + (doc.sub ? " · " + doc.sub : ""));
    d.appendChild(cap);
    return d;
  }

  function render(CASE, doc) {
    if (doc.kind === "otopsi") return autopsy(CASE);
    if (doc.kind === "not") return noteDoc(doc);
    return svgDoc(doc);
  }

  /* ---- Yazdırılabilir tutanaklar için: bir soru/cevap satırını çözer ---- */
  function variants(t) { return t.v || [{ a: t.a }]; }
  function resolveItem(CASE, cid, it) {
    var ch = CASE.characters[cid], t, q;
    if (it.show) {
      t = (ch.show || {})[it.show];
      if (typeof t === "string") t = { a: t };
      var f = CASE.facts[it.show] || (CASE.links.filter(function (l) { return l.id === it.show; })[0]);
      q = it.q || ("[" + (f ? f.title : "Kanıt") + " gösterilir]");
      return { q: q, a: variants(t)[it.v || 0].a, shown: true };
    }
    if (it.t.indexOf("hakkinda_") === 0) {
      t = ch.about[it.t.slice(9)];
      if (typeof t === "string") t = { a: t };
    } else {
      t = ch.topics.filter(function (x) { return x.id === it.t; })[0];
    }
    return { q: it.q || t.ask, a: variants(t)[it.v || 0].a, shown: false };
  }

  var api = { render: render, figure: figure, resolveItem: resolveItem };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Belgeler = api;
})(this);
