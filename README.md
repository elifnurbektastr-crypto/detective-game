# Son Hasat: Ayazma Bağevi Cinayeti

Yapay zekâ kullanmayan, tarayıcıda çalışan bir sorgu ve dedektiflik oyunu.

Bozcaada'da fırtınalı bir hasat gecesi bağ sahibi Selim Karahan mahzende ölü bulunur. Adadan kimse ayrılamamıştır ve evdeki beş kişinin her birinin bir sebebi, bir de sırrı vardır. Şüphelileri **kendi cümlelerinizle** sorgular, yalanlarını yakalar, kanıt gösterip kilitli konuları açarsınız. Sonunda katili, sebebini ve en güçlü kanıtlarınızı seçerek suçlamayı yaparsınız.

## Oynamak

`index.html` dosyasını tarayıcıda açmanız yeterli; kurulum ya da sunucu gerekmez. İlerleme tarayıcıya (`localStorage`) kaydedilir.

GitHub Pages ile yayınlamak için: **Settings → Pages → Branch: `main` / root**.

## Nasıl çalışıyor (yapay zekâ olmadan)

| Özellik | Ne yapar |
|---|---|
| **Konu eşleştirme** | Soru normalleştirilir (Türkçe küçük harf, `ç→c`, `ı→i`, noktalama atılır). Her şüphelinin konuları anahtar kelime gruplarıyla puanlanır. Kelimenin başı eşleştiği için `nerede` kelimesi `neredeydiniz` ve `nerdeydin` sorularını da yakalar. |
| **Yönlendirme cevapları** | Hiçbir konu eşleşmezse şüpheli lafı başka yere çeker. Öncelik, oyuncunun henüz bulmadığı bir bilgiye işaret eden yönlendirmelerdedir; örneğin *"Elektrik gidince her odaya mum götürdüm, o sırada gördüklerimi sorun."* |
| **Kilitli konular** | Bir konunun cevabı defterde belirli bilgiler (`req` / `any`) yoksa açılmaz; şüpheli kaçamak cevap verir. Bilgi bulununca aynı soru yeni ve daha dürüst bir cevap alır. |
| **Kanıt göster** | Defterdeki herhangi bir bilgi bir şüpheliye gösterilebilir. Her şüphelinin her kanıta özel bir tepkisi olabilir. |
| **Çelişki ve çıkarım** | Belirli iki bilgi defterde bir araya gelince çelişki ya da çıkarım kendiliğinden oluşur. |

## Dosyalar

```
index.html          sayfa iskeleti
css/style.css       görünüm
js/story.js         VAKA VERİSİ: hikâye, şüpheliler, konular, kanıtlar (spoiler içerir)
js/engine.js        sorgu motoru (arayüzden bağımsız, Node'da da çalışır)
js/ui.js            arayüz
tests/story.test.js hikâyenin çözülebilir olduğunu ve soruların doğru konuya gittiğini test eder
```

## Test

```
npm test
```

Test şunları kontrol eder:

- tüm bilgi referansları tanımlı mı
- her örnek soru ve serbest yazılmış sorular doğru konuya gidiyor mu
- yönlendirmeler ve kilitler çalışıyor mu
- oyun baştan sona çözülebiliyor mu
- her bilgiye ulaşılabiliyor mu

## Yeni vaka yazmak

Motor hikâyeden bağımsızdır; `js/story.js` dosyasını kopyalayıp değiştirmeniz yeterlidir. Bir şüphelinin konusu şöyle görünür:

```js
{ id: "nerede", ask: "O gece neredeydiniz?", v: [
  { a: "Odamdaydım, uyudum.", gives: ["i_defne_oda"] },                 // ilk (yalan) cevap
  { req: ["c_defne"], a: "Tamam… iskeledeydim.", gives: ["i_defne_iskele"] } // çelişki bulununca
] }
```

- `id`: `keys` içindeki ortak anahtar kelimeleri kullanır. Konuya özel anahtar için `k: ["grup1|alternatif", "grup2"]` yazın; bir konunun **tüm** grupları eşleşmelidir.
- `v`: cevap varyantları. Koşulu sağlanan **en son** varyant kullanılır. Hiçbiri sağlanmazsa konu kilitlidir ve `locked` metni gösterilir.
- `gives`: deftere eklenen bilgiler.
- `deflect`: yönlendirme cevapları. `until: "bilgi_id"` verilirse yönlendirme o bilgi bulunana kadar öncelikli kullanılır.
- `show`: şüpheliye bir kanıt gösterildiğinde verdiği tepki.
- `links`: iki bilgiden kendiliğinden doğan çelişki ve çıkarımlar.
