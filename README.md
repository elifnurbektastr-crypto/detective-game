# Sorgu Odası

Türkçe bir dedektiflik oyunu. Bir cinayet işlenmiş ve şüpheliler var. Onlara aklınıza gelen soruları yazarak sorarsınız, yalanlarını yakalarsınız, belgeleri incelersiniz ve sonunda katili bulursunuz.

Oyna: https://elifnurbektastr-crypto.github.io/detective-game/

Telefonda açıp ana ekrana eklerseniz uygulama gibi çalışır, internet yokken de açılır.

## Vakalar

- Son Hasat (orta): Bozcaada'da fırtınalı bir hasat gecesi, mahzende bulunan bir ceset. [Yazdırılabilir dosya](pdf/son-hasat.pdf)
- Kolay ve zor vakalar yolda.

Seviyelerin farkı:

- Kolay: önerilen sorular var, kilitli konularda ne bulmanız gerektiği söylenir.
- Orta: önerilen sorular var, gerisi size kalmış.
- Zor: öneri yok, sadece 3 suçlama hakkınız var.

## Nasıl oynanır

- Bir şüpheli seçip sorunuzu yazın. "O gece neredeydin", "kim peki", "neden?" gibi kısa sorular da anlaşılır.
- Şüpheli bir şeyi bilmiyorsa ya da söylemek istemiyorsa lafı başka yere çeker, bazen de başkası hakkında bir şey anlatır. Bunlar deftere söylenti olarak düşer. İlgili kişiye sorarak doğru olup olmadığını anlarsınız.
- Bazı konularda şüpheli ancak elinizde bir kanıt olunca konuşur. Defterdeki bir bilgiyi "Kanıt göster" ile ona gösterebilirsiniz.
- İki ifade birbirini tutmazsa defterinize çelişki olarak düşer.
- Belgeler bölümünde otopsi raporu, olay yeri krokisi ve deliller var.
- Hazır olunca katili, sebebini ve en güçlü kanıtlarınızı seçip suçlayın.

## Kâğıt üzerinde oynamak

Her vaka yazdırılabilir bir dosya olarak da var: kapak, kurallar, üç zarf (belgeler ve sorgu tutanakları), çalışma sayfası, suçlama formu ve en sonda kapalı çözüm sayfası. Zarflar arası geçiş için her zarfın sonunda bir soru var.

Dosyayı yeniden üretmek için: `npm run pdf` (Edge veya Chrome gerekir).

## Geliştirme

```
index.html, print.html   oyun ve yazdırılabilir dosya
cases/                   vakalar (hikâye, sorular, belgeler; çözümü içerir)
js/engine.js             soru eşleştirme ve oyun kuralları
js/ui.js                 arayüz
js/portrait.js           karakter çizimleri
js/docs.js, js/print.js  belgeler ve yazdırılabilir dosya
sw.js                    çevrimdışı çalışma
tests/                   npm test
```

Yeni vaka eklemek için `cases/son-hasat.js` dosyasını kopyalayıp değiştirin, sonra `index.html` ve `print.html` dosyalarına bir `<script>` satırı ekleyin. `npm test` vakanın baştan sona çözülebildiğini kontrol eder.
