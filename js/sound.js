/*
 * Ses: ortam sesi (yağmur ve gök gürültüsü, tren) ve şüphelilerin sesli konuşması.
 * Ses dosyası kullanılmaz; hepsi tarayıcıda üretilir.
 */
(function (root) {
  "use strict";

  var ctx = null, master = null, running = null, timers = [];
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("dedektif:" + k); return v == null ? d : v === "1"; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("dedektif:" + k, v ? "1" : "0"); } catch (e) { /* yok say */ } }
  };

  function audio() {
    if (!ctx) {
      var AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noiseBuffer(seconds, brown) {
    var len = ctx.sampleRate * seconds, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    return buf;
  }
  function loopNoise(brown, filterType, freq, gain, q) {
    var src = ctx.createBufferSource(); src.buffer = noiseBuffer(3, brown); src.loop = true;
    var f = ctx.createBiquadFilter(); f.type = filterType; f.frequency.value = freq; if (q) f.Q.value = q;
    var g = ctx.createGain(); g.gain.value = 0;
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 2);
    src.connect(f); f.connect(g); g.connect(master); src.start();
    return { src: src, gain: g };
  }
  function burst(freq, type, peak, attack, decay, brown) {
    var src = ctx.createBufferSource(); src.buffer = noiseBuffer(attack + decay + 0.1, brown);
    var f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
    var g = ctx.createGain(), t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    src.connect(f); f.connect(g); g.connect(master); src.start(); src.stop(t + attack + decay + 0.1);
  }
  function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); }

  var SCENES = {
    yagmur: function () {
      var nodes = [loopNoise(false, "lowpass", 2600, 0.07), loopNoise(true, "lowpass", 400, 0.12)];
      (function thunder() {
        later(function () { burst(140, "lowpass", 0.9, 0.25, 3.5, true); thunder(); }, 18000 + Math.random() * 30000);
      })();
      return nodes;
    },
    tren: function () {
      var nodes = [loopNoise(true, "lowpass", 160, 0.35), loopNoise(false, "bandpass", 900, 0.015, 0.6)];
      (function clack() {
        burst(2400, "bandpass", 0.18, 0.004, 0.06);
        later(function () { burst(1900, "bandpass", 0.14, 0.004, 0.07); }, 140);
        later(clack, 1050 + Math.random() * 120);
      })();
      return nodes;
    }
  };

  function stopAmbience() {
    timers.forEach(clearTimeout); timers = [];
    if (running) running.forEach(function (n) {
      try { n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); n.src.stop(ctx.currentTime + 0.7); } catch (e) { /* yok say */ }
    });
    running = null;
  }
  function startAmbience(name) {
    stopAmbience();
    if (!name || !SCENES[name] || !audio()) return;
    running = SCENES[name]();
  }

  // Kısa, yumuşak bir "tık" (cevap geldiğinde)
  function blip() {
    if (!ctx || !store.get("ses", false)) return;
    var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    o.frequency.value = 520; o.type = "sine";
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.2);
  }

  /* ---------- Sesli konuşma ---------- */
  var trVoice = null;
  function pickVoice() {
    if (!root.speechSynthesis) return null;
    var vs = root.speechSynthesis.getVoices();
    trVoice = vs.filter(function (v) { return /^tr/i.test(v.lang); })[0] || null;
    return trVoice;
  }
  if (root.speechSynthesis) { pickVoice(); root.speechSynthesis.onvoiceschanged = pickVoice; }
  function canSpeak() { return !!(root.speechSynthesis && (trVoice || pickVoice())); }
  function speak(text, voice, done) {
    if (!store.get("sesli", false) || !canSpeak()) { if (done) done(false); return false; }
    root.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text).replace(/\.\.\./g, ","));
    u.voice = trVoice; u.lang = trVoice.lang;
    u.pitch = (voice && voice.pitch) || 1; u.rate = (voice && voice.rate) || 1;
    u.onend = u.onerror = function () { if (done) done(true); };
    root.speechSynthesis.speak(u);
    return true;
  }
  function hush() { if (root.speechSynthesis) root.speechSynthesis.cancel(); }

  var current = null;
  var api = {
    ambienceOn: function () { return store.get("ses", false); },
    voiceOn: function () { return store.get("sesli", false); },
    canSpeak: canSpeak,
    setAmbience: function (on) { store.set("ses", on); if (on) startAmbience(current); else stopAmbience(); },
    setVoice: function (on) { store.set("sesli", on); if (!on) hush(); },
    scene: function (name) { current = name; if (store.get("ses", false)) startAmbience(name); },
    stop: function () { stopAmbience(); hush(); },
    blip: blip, speak: speak, hush: hush,
    // Tarayıcılar sesi ancak kullanıcı dokunduktan sonra başlatır.
    unlock: function () { if (store.get("ses", false) && !running) startAmbience(current); }
  };
  root.Ses = api;
})(this);
