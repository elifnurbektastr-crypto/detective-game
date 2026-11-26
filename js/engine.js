/*
 * Sorgu motoru — yapay zeka kullanmaz.
 *
 * Akış:
 *  1. Oyuncunun sorusu normalleştirilir (Türkçe küçük harf, ç→c, ı→i …, noktalama atılır).
 *  2. Şüphelinin her konusu (topic) anahtar kelime gruplarıyla puanlanır.
 *     Bir konunun tüm grupları eşleşmelidir; en çok grubu eşleşen konu kazanır.
 *  3. Konunun "varyantları" vardır. Gereken bilgiler (req / any) defterde olan
 *     en son varyant seçilir. Hiçbiri açık değilse konu KİLİTLİDİR: şüpheli kaçamak cevap verir.
 *  4. Hiçbir konu eşleşmezse şüpheli bir YÖNLENDİRME cevabı verir. Önce oyuncunun
 *     henüz bulmadığı bir bilgiye işaret eden yönlendirmeler seçilir.
 *  5. Cevaplar defterine bilgi ekleyebilir; iki bilgi bir araya gelince
 *     çelişki / çıkarım kendiliğinden oluşur.
 */
(function (root) {
  "use strict";

  var FOLD = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };

  function norm(s) {
    return String(s || "")
      .toLocaleLowerCase("tr")
      .replace(/̇/g, "")
      .replace(/[’'`´]/g, "")
      .replace(/[çğıöşüâîû]/g, function (c) { return FOLD[c]; })
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function compileGroups(groups) {
    return groups.map(function (g) {
      return g.split("|").map(function (alt) {
        alt = alt.trim();
        if (alt.charAt(0) === "=") return { t: "exact", v: norm(alt.slice(1)) };
        var v = norm(alt);
        return { t: v.indexOf(" ") >= 0 ? "phrase" : "prefix", v: v };
      }).filter(function (a) { return a.v; });
    });
  }

  // Grubun sorudaki hangi kelimeleri karşıladığını `covered` kümesine yazar.
  // Dönüş: grup eşleşti mi. (Aynı kelime birden çok alternatife uysa da bir kez sayılır.)
  function groupHits(alts, tokens, covered) {
    var any = false;
    for (var i = 0; i < alts.length; i++) {
      var a = alts[i];
      if (a.t === "phrase") {
        var words = a.v.split(" ");
        for (var s = 0; s + words.length <= tokens.length; s++) {
          var ok = true;
          for (var w = 0; w < words.length && ok; w++) {
            ok = w === words.length - 1 ? tokens[s + w].indexOf(words[w]) === 0 : tokens[s + w] === words[w];
          }
          if (ok) { any = true; for (w = 0; w < words.length; w++) covered[s + w] = 1; }
        }
      } else {
        for (var j = 0; j < tokens.length; j++) {
          if (a.t === "exact" ? tokens[j] === a.v : tokens[j].indexOf(a.v) === 0) { any = true; covered[j] = 1; }
        }
      }
    }
    return any;
  }

  function freshState() {
    return { known: [], fresh: [], seen: {}, rot: {}, used: {}, logs: {}, questions: 0, accusations: 0, solved: null, started: false };
  }

  function Game(data, saved) {
    this.d = data;
    this.facts = {};
    var self = this;
    Object.keys(data.facts).forEach(function (id) { self.facts[id] = data.facts[id]; });
    data.links.forEach(function (l) { self.facts[l.id] = { type: l.type, title: l.title, text: l.text, when: l.when }; });
    this._build();
    this.s = saved && saved.known ? saved : freshState();
    if (!saved || !saved.known) this.add(data.startFacts, true);
  }

  Game.prototype._topic = function (t, fallbackKeys) {
    var keyDef = this.d.keys[t.id] || {};
    var groups = t.k || fallbackKeys || keyDef.k;
    if (!groups) throw new Error("Konu için anahtar yok: " + t.id);
    var variants = t.v || [{ a: t.a, gives: t.gives, req: t.req, any: t.any }];
    return {
      id: t.id, ask: t.ask, locked: t.locked,
      p: t.p != null ? t.p : (keyDef.p || 0),
      groups: compileGroups(groups), variants: variants
    };
  };

  Game.prototype._build = function () {
    var self = this, d = this.d;
    this.topics = {};
    this.shows = {};
    Object.keys(d.characters).forEach(function (cid) {
      var ch = d.characters[cid];
      var list = (ch.topics || []).map(function (t) { return self._topic(t); });
      Object.keys(ch.about || {}).forEach(function (pid) {
        var person = d.people[pid];
        if (!person) throw new Error("Bilinmeyen kişi: " + pid);
        var keys = person.aliases + (ch.alias && ch.alias[pid] ? "|" + ch.alias[pid] : "");
        var a = ch.about[pid];
        var t = typeof a === "string" ? { a: a } : a;
        t.id = "hakkinda_" + pid;
        list.push(self._topic(t, [keys]));
        list[list.length - 1].p = t.p != null ? t.p : 1;
      });
      self.topics[cid] = list;
      self.shows[cid] = {};
      Object.keys(ch.show || {}).forEach(function (fid) {
        var r = ch.show[fid];
        var t = typeof r === "string" ? { a: r } : r;
        t.id = "goster_" + fid;
        self.shows[cid][fid] = self._topic(t, [fid]);
      });
    });
  };

  Game.prototype.has = function (id) { return this.s.known.indexOf(id) >= 0; };

  Game.prototype._ok = function (v) {
    var self = this;
    return (v.req || []).every(function (r) { return self.has(r); }) &&
      (!v.any || v.any.some(function (r) { return self.has(r); }));
  };

  Game.prototype._variant = function (t) {
    var idx = -1;
    for (var i = 0; i < t.variants.length; i++) if (this._ok(t.variants[i])) idx = i;
    return idx;
  };

  // Yeni bilgileri deftere ekler, tetiklenen çelişki/çıkarımları da ekler.
  Game.prototype.add = function (ids, silent) {
    var self = this, added = [];
    (ids || []).forEach(function (id) {
      if (!self.facts[id]) throw new Error("Bilinmeyen bilgi: " + id);
      if (!self.has(id)) { self.s.known.push(id); added.push(id); }
    });
    var changed = added.length > 0;
    while (changed) {
      changed = false;
      self.d.links.forEach(function (l) {
        if (!self.has(l.id) && l.when.every(function (w) { return self.has(w); })) {
          self.s.known.push(l.id); added.push(l.id); changed = true;
        }
      });
    }
    if (!silent) self.s.fresh = self.s.fresh.concat(added);
    return added;
  };

  Game.prototype._rot = function (key, arr) {
    var i = this.s.rot[key] || 0;
    this.s.rot[key] = i + 1;
    return arr[i % arr.length];
  };

  Game.prototype._respond = function (cid, t) {
    var ch = this.d.characters[cid];
    var idx = this._variant(t);
    if (idx < 0) {
      return { kind: "kilitli", topic: t.id, text: t.locked || this._rot(cid + ":kilit", ch.locked), gained: [] };
    }
    var v = t.variants[idx];
    var seen = this.s.seen[cid] || (this.s.seen[cid] = {});
    var key = t.id + "#" + idx;
    var repeat = !!seen[key];
    seen[key] = (seen[key] || 0) + 1;
    var text = repeat && ch.repeat ? this._rot(cid + ":tekrar", ch.repeat) + " " + v.a : v.a;
    return { kind: repeat ? "tekrar" : "cevap", topic: t.id, text: text, gained: this.add(v.gives) };
  };

  // En iyi eşleşen konuyu döndürür (test ve hata ayıklama için de kullanılır).
  Game.prototype.match = function (cid, text) {
    var n = norm(text);
    if (!n) return null;
    var tokens = n.split(" ");
    var best = null, bestScore = 0, self = this;
    // Puan: önce eşleşen grup sayısı, sonra karşılanan kelime sayısı, sonra öncelik.
    this.topics[cid].forEach(function (t) {
      var covered = {};
      for (var i = 0; i < t.groups.length; i++) if (!groupHits(t.groups[i], tokens, covered)) return;
      var hits = Object.keys(covered).length;
      var score = t.groups.length * 100 + hits * 10 + t.p + (self._variant(t) >= 0 ? 0.5 : 0);
      if (score > bestScore) { best = t; bestScore = score; }
    });
    return best;
  };

  Game.prototype._deflect = function (cid) {
    var ch = this.d.characters[cid], self = this;
    var used = this.s.used[cid] || (this.s.used[cid] = {});
    var pool = ch.deflect.map(function (d, i) { return { d: d, i: i }; })
      .filter(function (x) { return !x.d.until || !self.has(x.d.until); });
    // Az kullanılan; eşitlikte henüz bulunmamış bir bilgiye işaret eden önce gelir.
    pool.sort(function (a, b) {
      var ua = used[a.i] || 0, ub = used[b.i] || 0;
      if (ua !== ub) return ua - ub;
      return (b.d.until ? 1 : 0) - (a.d.until ? 1 : 0);
    });
    var pick = pool[0];
    used[pick.i] = (used[pick.i] || 0) + 1;
    return { kind: "yonlendirme", topic: null, text: pick.d.a, gained: this.add(pick.d.gives) };
  };

  Game.prototype.ask = function (cid, text) {
    this.s.questions++;
    var t = this.match(cid, text);
    return t ? this._respond(cid, t) : this._deflect(cid);
  };

  Game.prototype.show = function (cid, fid) {
    this.s.questions++;
    var t = this.shows[cid][fid];
    if (t) return this._respond(cid, t);
    var ch = this.d.characters[cid];
    return { kind: "yonlendirme", topic: null, text: this._rot(cid + ":goster", ch.noShow), gained: [] };
  };

  // Henüz sorulmamış, şu an açık konulardan örnek sorular.
  Game.prototype.suggestions = function (cid, max) {
    var self = this, seen = this.s.seen[cid] || {}, out = [];
    this.topics[cid].forEach(function (t) {
      if (!t.ask || out.length >= (max || 3)) return;
      var idx = self._variant(t);
      if (idx >= 0 && !seen[t.id + "#" + idx]) out.push(t.ask);
    });
    return out;
  };

  Game.prototype.accuse = function (killer, motive, evidence) {
    var sol = this.d.solution;
    this.s.accusations++;
    var strong = (evidence || []).filter(function (e) { return sol.strong.indexOf(e) >= 0; }).length;
    var res;
    if (killer !== sol.killer) res = { win: false, ending: this.d.endings.wrong[killer] };
    else if (motive !== sol.motive) res = { win: false, ending: this.d.endings.wrongMotive };
    else if (strong < sol.minStrong) res = { win: false, ending: this.d.endings.weak };
    else res = { win: true, ending: this.d.endings.win, perfect: strong >= sol.strong.length / 2 };
    res.strong = strong;
    if (res.win) this.s.solved = { at: Date.now(), questions: this.s.questions, accusations: this.s.accusations };
    return res;
  };

  var api = { Game: Game, norm: norm };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SorguMotoru = api;
})(this);
