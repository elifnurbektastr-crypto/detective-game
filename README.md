# Sorgu Odası

Türkçe bir dedektiflik oyunu. Bir cinayet işlenmiş ve şüpheliler var. Sorgu odasında onların karşısına oturur, aklına gelen soruları sorar, yalanlarını yakalar, belgeleri incelersin ve sonunda katili bulursun.

Oyna: https://elifnurbektastr-crypto.github.io/detective-game/

Telefonda açıp ana ekrana eklersen uygulama gibi çalışır, internet yokken de açılır.

## Vakalar

- Gece Treni (kolay, 10-15 dk): Kars'a giden gece treninde zehirlenen bir antikacı. [Yazdırılabilir dosya](pdf/gece-treni.pdf)
- Son Hasat (orta, 60-90 dk): Bozcaada'da fırtınalı bir hasat gecesi, mahzende bulunan bir ceset. [Yazdırılabilir dosya](pdf/son-hasat.pdf)
- Zor vaka yolda.

Seviyelerin farkı:

- Kolay: önerilen sorular var, kilitli konularda ne bulman gerektiği söylenir.
- Orta: önerilen sorular var, gerisi sana kalmış.
- Zor: öneri ve ipucu yok, 3 suçlama hakkın var, süre dolunca dosya kapanır.

## Neler var

- Sorgu odası: şüpheli masanın karşısında oturur, konuşurken dudakları oynar. İstersen cevapları sesli okur, arkada yağmur ya da tren sesi çalar.
- Serbest soru: "O gece neredeydin", "kim peki", "neden?" gibi sorular anlaşılır. Şüpheli bilmediği bir şeyi sorunca lafı başka yere çeker, bazen de başkası hakkında bir şey anlatır. Bunlar deftere söylenti olarak düşer, o kişiye sorarak doğrularsın.
- Kanıt göster: defterdeki bir bilgiyi şüpheliye gösterirsin. Yalan yakalayınca kilitli konular açılır.
- Belgeler ve bulmacalar: otopsi raporu, olay yeri krokisi, deliller. Şifresi ipuçlarından bulunan bir kasa, parçaları birleştirilen yırtık bir not.
- Saat: her soru oyundaki saati ilerletir. Tren varmadan, feribot kalkmadan çözmen gerekir.
- Komiser'e danış: takılınca bir yön gösterir, ama puanından düşer.
- Puan, rozet ve rütbe: Stajyer'den Emniyet Amiri'ne. Yüksek rütbede sorular daha kısa sürer.
- Paylaşım: çözünce sonucu çözümü ele vermeden arkadaşına gönderebilirsin.
- Günün sorgusu: her gün bir kişi, bir kanıt ve üç cümle. Biri yalan.

## Kâğıt üzerinde oynamak

Her vaka yazdırılabilir bir dosya olarak da var: kapak, kurallar, zarflar (belgeler, sorgu tutanakları, bulmacalar), çalışma sayfası, suçlama formu ve en sonda kapalı çözüm sayfası.

Dosyaları yeniden üretmek için: `npm run pdf` (Edge veya Chrome gerekir).

## Geliştirme

```
index.html, print.html   oyun ve yazdırılabilir dosya
cases/                   vakalar (hikâye, sorular, belgeler, bulmacalar; çözümü içerir)
js/engine.js             soru eşleştirme, saat, ipucu, puan ve rozetler
js/ui.js                 arayüz ve sorgu odası
js/portrait.js           karakter çizimleri
js/sound.js              ortam sesi ve sesli konuşma
js/daily.js              günün sorgusu
js/docs.js, js/print.js  belgeler ve yazdırılabilir dosya
sw.js                    çevrimdışı çalışma
tests/                   npm test
```

Yeni vaka eklemek için `cases/` altındaki bir vakayı kopyalayıp değiştir, sonra `index.html` ve `print.html` dosyalarına bir `<script>` satırı ekle. `npm test` vakanın baştan sona çözülebildiğini kontrol eder.
