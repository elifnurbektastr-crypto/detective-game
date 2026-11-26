(function () {
  "use strict";

  var CASES = window.CASES || [];
  var LEVELS = SorguMotoru.DIFFICULTY;
  var TYPE_NAMES = { kanit: "Kanıt", ifade: "İfade", iddia: "Söylenti", celiski: "Çelişki", cikarim: "Çıkarım" };
  var TAB_OF = { kanit: "kanit", ifade: "ifade", iddia: "ifade", celiski: "bag", cikarim: "bag" };
  var STATUS = { bekliyor: "Doğrulanmadı", teyit: "Doğrulandı", curutuldu: "Yalan çıktı" };
  var ICONS = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c2.4.2 4.2 1.8 4.8 4.6"/>',
    book: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    report: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    lens: '<circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/>',
    note: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>'
  };
  function icon(name) {
    var s = document.createElement("span");
    s.className = "ico";
    s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
    return s;
  }
  function mobile() { return window.matchMedia("(max-width: 860px)").matches; }

  var CASE = null, game = null, current = null, tab = "belge", busy = false, headPortrait = null;

  /* ---------- yardımcılar ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function btn(cls, text, onclick) { var b = el("button", cls, text); b.type = "button"; b.onclick = onclick; return b; }
  function face(cid, size, cls) { return Portre.portrait(CASE.looks[cid], size, cls); }
  function saveKey(c) { return "dedektif:" + c.id + ":v1"; }
  function save() { try { localStorage.setItem(saveKey(CASE), JSON.stringify(game.s)); } catch (e) { /* gizli mod */ } }
  function load(c) { try { return JSON.parse(localStorage.getItem(saveKey(c))); } catch (e) { return null; } }
  function log(cid) { return game.s.logs[cid] || (game.s.logs[cid] = []); }
  function pdfUrl(c) { return "pdf/" + c.id + ".pdf"; }
  function printUrl(c) { return "print.html?vaka=" + encodeURIComponent(c.id); }

  /* ---------- ana ekran: vaka seçimi ---------- */
  function showHome() {
    CASE = null; game = null; current = null;
    document.body.classList.add("at-home");
    delete document.body.dataset.view;
    $("home").hidden = false; $("game").hidden = true;
    try { localStorage.removeItem("dedektif:son"); } catch (e) { /* yok say */ }
    var grid = $("homeGrid"); grid.textContent = "";
    Object.keys(LEVELS).forEach(function (lv) {
      var col = el("section", "level level-" + lv);
      var h = el("h2", "level-title"); h.appendChild(el("span", "lv-chip lv-" + lv, LEVELS[lv].label));
      col.appendChild(h);
      col.appendChild(el("p", "level-desc", {
        kolay: "Yeni başlayanlar için. Önerilen sorular ve kilitli konularda ipucu var.",
        orta: "Önerilen sorular var ama kilitleri kendiniz çözmelisiniz.",
        zor: "Öneri yok, ipucu yok, yalnızca 3 suçlama hakkı."
      }[lv]));
      var list = CASES.filter(function (c) { return c.difficulty === lv; });
      list.forEach(function (c) { col.appendChild(caseCard(c)); });
      if (!list.length) {
        var soon = el("div", "case-card soon");
        soon.appendChild(el("h3", null, "Yakında"));
        soon.appendChild(el("p", null, "Bu seviyede yeni bir vaka hazırlanıyor."));
        col.appendChild(soon);
      }
      grid.appendChild(col);
    });
  }

  function caseCard(c) {
    var saved = load(c);
    var card = el("article", "case-card");
    card.appendChild(el("div", "case-kicker", c.place));
    card.appendChild(el("h3", null, c.title));
    card.appendChild(el("div", "case-sub", c.subtitle));
    card.appendChild(el("p", null, c.tagline));
    var faces = el("div", "case-faces");
    var prev = CASE; CASE = c;
    Object.keys(c.characters).forEach(function (cid) { faces.appendChild(face(cid, 34)); });
    CASE = prev;
    card.appendChild(faces);
    card.appendChild(el("div", "case-meta", c.duration + " · " + c.players + (saved && saved.solved ? " · Çözüldü" : "")));
    var act = el("div", "case-actions");
    act.appendChild(btn("btn primary", saved && saved.started && !saved.solved ? "Devam et" : "Oyna", function () { openCase(c); }));
    var pdf = el("a", "btn ghost", "PDF seti"); pdf.href = pdfUrl(c); pdf.target = "_blank"; pdf.rel = "noopener";
    pdf.title = "Yazdırıp kâğıt üzerinde oynayın";
    act.appendChild(pdf);
    card.appendChild(act);
    return card;
  }

  /* ---------- vaka aç ---------- */
  function openCase(c, fresh) {
    CASE = c;
    game = new SorguMotoru.Game(CASE, fresh ? null : load(CASE));
    current = null; tab = "belge";
    try { localStorage.setItem("dedektif:son", CASE.id); } catch (e) { /* yok say */ }
    document.body.classList.remove("at-home");
    $("home").hidden = true; $("game").hidden = false;
    $("caseTitle").textContent = CASE.title;
    var chip = $("caseLevel"); chip.textContent = game.rules.label; chip.className = "lv-chip lv-" + CASE.difficulty;
    $("casePlace").textContent = CASE.subtitle + " · " + CASE.place;
    renderSuspects(); renderChat(); renderNotebook(); renderStats();
    setView(mobile() ? "supheli" : "sorgu");
    if (!game.s.started) openIntro();
  }

  /* ---------- şüpheliler ---------- */
  function renderSuspects() {
    var ul = $("suspectList");
    ul.textContent = "";
    Object.keys(CASE.characters).forEach(function (cid) {
      var ch = CASE.characters[cid];
      var b = el("button", "suspect" + (cid === current ? " active" : ""));
      b.type = "button";
      b.appendChild(face(cid, 46));
      var info = el("span");
      info.appendChild(el("span", "suspect-name", ch.name));
      info.appendChild(el("span", "suspect-role", ch.role));
      b.appendChild(info);
      var n = log(cid).filter(function (m) { return m.who === "me"; }).length;
      b.appendChild(el("span", "suspect-meta", n ? n + " soru" : "yeni"));
      b.onclick = function () { select(cid); };
      var li = el("li"); li.appendChild(b); ul.appendChild(li);
    });
  }

  function renderStats() {
    var total = Object.keys(game.facts).length;
    var known = game.s.known.length;
    var links = game.s.known.filter(function (f) { var t = game.facts[f].type; return t === "celiski" || t === "cikarim"; }).length;
    var box = $("stats"); box.textContent = "";
    [[game.s.questions, "soru"], [known + "/" + total, "bilgi"], [links, "bağlantı"]].forEach(function (s) {
      var d = el("div", "stat"); d.appendChild(el("b", null, String(s[0]))); d.appendChild(el("span", null, s[1])); box.appendChild(d);
    });
    $("nbCount").textContent = known + " / " + total + " bilgi";
    var left = game.accusationsLeft();
    $("btnAccuse").textContent = left == null ? "Suçla" : "Suçla (" + left + ")";
  }

  function select(cid) {
    current = cid;
    var ch = CASE.characters[cid];
    var first = !log(cid).length;
    if (first) log(cid).push({ who: "them", text: ch.opening });
    renderSuspects(); renderChat(); setView("sorgu");
    if (first) Portre.talk(headPortrait, ch.opening);
    save();
    $("input").focus();
  }

  /* ---------- sorgu ---------- */
  function renderChat() {
    var head = $("chatHead"), box = $("chatLog");
    head.textContent = ""; box.textContent = ""; headPortrait = null;
    var disabled = !current;
    $("input").disabled = disabled; $("btnSend").disabled = disabled; $("btnShow").disabled = disabled;
    if (!current) {
      head.hidden = true;
      var e = el("div", "empty");
      e.appendChild(el("h3", null, "Sorguya başlayın"));
      e.appendChild(el("p", null, "Bir şüpheli seçin ve sorunuzu kendi cümlelerinizle yazın. Önce Belgeler'deki otopsi raporuna bakmak iyi bir başlangıç olabilir."));
      box.appendChild(e);
      $("chips").textContent = "";
      return;
    }
    head.hidden = false;
    var ch = CASE.characters[current];
    var back = btn("back-btn", null, function () { setView("supheli"); });
    back.setAttribute("aria-label", "Şüphelilere dön");
    back.appendChild(icon("back"));
    head.appendChild(back);
    headPortrait = face(current, 72, "head-portrait");
    head.appendChild(headPortrait);
    var t = el("div", "head-text");
    t.appendChild(el("h3", null, ch.name + ", " + ch.age));
    t.appendChild(el("p", "head-role", ch.role));
    t.appendChild(el("p", "head-status", "yazıyor..."));
    t.appendChild(el("p", "head-bio", ch.bio));
    head.appendChild(t);
    log(current).forEach(function (m) { box.appendChild(bubble(m)); });
    box.scrollTop = box.scrollHeight;
    renderChips();
  }

  function bubble(m) {
    var ch = CASE.characters[current];
    if (m.who === "note") return el("div", "note " + (m.cls || ""), m.text);
    var row = el("div", "row " + m.who);
    if (m.who === "them") row.appendChild(face(current, 30, "mini"));
    var d = el("div", "msg " + m.who + (m.kind ? " " + m.kind : "") + (m.show ? " show" : ""));
    var who = el("span", "who", m.who === "me" ? (m.show ? "Kanıt gösterdiniz" : "Siz") : ch.short);
    if (m.who === "them") d.style.setProperty("--c", ch.color);
    d.appendChild(who);
    d.appendChild(document.createTextNode(m.text));
    if (m.hint) d.appendChild(el("span", "lock-hint", m.hint));
    row.appendChild(d);
    return row;
  }

  function push(m) {
    log(current).push(m);
    var box = $("chatLog");
    box.appendChild(bubble(m));
    box.scrollTop = box.scrollHeight;
  }

  function renderChips() {
    var box = $("chips"); box.textContent = "";
    if (!current) return;
    game.suggestions(current).forEach(function (q) {
      var c = btn("chip", q, function () { send(q); });
      box.appendChild(c);
    });
  }

  function respond(userMsg, action) {
    if (busy) return;
    busy = true;
    var cid = current;
    var docsBefore = game.documents().length;
    push(userMsg);
    var box = $("chatLog");
    var typing = el("div", "typing"); typing.innerHTML = "<i></i><i></i><i></i>";
    box.appendChild(typing); box.scrollTop = box.scrollHeight;
    $("chatHead").classList.add("is-typing");
    var res = action();
    save();
    // Biraz düşünüp yazıyormuş gibi: uzun cevaplar biraz daha uzun sürer.
    var wait = 500 + Math.random() * 500 + Math.min(1400, res.text.length * 9);
    setTimeout(function () {
      typing.remove();
      $("chatHead").classList.remove("is-typing");
      busy = false;
      if (cid !== current) return;
      push({ who: "them", text: res.text, kind: res.kind === "kilitli" ? "kilitli" : "", hint: res.hint || null });
      Portre.talk(headPortrait, res.text);
      var buzz = false;
      res.gained.forEach(function (fid) {
        var f = game.facts[fid];
        var isLink = f.type === "celiski" || f.type === "cikarim";
        var label = isLink ? TYPE_NAMES[f.type] + ": " : f.type === "iddia" ? "Söylenti not edildi: " : "Not alındı: ";
        push({ who: "note", cls: isLink ? "link" : "gain", text: label + f.title });
        if (isLink) { toast(TYPE_NAMES[f.type], f.title); buzz = true; }
      });
      game.documents().slice(docsBefore).forEach(function (d) {
        push({ who: "note", cls: "gain", text: "Yeni belge: " + d.title });
        toast("Yeni belge", d.title);
      });
      if (buzz && navigator.vibrate) navigator.vibrate([30, 40, 30]);
      save();
      renderChips(); renderSuspects(); renderStats(); renderNotebook();
      if (res.gained.length) markMobileDot(true);
    }, wait);
  }

  function send(text) {
    text = (text || "").trim();
    if (!text || !current) return;
    $("input").value = "";
    respond({ who: "me", text: text }, function () { return game.ask(current, text); });
  }

  /* ---------- defter ---------- */
  function factCard(fid, opts) {
    var f = game.facts[fid];
    var pick = opts && opts.pick;
    var c = el("div", "card " + f.type + (pick ? " pick" : ""));
    var st = game.status(fid);
    if (game.s.fresh.indexOf(fid) >= 0 && !pick) c.appendChild(el("span", "tag", "yeni"));
    else if (f.type === "celiski" || f.type === "cikarim" || f.type === "iddia") c.appendChild(el("span", "tag", TYPE_NAMES[f.type]));
    c.appendChild(el("h4", null, f.title));
    c.appendChild(el("p", null, f.text));
    var foot = el("div", "card-foot");
    if (f.source) foot.appendChild(el("span", "src", (f.type === "iddia" ? "Söyleyen: " : "Kaynak: ") + f.source));
    if (st) foot.appendChild(el("span", "status st-" + st, STATUS[st]));
    if (foot.childNodes.length) c.appendChild(foot);
    if (st === "curutuldu") c.classList.add("denied");
    return c;
  }

  function renderNotebook() {
    var list = $("nbList"); list.textContent = "";
    var freshCounts = { belge: 0, kanit: 0, ifade: 0, bag: 0 };
    game.s.known.forEach(function (fid) { if (game.s.fresh.indexOf(fid) >= 0) freshCounts[TAB_OF[game.facts[fid].type]]++; });
    var seenDocs = game.s.seenDocs || [];
    var docs = game.documents();
    freshCounts.belge = docs.filter(function (d) { return seenDocs.indexOf(d.id) < 0; }).length;
    document.querySelectorAll("#nbTabs .tab").forEach(function (b) {
      var k = b.dataset.tab;
      b.classList.toggle("active", k === tab);
      var old = b.querySelector(".badge"); if (old) old.remove();
      if (freshCounts[k] && k !== tab) b.appendChild(el("span", "badge", String(freshCounts[k])));
    });

    if (tab === "belge") {
      docs.forEach(function (d) {
        var c = el("button", "doc-card" + (seenDocs.indexOf(d.id) < 0 ? " unseen" : ""));
        c.type = "button";
        c.appendChild(icon(d.kind === "otopsi" ? "report" : d.kind === "not" ? "note" : d.id === "kroki" ? "map" : "lens"));
        var t = el("span"); t.appendChild(el("b", null, d.title)); t.appendChild(el("small", null, d.sub || ""));
        c.appendChild(t);
        c.onclick = function () { openDoc(d); };
        list.appendChild(c);
      });
      var more = (CASE.documents || []).length - docs.length;
      if (more > 0) list.appendChild(el("p", "nb-empty", more + " belge daha var. Soruşturma ilerledikçe açılacak."));
      return;
    }
    var items = game.s.known.slice().reverse().filter(function (fid) { return TAB_OF[game.facts[fid].type] === tab; });
    if (!items.length) {
      list.appendChild(el("p", "nb-empty", tab === "bag"
        ? "Henüz bağlantı yok. Çelişen iki ifade ya da birbirini tamamlayan iki bilgi bulduğunuzda burada belirir."
        : "Henüz bir şey yok. Şüphelileri sorgulayın."));
    }
    items.forEach(function (fid) { list.appendChild(factCard(fid)); });
  }

  function clearFresh(tb) {
    game.s.fresh = game.s.fresh.filter(function (fid) { return TAB_OF[game.facts[fid].type] !== tb; });
    save();
  }

  /* ---------- modal ---------- */
  function openModal(build, onClose, wide) {
    var body = $("modalBody"); body.textContent = "";
    $("modal").querySelector(".modal-card").classList.toggle("wide", !!wide);
    build(body);
    $("modal").hidden = false;
    $("modal")._onClose = onClose;
    var card = $("modal").querySelector(".modal-card");
    card.scrollTop = 0;
    card.setAttribute("tabindex", "-1");
    card.focus({ preventScroll: true });
  }
  function closeModal() {
    $("modal").hidden = true;
    var cb = $("modal")._onClose; $("modal")._onClose = null;
    if (cb) cb();
  }

  function openDoc(d) {
    game.s.seenDocs = game.s.seenDocs || [];
    if (game.s.seenDocs.indexOf(d.id) < 0) game.s.seenDocs.push(d.id);
    save();
    openModal(function (b) { b.appendChild(Belgeler.render(CASE, d)); }, renderNotebook, true);
  }

  function openIntro() {
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Vaka dosyası · " + CASE.place));
      b.appendChild(el("h2", null, CASE.title + ": " + CASE.subtitle));
      CASE.intro.forEach(function (p) { b.appendChild(el("p", null, p)); });
      b.appendChild(el("h3", null, "Evdekiler"));
      var cast = el("div", "cast");
      Object.keys(CASE.characters).forEach(function (cid) {
        var ch = CASE.characters[cid];
        var it = el("div", "cast-item"); it.appendChild(face(cid, 56));
        var t = el("div"); t.appendChild(el("b", null, ch.name)); t.appendChild(document.createTextNode(ch.role + ". " + ch.bio));
        it.appendChild(t); cast.appendChild(it);
      });
      b.appendChild(cast);
      b.appendChild(el("h3", null, "Nasıl oynanır · " + game.rules.label + " seviye"));
      var ol = el("ol");
      CASE.howto.forEach(function (h) { ol.appendChild(el("li", null, h)); });
      ol.appendChild(el("li", null, "Şüpheliler bazen başkaları hakkında konuşur. Bunlar deftere söylenti olarak düşer. Doğru olup olmadığını o kişiye sorarak anlayabilirsiniz."));
      ol.appendChild(el("li", null, "Belgeler sekmesinde otopsi raporu, olay yeri krokisi ve deliller var."));
      if (game.rules.maxAccuse) ol.appendChild(el("li", null, "Bu seviyede yalnızca " + game.rules.maxAccuse + " suçlama hakkınız var."));
      b.appendChild(ol);
      var act = el("div", "modal-actions");
      var pdf = el("a", "btn ghost", "Yazdırılabilir PDF seti"); pdf.href = pdfUrl(CASE); pdf.target = "_blank"; pdf.rel = "noopener";
      act.appendChild(pdf);
      act.appendChild(btn("btn primary", game.s.started ? "Soruşturmaya dön" : "Soruşturmaya başla", closeModal));
      b.appendChild(act);
    }, function () { game.s.started = true; save(); });
  }

  function openShow() {
    if (!current) return;
    var ch = CASE.characters[current];
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Kanıt göster · " + ch.name));
      b.appendChild(el("h2", null, "Ne göstereceksiniz?"));
      b.appendChild(el("p", "hint", "Defterdeki herhangi bir bilgiyi gösterebilirsiniz. Bir yalanı ortaya çıkaran bilgi kilitli bir konuyu açabilir."));
      var grid = el("div", "ev-grid"); grid.style.marginTop = "16px";
      game.s.known.slice().reverse().forEach(function (fid) {
        var c = factCard(fid, { pick: true });
        c.tabIndex = 0;
        c.onclick = function () {
          closeModal();
          var f = game.facts[fid];
          respond({ who: "me", show: true, text: f.title + ": " + f.text }, function () { return game.show(current, fid); });
        };
        c.onkeydown = function (e) { if (e.key === "Enter") c.onclick(); };
        grid.appendChild(c);
      });
      b.appendChild(grid);
    });
  }

  function openAccuse() {
    var pick = { killer: null, motive: null, ev: [] };
    var left = game.accusationsLeft();
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Suçlama"));
      b.appendChild(el("h2", null, "Kim öldürdü?"));
      b.appendChild(el("p", "hint", left == null
        ? "Yanlış bir suçlama oyunu bitirmez ama savcı her seferinde dosyanızı geri çevirir."
        : "Kalan suçlama hakkınız: " + left + ". Hakkınız biterse dosya kapanır."));

      b.appendChild(el("h3", null, "1. Katil"));
      var g1 = el("div", "pick-grid");
      Object.keys(CASE.characters).forEach(function (cid) {
        var ch = CASE.characters[cid];
        var o = el("button", "option"); o.type = "button";
        o.appendChild(face(cid, 40)); o.appendChild(el("span", null, ch.name));
        o.onclick = function () { pick.killer = cid; mark(g1, o); check(); };
        g1.appendChild(o);
      });
      b.appendChild(g1);

      b.appendChild(el("h3", null, "2. Sebep"));
      var g2 = el("div", "opt-list");
      CASE.motives.forEach(function (m) {
        var o = btn("option", m.label, function () { pick.motive = m.id; mark(g2, o); check(); });
        g2.appendChild(o);
      });
      b.appendChild(g2);

      b.appendChild(el("h3", null, "3. En güçlü kanıtlarınız (en fazla 3)"));
      var g3 = el("div", "ev-grid");
      game.s.known.slice().reverse().forEach(function (fid) {
        var c = factCard(fid, { pick: true });
        c.onclick = function () {
          var i = pick.ev.indexOf(fid);
          if (i >= 0) pick.ev.splice(i, 1);
          else if (pick.ev.length < 3) pick.ev.push(fid);
          c.classList.toggle("selected", pick.ev.indexOf(fid) >= 0);
          check();
        };
        g3.appendChild(c);
      });
      b.appendChild(g3);

      var act = el("div", "modal-actions");
      act.appendChild(btn("btn ghost", "Vazgeç", closeModal));
      var go = btn("btn accent", "Suçla", function () { closeModal(); result(game.accuse(pick.killer, pick.motive, pick.ev)); save(); renderStats(); });
      go.disabled = true;
      act.appendChild(go); b.appendChild(act);

      function mark(group, o) { group.querySelectorAll(".option").forEach(function (x) { x.classList.toggle("selected", x === o); }); }
      function check() { go.disabled = !(pick.killer && pick.motive && pick.ev.length); }
    });
  }

  function result(res) {
    openModal(function (b) {
      b.appendChild(el("div", "kicker", res.win ? "Dava kapandı" : "Savcılık"));
      b.appendChild(el("h2", null, res.ending.title));
      res.ending.text.forEach(function (p) { b.appendChild(el("p", null, p)); });
      if (res.win) b.appendChild(el("p", "hint", game.s.questions + " soru, " + game.s.accusations + " suçlama" + (res.perfect ? " · Kusursuz dosya!" : "")));
      else if (game.accusationsLeft() != null && !res.over) b.appendChild(el("p", "hint", "Kalan suçlama hakkı: " + game.accusationsLeft()));
      var act = el("div", "modal-actions");
      if (res.win || res.over) act.appendChild(btn("btn ghost", "Baştan oyna", function () { closeModal(); reset(true); }));
      act.appendChild(btn("btn primary", res.win || res.over ? "Kapat" : "Soruşturmaya dön", closeModal));
      b.appendChild(act);
    });
  }

  function reset(force) {
    if (!force && !confirm("Bu vakadaki tüm ilerleme silinsin ve baştan başlansın mı?")) return;
    try { localStorage.removeItem(saveKey(CASE)); } catch (e) { /* yok say */ }
    openCase(CASE, true);
  }

  /* ---------- bildirim / mobil ---------- */
  function toast(kind, text) {
    var t = el("div", "toast"); t.appendChild(el("b", null, kind)); t.appendChild(document.createTextNode(text));
    $("toasts").appendChild(t);
    setTimeout(function () { t.remove(); }, 3800);
  }
  function setView(v) {
    $("layout").dataset.view = v;
    document.body.dataset.view = v;
    document.querySelectorAll("#mobileNav button").forEach(function (b) { b.classList.toggle("active", b.dataset.view === v); });
    if (v === "defter") markMobileDot(false);
  }
  function markMobileDot(on) { $("mobileDot").classList.toggle("on", on && $("layout").dataset.view !== "defter"); }

  /* ---------- olaylar ---------- */
  $("composer").onsubmit = function (e) { e.preventDefault(); send($("input").value); };
  $("btnShow").onclick = openShow;
  $("btnCase").onclick = openIntro;
  $("btnAccuse").onclick = openAccuse;
  $("btnReset").onclick = function () { reset(false); };
  $("btnHome").onclick = showHome;
  $("modalClose").onclick = closeModal;
  $("modal").onclick = function (e) { if (e.target === $("modal")) closeModal(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("modal").hidden) closeModal(); });
  document.querySelectorAll("#nbTabs .tab").forEach(function (b) {
    b.onclick = function () { if (tab !== "belge") clearFresh(tab); tab = b.dataset.tab; renderNotebook(); };
  });
  document.querySelectorAll("#mobileNav button").forEach(function (b) {
    var name = { supheli: "people", defter: "book", vaka: "folder" }[b.dataset.view];
    if (name) b.insertBefore(icon(name), b.firstChild);
    b.onclick = function () { if (b.dataset.view === "vaka") openIntro(); else setView(b.dataset.view); };
  });
  $("btnHome").textContent = ""; $("btnHome").appendChild(icon("menu"));
  $("btnReset").textContent = ""; $("btnReset").appendChild(icon("reset"));

  /* ---------- uygulama olarak yükleme ve çevrimdışı ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* yok say */ });
  }
  var installEvent = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); installEvent = e; $("installBox").hidden = false;
  });
  $("btnInstall").onclick = function () {
    if (installEvent) { installEvent.prompt(); installEvent = null; $("installBox").hidden = true; }
  };
  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) $("iosHint").hidden = false;

  // Açılış: ?vaka= ya da en son oynanan vaka, yoksa ana ekran
  var want = new URLSearchParams(location.search).get("vaka");
  try { want = want || localStorage.getItem("dedektif:son"); } catch (e) { /* yok say */ }
  var found = CASES.filter(function (c) { return c.id === want; })[0];
  if (found) openCase(found); else showHome();
})();
