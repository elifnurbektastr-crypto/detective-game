(function () {
  "use strict";

  var CASE = window.CASE;
  var SAVE_KEY = "dedektif:" + CASE.id + ":v1";
  var TYPE_NAMES = { kanit: "Kanıt", ifade: "İfade", celiski: "Çelişki", cikarim: "Çıkarım" };
  var TAB_OF = { kanit: "kanit", ifade: "ifade", celiski: "bag", cikarim: "bag" };

  var game, current = null, tab = "kanit", busy = false;

  /* ---------- yardımcılar ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function avatar(ch, lg) {
    var a = el("span", "avatar" + (lg ? " lg" : ""), ch.initials);
    a.style.setProperty("--c", ch.color);
    return a;
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(game.s)); } catch (e) { /* gizli mod */ } }
  function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return null; } }
  function log(cid) { return game.s.logs[cid] || (game.s.logs[cid] = []); }

  /* ---------- başlat ---------- */
  function start(fresh) {
    game = new SorguMotoru.Game(CASE, fresh ? null : load());
    current = null;
    $("caseTitle").textContent = CASE.title;
    $("casePlace").textContent = CASE.subtitle + " · " + CASE.place;
    renderSuspects(); renderChat(); renderNotebook(); renderStats();
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
      b.appendChild(avatar(ch));
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
  }

  function select(cid) {
    current = cid;
    var ch = CASE.characters[cid];
    if (!log(cid).length) log(cid).push({ who: "them", text: ch.opening });
    renderSuspects(); renderChat(); setView("sorgu");
    save();
    $("input").focus();
  }

  /* ---------- sorgu ---------- */
  function renderChat() {
    var head = $("chatHead"), box = $("chatLog");
    head.textContent = ""; box.textContent = "";
    var disabled = !current;
    $("input").disabled = disabled; $("btnSend").disabled = disabled; $("btnShow").disabled = disabled;
    if (!current) {
      head.hidden = true;
      var e = el("div", "empty");
      e.appendChild(el("h3", null, "Sorguya başlayın"));
      e.appendChild(el("p", null, "Soldan bir şüpheli seçin ve sorunuzu kendi cümlelerinizle yazın."));
      box.appendChild(e);
      $("chips").textContent = "";
      return;
    }
    head.hidden = false;
    var ch = CASE.characters[current];
    head.appendChild(avatar(ch, true));
    var t = el("div");
    t.appendChild(el("h3", null, ch.name + ", " + ch.age));
    t.appendChild(el("p", null, ch.role + " — " + ch.bio));
    head.appendChild(t);
    log(current).forEach(function (m) { box.appendChild(bubble(m)); });
    box.scrollTop = box.scrollHeight;
    renderChips();
  }

  function bubble(m) {
    var ch = CASE.characters[current];
    if (m.who === "note") return el("div", "note " + (m.cls || ""), m.text);
    var d = el("div", "msg " + m.who + (m.kind ? " " + m.kind : "") + (m.show ? " show" : ""));
    var who = el("span", "who", m.who === "me" ? (m.show ? "Kanıt gösterdiniz" : "Siz") : ch.short);
    if (m.who === "them") d.style.setProperty("--c", ch.color);
    d.appendChild(who);
    d.appendChild(document.createTextNode(m.text));
    return d;
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
    game.suggestions(current, 3).forEach(function (q) {
      var c = el("button", "chip", q); c.type = "button";
      c.onclick = function () { send(q); };
      box.appendChild(c);
    });
  }

  function respond(userMsg, action) {
    if (busy) return;
    busy = true;
    var cid = current;
    push(userMsg);
    var box = $("chatLog");
    var typing = el("div", "typing"); typing.innerHTML = "<i></i><i></i><i></i>";
    box.appendChild(typing); box.scrollTop = box.scrollHeight;
    var res = action();
    save();
    setTimeout(function () {
      typing.remove();
      busy = false;
      if (cid !== current) return;
      push({ who: "them", text: res.text, kind: res.kind === "kilitli" ? "kilitli" : "" });
      res.gained.forEach(function (fid) {
        var f = game.facts[fid];
        var isLink = f.type === "celiski" || f.type === "cikarim";
        push({ who: "note", cls: isLink ? "link" : "gain", text: (isLink ? "⚡ " + TYPE_NAMES[f.type] + ": " : "📓 Deftere eklendi: ") + f.title });
        if (isLink) toast(TYPE_NAMES[f.type], f.title);
      });
      save();
      renderChips(); renderSuspects(); renderStats(); renderNotebook();
      if (res.gained.length) markMobileDot(true);
    }, 350 + Math.min(900, res.text.length * 6));
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
    var c = el("div", "card " + f.type + (opts && opts.pick ? " pick" : ""));
    if (game.s.fresh.indexOf(fid) >= 0 && !(opts && opts.pick)) c.appendChild(el("span", "tag", "yeni"));
    else if (f.type === "celiski" || f.type === "cikarim") c.appendChild(el("span", "tag", TYPE_NAMES[f.type]));
    c.appendChild(el("h4", null, f.title));
    c.appendChild(el("p", null, f.text));
    if (f.source) c.appendChild(el("span", "src", "Kaynak: " + f.source));
    return c;
  }

  function renderNotebook() {
    var list = $("nbList"); list.textContent = "";
    var counts = { kanit: 0, ifade: 0, bag: 0 }, freshCounts = { kanit: 0, ifade: 0, bag: 0 };
    var items = game.s.known.slice().reverse().filter(function (fid) {
      var tb = TAB_OF[game.facts[fid].type];
      counts[tb]++;
      if (game.s.fresh.indexOf(fid) >= 0) freshCounts[tb]++;
      return tb === tab;
    });
    document.querySelectorAll("#nbTabs .tab").forEach(function (b) {
      var k = b.dataset.tab;
      b.classList.toggle("active", k === tab);
      var old = b.querySelector(".badge"); if (old) old.remove();
      if (freshCounts[k] && k !== tab) b.appendChild(el("span", "badge", String(freshCounts[k])));
    });
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
  function openModal(build, onClose) {
    var body = $("modalBody"); body.textContent = "";
    build(body);
    $("modal").hidden = false;
    $("modal")._onClose = onClose;
    $("modal").querySelector(".modal-card").scrollTop = 0;
    $("modalClose").focus();
  }
  function closeModal() {
    $("modal").hidden = true;
    var cb = $("modal")._onClose; $("modal")._onClose = null;
    if (cb) cb();
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
        var it = el("div", "cast-item"); it.appendChild(avatar(ch));
        var t = el("div"); t.appendChild(el("b", null, ch.name)); t.appendChild(document.createTextNode(ch.role + ". " + ch.bio));
        it.appendChild(t); cast.appendChild(it);
      });
      b.appendChild(cast);
      b.appendChild(el("h3", null, "Nasıl oynanır"));
      var ol = el("ol");
      CASE.howto.forEach(function (h) { ol.appendChild(el("li", null, h)); });
      b.appendChild(ol);
      var act = el("div", "modal-actions");
      var go = el("button", "btn primary", game.s.started ? "Soruşturmaya dön" : "Soruşturmaya başla");
      go.type = "button"; go.onclick = closeModal;
      act.appendChild(go); b.appendChild(act);
    }, function () { game.s.started = true; save(); });
  }

  function openShow() {
    if (!current) return;
    var ch = CASE.characters[current];
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Kanıt göster · " + ch.name));
      b.appendChild(el("h2", null, "Ne göstereceksiniz?"));
      b.appendChild(el("p", "hint", "Defterdeki herhangi bir bilgiyi gösterebilirsiniz. Bir yalanı ortaya çıkaran bilgi, kilitli bir konuyu açabilir."));
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
    openModal(function (b) {
      b.appendChild(el("div", "kicker", "Suçlama"));
      b.appendChild(el("h2", null, "Selim Karahan'ı kim öldürdü?"));
      b.appendChild(el("p", "hint", "Yanlış bir suçlama oyunu bitirmez ama savcı her seferinde dosyanızı geri çevirir."));

      b.appendChild(el("h3", null, "1. Katil"));
      var g1 = el("div", "pick-grid");
      Object.keys(CASE.characters).forEach(function (cid) {
        var ch = CASE.characters[cid];
        var o = el("button", "option"); o.type = "button";
        o.appendChild(avatar(ch)); o.appendChild(el("span", null, ch.name));
        o.onclick = function () { pick.killer = cid; mark(g1, o); check(); };
        g1.appendChild(o);
      });
      b.appendChild(g1);

      b.appendChild(el("h3", null, "2. Sebep"));
      var g2 = el("div", "opt-list");
      CASE.motives.forEach(function (m) {
        var o = el("button", "option", m.label); o.type = "button";
        o.onclick = function () { pick.motive = m.id; mark(g2, o); check(); };
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
      var cancel = el("button", "btn ghost", "Vazgeç"); cancel.type = "button"; cancel.onclick = closeModal;
      var go = el("button", "btn accent", "Suçla"); go.type = "button"; go.disabled = true;
      go.onclick = function () { closeModal(); result(game.accuse(pick.killer, pick.motive, pick.ev)); save(); renderStats(); };
      act.appendChild(cancel); act.appendChild(go); b.appendChild(act);

      function mark(group, o) { group.querySelectorAll(".option").forEach(function (x) { x.classList.toggle("selected", x === o); }); }
      function check() { go.disabled = !(pick.killer && pick.motive && pick.ev.length); }
    });
  }

  function result(res) {
    openModal(function (b) {
      b.appendChild(el("div", "kicker", res.win ? "Dava kapandı" : "Savcılık"));
      b.appendChild(el("h2", null, res.ending.title));
      res.ending.text.forEach(function (p) { b.appendChild(el("p", null, p)); });
      if (res.win) {
        b.appendChild(el("p", "hint", game.s.questions + " soru, " + game.s.accusations + " suçlama" + (res.perfect ? " · Kusursuz dosya!" : "")));
      }
      var act = el("div", "modal-actions");
      if (res.win) {
        var again = el("button", "btn ghost", "Baştan oyna"); again.type = "button";
        again.onclick = function () { closeModal(); reset(true); };
        act.appendChild(again);
      }
      var back = el("button", "btn primary", res.win ? "Kapat" : "Soruşturmaya dön"); back.type = "button";
      back.onclick = closeModal;
      act.appendChild(back); b.appendChild(act);
    });
  }

  function reset(force) {
    if (!force && !confirm("Tüm ilerleme silinsin ve oyun baştan başlasın mı?")) return;
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* yok say */ }
    start(true);
  }

  /* ---------- bildirim / mobil ---------- */
  function toast(kind, text) {
    var t = el("div", "toast"); t.appendChild(el("b", null, kind)); t.appendChild(document.createTextNode(text));
    $("toasts").appendChild(t);
    setTimeout(function () { t.remove(); }, 3800);
  }
  function setView(v) {
    $("layout").dataset.view = v;
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
  $("modalClose").onclick = closeModal;
  $("modal").onclick = function (e) { if (e.target === $("modal")) closeModal(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("modal").hidden) closeModal(); });
  document.querySelectorAll("#nbTabs .tab").forEach(function (b) {
    b.onclick = function () { clearFresh(tab); tab = b.dataset.tab; renderNotebook(); };
  });
  document.querySelectorAll("#mobileNav button").forEach(function (b) {
    b.onclick = function () { setView(b.dataset.view); };
  });

  start(false);
})();
