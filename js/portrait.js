/*
 * Şüpheli portreleri: tamamen kodla çizilen SVG.
 * Konuşurken ağız hareket eder (.talking), gözler ara ara kırpılır.
 * look = { skin, hair, style, clothes, bg, glasses, mustache, stubble, earrings, tie, lips, lines }
 * style: "uzun" | "kivircik" | "topuz" | "yana" | "kel"
 */
(function (root) {
  "use strict";

  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.max(0, Math.min(255, (n >> 16) + amt));
    var g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
    var b = Math.max(0, Math.min(255, (n & 255) + amt));
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  var HAIR_BACK = {
    uzun: '<path d="M27 44 Q25 14 50 13 Q75 14 73 44 L76 86 Q63 92 50 90 Q37 92 24 86 Z" fill="H"/>',
    topuz: '<circle cx="50" cy="15" r="9" fill="H"/>',
    kivircik: "", yana: "", kel: ""
  };
  var HAIR_FRONT = {
    uzun: '<path d="M31 46 Q29 19 50 18 Q71 19 69 46 Q66 30 56 27 Q47 32 36 34 Q33 38 31 46 Z" fill="H"/>',
    topuz: '<path d="M31 42 Q31 21 50 21 Q69 21 69 42 Q66 30 50 28 Q34 30 31 42 Z" fill="H"/>' +
      '<path d="M40 24 Q50 22 60 24" stroke="D" stroke-width=".8" fill="none"/>',
    kivircik: '<path d="M31 40 Q30 21 50 20 Q70 21 69 40 Q65 30 50 30 Q35 30 31 40 Z" fill="H"/>' +
      '<circle cx="35" cy="27" r="5" fill="H"/><circle cx="43" cy="22" r="5.5" fill="H"/><circle cx="52" cy="20" r="5.5" fill="H"/>' +
      '<circle cx="61" cy="23" r="5.5" fill="H"/><circle cx="67" cy="30" r="4.5" fill="H"/><circle cx="32" cy="34" r="3.5" fill="H"/>',
    yana: '<path d="M31 41 Q30 21 50 21 Q70 21 69 41 Q68 31 62 28 Q50 25 38 31 Q33 34 31 41 Z" fill="H"/>' +
      '<path d="M38 31 Q48 25 62 28" stroke="D" stroke-width=".7" fill="none"/>',
    kel: '<path d="M31 48 Q29 36 33 30 Q34 40 35 47 Z" fill="H"/><path d="M69 48 Q71 36 67 30 Q66 40 65 47 Z" fill="H"/>' +
      '<path d="M40 25 Q50 22 60 25" stroke="S" stroke-width="1" fill="none" opacity=".5"/>'
  };

  function svg(look, id) {
    var L = look || {};
    var skin = L.skin || "#e0b896", hair = L.hair || "#3a2a20", cl = L.clothes || "#444", bg = L.bg || "#2a2420";
    var skinD = shade(skin, -28), hairD = shade(hair, -30), style = L.style || "yana";
    var fill = function (s) { return s.replace(/="H"/g, '="' + hair + '"').replace(/="D"/g, '="' + hairD + '"').replace(/="S"/g, '="' + skinD + '"'); };
    var lips = L.lips || shade(skin, -55);
    var p = [];
    p.push('<svg class="portrait-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">');
    p.push('<rect width="100" height="100" fill="' + bg + '"/>');
    p.push('<circle cx="50" cy="40" r="38" fill="' + shade(bg, 14) + '"/>');
    p.push(fill(HAIR_BACK[style] || ""));
    // boyun ve omuzlar
    p.push('<path d="M43 60 L57 60 L58 76 L42 76 Z" fill="' + skinD + '"/>');
    p.push('<path d="M8 100 C 10 80, 28 72, 42 71 L50 80 L58 71 C 72 72, 90 80, 92 100 Z" fill="' + cl + '"/>');
    if (L.tie) p.push('<path d="M42 71 L50 80 L58 71 L55 70 L50 75 L45 70 Z" fill="#f1ece4"/><path d="M48 78 L52 78 L54 96 L50 100 L46 96 Z" fill="' + L.tie + '"/>');
    else p.push('<path d="M42 71 L50 80 L58 71" stroke="' + shade(cl, -30) + '" stroke-width="1.5" fill="none"/>');
    // kulaklar, yüz
    p.push('<ellipse cx="31.5" cy="47" rx="3.5" ry="5.5" fill="' + skinD + '"/><ellipse cx="68.5" cy="47" rx="3.5" ry="5.5" fill="' + skinD + '"/>');
    if (L.earrings) p.push('<circle cx="31" cy="54" r="1.6" fill="#e2c46b"/><circle cx="69" cy="54" r="1.6" fill="#e2c46b"/>');
    p.push('<ellipse cx="50" cy="45" rx="18.5" ry="22" fill="' + skin + '"/>');
    if (L.stubble) p.push('<path d="M33 50 Q35 66 50 67 Q65 66 67 50 Q62 62 50 62 Q38 62 33 50 Z" fill="' + hairD + '" opacity=".28"/>');
    if (L.lines) p.push('<path d="M40 34 Q44 33 47 34 M53 34 Q56 33 60 34" stroke="' + skinD + '" stroke-width=".6" fill="none"/>' +
      '<path d="M40 55 Q41 58 43 59 M60 55 Q59 58 57 59" stroke="' + skinD + '" stroke-width=".7" fill="none"/>');
    p.push(fill(HAIR_FRONT[style] || ""));
    // kaşlar
    p.push('<path d="M38 38 Q42 36 46 38" stroke="' + hairD + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>');
    p.push('<path d="M54 38 Q58 36 62 38" stroke="' + hairD + '" stroke-width="1.6" stroke-linecap="round" fill="none"/>');
    // gözler (kırpma animasyonu)
    p.push('<g class="eyes"><ellipse cx="42" cy="44" rx="2.3" ry="2.1" fill="#1d1612"/><ellipse cx="58" cy="44" rx="2.3" ry="2.1" fill="#1d1612"/>' +
      '<circle cx="42.8" cy="43.3" r=".6" fill="#fff"/><circle cx="58.8" cy="43.3" r=".6" fill="#fff"/></g>');
    if (L.glasses) p.push('<g fill="none" stroke="#2b2b2b" stroke-width="1.1"><circle cx="42" cy="44" r="5.6"/><circle cx="58" cy="44" r="5.6"/><path d="M47.6 44 Q50 42.5 52.4 44 M36.4 43 L32 41.5 M63.6 43 L68 41.5"/></g>');
    // burun
    p.push('<path d="M50 46 Q48 52 47 53.5 Q50 55 53 53.5" stroke="' + skinD + '" stroke-width="1" fill="none" stroke-linecap="round"/>');
    // ağız: kapalı çizgi + konuşurken açılan elips
    p.push('<g class="mouth"><path class="mouth-closed" d="M45 59.5 Q50 61 55 59.5" stroke="' + lips + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<ellipse class="mouth-open" cx="50" cy="60" rx="4.2" ry="2.8" fill="#3b1614" stroke="' + lips + '" stroke-width="1"/></g>');
    if (L.mustache) p.push('<path d="M41 57.5 Q45 54 50 56 Q55 54 59 57.5 Q55 58.5 50 57.6 Q45 58.5 41 57.5 Z" fill="' + hair + '"/>');
    p.push('</svg>');
    return p.join("");
  }

  // Bir DOM öğesi döndürür. size: px
  function portrait(look, size, cls) {
    var wrap = document.createElement("span");
    wrap.className = "portrait" + (cls ? " " + cls : "");
    if (size) { wrap.style.width = size + "px"; wrap.style.height = size + "px"; }
    wrap.innerHTML = svg(look);
    return wrap;
  }

  // Metnin uzunluğuna göre bir süre konuşturur.
  function talk(el, text) {
    if (!el) return;
    clearTimeout(el._talkTimer);
    el.classList.add("talking");
    var ms = Math.min(9000, 600 + String(text || "").length * 45);
    el._talkTimer = setTimeout(function () { el.classList.remove("talking"); }, ms);
  }

  var api = { svg: svg, portrait: portrait, talk: talk };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Portre = api;
})(this);
