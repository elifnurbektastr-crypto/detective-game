# Sorgu Odası: Yapay zekâsız dedektiflik oyunu

Tarayıcıda çalışan, yapay zekâ kullanmayan Türkçe bir sorgu oyunu. Şüphelileri **kendi cümlelerinizle** sorgular, yalanlarını yakalar, belgeleri inceler ve katili bulursunuz. Her vaka ayrıca **yazdırılabilir bir PDF seti** olarak da oynanabilir.

**Oyna:** https://elifnurbektastr-crypto.github.io/detective-game/

## Vakalar

| Seviye | Vaka | Durum |
|---|---|---|
| Kolay | — | Yakında |
| Orta | **Son Hasat: Ayazma Bağevi Cinayeti** | Oynanabilir · [PDF seti](pdf/son-hasat.pdf) |
| Zor | — | Yakında |

Seviye kuralları (`js/engine.js` → `DIFFICULTY`):

| | Önerilen soru | Kilitte ipucu | Kazanmak için güçlü kanıt | Suçlama hakkı |
|---|---|---|---|---|
| Kolay | 4 | Evet | 1 | Sınırsız |
| Orta | 3 | Hayır | 2 | Sınırsız |
| Zor | Yok | Hayır | 3 | 3 |

## Oyunun özellikleri

- **Serbest soru:** Soru normalleştirilir (Türkçe küçük harf, `ç→c`, `ı→i`) ve şüphelinin konularıyla anahtar kelime üzerinden eşleştirilir. Kelimenin başı eşleştiği için `nerede` kelimesi `neredeydiniz` ve `nerdeydin` sorularını da yakalar.
- **Kaçamak cevaplar:** Şüpheli soruyu bilmiyorsa “şuna sorun” demez, bildiği bir şeyi söyler. Örneğin: *“Bilmiyorum. Ama amcam yemekten çıkarken babama ‘Bu bağ seni de gömecek’ dedi.”* Bu bilgi deftere **iddia** olarak düşer. İlgili kişiden doğrulanınca “✓ Teyit edildi” olur.
- **Kilitli konular:** Bazı konular defterde belirli bilgiler olmadan açılmaz. Yalan söyleyen birine çelişkiyi gösterdiğinizde konuşmaya başlar.
- **Çelişki ve çıkarım:** İki bilgi bir araya gelince kendiliğinden oluşur. Çürütülen ifadelerin üstü çizilir.
- **Belgeler:** Adli tıp raporu (yaraların işaretlendiği vücut şeması), olay yeri krokisi ve delil çizimleri. Bazı belgeler soruşturma ilerledikçe açılır.
- **Portreler:** Şüpheliler kodla çizilmiştir (SVG). Konuşurken ağızları hareket eder, ara sıra göz kırparlar.

## Yazdırılabilir set (PDF)

`print.html?vaka=son-hasat` sayfası vakayı kâğıt üzerinde oynanabilir bir sete çevirir. Set şunlardan oluşur:

- kapak, kurallar ve şüpheli profilleri
- 3 zarf: her zarfta belgeler ve hazır soru-cevap sorgu tutanakları bulunur, sonunda bir sonraki zarfı açmak için bir geçiş sorusu vardır
- zaman çizelgesi çalışma sayfası ve suçlama formu
- ters çevrilmiş geçiş cevapları
- en sonda “mühürlü” çözüm sayfası

PDF'i yeniden üretmek için (Edge veya Chrome gerekir):

```
npm run pdf
```

## Dosyalar

```
index.html            oyun (ana ekran + sorgu)
print.html            yazdırılabilir set
cases/son-hasat.js    VAKA VERİSİ: hikâye, konular, belgeler, PDF zarfları (spoiler içerir)
js/engine.js          sorgu motoru ve zorluk kuralları (Node'da da çalışır)
js/portrait.js        SVG portreler + konuşma animasyonu
js/docs.js            otopsi raporu, kroki/delil ve not belgeleri; tutanak çözümleyici
js/ui.js              oyun arayüzü
js/print.js           PDF setini oluşturur
tools/build-pdf.js    print.html → pdf/<vaka>.pdf
tests/story.test.js   vakanın çözülebilir ve tutarlı olduğunu test eder (npm test)
```

## Yeni vaka eklemek

1. `cases/son-hasat.js` dosyasını kopyalayın, örneğin `cases/yeni-vaka.js`. `id`, `difficulty` (`kolay` / `orta` / `zor`) ve hikâyeyi değiştirin.
2. `index.html` ve `print.html` dosyalarına `<script src="cases/yeni-vaka.js"></script>` satırını ekleyin.
3. `npm test` ile vakanın çözülebildiğini kontrol edin (testin başındaki `require` satırını yeni vakaya çevirin), ardından `npm run pdf` ile PDF'i üretin.

Bir konunun yapısı:

```js
{ id: "nerede", ask: "O gece neredeydiniz?", v: [
  { a: "Odamdaydım, uyudum.", gives: ["i_defne_oda"] },                       // ilk (yalan) cevap
  { req: ["c_defne"], a: "Tamam… iskeledeydim.", gives: ["i_defne_iskele"] }   // çelişki bulununca
] }
```

- `v`: cevap varyantları. Koşulu (`req` = hepsi, `any` = biri) sağlanan **en son** varyant kullanılır. Hiçbiri sağlanmazsa konu kilitlidir.
- `deflect`: kaçamak cevaplar. `gives` ile bir iddia ya da bilgi verir. `until` verilirse o bilgi bulunduktan sonra tekrar kullanılmaz.
- `facts`: `type` değeri `kanit`, `ifade` ya da `iddia` olabilir. İddialarda `confirm: [...]` teyit eden bilgileri, ifadelerde `deny: [...]` çürüten çelişkileri gösterir.
- `links`: iki bilgiden kendiliğinden doğan çelişki ve çıkarımlar.
- `looks`, `autopsy`, `documents`, `print`: portreler, otopsi raporu, belgeler ve PDF zarfları.
