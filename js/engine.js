/*
 * Sorgu motoru.
 *
 * Akış:
 *  1. Oyuncunun sorusu normalleştirilir (Türkçe küçük harf, ç→c, ı→i, noktalama atılır).
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

  /* Ortak konu anahtarları. Vaka dosyasındaki "keys" bunlara eklenir ya da bunları ezer.
   * "a|b|c" alternatiflerdir, kelimenin başı eşleşir; "=" tam kelime; boşluklu olan ifade olarak aranır. */
  var DEFAULT_KEYS = {
    selam: { k: ["=merhaba|=selam|selamlar|iyi aksamlar|iyi gunler|gunaydin|=slm|=mrb|=hey"], p: -1 },
    tesekkur: { k: ["tesekkur|=sagol|=sagolun|sagolasin|eyvallah|=mersi"], p: -1 },
    kim: { k: ["kimsin|kimsiniz|kendin|kendini|kendinizi|tanit|meslek|ne is yap|isin ne|isiniz ne|ne yaparsin|ne yaparsiniz|gorevin|gorevini"], p: 0 },
    nerede: { k: ["nerede|nerde|ne yapiyordu|ne yaptin|ne yaptiniz|mazeret|alibi|=23|saat"], p: 0 },
    gordun: { k: ["gordu|gordun|gorme|duydu|duydun|duyma|fark et|garip|tuhaf|dikkat|ilginc|sasirt"], p: 0 },
    katil: { k: ["katil|kim oldurdu|kim oldurmus|kim yapt|kim yapmis|kimden suphe|suphelen|suphe et|suphe ed|sence kim|sizce kim|kim olabilir|kimin isi"], p: 3 },
    sucla: { k: ["oldurdun|oldurdunuz|sen mi|siz mi|sen misin|siz misiniz|senin isin|sizin isiniz|sen yaptin|siz yaptiniz|suclu musun|suclu musunuz|itiraf"], p: 4 },
    nasil: { k: ["nasil oldu|nasil ol|olum|olmus|kaza|nasil gitti|nasil oldurul"], p: 2 },
    elektrik: { k: ["elektrik|karanlik|isiklar|isik|kesinti|kesil|jenerator|sondu|sonunce|mum"], p: 1 },
    tartisma: { k: ["tartis|kavga|bagird|bagiri|yemek|sofra|tehdit|aksam"], p: 1 },
    vasiyet: { k: ["vasiyet|miras|vakif|vakfa|tapu|mal varlig"], p: 2 },
    hesap: { k: ["hesap|para|parayi|zimmet|denetci|denetim|muhasebe|milyon|kasa|fatura|ihracat"], p: 2 },
    borc: { k: ["borc|kredi|alacakli|iflas|galeri|batmak|batiyor"], p: 2 },
    birlikte: { k: ["iliski|sevgili|sevgilin|ask|asik|birlikte|beraber|nisan|evlen|aranizda|kiminle|kimle|yanindaki|yanindaydi|iskele|deniz|sahil|kayik"], p: 2 },
    lab: { k: ["laboratuvar|=lab|labda|labdan|tank|ferment|fermant|alarm|defter|kayit"], p: 2 },
    oda: { k: ["odan|odasi|odaniz|odanda|odasinda|odanizda|odaya|=oda|uyu|yatak|ihlamur"], p: 1 },
    merdiven: { k: ["merdiven|siluet|golge|birini gor|kimi gor|biri gec|uzun boylu"], p: 2 },
    koku: { k: ["kolonya|lavanta|koku|kokuyor|parfum|esans"], p: 2 },
    dugme: { k: ["dugme|kol dugme|gumus|=mo"], p: 2 },
    arazi: { k: ["arazi|toprak|sinir|kuyu|su hakk|tarla|komsu bag"], p: 2 },
    sise: { k: ["sise|magnum|1987|silah|kirik"], p: 2 },
    ceset: { k: ["ceset|cesed|buldu|bulan|bulmus|buldugunuz|buldugun"], p: 1 },
    ajanda: { k: ["ajanda|not defter|gunluk|calisma oda|evrak|belge|babanin odasi"], p: 2 },
    yalan: { k: ["yalan|dogruyu|inanmiyorum|sakliyor|saklama|sakla|gizliyor|kanit var|emin misin|emin misiniz|bana bak"], p: 1 },
    kovulma: { k: ["kovul|kovdu|kovma|isten cik|isten at|bavul|isini kayb"], p: 2 },
    baris: { k: ["oglun|oglunuz|=baris|barisi|barisin|barisa|=oglu"], p: 2 }
  };

  /* Zorluk kuralları. Vaka dosyası "rules" ile bunları ezebilir.
   *  chips      : önerilen soru sayısı (0 = öneri yok)
   *  lockHint   : kilitli konuda neyin eksik olduğunu söyle
   *  minStrong  : kazanmak için gereken güçlü kanıt sayısı
   *  maxAccuse  : en fazla kaç suçlama yapılabilir (null = sınırsız) */
  var DIFFICULTY = {
    kolay: { label: "Kolay", chips: 4, lockHint: true, minStrong: 1, maxAccuse: null, clockHard: false },
    orta: { label: "Orta", chips: 3, lockHint: false, minStrong: 2, maxAccuse: null, clockHard: false },
    zor: { label: "Zor", chips: 0, lockHint: false, minStrong: 3, maxAccuse: 3, clockHard: true }
  };

  function freshState() {
    return { known: [], fresh: [], seen: {}, rot: {}, used: {}, logs: {}, questions: 0, accusations: 0, solved: null, started: false, minutes: 0, hints: 0 };
  }

  function Game(data, saved, opts) {
    this.d = data;
    this.opts = opts || {};
    this.rules = {};
    var base = DIFFICULTY[data.difficulty] || DIFFICULTY.orta, over = data.rules || {};
    Object.keys(base).forEach(function (k) { this.rules[k] = over[k] != null ? over[k] : base[k]; }, this);
    this.keys = {};
    Object.keys(DEFAULT_KEYS).forEach(function (k) { this.keys[k] = DEFAULT_KEYS[k]; }, this);
    Object.keys(data.keys || {}).forEach(function (k) { this.keys[k] = data.keys[k]; }, this);
    this.facts = {};
    var self = this;
    Object.keys(data.facts).forEach(function (id) { self.facts[id] = data.facts[id]; });
    data.links.forEach(function (l) { self.facts[l.id] = { type: l.type, title: l.title, text: l.text, when: l.when }; });
    this._build();
    this.s = saved && saved.known ? saved : freshState();
    if (!saved || !saved.known) this.add(data.startFacts, true);
  }

  Game.prototype._topic = function (t, fallbackKeys) {
    var keyDef = this.keys[t.id] || {};
    var groups = t.k || fallbackKeys || keyDef.k;
    if (!groups) throw new Error("Konu için anahtar yok: " + t.id);
    var variants = t.v || [{ a: t.a, gives: t.gives, req: t.req, any: t.any, f: t.f }];
    if (t.v && t.f) variants.forEach(function (v) { if (!v.f) v.f = t.f; });
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
      var text = t.locked || this._rot(cid + ":kilit", ch.locked);
      return { kind: "kilitli", topic: t.id, text: text, hint: this.rules.lockHint ? this._lockHint(t) : null, gained: [] };
    }
    var v = t.variants[idx];
    var seen = this.s.seen[cid] || (this.s.seen[cid] = {});
    var key = t.id + "#" + idx;
    var times = seen[key] || 0;
    seen[key] = times + 1;
    this.s.last = this.s.last || {};
    this.s.last[cid] = { topic: t.id, idx: idx, isShow: t.id.indexOf("goster_") === 0 };
    if (times === 0) return { kind: "cevap", topic: t.id, text: v.a, gained: this.add(v.gives) };
    // Aynı soru tekrar: önce kısa bir tepki, sonra konuyu değiştirir. Cevap kelimesi kelimesine tekrarlanmaz.
    if (times === 1 || !ch.deflect || !ch.deflect.length) {
      return { kind: "tekrar", topic: t.id, text: this._rot(cid + ":tekrar", ch.repeat || ["Bunu konuştuk."]), gained: [] };
    }
    var d = this._deflect(cid);
    d.kind = "tekrar";
    return d;
  };

  // "Kim peki?", "neden?", "sonra?" gibi kısa devam soruları: son konunun devamı.
  Game.prototype._followUp = function (cid) {
    var last = this.s.last && this.s.last[cid];
    if (!last) return null;
    var t = last.isShow ? this.shows[cid][last.topic.slice(7)] : this.topics[cid].filter(function (x) { return x.id === last.topic; })[0];
    var v = t && t.variants[last.idx];
    if (!v || !v.f) return null;
    var f = typeof v.f === "string" ? { a: v.f } : v.f;
    var seen = this.s.seen[cid] || (this.s.seen[cid] = {});
    var key = t.id + "#" + last.idx + "+devam";
    if (seen[key]) return null;
    seen[key] = 1;
    return { kind: "cevap", topic: t.id, text: f.a, gained: this.add(f.gives) };
  };

  // Kolay seviye: kilidi açmak için en yakın varyantın eksik bilgilerini söyler.
  Game.prototype._lockHint = function (t) {
    var self = this, best = null;
    t.variants.forEach(function (v) {
      var miss = (v.req || []).filter(function (r) { return !self.has(r); });
      if (v.any && !v.any.some(function (r) { return self.has(r); })) miss.push(v.any[0]);
      if (!best || miss.length < best.length) best = miss;
    });
    if (!best || !best.length) return null;
    return "Bu konuyu açmak için şunu bulmalısınız: " + best.map(function (f) { return "'" + self.facts[f].title + "'"; }).join(", ");
  };

  // Bir bilginin durumu: iddialar teyit bekler; çelişkiyle çürütülen ifadeler işaretlenir.
  Game.prototype.status = function (fid) {
    var f = this.facts[fid], self = this;
    function any(list) { return (list || []).filter(function (x) { return self.has(x); })[0]; }
    if (any(f.deny)) return "curutuldu";
    if (any(f.confirm)) return "teyit";
    if (f.type === "iddia") return "bekliyor";
    return null;
  };

  // Açılmış belgeler (otopsi, kroki, deliller)
  Game.prototype.documents = function () {
    var self = this;
    return (this.d.documents || []).filter(function (d) { return !d.unlock || self.has(d.unlock); });
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

  // Tek başına geldiğinde anlamı olmayan, sohbeti sürdüren kelimeler.
  var FILLER = toSet("tamam peki anladim anlasildi hmm hm ok okey evet hayir iyi oyle mi ha haa aa vay ilginc");
  var FOLLOW = toSet("kim kimdi kimi kimden peki neden niye nicin nasil yani mesela ornegin sonra baska daha fazla anlat anlatin " +
    "anlatir anlatsana misin misiniz mi mu ne neydi nedir demek istiyorsun istiyorsunuz ciddi gercekten emin o bu su onu bunu " +
    "ve ya acik ac acar detay ayrinti hangi kimdir nereden niye ki iste olarak boyle bi bir sey " +
    "oldu olmus oluyor etti ettin dedi dedin dediniz yaptin yapti yaptiniz gordun gordunuz");
  function toSet(s) { var o = {}; s.split(" ").forEach(function (w) { o[w] = 1; }); return o; }
  function only(tokens, set) { return tokens.length > 0 && tokens.every(function (w) { return set[w]; }); }

  Game.prototype._tick = function (min) {
    var bonus = this.opts.timeBonus || 0;
    this.s.minutes = (this.s.minutes || 0) + Math.max(1, min - bonus);
  };
  function toMin(hhmm) { var a = hhmm.split(":"); return (+a[0]) * 60 + (+a[1]); }
  // Oyun içi saat: "07:35" gibi.
  Game.prototype.clock = function () {
    var c = this.d.clock; if (!c) return null;
    var t = toMin(c.start) + (this.s.minutes || 0), end = toMin(c.deadline);
    if (end < toMin(c.start)) end += 1440;
    var hh = Math.floor(t / 60) % 24, mm = t % 60;
    return { text: (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm, left: end - t, deadline: c.deadline, goal: c.goal };
  };
  Game.prototype.timeUp = function () { var c = this.clock(); return !!c && c.left <= 0; };
  Game.prototype._timeOver = function () {
    if (!(this.rules.clockHard && this.timeUp())) return null;
    return { kind: "bitti", topic: null, text: this.d.clock.over, gained: [] };
  };

  Game.prototype.ask = function (cid, text) {
    var over = this._timeOver(); if (over) return over;
    this.s.questions++;
    if (this.d.clock) this._tick(this.d.clock.perQuestion || 5);
    var t = this.match(cid, text);
    if (t) return this._respond(cid, t);
    var tokens = norm(text).split(" ").filter(Boolean);
    var ch = this.d.characters[cid];
    if (only(tokens, FILLER) && ch.ack) {
      return { kind: "onay", topic: null, text: this._rot(cid + ":onay", ch.ack), gained: [] };
    }
    if (tokens.length <= 6 && only(tokens, FOLLOW)) {
      var f = this._followUp(cid);
      if (f) return f;
    }
    return this._deflect(cid);
  };

  Game.prototype.show = function (cid, fid) {
    var over = this._timeOver(); if (over) return over;
    this.s.questions++;
    if (this.d.clock) this._tick(this.d.clock.perShow || this.d.clock.perQuestion || 5);
    var t = this.shows[cid][fid];
    if (t) return this._respond(cid, t);
    var ch = this.d.characters[cid];
    return { kind: "yonlendirme", topic: null, text: this._rot(cid + ":goster", ch.noShow), gained: [] };
  };

  // Henüz sorulmamış, şu an açık konulardan örnek sorular.
  Game.prototype.suggestions = function (cid, max) {
    var self = this, seen = this.s.seen[cid] || {}, out = [];
    var limit = max != null ? max : this.rules.chips;
    this.topics[cid].forEach(function (t) {
      if (!t.ask || out.length >= limit) return;
      var idx = self._variant(t);
      if (idx >= 0 && !seen[t.id + "#" + idx]) out.push(t.ask);
    });
    return out;
  };

  Game.prototype.accuse = function (killer, motive, evidence) {
    var sol = this.d.solution;
    if (this.accusationsLeft() === 0) return { win: false, over: true, ending: this.d.endings.over || { title: "Dosya kapandı", text: ["Suçlama hakkınız bitti. Savcılık dosyayı faili meçhul olarak kapattı."] } };
    this.s.accusations++;
    var strong = (evidence || []).filter(function (e) { return sol.strong.indexOf(e) >= 0; }).length;
    var res;
    if (killer !== sol.killer) res = { win: false, ending: this.d.endings.wrong[killer] };
    else if (motive !== sol.motive) res = { win: false, ending: this.d.endings.wrongMotive };
    else if (strong < (sol.minStrong != null ? sol.minStrong : this.rules.minStrong)) res = { win: false, ending: this.d.endings.weak };
    else res = { win: true, ending: this.d.endings.win, perfect: strong >= sol.strong.length / 2 };
    res.strong = strong;
    if (res.win) this.s.solved = { at: Date.now(), questions: this.s.questions, accusations: this.s.accusations };
    return res;
  };

  // Bulmacalar (kasa, yapboz...). unlock bilgisi bulununca görünür olur.
  Game.prototype.puzzles = function () {
    var self = this;
    return (this.d.puzzles || []).filter(function (z) { return !z.unlock || self.has(z.unlock); })
      .map(function (z) { return { def: z, solved: !!(self.s.solvedPuzzles || {})[z.id] }; });
  };
  // Kasa için cevap kontrol edilir; yapboz gibi arayüzde çözülenler için answer === true gönderilir.
  Game.prototype.solvePuzzle = function (id, answer) {
    var z = (this.d.puzzles || []).filter(function (x) { return x.id === id; })[0];
    if (!z) throw new Error("Bilinmeyen bulmaca: " + id);
    this.s.solvedPuzzles = this.s.solvedPuzzles || {};
    if (this.s.solvedPuzzles[id]) return { ok: true, gained: [] };
    var ok = z.code != null ? norm(String(answer)).replace(/ /g, "") === norm(String(z.code)).replace(/ /g, "") : answer === true;
    if (!ok) { this.s.tries = this.s.tries || {}; this.s.tries[id] = (this.s.tries[id] || 0) + 1; if (this.d.clock) this._tick(2); return { ok: false, gained: [] }; }
    this.s.solvedPuzzles[id] = true;
    return { ok: true, gained: this.add(z.gives) };
  };

  // Komiser'e danış: henüz bulunmamış ilk önemli bilgiye doğru bir yön gösterir.
  Game.prototype.hint = function () {
    var self = this, list = this.d.hints || [];
    var h = list.filter(function (x) {
      return !self.has(x.until) && (x.after || []).every(function (a) { return self.has(a); });
    })[0];
    if (!h) return { text: this.d.hintDone || "Elinde yeterince şey var. Artık suçlamayı yapabilirsin.", spent: false };
    this.s.hints = (this.s.hints || 0) + 1;
    if (this.d.clock) this._tick(this.d.clock.perHint || 10);
    return { text: h.text, spent: true };
  };

  // Çözüldükten sonra: puan ve rozetler.
  Game.prototype.evaluate = function () {
    var self = this, s = this.s, d = this.d, badges = [];
    var lies = d.links.filter(function (l) { return l.type === "celiski"; });
    if (s.accusations === 1) badges.push("temiz");
    if (!s.hints) badges.push("ipucusuz");
    if (d.par && s.questions <= d.par) badges.push("hizli");
    if (lies.length && lies.every(function (l) { return self.has(l.id); })) badges.push("yalan");
    if (d.clock && !this.timeUp()) badges.push("saat");
    var score = Math.max(0, 1000 - s.questions * 6 - (s.hints || 0) * 80 - (s.accusations - 1) * 150 - (this.timeUp() ? 150 : 0));
    var stars = score >= 750 ? 3 : score >= 450 ? 2 : 1;
    return { score: score, stars: stars, badges: badges, questions: s.questions, hints: s.hints || 0, accusations: s.accusations, clock: this.clock() };
  };

  Game.prototype.accusationsLeft = function () {
    if (this.s.solved || this.rules.maxAccuse == null) return null;
    return Math.max(0, this.rules.maxAccuse - this.s.accusations);
  };

  var BADGES = {
    temiz: { label: "Temiz dosya", desc: "İlk suçlamada doğru kişiyi buldun." },
    ipucusuz: { label: "Kendi başına", desc: "Komiser'e hiç danışmadın." },
    hizli: { label: "Az soru, çok iş", desc: "Vakayı az soruyla çözdün." },
    yalan: { label: "Yalan avcısı", desc: "Bütün çelişkileri yakaladın." },
    saat: { label: "Zamanında", desc: "Süre dolmadan çözdün." }
  };
  // Rütbe: çözülen vaka ve toplanan rozet sayısına göre.
  var RANKS = [
      { min: 0, label: "Stajyer", timeBonus: 0 },
    { min: 1, label: "Komiser Yardımcısı", timeBonus: 0 },
    { min: 4, label: "Komiser", timeBonus: 1, perk: "Sorular 1 dakika daha kısa sürer." },
    { min: 8, label: "Başkomiser", timeBonus: 2, perk: "Sorular 2 dakika daha kısa sürer." },
    { min: 13, label: "Emniyet Amiri", timeBonus: 3, perk: "Sorular 3 dakika daha kısa sürer." }
  ];
  function rankOf(points) { var r = RANKS[0]; RANKS.forEach(function (x) { if (points >= x.min) r = x; }); return r; }

  var api = { Game: Game, norm: norm, DIFFICULTY: DIFFICULTY, BADGES: BADGES, RANKS: RANKS, rankOf: rankOf };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SorguMotoru = api;
})(this);
