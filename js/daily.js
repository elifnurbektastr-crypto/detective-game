/*
 * Günün sorgusu: her gün bir kişi, bir kanıt ve üç cümle. Biri yalan.
 * Bulmaca tarihe göre seçilir, herkes aynı gün aynı bulmacayı görür.
 */
(function (root) {
  "use strict";

  var POOL = [
    {
      who: "Kerem", role: "Fırıncı", look: { skin: "#dcae8a", hair: "#2a1d16", style: "kivircik", clothes: "#c9a25a", bg: "#2e271c", stubble: true },
      olay: "Gece yarısı karşıdaki kuyumcunun camı kırıldı.",
      kanit: "Kerem'in fırınının kepengi sabah 04:00'te açılmış. Fırının bacası o saatten önce tütmemiş.",
      ifadeler: ["Her sabahki gibi 04:00'te fırını açtım.", "Gece 02:00'den beri fırının içindeydim, hamur yoğuruyordum.", "Cam kırılma sesini duymadım, fırının motoru çok gürültülü."],
      yalan: 1, neden: "Kepenk 04:00'te açılmış ve baca o saatten önce tütmemiş. Gece 02:00'den beri içeride olamaz."
    },
    {
      who: "Melek", role: "Apartman yöneticisi", look: { skin: "#e6bfa3", hair: "#6b3a1e", style: "topuz", clothes: "#3f6b55", bg: "#1f2c26", earrings: true },
      olay: "Apartmanın aidat kasasından para eksik çıktı.",
      kanit: "Kasa defterine son kaydı mavi tükenmez kalemle biri atmış. Melek'in çantasından yalnızca kırmızı kalem çıktı.",
      ifadeler: ["Kasaya en son geçen hafta ben baktım.", "Deftere ben hep kırmızı kalemle yazarım.", "Son kaydı ben attım, dün akşam."],
      yalan: 2, neden: "Son kayıt mavi kalemle atılmış, Melek ise hep kırmızı kullanıyor. Son kaydı o atmış olamaz."
    },
    {
      who: "Selçuk", role: "Bekçi", look: { skin: "#c98f6c", hair: "#8d8780", style: "kel", clothes: "#27384f", bg: "#1b2433", mustache: true, lines: true },
      olay: "Fabrikanın deposundan gece bakır kablolar çalındı.",
      kanit: "Gece 01:00 ile 03:00 arasında yağmur yağmış. Selçuk'un montu ve botları kupkuru.",
      ifadeler: ["Gece boyunca deponun çevresinde üç tur attım.", "Saat 01:00'den sonra kulübemden hiç çıkmadım.", "Kamyon sesi duymadım."],
      yalan: 0, neden: "Yağmur yağarken üç tur atan birinin montu ıslanırdı. Selçuk tur atmamış, kulübede oturmuş."
    },
    {
      who: "Aslı", role: "Garson", look: { skin: "#e9c2a6", hair: "#2b1a14", style: "uzun", clothes: "#7d2b33", bg: "#3a2326", lips: "#b4505a" },
      olay: "Restoranda bir müşterinin cüzdanı kayboldu.",
      kanit: "Kamera kaydında 7 numaralı masaya 21:40'ta bir garson yaklaşıyor. Aslı'nın vardiyası 21:00'de bitmiş, kartını 21:05'te basmış.",
      ifadeler: ["Vardiyam 21:00'de bitti, 21:05'te çıktım.", "7 numaralı masaya bütün akşam ben baktım.", "Cüzdanı hiç görmedim."],
      yalan: 1, neden: "Aslı 21:05'te çıkmış. 21:40'ta masaya yaklaşan garson o olamaz, demek ki bütün akşam o masaya o bakmadı."
    },
    {
      who: "Orhan", role: "Taksi şoförü", look: { skin: "#d9a982", hair: "#3a2a20", style: "yana", clothes: "#3c5577", bg: "#1d2635", mustache: true },
      olay: "Bir yolcu, taksiden indikten sonra dizüstü bilgisayarını unuttuğunu söylüyor.",
      kanit: "Taksimetre kaydına göre yolculuk 14 dakika sürmüş, 6 kilometre. Orhan'ın telefonunda o saatlerde 20 dakikalık bir arama var.",
      ifadeler: ["Yolcuyu havalimanından aldım, şehir merkezine bıraktım.", "Yolculuk boyunca telefonla hiç konuşmadım.", "Arka koltukta bir şey kalmadı, baktım."],
      yalan: 1, neden: "Yolculuk 14 dakika sürmüş ve aynı saatlerde 20 dakikalık bir arama var. Orhan yolda telefonla konuşmuş."
    },
    {
      who: "Nermin", role: "Kütüphaneci", look: { skin: "#d8a888", hair: "#b9b3ab", style: "topuz", clothes: "#6c5a8a", bg: "#26213a", glasses: true, lines: true },
      olay: "Kütüphaneden değerli bir el yazması kayboldu.",
      kanit: "Nadir eserler odasının kapısı yalnızca iki anahtarla açılıyor. Biri müdürde, biri Nermin'de. Müdür bir haftadır yurt dışında.",
      ifadeler: ["Nadir eserler odasına dün hiç girmedim.", "Anahtarım hep çantamda durur, kimseye vermem.", "Oda dün kilitliydi, sabah da kilitliydi."],
      yalan: 0, neden: "Oda kilitliymiş, kapı zorlanmamış. Müdür yurt dışında. Odayı açabilecek tek anahtar Nermin'de."
    },
    {
      who: "Tolga", role: "Kurye", look: { skin: "#dcae8a", hair: "#2a1d16", style: "kivircik", clothes: "#a8323f", bg: "#2a1a1c", stubble: true },
      olay: "Teslim edildiği söylenen bir paket alıcıya ulaşmamış.",
      kanit: "Tolga'nın teslimat fotoğrafında kapının önü kuru. O gün sabahtan akşama kadar şiddetli yağmur yağmış.",
      ifadeler: ["Paketi öğlen bıraktım, fotoğrafını da çektim.", "Kapıyı çaldım, kimse açmadı.", "O gün çok yağmur vardı, iliklerime kadar ıslandım."],
      yalan: 0, neden: "Bütün gün yağmur yağmış ama fotoğrafta kapının önü kuru. Fotoğraf o gün çekilmemiş."
    },
    {
      who: "Gül", role: "Komşu", look: { skin: "#e3bfa3", hair: "#5a2a1e", style: "uzun", clothes: "#4f8a6e", bg: "#1f2c26", earrings: true },
      olay: "Alt kattaki dairede yangın çıktı. Gül her şeyi gördüğünü söylüyor.",
      kanit: "Gül'ün dairesinin pencereleri sokağa bakıyor. Yangın arka bahçeye bakan mutfakta başlamış.",
      ifadeler: ["Dumanı ilk ben fark ettim, itfaiyeyi ben aradım.", "Pencereden mutfakta alevleri gördüm.", "Alt kattaki adam o akşam evde değildi."],
      yalan: 1, neden: "Gül'ün pencereleri sokağa bakıyor, mutfak ise arka bahçeye. Mutfaktaki alevleri pencereden göremez."
    },
    {
      who: "Hakan", role: "Otopark görevlisi", look: { skin: "#cf9a78", hair: "#3a2a20", style: "yana", clothes: "#2f2a3d", bg: "#26213a" },
      olay: "Otoparktaki bir arabanın aynası kırıldı.",
      kanit: "Otoparkın bariyer kaydı: gece 23:00 ile 06:00 arasında hiçbir araç girmemiş ya da çıkmamış. Araba sabah 07:30'da hasarlı bulundu.",
      ifadeler: ["Gece 02:00'de beyaz bir araç girdi, aynaya sürttü ve çıktı.", "Bütün gece kulübedeydim.", "Sabah 07:00'de nöbeti devrettim."],
      yalan: 0, neden: "Bariyer kaydına göre gece hiçbir araç girip çıkmamış. Hakan'ın anlattığı beyaz araç uydurma."
    },
    {
      who: "Zeynep", role: "Laboratuvar asistanı", look: { skin: "#e9c2a6", hair: "#2a1d16", style: "uzun", clothes: "#efe6d2", bg: "#2b2a2a", glasses: true },
      olay: "Laboratuvardaki bir deneyin bütün örnekleri bozulmuş.",
      kanit: "Örnekler 4 derecede saklanmalı. Dolabın ısı kaydı gece 01:00'de 20 dereceye çıkmış. Dolap yalnızca kartla açılıyor; Zeynep'in kartı 00:55'te okutulmuş.",
      ifadeler: ["Gece yarısından sonra laboratuvara hiç gelmedim.", "Dolabın kapısını hep sıkıca kapatırım.", "Deney benim için çok önemliydi."],
      yalan: 0, neden: "Zeynep'in kartı 00:55'te okutulmuş, beş dakika sonra da dolabın ısısı yükselmiş. Gece yarısından sonra oradaydı."
    }
  ];

  function todayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function puzzleFor(d) {
    d = d || new Date();
    var day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
    return POOL[day % POOL.length];
  }

  var api = { POOL: POOL, today: todayKey, puzzle: puzzleFor };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Gunluk = api;
})(this);
