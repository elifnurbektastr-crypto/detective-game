(function () {
  "use strict";

  var CASES = window.CASES || [];
  var M = SorguMotoru;
  var LEVELS = M.DIFFICULTY;
  var LEVEL_ORDER = { kolay: 0, orta: 1, zor: 2 };
  var TYPE_NAMES = { kanit: "Kanıt", ifade: "İfade", iddia: "Söylenti", celiski: "Çelişki", cikarim: "Çıkarım" };
  var TAB_OF = { kanit: "kanit", ifade: "ifade", iddia: "ifade", celiski: "bag", cikarim: "bag" };
  var STATUS = { bekliyor: "Doğrulanmadı", teyit: "Doğrulandı", curutuldu: "Yalan çıktı" };
  var KOMISER = { skin: "#d2a07e", hair: "#9a948c", style: "yana", clothes: "#2a2f3a", bg: "#1d2028", mustache: true, tie: "#5a6b85", lines: true };
  var SITE = "https://elifnurbektastr-crypto.github.io/detective-game/";

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
    note: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    safe: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v1M12 15v1M8 12h1M15 12h1"/>',
    puzzle: '<path d="M4 4h7v3a2 2 0 1 0 4 0V4h5v16H4z"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    sound: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
    mute: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M17 10l4 4M21 10l-4 4"/>',
    voice: '<path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    badge: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13l-1.5 8 5-3 5 3-1.5-8"/>'
  };

  var CASE = null, game = null, current = null, tab = "belge", busy = false, seat = null, typer = null;

  /* ---------- yardımcılar ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function btn(cls, text, onclick) { var b = el("button", cls, text); b.type = "button"; b.onclick = onclick; return b; }
  function icon(name) {
    var s = el("span", "ico");
    s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
    return s;
  }
  function iconBtn(name, label, onclick, cls) {
    var b = btn("btn ghost icon " + (cls || ""), null, onclick);
    b.appendChild(icon(name)); b.title = label; b.setAttribute("aria-label", label);
    return b;
  }
  function face(cid, size, cls) { return Portre.portrait(CASE.looks[cid], size, cls); }
  function mobile() { return window.matchMedia("(max-width: 860px)").matches; }
  function saveKey(c) { return "dedektif:" + c.id + ":v1"; }
  function save() { try { localStorage.setItem(saveKey(CASE), JSON.stringify(game.s)); } catch (e) { /* gizli mod */ } }
  function load(c) { try { return JSON.parse(localStorage.getItem(saveKey(c))); } catch (e) { return null; } }
  function log(cid) { return game.s.logs[cid] || (game.s.logs[cid] = []); }
  function pdfUrl(c) { return "pdf/" + c.id + ".pdf"; }
  function stars(n) { return "★★★".slice(0, n) + "☆☆☆".slice(0, 3 - n); }

  /* ---------- profil: rütbe, rozetler, günün sorgusu ---------- */
  function profile() {
    try { return JSON.parse(localStorage.getItem("dedektif:profil")) || { cases: {}, daily: {} }; } catch (e) { return { cases: {}, daily: {} }; }
  }
  function saveProfile(p) { try { localStorage.setItem("dedektif:profil", JSON.stringify(p)); } catch (e) { /* yok say */ } }
  function points(p) {
    var n = 0;
    Object.keys(p.cases).forEach(function (id) { n += 1 + (p.cases[id].badges || []).length; });
    return n;
  }
  function myRank() { return M.rankOf(points(profile())); }
  function nextRank() {
    var pts = points(profile());
    return M.RANKS.filter(function (r) { return r.min > pts; })[0] || null;
  }
  function dailyStreak(p) {
    var n = 0, d = new Date();
    if (!p.daily[Gunluk.today(d)]) d.setDate(d.getDate() - 1);
    while (p.daily[Gunluk.today(d)] && p.daily[Gunluk.today(d)].ok) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ---------- ana ekran ---------- */
  function showHome() {
    if (window.Ses) Ses.stop();
    CASE = null; game = null; current = null;
    document.body.classList.add("at-home");
    delete document.body.dataset.view;
    $("home").hidden = false; $("game").hidden = true;
    try { localStorage.removeItem("dedektif:son"); } catch (e) { /* yok say */ }
    renderRankCard(); renderDailyCard();
    var grid = $("homeGrid"); grid.textContent = "";
    Object.keys(LEVELS).forEach(function (lv) {
      var col = el("section", "level level-" + lv);
      var h = el("h2", "level-title"); h.appendChild(el("span", "lv-chip lv-" + lv, LEVELS[lv].label));
      col.appendChild(h);
      col.appendChild(el("p", "level-desc", {
        kolay: "Kısa vakalar. Önerilen sorular var, kilitli konularda ne araman gerektiği söylenir.",
        orta: "Daha uzun vakalar. Önerilen sorular var ama kilitleri kendin çözersin.",
        zor: "Öneri yok, ipucu yok, 3 suçlama hakkı ve süre dolunca dosya kapanır."
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

  function renderRankCard() {
    var box = $("rankCard"); box.textContent = "";
    var p = profile(), r = myRank(), nx = nextRank(), pts = points(p);
    var badgeCount = 0; Object.keys(p.cases).forEach(function (id) { badgeCount += (p.cases[id].badges || []).length; });
    var left = el("div", "rank-left");
    left.appendChild(icon("badge"));
    var t = el("div");
    t.appendChild(el("small", null, "Rütben"));
    t.appendChild(el("b", null, r.label));
    left.appendChild(t);
    box.appendChild(left);
    var right = el("div", "rank-right");
    right.appendChild(el("span", null, Object.keys(p.cases).length + " vaka · " + badgeCount + " rozet"));
    if (nx) {
      var bar = el("div", "rank-bar"); var fill = el("i");
      fill.style.width = Math.min(100, Math.round((pts - r.min) / (nx.min - r.min) * 100)) + "%";
      bar.appendChild(fill); right.appendChild(bar);
      right.appendChild(el("small", null, "Sonraki: " + nx.label + (nx.perk ? " (" + nx.perk.toLowerCase().replace(/\.$/, "") + ")" : "")));
    }
    if (r.perk) right.appendChild(el("small", "perk", r.perk));
    box.appendChild(right);
  }

  function renderDailyCard() {
    var box = $("dailyCard"); box.textContent = "";
    var p = profile(), z = Gunluk.puzzle(), done = p.daily[Gunluk.today()];
    box.appendChild(Portre.portrait(z.look, 52));
    var t = el("div", "daily-text");
    t.appendChild(el("small", null, "Günün sorgusu" + (dailyStreak(p) ? " · " + dailyStreak(p) + " gün üst üste" : "")));
    t.appendChild(el("b", null, z.olay));
    t.appendChild(el("span", null, done ? (done.ok ? "Bugünkünü çözdün. Yarın yenisi gelecek." : "Bugün kaçırdın. Yarın yenisi gelecek.") : z.who + " üç şey söylüyor. Biri yalan."));
    box.appendChild(t);
    box.appendChild(btn("btn " + (done ? "ghost" : "primary"), done ? "Bak" : "Çöz", openDaily));
  }

  function caseCard(c) {
    var saved = load(c), p = profile(), res = p.cases[c.id];
    var card = el("article", "case-card");
    card.appendChild(el("div", "case-kicker", c.place));
    card.appendChild(el("h3", null, c.title));
    card.appendChild(el("div", "case-sub", c.subtitle));
    card.appendChild(el("p", null, c.tagline));
    var faces = el("div", "case-faces");
    Object.keys(c.characters).forEach(function (cid) { faces.appendChild(Portre.portrait(c.looks[cid], 34)); });
    card.appendChild(faces);
    card.appendChild(el("div", "case-meta", c.duration + " · " + c.players + (res ? " · " + stars(res.stars) : "")));
    var act = el("div", "case-actions");
    act.appendChild(btn("btn primary", saved && saved.started && !saved.solved ? "Devam et" : res ? "Tekrar oyna" : "Oyna", function () {
      if (res && saved && saved.solved) { try { localStorage.removeItem(saveKey(c)); } catch (e) { /* yok say */ } }
      openCase(c);
    }));
    var pdf = el("a", "btn ghost", "Yazdır (PDF)"); pdf.href = pdfUrl(c); pdf.target = "_blank"; pdf.rel = "noopener";
    act.appendChild(pdf);
    card.appendChild(act);
    return card;
  }

  /* ---------- vaka ---------- */
  function openCase(c, fresh) {
    CASE = c;
    game = new M.Game(CASE, fresh ? null : load(CASE), { timeBonus: myRank().timeBonus || 0 });
    current = null; tab = "belge";
    try { localStorage.setItem("dedektif:son", CASE.id); } catch (e) { /* yok say */ }
    document.body.classList.remove("at-home");
    $("home").hidden = true; $("game").hidden = false;
    $("caseTitle").textContent = CASE.title;
    var chip = $("caseLevel"); chip.textContent = game.rules.label; chip.className = "lv-chip lv-" + CASE.difficulty;
    $("casePlace").textContent = CASE.subtitle;
    Ses.scene(CASE.ambience);
    renderSuspects(); renderRoom(); renderNotebook(); renderStats();
    setView(mobile() ? "supheli" : "sorgu");
    if (!game.s.started) openIntro();
  }

  function renderSuspects() {
    var ul = $("suspectList"); ul.textContent = "";
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
    var total = Object.keys(game.facts).length, known = game.s.known.length;
    var links = game.s.known.filter(function (f) { var t = game.facts[f].type; return t === "celiski" || t === "cikarim"; }).length;
    var box = $("stats"); box.textContent = "";
    [[game.s.questions, "soru"], [known + "/" + total, "bilgi"], [links, "bağlantı"]].forEach(function (s) {
      var d = el("div", "stat"); d.appendChild(el("b", null, String(s[0]))); d.appendChild(el("span", null, s[1])); box.appendChild(d);
    });
    $("nbCount").textContent = known + " / " + total + " bilgi";
    var left = game.accusationsLeft();
    $("btnAccuse").textContent = left == null ? "Suçla" : "Suçla (" + left + ")";
    renderClock();
  }

  function renderClock() {
    var c = game.clock();
    document.querySelectorAll(".clock-chip").forEach(function (chip) {
      chip.hidden = !c;
      if (!c) return;
      chip.textContent = "";
      chip.appendChild(icon("clock"));
      chip.appendChild(el("b", null, c.text));
      chip.appendChild(el("span", null, c.left > 0 ? " / " + c.deadline : " süre doldu"));
      chip.classList.toggle("late", c.left <= 30);
      chip.title = c.goal;
    });
  }

  function select(cid) {
    current = cid;
    var ch = CASE.characters[cid];
    var first = !log(cid).length;
    if (first) log(cid).push({ who: "them", text: ch.opening });
    renderSuspects(); renderRoom(); setView("sorgu");
    if (first) say(ch.opening);
    save();
    Ses.unlock();
    if (!mobile()) $("input").focus();
  }

  /* ---------- sorgu odası ---------- */
  function renderRoom() {
    var room = $("room"); room.textContent = ""; seat = null;
    var disabled = !current;
    $("input").disabled = disabled; $("btnSend").disabled = disabled; $("btnShow").disabled = disabled;

    var bar = el("div", "room-bar");
    if (current) {
      var back = btn("back-btn", null, function () { Ses.hush(); setView("supheli"); });
      back.setAttribute("aria-label", "Şüphelilere dön"); back.appendChild(icon("back"));
      bar.appendChild(back);
      var ch = CASE.characters[current];
      var nm = el("div", "room-who");
      nm.appendChild(el("b", null, ch.name + ", " + ch.age));
      nm.appendChild(el("span", "room-role", ch.role));
      nm.appendChild(el("span", "room-status", "düşünüyor..."));
      bar.appendChild(nm);
    } else {
      bar.appendChild(el("div", "room-who", "Sorgu odası"));
    }
    var tools = el("div", "room-tools");
    var clock = el("span", "clock-chip"); tools.appendChild(clock);
    if (current) tools.appendChild(iconBtn("list", "Tutanak", openTranscript));
    tools.appendChild(iconBtn("star", "Komiser'e danış", openHint, "hint-btn"));
    tools.appendChild(soundButton());
    tools.appendChild(voiceButton());
    bar.appendChild(tools);
    room.appendChild(bar);

    var stage = el("div", "stage");
    stage.appendChild(el("div", "lamp"));
    var chair = el("div", "seat");
    if (current) {
      seat = Portre.portrait(CASE.looks[current], null, "seat-portrait", true);
      chair.appendChild(seat);
    } else {
      chair.appendChild(el("div", "empty-chair"));
    }
    stage.appendChild(chair);

    var speech = el("div", "speech"); speech.id = "speech";
    speech.onclick = finishTyping;
    stage.appendChild(speech);

    var table = el("div", "table");
    table.innerHTML =
      '<svg class="prop tea" viewBox="0 0 40 60" aria-hidden="true"><path d="M8 6h24l-3 22q4 8 0 16l2 12H9l2-12q-4-8 0-16z" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.35)"/><path d="M11 24h18l-1 6q3 6 0 13l1 8H11l1-8q-3-7 0-13z" fill="#8a2a14" opacity=".85"/><ellipse cx="20" cy="58" rx="16" ry="3" fill="#c9a25a" opacity=".6"/></svg>' +
      '<div class="prop folder"><span>' + (CASE.title || "") + '</span></div>';
    var mine = el("div", "my-line"); mine.id = "myLine";
    table.appendChild(mine);
    var slips = el("div", "slips"); slips.id = "slips";
    table.appendChild(slips);
    stage.appendChild(table);
    room.appendChild(stage);

    renderClock();
    if (!current) {
      showSpeech(null, mobile() ? "Bir şüpheli seç." : "Soldan bir şüpheli seç. Önce Defter'deki belgelere bakmak iyi bir başlangıç olabilir.", "system");
      $("chips").textContent = "";
      return;
    }
    var last = log(current).filter(function (m) { return m.who !== "note"; });
    var lastThem = null, lastMe = null;
    for (var i = last.length - 1; i >= 0; i--) {
      if (!lastThem && last[i].who === "them") lastThem = last[i];
      if (!lastMe && last[i].who === "me") lastMe = last[i];
      if (lastThem && lastMe) break;
    }
    if (lastMe) showMine(lastMe);
    if (lastThem) showSpeech(CASE.characters[current].short, lastThem.text, lastThem.kind, lastThem.hint);
    renderChips();
  }

  function soundButton() {
    var on = Ses.ambienceOn();
    var b = iconBtn(on ? "sound" : "mute", on ? "Ortam sesini kapat" : "Ortam sesini aç", function () {
      Ses.setAmbience(!Ses.ambienceOn()); renderRoom();
    }, on ? "on" : "");
    return b;
  }
  function voiceButton() {
    var on = Ses.voiceOn();
    return iconBtn("voice", on ? "Sesli konuşmayı kapat" : "Sesli konuşmayı aç", function () {
      if (!Ses.voiceOn() && !Ses.canSpeak()) { toast("Ses", "Bu cihazda Türkçe ses bulunamadı."); return; }
      Ses.setVoice(!Ses.voiceOn()); renderRoom();
    }, on ? "on" : "");
  }

  function showMine(m) {
    var line = $("myLine"); if (!line) return;
    line.textContent = "";
    line.appendChild(el("small", null, m.show ? "Gösterdiğin kanıt" : "Sen"));
    line.appendChild(el("span", null, m.show ? m.title || m.text : m.text));
    line.classList.remove("in"); void line.offsetWidth; line.classList.add("in");
  }

  function showSpeech(name, text, kind, hint, animate) {
    var sp = $("speech"); if (!sp) return;
    clearInterval(typer); typer = null;
    sp.className = "speech" + (kind ? " " + kind : "");
    sp.textContent = "";
    if (name) sp.appendChild(el("b", "speech-name", name));
    var p = el("p", "speech-text"); sp.appendChild(p);
    var tail = el("span", "speech-extra");
    if (kind === "kilitli") tail.textContent = "Bu konuda bir şey söylemiyor. Elinde bir kanıt olunca tekrar sor.";
    if (hint) tail.textContent = hint;
    if (!animate) { p.textContent = text; if (tail.textContent) sp.appendChild(tail); return; }
    var i = 0;
    sp._full = function () { clearInterval(typer); typer = null; p.textContent = text; if (tail.textContent && !tail.parentNode) sp.appendChild(tail); };
    typer = setInterval(function () {
      i += 2;
      p.textContent = text.slice(0, i);
      if (i >= text.length) sp._full();
    }, 28);
  }
  function finishTyping() { var sp = $("speech"); if (sp && sp._full) sp._full(); }

  // Şüpheli konuşur: yazı akar, dudaklar oynar, sesli konuşma açıksa okur.
  function say(text, kind, hint) {
    var ch = CASE.characters[current];
    showSpeech(ch.short, text, kind, hint, true);
    Ses.blip();
    var spoke = Ses.speak(text, CASE.looks[current].voice, function () { if (seat) seat.classList.remove("talking"); });
    if (spoke && seat) { clearTimeout(seat._talkTimer); seat.classList.add("talking"); }
    else Portre.talk(seat, text);
  }

  function renderChips() {
    var box = $("chips"); box.textContent = "";
    if (!current) return;
    game.suggestions(current).forEach(function (q) { box.appendChild(btn("chip", q, function () { send(q); })); });
  }

  function slip(text, cls) {
    var box = $("slips"); if (!box) return;
    var s = el("div", "slip " + (cls || ""), text);
    box.appendChild(s);
    setTimeout(function () { s.classList.add("out"); }, 3600);
    setTimeout(function () { s.remove(); }, 4200);
  }

  function respond(userMsg, action) {
    if (busy) return;
    busy = true;
    var cid = current;
    var docsBefore = game.documents().length, puzBefore = game.puzzles().length;
    log(cid).push(userMsg);
    showMine(userMsg);
    Ses.hush();
    var room = $("room"); room.classList.add("thinking");
    showSpeech(CASE.characters[cid].short, "...", "waiting");
    var res = action();
    save();
    var wait = 500 + Math.random() * 500 + Math.min(1200, res.text.length * 7);
    setTimeout(function () {
      busy = false;
      room.classList.remove("thinking");
      if (cid !== current) return;
      log(cid).push({ who: "them", text: res.text, kind: res.kind === "kilitli" ? "kilitli" : "", hint: res.hint || null });
      say(res.text, res.kind === "kilitli" ? "kilitli" : "", res.hint);
      announce(res.gained, docsBefore, puzBefore);
      if (res.kind === "bitti") timeOver();
    }, wait);
  }

  function announce(gained, docsBefore, puzBefore) {
    var buzz = false;
    (gained || []).forEach(function (fid) {
      var f = game.facts[fid];
      var isLink = f.type === "celiski" || f.type === "cikarim";
      var label = isLink ? TYPE_NAMES[f.type] + ": " : f.type === "iddia" ? "Söylenti: " : "Not alındı: ";
      if (current) log(current).push({ who: "note", cls: isLink ? "link" : "gain", text: label + f.title });
      slip(label + f.title, isLink ? "link" : f.type === "iddia" ? "rumor" : "");
      if (isLink) { toast(TYPE_NAMES[f.type], f.title); buzz = true; }
    });
    game.documents().slice(docsBefore).forEach(function (d) { toast("Yeni belge", d.title); slip("Yeni belge: " + d.title); });
    game.puzzles().slice(puzBefore).forEach(function (z) { toast("Yeni bulmaca", z.def.title); slip("Yeni bulmaca: " + z.def.title); });
    if (buzz && navigator.vibrate) navigator.vibrate([30, 40, 30]);
    save();
    renderChips(); renderSuspects(); renderStats(); renderNotebook();
    if ((gained || []).length) markMobileDot(true);
  }

  function send(text) {
    text = (text || "").trim();
    if (!text || !current) return;
    $("input").value = "";
    Ses.unlock();
    respond({ who: "me", text: text }, function () { return game.ask(current, text); });
  }

  function timeOver() {
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Süre doldu"));
      b.appendChild(el("h2", null, CASE.clock.over));
      b.appendChild(el("p", null, "Bu seviyede süre dolunca dosya kapanır. Son bir suçlama yapabilir ya da baştan başlayabilirsin."));
      var act = el("div", "modal-actions");
      act.appendChild(btn("btn ghost", "Baştan başla", function () { closeModal(); reset(true); }));
      act.appendChild(btn("btn accent", "Suçla", function () { closeModal(); openAccuse(); }));
      b.appendChild(act);
    });
  }

  /* ---------- tutanak ---------- */
  function bubble(m, cid) {
    var ch = CASE.characters[cid];
    if (m.who === "note") return el("div", "note " + (m.cls || ""), m.text);
    var row = el("div", "row " + m.who);
    if (m.who === "them") row.appendChild(face(cid, 30, "mini"));
    var d = el("div", "msg " + m.who + (m.kind ? " " + m.kind : "") + (m.show ? " show" : ""));
    d.appendChild(el("span", "who", m.who === "me" ? (m.show ? "Kanıt gösterdin" : "Sen") : ch.short));
    if (m.who === "them") d.style.setProperty("--c", ch.color);
    d.appendChild(document.createTextNode(m.text));
    row.appendChild(d);
    return row;
  }
  function openTranscript() {
    if (!current) return;
    var ch = CASE.characters[current];
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Sorgu tutanağı"));
      b.appendChild(el("h2", null, ch.name));
      var box = el("div", "chat-log transcript");
      log(current).forEach(function (m) { box.appendChild(bubble(m, current)); });
      b.appendChild(box);
      setTimeout(function () { var c = $("modal").querySelector(".modal-card"); c.scrollTop = c.scrollHeight; }, 0);
    });
  }

  /* ---------- defter ---------- */
  function factCard(fid, opts) {
    var f = game.facts[fid], pick = opts && opts.pick;
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
    var seenDocs = game.s.seenDocs || [], docs = game.documents(), puz = game.puzzles();
    freshCounts.belge = docs.filter(function (d) { return seenDocs.indexOf(d.id) < 0; }).length +
      puz.filter(function (z) { return !z.solved; }).length;
    document.querySelectorAll("#nbTabs .tab").forEach(function (b) {
      var k = b.dataset.tab;
      b.classList.toggle("active", k === tab);
      var old = b.querySelector(".badge"); if (old) old.remove();
      if (freshCounts[k] && k !== tab) b.appendChild(el("span", "badge", String(freshCounts[k])));
    });

    if (tab === "belge") {
      puz.forEach(function (z) {
        var c = el("button", "doc-card puzzle-card" + (z.solved ? " solved" : " unseen"));
        c.type = "button";
        c.appendChild(icon(z.solved ? "unlock" : z.def.kind === "kasa" ? "safe" : "puzzle"));
        var t = el("span"); t.appendChild(el("b", null, z.def.title)); t.appendChild(el("small", null, z.solved ? "Açıldı" : "Kilitli · " + (z.def.kind === "kasa" ? "şifreyi bul" : "parçaları birleştir")));
        c.appendChild(t);
        c.onclick = function () { openPuzzle(z.def); };
        list.appendChild(c);
      });
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
        ? "Henüz bağlantı yok. Birbirini tutmayan iki ifade ya da birbirini tamamlayan iki bilgi bulduğunda burada görünür."
        : "Henüz bir şey yok. Şüphelileri sorgula."));
    }
    items.forEach(function (fid) { list.appendChild(factCard(fid)); });
  }
  function clearFresh(tb) {
    game.s.fresh = game.s.fresh.filter(function (fid) { return TAB_OF[game.facts[fid].type] !== tb; });
    save();
  }

  /* ---------- bulmacalar ---------- */
  function openPuzzle(z) {
    var solved = (game.s.solvedPuzzles || {})[z.id];
    openModal(function (b) {
      b.appendChild(el("div", "kicker", z.kind === "kasa" ? "Kasa" : "Bulmaca"));
      b.appendChild(el("h2", null, z.title));
      b.appendChild(el("p", "hint", z.sub));
      b.appendChild(el("p", null, solved ? z.solved : z.desc));
      if (z.kind === "kasa") buildSafe(b, z, solved);
      else buildJigsaw(b, z, solved);
    });
  }

  function puzzleSolved(z, res) {
    var docsBefore = game.documents().length;
    announce(res.gained, docsBefore - (res.gained.length ? 1 : 0), game.puzzles().length);
    toast("Açıldı", z.solved);
    setTimeout(function () {
      closeModal();
      var d = game.documents().filter(function (x) { return (z.gives || []).indexOf(x.unlock) >= 0; })[0];
      if (d) openDoc(d);
    }, 1100);
  }

  function buildSafe(b, z, solved) {
    var wrap = el("div", "safe" + (solved ? " open" : ""));
    var screen = el("div", "safe-screen", solved ? "AÇIK" : "_".repeat(z.digits || 4));
    wrap.appendChild(screen);
    var code = "";
    function show() { screen.textContent = (code + "____").slice(0, z.digits || 4).split("").join(" "); }
    if (!solved) {
      show();
      var pad = el("div", "safe-pad");
      "123456789".split("").concat(["Sil", "0", "Aç"]).forEach(function (k) {
        pad.appendChild(btn("key" + (k === "Aç" ? " go" : ""), k, function () {
          if (k === "Sil") code = code.slice(0, -1);
          else if (k === "Aç") {
            var res = game.solvePuzzle(z.id, code);
            save(); renderStats();
            if (res.ok) { wrap.classList.add("open"); screen.textContent = "AÇIK"; puzzleSolved(z, res); }
            else {
              wrap.classList.remove("shake"); void wrap.offsetWidth; wrap.classList.add("shake");
              screen.textContent = "HATALI"; code = "";
              if (navigator.vibrate) navigator.vibrate(120);
              setTimeout(show, 900);
            }
            return;
          } else if (code.length < (z.digits || 4)) code += k;
          show();
        }));
      });
      wrap.appendChild(pad);
    }
    b.appendChild(wrap);
    var tries = (game.s.tries || {})[z.id];
    if (tries && !solved) b.appendChild(el("p", "hint", tries + " yanlış deneme. Her deneme saati 2 dakika ilerletir."));
  }

  // Not kâğıdını SVG olarak çizer; yapboz parçaları bunun dörtte birini gösterir.
  function noteSvg(lines) {
    var t = lines.map(function (l, i) {
      var y = 95 + i * 78;
      return '<text x="30" y="' + y + '" font-family="Caveat, cursive" font-size="' + (i === 2 ? 38 : 32) + '" fill="' + (i === lines.length - 1 ? "#a8323f" : "#1f2f5c") + '">' + l.replace(/&/g, "&amp;").replace(/</g, "&lt;") + '</text>';
    }).join("");
    return '<rect width="400" height="400" fill="#fffdf5"/>' +
      '<path d="M0 105h400M0 183h400M0 261h400M0 339h400" stroke="#c8d6e5"/><path d="M40 0v400" stroke="#e3a1a8"/>' + t;
  }
  function buildJigsaw(b, z, solved) {
    var grid = el("div", "jigsaw" + (solved ? " done" : ""));
    var rot = (game.s.jig && game.s.jig[z.id]) || [90, 270, 0, 180];
    var inner = noteSvg(z.lines);
    [[0, 0], [200, 0], [0, 200], [200, 200]].forEach(function (o, i) {
      var piece = el("button", "piece"); piece.type = "button";
      piece.innerHTML = '<svg viewBox="' + o[0] + " " + o[1] + ' 200 200">' + inner + "</svg>";
      piece.style.transform = "rotate(" + (solved ? 0 : rot[i]) + "deg)";
      if (!solved) piece.onclick = function () {
        rot[i] = (rot[i] + 90) % 360;
        piece.style.transform = "rotate(" + rot[i] + "deg)";
        game.s.jig = game.s.jig || {}; game.s.jig[z.id] = rot; save();
        if (rot.every(function (r) { return r === 0; })) {
          var res = game.solvePuzzle(z.id, true);
          save();
          grid.classList.add("done");
          puzzleSolved(z, res);
        }
      };
      grid.appendChild(piece);
    });
    b.appendChild(grid);
    if (!solved) b.appendChild(el("p", "hint", "Bir parçaya dokununca 90 derece döner."));
  }

  /* ---------- Komiser'e danış ---------- */
  function openHint() {
    if (!game) return;
    if (game.rules.chips === 0 && CASE.difficulty === "zor") { toast("Komiser", "Bu seviyede Komiser yardım etmiyor."); return; }
    openModal(function (b) {
      var head = el("div", "komiser");
      head.appendChild(Portre.portrait(KOMISER, 64));
      var t = el("div");
      t.appendChild(el("div", "kicker", "Komiser Rıza"));
      t.appendChild(el("h2", null, "Takıldın mı?"));
      head.appendChild(t);
      b.appendChild(head);
      var p = el("p", null, "Sana bir yön gösterebilirim ama cevabı söylemem. Her danışma puanından düşer" + (CASE.clock ? " ve saati " + (CASE.clock.perHint || 10) + " dakika ilerletir." : "."));
      b.appendChild(p);
      if (game.s.hints) b.appendChild(el("p", "hint", "Şimdiye kadar " + game.s.hints + " kez danıştın."));
      var out = el("div", "komiser-say"); b.appendChild(out);
      var act = el("div", "modal-actions");
      var ask = btn("btn primary", "Bir ipucu ver", function () {
        var h = game.hint();
        save(); renderStats();
        out.textContent = h.text; out.classList.add("in");
        ask.disabled = true;
        if (Ses.voiceOn()) Ses.speak(h.text, { pitch: 0.8, rate: 0.95 });
      });
      act.appendChild(btn("btn ghost", "Vazgeç", closeModal));
      act.appendChild(ask);
      b.appendChild(act);
    });
  }

  /* ---------- modal ---------- */
  function openModal(build, onClose, wide) {
    var body = $("modalBody"); body.textContent = "";
    var card = $("modal").querySelector(".modal-card");
    card.classList.toggle("wide", !!wide);
    build(body);
    $("modal").hidden = false;
    $("modal")._onClose = onClose;
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
      if (CASE.clock) {
        var g = el("p", "goal"); g.appendChild(icon("clock")); g.appendChild(document.createTextNode(CASE.clock.goal + " Saat şimdi " + game.clock().text + "."));
        b.appendChild(g);
      }
      b.appendChild(el("h3", null, "Şüpheliler"));
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
      if (game.rules.maxAccuse) ol.appendChild(el("li", null, "Bu seviyede yalnızca " + game.rules.maxAccuse + " suçlama hakkın var."));
      var r = myRank();
      if (r.perk) ol.appendChild(el("li", null, "Rütben " + r.label + ": " + r.perk));
      b.appendChild(ol);
      var act = el("div", "modal-actions");
      var pdf = el("a", "btn ghost", "Yazdır (PDF)"); pdf.href = pdfUrl(CASE); pdf.target = "_blank"; pdf.rel = "noopener";
      act.appendChild(pdf);
      act.appendChild(btn("btn primary", game.s.started ? "Soruşturmaya dön" : "Başla", closeModal));
      b.appendChild(act);
    }, function () { game.s.started = true; save(); Ses.unlock(); });
  }

  function openShow() {
    if (!current) return;
    var ch = CASE.characters[current];
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Kanıt göster · " + ch.name));
      b.appendChild(el("h2", null, "Masaya ne koyacaksın?"));
      b.appendChild(el("p", "hint", "Defterindeki herhangi bir bilgiyi gösterebilirsin. Bir yalanı ortaya çıkaran şey, kilitli bir konuyu açabilir."));
      var grid = el("div", "ev-grid"); grid.style.marginTop = "16px";
      game.s.known.slice().reverse().forEach(function (fid) {
        var c = factCard(fid, { pick: true });
        c.tabIndex = 0;
        c.onclick = function () {
          closeModal();
          var f = game.facts[fid];
          respond({ who: "me", show: true, title: f.title, text: f.title + ": " + f.text }, function () { return game.show(current, fid); });
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
        ? "Yanlış bir suçlama oyunu bitirmez ama savcı dosyayı geri çevirir ve puanın düşer."
        : "Kalan suçlama hakkın: " + left + ". Hakkın biterse dosya kapanır."));
      b.appendChild(el("h3", null, "1. Katil"));
      var g1 = el("div", "pick-grid");
      Object.keys(CASE.characters).forEach(function (cid) {
        var o = el("button", "option"); o.type = "button";
        o.appendChild(face(cid, 40)); o.appendChild(el("span", null, CASE.characters[cid].name));
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
      b.appendChild(el("h3", null, "3. En güçlü kanıtların (en fazla 3)"));
      var g3 = el("div", "ev-grid");
      game.s.known.slice().reverse().forEach(function (fid) {
        var c = factCard(fid, { pick: true });
        c.onclick = function () {
          var i = pick.ev.indexOf(fid);
          if (i >= 0) pick.ev.splice(i, 1); else if (pick.ev.length < 3) pick.ev.push(fid);
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
    var ev = null, newBadges = [], rankBefore = myRank(), rankAfter = rankBefore;
    if (res.win) {
      ev = game.evaluate();
      var p = profile(), prev = p.cases[CASE.id] || { badges: [], stars: 0, score: 0 };
      newBadges = ev.badges.filter(function (x) { return prev.badges.indexOf(x) < 0; });
      p.cases[CASE.id] = {
        stars: Math.max(prev.stars, ev.stars), score: Math.max(prev.score, ev.score),
        badges: prev.badges.concat(newBadges), questions: ev.questions
      };
      saveProfile(p);
      rankAfter = myRank();
    }
    openModal(function (b) {
      b.appendChild(el("div", "kicker", res.win ? "Dava kapandı" : "Savcılık"));
      b.appendChild(el("h2", null, res.ending.title));
      if (res.win) {
        var sc = el("div", "score");
        sc.appendChild(el("span", "stars", stars(ev.stars)));
        sc.appendChild(el("b", null, ev.score + " puan"));
        sc.appendChild(el("small", null, ev.questions + " soru · " + ev.hints + " ipucu · " + ev.accusations + " suçlama" + (ev.clock ? " · saat " + ev.clock.text : "")));
        b.appendChild(sc);
        if (ev.badges.length) {
          var bl = el("div", "badges");
          ev.badges.forEach(function (id) {
            var x = el("div", "badge-item" + (newBadges.indexOf(id) >= 0 ? " new" : ""));
            x.appendChild(icon("badge"));
            var t = el("div"); t.appendChild(el("b", null, M.BADGES[id].label)); t.appendChild(el("small", null, M.BADGES[id].desc)); x.appendChild(t);
            bl.appendChild(x);
          });
          b.appendChild(bl);
        }
        if (rankAfter.label !== rankBefore.label) {
          var up = el("div", "rank-up");
          up.appendChild(el("b", null, "Terfi! Yeni rütben: " + rankAfter.label));
          if (rankAfter.perk) up.appendChild(el("span", null, rankAfter.perk));
          b.appendChild(up);
        }
      }
      res.ending.text.forEach(function (p) { if (p) b.appendChild(el("p", null, p)); });
      if (!res.win && game.accusationsLeft() != null && !res.over) b.appendChild(el("p", "hint", "Kalan suçlama hakkı: " + game.accusationsLeft()));
      var act = el("div", "modal-actions");
      if (res.win) {
        act.appendChild(btn("btn ghost", "Paylaş", function () { share(ev); }));
        act.appendChild(btn("btn primary", "Vakalara dön", function () { closeModal(); showHome(); }));
      } else if (res.over) {
        act.appendChild(btn("btn ghost", "Baştan oyna", function () { closeModal(); reset(true); }));
        act.appendChild(btn("btn primary", "Kapat", closeModal));
      } else {
        act.appendChild(btn("btn primary", "Soruşturmaya dön", closeModal));
      }
      b.appendChild(act);
    });
  }

  /* ---------- paylaşım (çözümü ele vermez) ---------- */
  function shareText(ev) {
    var lines = [
      "Sorgu Odası: " + CASE.title + " (" + game.rules.label + ")",
      stars(ev.stars) + " " + ev.questions + " soruda çözdüm" + (ev.hints ? ", " + ev.hints + " ipucuyla" : ", ipucusuz") + ".",
      "Rütbem: " + myRank().label,
      "Sen kaç soruda çözersin? " + SITE
    ];
    return lines.join("\n");
  }
  function share(ev) {
    var text = shareText(ev);
    if (navigator.share) { navigator.share({ title: "Sorgu Odası", text: text }).catch(function () { /* vazgeçildi */ }); return; }
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Paylaş"));
      b.appendChild(el("h2", null, "Arkadaşına meydan oku"));
      var pre = el("pre", "share-text", text); b.appendChild(pre);
      var act = el("div", "modal-actions");
      var wa = el("a", "btn ghost", "WhatsApp"); wa.href = "https://wa.me/?text=" + encodeURIComponent(text); wa.target = "_blank"; wa.rel = "noopener";
      act.appendChild(wa);
      act.appendChild(btn("btn primary", "Kopyala", function () {
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { toast("Kopyalandı", "Metni istediğin yere yapıştırabilirsin."); }, function () { toast("Kopyalanamadı", "Metni elle seçip kopyala."); });
      }));
      b.appendChild(act);
    });
  }

  /* ---------- günün sorgusu ---------- */
  function openDaily() {
    var z = Gunluk.puzzle(), key = Gunluk.today(), p = profile(), done = p.daily[key];
    openModal(function (b) {
      var head = el("div", "komiser");
      head.appendChild(Portre.portrait(z.look, 64));
      var t = el("div"); t.appendChild(el("div", "kicker", "Günün sorgusu · " + z.role)); t.appendChild(el("h2", null, z.who)); head.appendChild(t);
      b.appendChild(head);
      b.appendChild(el("p", null, z.olay));
      var ev = el("div", "card kanit"); ev.appendChild(el("h4", null, "Kanıt")); ev.appendChild(el("p", null, z.kanit)); b.appendChild(ev);
      b.appendChild(el("h3", null, z.who + " diyor ki:"));
      var list = el("div", "opt-list");
      var out = el("div", "daily-out");
      z.ifadeler.forEach(function (s, i) {
        var o = btn("option", s, function () {
          if (profile().daily[key]) return;
          var ok = i === z.yalan;
          var pr = profile(); pr.daily[key] = { ok: ok }; saveProfile(pr);
          reveal(i);
          renderDailyCard();
        });
        list.appendChild(o);
      });
      b.appendChild(list);
      b.appendChild(out);
      b.appendChild(el("p", "hint", "Hangisi yalan? Tek hakkın var."));
      function reveal(chosen) {
        list.querySelectorAll(".option").forEach(function (o, i) {
          o.disabled = true;
          if (i === z.yalan) o.classList.add("right");
          else if (i === chosen) o.classList.add("wrong");
        });
        out.textContent = "";
        out.appendChild(el("b", null, chosen === z.yalan ? "Doğru! " : "Olmadı. "));
        out.appendChild(document.createTextNode(z.neden));
        var s = profile(); var streak = dailyStreak(s);
        if (chosen === z.yalan && streak > 1) out.appendChild(el("span", "streak", " " + streak + " gün üst üste!"));
      }
      if (done) reveal(done.ok ? z.yalan : (z.yalan + 1) % 3);
    });
  }

  function reset(force) {
    if (!force && !confirm("Bu vakadaki tüm ilerleme silinsin ve baştan başlansın mı?")) return;
    try { localStorage.removeItem(saveKey(CASE)); } catch (e) { /* yok say */ }
    openCase(CASE, true);
  }

  /* ---------- bildirim / görünüm ---------- */
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
  $("btnHome").appendChild(icon("menu"));
  $("btnReset").appendChild(icon("reset"));
  document.addEventListener("pointerdown", function () { Ses.unlock(); }, { once: true });

  /* ---------- uygulama olarak yükleme ve çevrimdışı ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* yok say */ });
  }
  var installEvent = null;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); installEvent = e; $("installBox").hidden = false; });
  $("btnInstall").onclick = function () { if (installEvent) { installEvent.prompt(); installEvent = null; $("installBox").hidden = true; } };
  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (!standalone && /iphone|ipad|ipod/i.test(navigator.userAgent)) $("iosHint").hidden = false;

  CASES.sort(function (a, b) { return LEVEL_ORDER[a.difficulty] - LEVEL_ORDER[b.difficulty]; });
  var want = new URLSearchParams(location.search).get("vaka");
  try { want = want || localStorage.getItem("dedektif:son"); } catch (e) { /* yok say */ }
  var found = CASES.filter(function (c) { return c.id === want; })[0];
  if (found) openCase(found); else showHome();
})();
