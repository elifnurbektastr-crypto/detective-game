/*
 * VAKA: SON HASAT — Ayazma Bağevi Cinayeti
 * !!! SPOILER: Bu dosya çözümü içerir. !!!
 *
 * Gerçekte ne oldu (zaman çizelgesi):
 *  20:00  Hasat yemeği. Selim ile kardeşi Kenan sınırdaki kuyu yüzünden kavga eder.
 *  21:15  Kenan "Bu bağ seni de gömecek" diyerek çıkar.
 *  21:30  Selim çalışma odasında avukatı Murat'a: "Yarın Ankara'dan denetçi geliyor."
 *         Murat yıllardır bağın hesaplarından para çekmektedir (4,2 milyon). İki yıl önce
 *         açığı kâhya Hülya'nın oğlu Barış'a yıkmıştır.
 *  21:45  Selim, Defne ile Emre'yi bağda görmüştür; Emre'ye "Yarın bavulunu topla" der.
 *  22:00  Selim, Defne'ye bağı bir vakfa bırakacağını söyler.
 *  22:30  Defne ve Emre gizlice iskelede buluşur (23:35'e kadar).
 *  22:55  Kenan özür dilemeye geri döner, cesaret edemez; bekçi kulübesinde sigara içer (23:25'e kadar).
 *  23:05  Fırtına elektriği keser. Selim jeneratörü çalıştırmak için mahzene iner.
 *  23:10  Murat peşinden iner, 1987 magnum şişeyle başına vurur, rafı üstüne devirir.
 *         Kaçarken kol düğmesini merdivende düşürür.
 *  23:15  Hülya arka merdivende karanlıkta birini görür, Kenan sanır (lavanta kokusunu fark eder ama aklına yatmaz).
 *         Kenan iskeleden mahzenden çıkan fener ışığını görür.
 *  23:40  Emre laboratuvara dönerken cesedi bulur.
 */
(function (root) {
  "use strict";

  var CASE = {
    id: "son-hasat",
    title: "Son Hasat",
    subtitle: "Ayazma Bağevi Cinayeti",
    place: "Bozcaada · 14 Eylül · Poyraz fırtınası",
    intro: [
      "Bozcaada'nın en eski bağlarından Ayazma'nın sahibi Selim Karahan (63), hasat gecesi bağevinin mahzeninde, devrilmiş bir şarap rafının altında ölü bulundu. Saat 23:40'tı.",
      "Poyraz o gece feribot seferlerini iptal ettirdi. Adadan kimse ayrılamadı. Evde beş kişi vardı ve beşinin de Selim'le görülecek bir hesabı vardı.",
      "Jandarma şüphelilere olayın bir kaza olduğunu söyledi. Siz ise ön otopsi raporunu okudunuz. Bu bir kaza değil."
    ],
    howto: [
      "Bir şüpheli seçin ve sorunuzu kendi cümlelerinizle yazın. Hazır soru yok, istediğinizi sorabilirsiniz.",
      "Şüpheliler bilmedikleri ya da söylemek istemedikleri konularda lafı başka yere çeker. Bu yönlendirmeler çoğu zaman bir ipucudur.",
      "Bazı konular kilitlidir. Şüpheli o konuyu ancak elinizde ona yalanını gösterecek bir bilgi olduğunda konuşur. Defterdeki bir bilgiyi “Kanıt göster” düğmesiyle şüpheliye gösterebilirsiniz.",
      "İki ifade çelişirse ya da iki bilgi birleşirse defterinize otomatik olarak çelişki veya çıkarım düşer.",
      "Hazır olduğunuzda katili, sebebini ve en güçlü üç kanıtınızı seçerek suçlamayı yapın."
    ],
    startFacts: ["k_otopsi", "k_sise", "k_elektrik"],

    /* ---------------- DEFTER: kanıtlar ve ifadeler ---------------- */
    facts: {
      k_otopsi: { type: "kanit", title: "Ön otopsi raporu", text: "Ölüm saati 23:00–23:20. Başın arkasına tek, ağır bir darbe. Raf, ölümden SONRA devrilmiş; olaya kaza süsü verilmiş.", source: "Adli tabip" },
      k_sise: { type: "kanit", title: "Kırık magnum şişe", text: "Rafın dibinde kırık bir 1987 magnum şişe, tabanında kan. Cinayet silahı olduğu düşünülüyor. Bu bilgi şüphelilerle PAYLAŞILMADI; onlara “raf devrildi” denildi.", source: "Olay yeri" },
      k_elektrik: { type: "kanit", title: "Elektrik kesintisi", text: "Fırtına yüzünden elektrik 23:05–23:20 arasında kesildi. Jeneratör mahzende. Selim jeneratörü çalıştırmak için aşağı inmiş olmalı.", source: "Olay yeri" },
      k_dugme: { type: "kanit", title: "Gümüş kol düğmesi", text: "Üzerinde “M.Ö.” harfleri olan gümüş bir kol düğmesi. Hülya sabah mahzen merdiveninin dibinde bulmuş.", source: "Hülya" },
      k_ajanda: { type: "kanit", title: "Selim'in ajandası", text: "14 Eylül sayfası, Selim'in el yazısıyla: “Kasadaki açık Barış değilmiş. M. — 4,2 milyon. Yarın denetçi. Affetmeyeceğim. Barış'tan özür dilemeliyim.”", source: "Defne" },
      k_kenan_alibi: { type: "ifade", title: "İskeledeki tanıklar", text: "Defne ve Emre 22:30–23:35 arası gizlice iskelede birlikteydi. Kenan'ı 22:55–23:25 arası bekçi kulübesinin önünde sigara içerken gördüler; hiç ayrılmadı.", source: "Defne & Emre" },

      i_hulya_merdiven: { type: "ifade", title: "Merdivendeki gölge", text: "23:15'te arka merdivende mahzen tarafından hızla çıkan uzun boylu birini gördü. Mum söndü; “Kenan Bey'di” diyor.", source: "Hülya" },
      i_hulya_lavanta: { type: "ifade", title: "Lavanta kokusu", text: "Merdivende yanından geçen kişiden lavanta kokusu geliyordu. “Kenan Bey tütün kokar.”", source: "Hülya" },
      i_hulya_denetci: { type: "ifade", title: "Çalışma odasındaki kavga", text: "21:30'da Selim, Murat'a bağırıyordu: “Yarın Ankara'dan denetçi geliyor, her kuruşa bakacak!” Murat bembeyaz olmuş.", source: "Hülya" },
      i_hulya_defne_oda: { type: "ifade", title: "Boş oda", text: "22:45'te Defne'ye ıhlamur götürdü. Oda boştu, yatak bozulmamıştı.", source: "Hülya" },
      i_hulya_alarm: { type: "ifade", title: "Susmayan alarm", text: "23:00 civarı laboratuvarın tank alarmı yirmi dakika çaldı, kimse kapatmadı.", source: "Hülya" },
      i_hulya_murat_kapi: { type: "ifade", title: "Cevapsız kapı", text: "23:10'da mum vermek için Murat'ın kapısını çaldı. Ses gelmedi.", source: "Hülya" },
      i_hulya_emre: { type: "ifade", title: "“Bavulunu topla”", text: "21:45'te Selim'in laboratuvarda Emre'ye “Yarın sabah bavulunu topla!” diye bağırdığını duydu.", source: "Hülya" },
      i_hulya_sofra: { type: "ifade", title: "Sofrada düğme yoktu", text: "Yemekten sonra sofrayı tek tek kendisi topladı; masada kol düğmesi yoktu.", source: "Hülya" },
      i_hulya_baris: { type: "ifade", title: "Barış'ın kovulması", text: "Hülya'nın oğlu Barış iki yıl önce kasadan para çalmakla suçlanıp kovuldu. Hülya oğlunun masum olduğuna yemin ediyor.", source: "Hülya" },

      i_kenan_eve: { type: "ifade", title: "Kenan'ın mazereti", text: "21:15'te çıkıp evine gittiğini, sabaha kadar çıkmadığını söylüyor.", source: "Kenan" },
      i_kenan_tehdit: { type: "ifade", title: "Yemekteki tehdit", text: "Kenan yemekten çıkarken Selim'e “Bu bağ seni de gömecek” dedi. Kuyu ve su hakkı yüzünden kavgalılar.", source: "Görgü tanıkları" },
      i_kenan_fener: { type: "ifade", title: "Kaçan fener", text: "Işıklar sönünce, 23:15 gibi, mahzen kapısından bir el feneri ışığının evin arka merdivenine doğru koştuğunu gördü.", source: "Kenan" },
      i_kenan_murat: { type: "ifade", title: "Selim'in şüphesi", text: "Selim geçen hafta Kenan'a “Murat'a hesap sordum, kıvırıyor” demiş.", source: "Kenan" },

      i_defne_oda: { type: "ifade", title: "Defne'nin mazereti", text: "22:15'te odasına çıkıp uyuduğunu söylüyor.", source: "Defne" },
      i_defne_iskele: { type: "ifade", title: "Defne iskeledeydi", text: "Odasında değil, iskeledeymiş. Yalnız değilmiş ama kiminle olduğunu söylemiyor.", source: "Defne" },
      i_defne_vasiyet: { type: "ifade", title: "Yeni vasiyet", text: "Selim 22:00'de Defne'ye bağı bir vakfa bırakacağını söyledi.", source: "Defne" },
      i_defne_borc: { type: "ifade", title: "Defne'nin borçları", text: "Defne'nin İstanbul'daki galerisi batmak üzere, ciddi borçları var.", source: "Defne / Murat" },
      i_defne_dugme: { type: "ifade", title: "Hediye kol düğmeleri", text: "Defne, “M.Ö.” kol düğmelerini Murat'a yıllar önce kendisinin hediye ettiğini söylüyor.", source: "Defne" },

      i_emre_lab: { type: "ifade", title: "Emre'nin mazereti", text: "Bütün gece laboratuvarda tankları kontrol ettiğini söylüyor.", source: "Emre" },
      i_emre_disarida: { type: "ifade", title: "Emre dışarıdaydı", text: "22:15'te laboratuvardan çıkmış. Birini korumak için nerede olduğunu söylemiyor.", source: "Emre" },
      i_emre_koku: { type: "ifade", title: "Mahzendeki koku", text: "Cesedi bulduğunda mahzende şaraptan başka çiçeksi, kuru, sabunumsu bir koku vardı.", source: "Emre" },
      i_emre_kovulmadi: { type: "ifade", title: "“Kovulmadım”", text: "Emre, Selim'le sadece küçük bir anlaşmazlık yaşadığını, kovulmadığını söylüyor.", source: "Emre" },
      i_emre_fatura: { type: "ifade", title: "Tutmayan faturalar", text: "Emre bir ay önce ihracat faturalarında tutmayan rakamlar görüp Selim'e bildirmiş. Selim ondan sonra hesapları incelemeye başlamış.", source: "Emre" },

      i_murat_oda: { type: "ifade", title: "Murat'ın mazereti", text: "22:00'den sabaha kadar odasında vasiyetnameyi hazırladığını, hiç çıkmadığını söylüyor.", source: "Murat" },
      i_murat_sise: { type: "ifade", title: "Murat'ın dil sürçmesi", text: "Murat ölümü anlatırken “o şişeyle… o darbeyle” dedi.", source: "Murat" },
      i_murat_dugme: { type: "ifade", title: "Murat'ın düğme açıklaması", text: "Murat kol düğmesini “akşam yemeğinde düşürdüğünü” söyledi.", source: "Murat" },
      i_murat_lavanta: { type: "ifade", title: "Lavanta kolonyası", text: "Murat otuz yıldır aynı lavanta kolonyasını kullanıyor.", source: "Tanıklar" },
      i_murat_hesap: { type: "ifade", title: "“Hesaplar temiz”", text: "Murat hesaplarda hiçbir sorun olmadığını, denetçinin Selim'in “takıntısı” olduğunu söyledi.", source: "Murat" },
      i_murat_baris: { type: "ifade", title: "Barış dosyası", text: "Barış'ı kasadaki açıkla suçlayan dosyayı Murat hazırlamış.", source: "Murat" }
    },

    /* ------------- Kendiliğinden oluşan çelişkiler ve çıkarımlar ------------- */
    links: [
      { id: "c_defne", type: "celiski", when: ["i_defne_oda", "i_hulya_defne_oda"], title: "Defne odasında değildi", text: "Defne uyuduğunu söylüyor ama Hülya 22:45'te odayı boş buldu." },
      { id: "c_emre", type: "celiski", when: ["i_emre_lab", "i_hulya_alarm"], title: "Emre laboratuvarda değildi", text: "Emre laboratuvardaydım diyor ama tank alarmı yirmi dakika çaldı ve kimse kapatmadı." },
      { id: "c_emre_kovma", type: "celiski", when: ["i_emre_kovulmadi", "i_hulya_emre"], title: "Emre kovulmuştu", text: "Emre kovulmadığını söylüyor ama Hülya, Selim'in ona “bavulunu topla” dediğini duydu." },
      { id: "c_kenan", type: "celiski", when: ["i_kenan_eve", "k_kenan_alibi"], title: "Kenan geri dönmüştü", text: "Kenan evine gittiğini söyledi ama 22:55–23:25 arası iskeledeydi." },
      { id: "c_hulya_kenan", type: "celiski", when: ["i_hulya_merdiven", "k_kenan_alibi"], title: "Merdivendeki Kenan değildi", text: "Hülya merdivende Kenan'ı gördüğünü sanıyor ama Kenan o saatte iskeledeydi. Merdivendeki başka biriydi." },
      { id: "c_murat_oda", type: "celiski", when: ["i_murat_oda", "i_hulya_murat_kapi"], title: "Murat odasında değildi", text: "Murat odasından hiç çıkmadığını söylüyor ama 23:10'da kapısı çalındığında cevap vermedi." },
      { id: "c_murat_sise", type: "celiski", when: ["i_murat_sise", "k_sise"], title: "Murat silahı biliyor", text: "Şüphelilere “raf devrildi” denmişti. Murat ise cinayet silahının bir şişe olduğunu biliyor." },
      { id: "c_murat_dugme", type: "celiski", when: ["i_murat_dugme", "k_dugme"], title: "Düğme yemekte düşmedi", text: "Murat düğmeyi yemekte düşürdüğünü söylüyor ama düğme mahzen merdiveninde bulundu." },
      { id: "c_murat_hesap", type: "celiski", when: ["i_murat_hesap", "k_ajanda"], title: "Hesaplar temiz değildi", text: "Murat hesapların temiz olduğunu söyledi; Selim'in ajandasında “M. — 4,2 milyon” yazıyor." },
      { id: "d_koku", type: "cikarim", when: ["i_emre_koku", "i_murat_lavanta"], title: "Mahzendeki lavanta", text: "Emre'nin mahzende aldığı kuru, sabunumsu koku Murat'ın lavanta kolonyasıyla örtüşüyor." },
      { id: "d_merdiven", type: "cikarim", when: ["i_hulya_lavanta", "i_murat_lavanta"], title: "Merdivendeki Murat'tı", text: "Merdivende lavanta kokan, uzun boylu biri: büyük olasılıkla Murat." },
      { id: "d_fener", type: "cikarim", when: ["i_kenan_fener", "i_hulya_merdiven"], title: "Mahzenden kaçan kişi", text: "Kenan'ın gördüğü fener ile Hülya'nın merdivende karşılaştığı kişi aynı. Biri 23:15'te mahzenden arka merdivene kaçtı." },
      { id: "d_motive", type: "cikarim", when: ["i_hulya_denetci", "k_ajanda"], title: "Murat'ın sebebi", text: "Selim, Murat'ın 4,2 milyonluk açığını fark etmiş ve ertesi gün için denetçi çağırmıştı." },
      { id: "d_baris", type: "cikarim", when: ["i_murat_baris", "k_ajanda"], title: "Suç Barış'a yıkılmış", text: "Açık Barış'tan değilmiş; Barış'ı suçlayan dosyayı Murat hazırlamıştı." }
    ],

    /* ---------------- Ortak konu anahtarları ----------------
     * Her grup "a|b|c" biçiminde alternatiflerdir; kelimenin BAŞI eşleşir
     * (nerede → neredeydiniz). "=" ile başlayan tam kelime, boşluk içeren
     * ifade olarak aranır. Bir konunun TÜM grupları eşleşmelidir. p = öncelik.
     */
    keys: {
      selam: { k: ["=merhaba|=selam|selamlar|iyi aksamlar|iyi gunler|gunaydin|=slm|=mrb|=hey"], p: -1 },
      tesekkur: { k: ["tesekkur|=sagol|=sagolun|sagolasin|eyvallah|=tamam|=peki"], p: -1 },
      kim: { k: ["kimsin|kimsiniz|kendin|kendini|kendinizi|tanit|meslek|ne is yap|isin ne|isiniz ne|ne yaparsin|ne yaparsiniz|gorevin|gorevini"], p: 0 },
      nerede: { k: ["nerede|nerde|ne yapiyordu|ne yaptin|ne yaptiniz|mazeret|alibi|=23|saat"], p: 0 },
      gordun: { k: ["gordu|gordun|gorme|duydu|duydun|duyma|fark et|garip|tuhaf|dikkat|ilginc|sasirt"], p: 0 },
      katil: { k: ["katil|oldurdu|oldurdun|oldurmus|oldurdunuz|oldurmedi|sen mi|siz mi|suclu|kim yapt|kim yapmis|suphelen|suphe et|sence kim|sizce kim|kim olabilir"], p: 3 },
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
    },

    /* Konuşmada adı geçebilecek kişiler (hakkında konuları için) */
    people: {
      selim: { name: "Selim Karahan", aliases: "selim|kurban|olen|maktul|merhum|rahmetli" },
      defne: { name: "Defne Karahan", aliases: "defne|kizi|kizini|kiziniz" },
      emre: { name: "Emre Aslan", aliases: "emre|enolog|sarap uzman|sarapci" },
      hulya: { name: "Hülya Tekin", aliases: "hulya|kahya|hizmetci" },
      murat: { name: "Murat Öztürk", aliases: "murat|avukat" },
      kenan: { name: "Kenan Karahan", aliases: "kenan|kardesi|kardesini" }
    },

    motives: [
      { id: "miras", label: "Mirası kaybetmek (vasiyet değişikliği)" },
      { id: "arazi", label: "Kuyu ve arazi anlaşmazlığı" },
      { id: "zimmet", label: "Zimmete geçirilen paranın ortaya çıkması" },
      { id: "iliski", label: "Gizli ilişkinin ortaya çıkması ve kovulmak" },
      { id: "intikam", label: "Oğluna yapılan haksızlığın intikamı" }
    ],

    solution: {
      killer: "murat",
      motive: "zimmet",
      minStrong: 2,
      strong: ["k_dugme", "c_murat_dugme", "c_murat_sise", "c_murat_oda", "d_koku", "d_merdiven", "d_motive", "k_ajanda", "c_murat_hesap", "d_baris", "i_hulya_lavanta", "i_defne_dugme"]
    },

    endings: {
      win: {
        title: "Dava çözüldü",
        text: [
          "Murat Öztürk, kelepçeler takılırken bile gözlüğünü silmeyi bırakmadı.",
          "Yıllardır Ayazma'nın hesaplarından para çekiyordu. İki yıl önce açık ortaya çıkınca suçu kâhyanın oğlu Barış'a yıktı. Bir ay önce Emre faturalarda tutmayan rakamlar görünce Selim kendi hesaplarını incelemeye başladı ve gerçeği buldu: 4,2 milyon.",
          "21:30'da Selim ona ertesi gün denetçi geleceğini söyledi. 23:05'te elektrik kesildi ve Selim jeneratör için mahzene indi. Murat peşinden gitti, eline geçen ilk ağır şeyi, 1987 magnumu aldı. Sonra rafı cesedin üstüne devirdi.",
          "Kaçarken kol düğmesi merdivene düştü. Arka merdivende mum taşıyan Hülya'nın yanından geçti ve iskeleden bakan Kenan feneri gördü. Herkes karanlıkta yalnızca kendi sırrını sakladı. Murat'ı bulmanızı geciktiren de buydu."
        ]
      },
      weak: {
        title: "Savcı ikna olmadı",
        text: ["Doğru kişiyi ve doğru sebebi buldunuz ama seçtiğiniz kanıtlar mahkemede ayakta kalmaz. Şüpheliyi olay yerine ya da yalanlarına bağlayan somut bir şey bulun ve tekrar deneyin."]
      },
      wrongMotive: {
        title: "Sebep tutmuyor",
        text: ["Suçladığınız kişi doğru olabilir ama sebep yanlış. Savcı “Bu kişi Selim'i neden o gece öldürsün?” diye soruyor. Selim'in son günlerde neyle uğraştığına bakın."]
      },
      wrong: {
        defne: { title: "Yanlış kişi", text: ["Defne'nin mirası kaybetmesi güçlü bir sebep. Ama 22:30–23:35 arasında nerede olduğunu gerçekten biliyor musunuz? Bir mazereti ve bir tanığı olabilir."] },
        emre: { title: "Yanlış kişi", text: ["Emre o gece kovuldu ve yalan söyledi. Ama yalan söylemek cinayet işlemek değildir. Neyi ve kimi sakladığını bulun."] },
        hulya: { title: "Yanlış kişi", text: ["Hülya'nın oğlunun intikamını almak için bir sebebi var. Ama 23:10'da mum dağıtıyordu ve merdivende biriyle karşılaştı. O kişi kimdi?"] },
        kenan: { title: "Yanlış kişi", text: ["Kenan tehdit etti ve yalan söyledi. Ama o gece biri onu çok uzun süre izledi. Herkesin bir sırrı var; Kenan'ınki cinayet değil."] },
        murat: { title: "Yanlış kişi", text: [""] }
      }
    },

    /* ======================= ŞÜPHELİLER ======================= */
    characters: {

      /* ---------- DEFNE ---------- */
      defne: {
        name: "Defne Karahan", short: "Defne", age: 34, role: "Maktulün kızı", initials: "DK", color: "#b5525a",
        bio: "Selim'in tek kızı. İstanbul'da bir çağdaş sanat galerisi işletiyor. Hasat için üç gün önce adaya geldi.",
        opening: "Bir dedektif daha. Jandarmaya her şeyi anlattım zaten. Hadi, sorun bakalım.",
        alias: { selim: "baba|babani|babaniz|babanin|babaniza|babana", kenan: "amca|amcan|amcaniz" },
        topics: [
          { id: "selam", a: "Merhaba. “İyi akşamlar” demeyeceğim, pek iyi değil." },
          { id: "tesekkur", a: "Teşekküre gerek yok. Babamın katilini bulun, yeter." },
          { id: "kim", ask: "Kendinizden bahseder misiniz?", a: "Defne Karahan. Selim Karahan'ın kızı. Artık tek varisi bile değilim, bunu da nasılsa öğrenirsiniz." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "Yemekten sonra, 22:15 gibi odama çıktım. Başım ağrıyordu, uyudum. Bağırışlarla uyandım.", gives: ["i_defne_oda"] },
            { req: ["c_defne"], a: "…Hülya Abla'nın odaya geldiğini bilmiyordum. Tamam, odamda değildim. İskeledeydim. Babamla kavga etmiştim, nefes almam lazımdı. Yalnız da değildim ama kiminle olduğumu sormayın.", gives: ["i_defne_iskele"] },
            { req: ["k_kenan_alibi"], a: "Emre'yle iskeledeydik, 22:30'dan 23:35'e kadar. Babam bilmiyordu. Artık hiç bilmeyecek." }
          ] },
          { id: "birlikte", ask: "Kiminleydiniz?", v: [
            { a: "Kiminle olacağım? Odamdaydım dedim ya. Özel hayatım sizi ilgilendirmez." },
            { req: ["i_defne_iskele"], a: "Adını vermeyeceğim. Söylersem onun da hayatı mahvolur. Önce ona sorun. O söylerse ben de söylerim." },
            { req: ["i_defne_iskele", "i_emre_disarida"], a: "Emre de anlattı demek… Peki. Bir yıldır birlikteyiz; babam asla kabul etmezdi. O gece 22:30'dan 23:35'e kadar iskeledeydik. Işıklar sönmeden az önce bekçi kulübesinin önüne biri gelip sigara yaktı. Amcamdı, o eski fenerini her yerde tanırım. Işıklar gelene kadar, 23:25'e kadar kıpırdamadı. Biz de görmesin diye saklandık.", gives: ["k_kenan_alibi"] }
          ] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Amcamla babam yine kuyu yüzünden birbirine girdi. Amcam çıkarken “Bu bağ seni de gömecek Selim” dedi. Herkes duydu.", gives: ["i_kenan_tehdit"] },
          { id: "vasiyet", ask: "Vasiyet konusunda ne biliyorsunuz?", a: "Babam 22:00'de beni çalışma odasına çağırdı. Bağı bir vakfa bırakacakmış. “Sen burayı satarsın” dedi. Belki haklıydı da. Evet, bu bana bir sebep veriyor. Ama ben yapmadım.", gives: ["i_defne_vasiyet"] },
          { id: "borc", a: "Galerim batıyor, evet. Kim söyledi, Murat amca mı? Borcum var ama babamı öldürecek kadar değil.", gives: ["i_defne_borc"] },
          { id: "elektrik", ask: "Işıklar söndüğünde ne oldu?", v: [
            { a: "Uyuyordum dedim ya. Uyandığımda ışıklar gelmişti bile." },
            { req: ["i_defne_iskele"], a: "Işıklar söndüğünde iskeledeydim. Bütün koy karardı. Sadece fırtına vardı, bir de bekçi kulübesinin önünde yanan bir sigara. Orada biri vardı." }
          ] },
          { id: "nasil", ask: "Babanız nasıl öldü sizce?", a: "Jandarma raf devrildi dedi. Babam o mahzeni avucunun içi gibi bilirdi. Raflar öyle durduk yere devrilmez." },
          { id: "sise", a: "Şişe mi? Ne şişesi? Bize raf devrildi dediler." },
          { id: "ceset", a: "Emre bağırarak herkesi çağırdı. Aşağı indim ama… babamın yüzüne bakamadım." },
          { id: "hesap", ask: "Babanızın hesaplarıyla ilgili bir şey biliyor musunuz?", v: [
            { a: "Babamın hesaplarıyla hep Murat amca ilgilenirdi. Ben hiç karışmadım." },
            { req: ["k_kenan_alibi"], a: "Size bir şey itiraf edeceğim. Sabah vasiyetle ilgili bir not var mı diye babamın çalışma odasına girdim. Ajandasını aldım. Son sayfaya bakın. Hesapları anlarsınız.", gives: ["k_ajanda"] }
          ] },
          { id: "ajanda", ask: "Babanızın çalışma odasından bir şey aldınız mı?", locked: "Babamın odası mı? Hayır… Yani, şu an bunu konuşmak istemiyorum. Önce bana inanın, sonra.", v: [
            { req: ["k_kenan_alibi"], a: "Evet, aldım. Sabah vasiyetle ilgili bir not var mı diye babamın ajandasına baktım. Alın, son sayfayı okuyun.", gives: ["k_ajanda"] }
          ] },
          { id: "kovulma", v: [
            { a: "Babam Emre'yi mi kovdu? …Bunu bilmiyordum." },
            { req: ["k_kenan_alibi"], a: "O akşam babam bizi bağda görmüş. Emre'ye “Yarın bavulunu topla” demiş. Emre bunu bana iskelede anlattı." }
          ] },
          { id: "baris", a: "Barış, Hülya Abla'nın oğlu. Babam ona hırsız dedi ve kovdu. Ben hiç inanmadım; Barış çocukluk arkadaşımdır." },
          { id: "koku", a: "Lavanta mı? Murat amca. Lavanta deyince aklıma o gelir." , gives: ["i_murat_lavanta"] },
          { id: "dugme", locked: "Ne düğmesi?", v: [
            { req: ["k_dugme"], a: "“M.Ö.” Murat Öztürk. Bu kol düğmelerini yıllar önce babamın doğum gününde ona ben hediye ettim.", gives: ["i_defne_dugme"] }
          ] },
          { id: "katil", ask: "Sizce babanızı kim öldürdü?", v: [
            { a: "Ben mi? Babamı mı? …Hayır. Ama bu evde ona o kadar kızgın olan tek kişi ben değildim." },
            { req: ["k_ajanda"], a: "Ajandayı okudunuz. 4,2 milyon… Hep o “M.” harfine bakıp duruyorum." }
          ] },
          { id: "yalan", v: [
            { a: "Neden yalan söyleyeyim? Kanıtınız varsa gösterin." },
            { req: ["c_defne"], a: "Tamam, tamam. Odamda değildim. İskeledeydim. Daha fazlasını şimdilik sormayın.", gives: ["i_defne_iskele"] },
            { req: ["k_kenan_alibi"], a: "Artık saklayacak bir şeyim yok. Emre'yle birlikteydim." }
          ] }
        ],
        about: {
          selim: "Babam inatçı, gururlu, bazen acımasızdı. Ama dürüsttü. Aldatılmaktan nefret ederdi. Son birkaç gündür bir şeye kafayı takmıştı, çalışma odasından çıkmıyordu.",
          murat: { a: "Murat amca. Babamın lise arkadaşı, avukatı, ailenin “sağduyusu”. Lavanta kolonyasını kilometrelerce öteden alırsınız. Fazla kibar, fazla düzgün. Babam son zamanlarda onunla pek konuşmuyordu.", gives: ["i_murat_lavanta"] },
          kenan: { v: [
            { a: "Amcam bağırır çağırır ama babamı severdi. Kuyu meselesi yıllardır sürüyor. O gece çok sinirliydi, inkâr etmeyeceğim." },
            { req: ["k_kenan_alibi"], a: "Amcam yapamaz. O süre boyunca gözümün önündeydi." }
          ] },
          emre: { v: [
            { a: "Emre bağın enoloğu. İyi biridir, babam ona güvenirdi. …Neden soruyorsunuz?" },
            { req: ["k_kenan_alibi"], a: "Ben Emre'yi korudum, o da beni. İkimiz de aptalca yalanlar söyledik." }
          ] },
          hulya: "Hülya Abla beni büyüttü sayılır. Bu evde her şeyi bilir, her kapının arkasını. O gece bir şey gördüyse ona sorun."
        },
        show: {
          k_otopsi: "Raf sonradan mı devrilmiş? Yani biri bunu kaza gibi göstermek istemiş… Tanrım.",
          k_sise: "1987… Doğduğum yıl. Babam o şişeyi benim düğünüm için saklıyordu. Onunla mı…?",
          i_hulya_defne_oda: { a: "Hülya Abla mı söyledi? …Peki. Odamda değildim. İskeledeydim. Yalnız değildim ama kiminle olduğumu söylemeyeceğim.", gives: ["i_defne_iskele"] },
          c_defne: { a: "Peki, yakaladınız. Odamda değildim, iskeledeydim. Yalnız değildim ama kiminle olduğumu söylemeyeceğim.", gives: ["i_defne_iskele"] },
          i_emre_disarida: { v: [
            { a: "Emre dışarıdaymış… Bunu bana neden söylüyorsunuz?" },
            { req: ["i_defne_iskele"], a: "Demek o da söyledi. Evet, birlikteydik. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar sönmeden az önce bekçi kulübesinin önünde amcamı gördük. O eski feneriyle sigara içiyordu ve 23:25'e kadar hiç kıpırdamadı.", gives: ["k_kenan_alibi"] }
          ] },
          k_ajanda: "Babamın el yazısı. “Barış değilmiş”… Babam Barış'a hırsız demişti. Hülya Abla'nın yüzüne nasıl bakacağız?",
          k_dugme: { a: "“M.Ö.” Murat Öztürk. Bu kol düğmelerini ona ben hediye etmiştim.", gives: ["i_defne_dugme"] },
          i_kenan_tehdit: "Amcam öfkelenince ağzına geleni söyler. Ama öldürmez.",
          k_kenan_alibi: "Evet. Amcamdı ve oradan hiç ayrılmadı.",
          i_murat_dugme: "Yemekte mi düşürmüş? Ben bütün yemek boyunca karşısında oturdum. Kollarında ikisi de vardı.",
          d_motive: "Babam onu affetmeyecekti… Ve o gece babam öldü."
        },
        noShow: ["Bunu bana neden gösteriyorsunuz?", "Bu bana bir şey ifade etmiyor.", "Bilmiyorum. Başkasına sorun."],
        repeat: ["Bunu zaten söyledim.", "Tekrar mı soruyorsunuz? Peki:", "Aynı soru. Aynı cevap:"],
        locked: ["Bu konuyu konuşmak istemiyorum.", "Şimdi olmaz.", "Elinizde bir şey yoksa bu konuda konuşmam."],
        deflect: [
          { a: "Bunu bilmiyorum. Ama amcama yemekte babama ne dediğini sorun.", until: "i_kenan_tehdit" },
          { a: "Bilmiyorum. Babamın son günlerde neden bu kadar gergin olduğunu merak ediyorsanız Murat amcaya hesapları sorun.", until: "i_hulya_denetci" },
          { a: "Bu konuda bir fikrim yok. Hülya Abla bu evde olan her şeyi bilir, ona sorun.", until: "i_hulya_merdiven" },
          { a: "Sorularınız dağınık, dedektif. O gece kim neredeydi, ona odaklanın." },
          { a: "Bilmiyorum, gerçekten. Babamı kaybettim, kafam yerinde değil." },
          { a: "Bu konuda söyleyecek bir şeyim yok. Başka bir şey sorun." }
        ]
      },

      /* ---------- EMRE ---------- */
      emre: {
        name: "Emre Aslan", short: "Emre", age: 31, role: "Enolog", initials: "EA", color: "#4f8a6e",
        bio: "Bağın şarap uzmanı. Dört yıldır Ayazma'da çalışıyor. Cesedi 23:40'ta mahzende ilk o buldu.",
        opening: "Hoş geldiniz. Cesedi ben buldum… Ne bilmek istiyorsanız sorun.",
        topics: [
          { id: "selam", a: "İyi akşamlar. Kusura bakmayın, bütün gece uyuyamadım." },
          { id: "tesekkur", a: "Rica ederim. Elimden geleni yaparım." },
          { id: "kim", ask: "Burada ne iş yapıyorsunuz?", a: "Emre Aslan, enoloğum, yani bağın şarap uzmanı. Fermantasyondan şişelemeye her şey bende. Dört yıldır buradayım." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "Bütün gece laboratuvardaydım. Hasat zamanı tanklar kontrol ister; yarım saatte bir sıcaklıklarına bakarım.", gives: ["i_emre_lab"] },
            { req: ["c_emre"], a: "Alarm… Evet. Laboratuvarda değildim. 22:15'te çıktım, dışarıdaydım. Nerede ve kiminle olduğumu söyleyemem; birini korumam lazım.", gives: ["i_emre_disarida"] },
            { req: ["k_kenan_alibi"], a: "Defne'yle iskeledeydim. Bunu artık siz de biliyorsunuz." }
          ] },
          { id: "lab", ask: "Laboratuvarda o gece her şey normal miydi?", v: [
            { a: "Tank sıcaklıkları, şeker ölçümleri… Her şey normaldi, hepsini deftere yazdım." },
            { req: ["i_hulya_alarm"], a: "Alarm mı çalmış? Ben… duymamış olmalıyım. Kulaklığım takılıydı belki." },
            { req: ["c_emre"], a: "Tamam. Laboratuvarda değildim, 22:15'te çıktım. Alarmı da bu yüzden kimse kapatmadı. Ama nerede olduğumu söyleyemem.", gives: ["i_emre_disarida"] }
          ] },
          { id: "ceset", ask: "Cesedi nasıl buldunuz?", a: "23:40'ta laboratuvara dönerken mahzen kapısının aralık olduğunu gördüm. Jeneratörün sesi geliyordu. Aşağı indim… Selim Bey rafın altındaydı. Bir şey daha var: Mahzende şaraptan başka bir koku vardı. Çiçeksi, kuru, sabunumsu bir şey. O mahzen asla öyle kokmaz.", gives: ["i_emre_koku"] },
          { id: "koku", ask: "Mahzendeki koku neye benziyordu?", v: [
            { a: "Burnum benim işim, dedektif. Mahzende çiçeksi bir koku vardı. Gül değil, daha kuru, sabunumsu. Adını koyamadım.", gives: ["i_emre_koku"] },
            { req: ["i_murat_lavanta"], a: "Lavanta! Evet, kesinlikle oydu. Kuru, sabunumsu bir lavanta. Şimdi hatırlıyorum.", gives: ["i_emre_koku"] }
          ] },
          { id: "elektrik", v: [
            { a: "Elektrik 23:05'te gitti. Jeneratör mahzende; Selim Bey onu hep kendisi çalıştırırdı, kimseye dokundurmazdı." },
            { req: ["i_emre_disarida"], a: "Işıklar söndüğünde dışarıdaydım. Koy zifiri karanlıktı. Jeneratörü Selim Bey çalıştırırdı, kimseye dokundurmazdı." }
          ] },
          { id: "sise", ask: "Mahzendeki şişeler hakkında ne söyleyebilirsiniz?", a: "1987 magnum mu? O mahzenin en değerli şişesi. Selim Bey ona dokunanı öldürür… Pardon, kötü bir laf oldu. O şişe raftan alındıysa, alan kişi ne olduğunu umursamamış demektir; eline ilk geçen ağır şeyi kapmıştır." },
          { id: "birlikte", v: [
            { a: "Ne ilişkisi? Ben burada çalışıyorum, o kadar." },
            { req: ["i_emre_disarida"], a: "Adını size veremem. Önce o konuşmalı. Sonuçta bu onun ailesi." },
            { req: ["i_defne_iskele", "i_emre_disarida"], a: "Demek Defne de söyledi… Evet, Defne'yle birlikteyiz. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar sönmeden önce bekçi kulübesinin önüne Kenan Bey geldi, sigara yaktı. 23:25'e kadar oradan ayrılmadı. Görmesin diye kayıkhanenin arkasına saklandık.", gives: ["k_kenan_alibi"] }
          ] },
          { id: "kovulma", ask: "Selim Bey'le aranızda bir sorun var mıydı?", k: ["kovul|kovdu|kovma|isten cik|isten at|bavul|isini kayb|sorun|anlasmazlik|aranizda bir|arasi"], v: [
            { a: "Kovulmak mı? Hayır… Küçük bir anlaşmazlık oldu, o kadar.", gives: ["i_emre_kovulmadi"] },
            { req: ["k_kenan_alibi"], a: "Selim Bey 21:45'te laboratuvara geldi. Bizi bağda görmüş. “Yarın sabah bavulunu topla, kızımdan da uzak dur” dedi. Evet, bu bana bir sebep verir. Ama o saatte Defne'yleydim." }
          ] },
          { id: "tartisma", a: "Yemekte Kenan Bey ile Selim Bey kuyu yüzünden bağırıştı. Kenan Bey çok sinirli çıktı.", gives: ["i_kenan_tehdit"] },
          { id: "hesap", ask: "Bağın hesaplarında bir tuhaflık var mıydı?", a: "Hesaplar benim işim değil ama… Geçen ay ihracat faturalarında tutmayan rakamlar gördüm, Selim Bey'e söyledim. Ondan sonra değişti. Çalışma odasına kapanıp eski hesapları incelemeye başladı.", gives: ["i_emre_fatura"] },
          { id: "nasil", a: "Raf devrilmiş, öyle görünüyordu. Ama o raflar duvara vidalıdır; devirmek için güç ister." },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Bilmiyorum. Kenan Bey o akşam tehditler savurdu, herkes duydu. Ama… bilmiyorum." },
            { req: ["k_kenan_alibi"], a: "Kenan Bey değil, o kesin. Mahzendeki o koku aklımdan çıkmıyor." }
          ] },
          { id: "yalan", v: [
            { a: "Yalan söylemiyorum. Neden söyleyeyim ki?" },
            { req: ["c_emre"], a: "…Haklısınız. Laboratuvarda değildim. Dışarıdaydım. Kimi koruduğumu sormayın.", gives: ["i_emre_disarida"] },
            { req: ["c_emre_kovma"], a: "Evet, kovuldum. Ama bunun cinayetle ilgisi yok." }
          ] },
          { id: "baris", a: "Barış'ı az tanırdım; ben geldikten kısa süre sonra kovuldu. Kasadan para çalmakla suçlandı. Hülya Hanım hâlâ kabullenemedi." }
        ],
        about: {
          selim: "Selim Bey zor ama adil bir adamdı. Şaraba saygısı vardı.",
          defne: { v: [
            { a: "Defne Hanım mı? Selim Bey'in kızı. İstanbul'da yaşıyor. Onu pek tanımam." },
            { req: ["k_kenan_alibi"], a: "Onu seviyorum. Bu kadar basit." }
          ] },
          murat: { a: "Murat Bey her hasatta gelir, hesaplara bakar. Bana hep tepeden bakar. Geçen ay ihracat faturalarında tutmayan rakamlar gördüm ve Selim Bey'e söyledim. Ondan sonra Selim Bey kapanıp hesapları incelemeye başladı.", gives: ["i_emre_fatura"] },
          kenan: "Kenan Bey'in bağı bizimkinin hemen yanında. Kuyu iki bağın sınırında; yıllardır kavga konusu.",
          hulya: { a: "Hülya Hanım bu evin direği. Oğlu Barış da burada çalışırdı; iki yıl önce kasadan para çalmakla suçlanıp kovuldu.", gives: ["i_hulya_baris"] }
        },
        show: {
          k_otopsi: "Raf sonradan devrilmiş… Yani benim gördüğüm şey bir sahneydi.",
          k_sise: "1987 magnum. O mahzenin en değerli şişesi. Kim aldıysa ne aldığını umursamamış; elinin altındaki ilk ağır şeyi kapmış.",
          i_hulya_alarm: { a: "Alarm… Kapatan olmadı, değil mi? Peki. Laboratuvarda değildim. 22:15'te çıktım. Kiminle olduğumu söyleyemem.", gives: ["i_emre_disarida"] },
          c_emre: { a: "Tamam. Laboratuvarda değildim. Dışarıdaydım. Kimi koruduğumu sormayın.", gives: ["i_emre_disarida"] },
          i_defne_iskele: { a: "Demek o konuştu… Evet. Benimleydi. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar sönmeden önce bekçi kulübesinin önünde Kenan Bey'i gördük. 23:25'e kadar sigara içti, hiç ayrılmadı.", gives: ["i_emre_disarida", "k_kenan_alibi"] },
          i_hulya_emre: { a: "Evet, kovdu. Bizi, yani beni ve Defne'yi bağda görmüş. Bu cinayet sebebi değil, dedektif. Kalp kırıklığı sebebi.", gives: ["i_emre_kovulmadi"] },
          i_murat_lavanta: "Lavanta… Evet! Mahzendeki koku tam olarak buydu.",
          k_dugme: "Murat Bey'in kol düğmeleri bunlar. Her hasat yemeğinde takar.",
          k_ajanda: "“M. — 4,2 milyon”… Faturalardaki fark aşağı yukarı bu büyüklükteydi.",
          i_murat_hesap: "Temiz mi? Faturaları ben gördüm. Temiz değildi."
        },
        noShow: ["Bunun hakkında bir şey bilmiyorum.", "Hmm… Bu bana bir şey anlatmıyor, kusura bakmayın.", "Bunu başkasına sorsanız daha iyi olur."],
        repeat: ["Söylediğim gibi:", "Bunu anlatmıştım:", "Tekrar edeyim:"],
        locked: ["Bunu… şimdi konuşamam.", "Bu konuda bir şey söylemem doğru olmaz."],
        deflect: [
          { a: "Bunu bilemem. Ama Hülya Hanım elektrik gidince evin her yerine mum dağıttı. Bir şey gördüyse o görmüştür.", until: "i_hulya_merdiven" },
          { a: "Bilmiyorum… Ama mahzende ne bulduğumu sorarsanız anlatabilirim.", until: "i_emre_koku" },
          { a: "Benim alanım şarap, dedektif. Ama Murat Bey hakkında söyleyebileceğim bir şey var aslında.", until: "i_emre_fatura" },
          { a: "Bilmiyorum, kusura bakmayın. Başka bir şey sorun." },
          { a: "Ben o sırada orada değildim… Yani, bu konuda bir şey diyemem." },
          { a: "Bu soruya nasıl cevap vereceğimi bilmiyorum." }
        ]
      },

      /* ---------- HÜLYA ---------- */
      hulya: {
        name: "Hülya Tekin", short: "Hülya", age: 56, role: "Kâhya", initials: "HT", color: "#b08a3e",
        bio: "Bağevinin kâhyası, yirmi beş yıldır Karahan ailesinin yanında. Elektrik kesildiğinde odalara mum dağıtan kişi.",
        opening: "Buyurun evladım, oturun. Çay koyayım mı? …Selim Bey'e bunu yapanı bulun, Allah rızası için.",
        topics: [
          { id: "selam", a: "Hoş geldiniz evladım. Çayınız geliyor." },
          { id: "tesekkur", a: "Ne demek evladım. Siz yeter ki bulun." },
          { id: "kim", ask: "Kendinizi tanıtır mısınız?", a: "Hülya Tekin. Bu evin kâhyasıyım, yirmi beş yıl oldu. Defne Hanım'ı kucağımda büyüttüm." },
          { id: "nerede", ask: "O gece neredeydiniz?", a: "Mutfaktaydım. Sofrayı topladım, bulaşığı yıkadım. 22:45'te Defne Hanım'a ıhlamur çıkardım. Elektrik gidince de odalara mum dağıttım." },
          { id: "oda", ask: "Defne Hanım'a ıhlamur götürdüğünüzde ne gördünüz?", a: "22:45'te Defne Hanım'a ıhlamur götürdüm. Kapı açıktı, oda boştu. Yatak bile bozulmamıştı. Bahçeye çıkmıştır dedim, üstünde durmadım.", gives: ["i_hulya_defne_oda"] },
          { id: "elektrik", ask: "Elektrik kesilince ne yaptınız?", a: "23:05'te her yer karardı. Mumları aldım; önce mutfak, sonra yukarı kat. 23:10'da Murat Bey'in kapısını çaldım, ses gelmedi, uyuyor sandım. Sonra arka merdivenden inerken… birini gördüm.", gives: ["i_hulya_murat_kapi"] },
          { id: "murat_oda", k: ["murat|avukat", "oda|kapi|kapisi|kapisini|mum"], ask: "Murat Bey'in odasına uğradınız mı?", p: 3, a: "Uğradım. 23:10'da mum vermek için kapısını çaldım. Ses gelmedi. Uyuyor sandım, yaşlı adam diye rahatsız etmedim.", gives: ["i_hulya_murat_kapi"] },
          { id: "merdiven", ask: "Merdivende kimi gördünüz?", v: [
            { a: "23:15 sularıydı. Arka merdivende, mahzen tarafından biri hızla çıktı, yanımdan geçti. Uzun boylu, iri biri. Mum söndü, yüzünü göremedim. Kenan Bey'di, eminim. O akşam ne kadar öfkeliydi!", gives: ["i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Kenan Bey iskeledeymiş… O zaman merdivendeki o değildi. Durun, düşüneyim… Yanımdan geçerken bir koku geldi: lavanta. Kenan Bey tütün kokar, lavanta değil. Bir de, sabah mahzen merdiveninin dibinde bunu buldum. Ne olduğunu düşünmeden cebime koymuşum. Gümüş bir kol düğmesi. Alın.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] }
          ] },
          { id: "gordun", ask: "O gece tuhaf bir şey gördünüz mü?", v: [
            { a: "Gördüm evladım. 23:15'te arka merdivende biri yanımdan hızla geçti, mahzen tarafından geliyordu. Uzun boylu, iri. Mum söndü. Kenan Bey'di, eminim.", gives: ["i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Merdivendeki Kenan Bey değilmiş demek… O zaman lavanta kokusu neydi? Bir de sabah merdivenin dibinde bunu buldum. Gümüş bir kol düğmesi. Alın.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] }
          ] },
          { id: "lab", ask: "Laboratuvarda bir şey duydunuz mu?", a: "Emre Bey laboratuvardaymış, öyle diyor. Ama 23'e doğru laboratuvarın tank alarmı yirmi dakika çaldı, kimse kapatmadı. Evde biri olsa koşup kapatırdı.", gives: ["i_hulya_alarm"] },
          { id: "kovulma", ask: "Selim Bey o akşam Emre'yle konuştu mu?", k: ["emre|enolog|kovul|kovdu|bavul", "konus|bagir|kovul|kovdu|kovma|bavul|isten|laboratuvara"], a: "21:45'te Selim Bey laboratuvara gitti. Bağırdığını duydum: “Yarın sabah bavulunu topla!” Emre Bey'e söylüyordu. Neden, bilmiyorum.", gives: ["i_hulya_emre"] },
          { id: "hesap", ask: "Selim Bey ile Murat Bey neden tartıştı?", k: ["hesap|para|zimmet|denetci|denetim|muhasebe|milyon|kasa|murat|avukat|calisma oda", "hesap|para|zimmet|denetci|denetim|muhasebe|milyon|kasa|tartis|kavga|bagir|konus|calisma oda"], a: "21:30'da çalışma odasına kahve götürdüm. Selim Bey bağırıyordu: “Yarın Ankara'dan denetçi geliyor Murat, her kuruşa bakacak!” Murat Bey bembeyaz olmuştu. Kahveyi bırakıp çıktım.", gives: ["i_hulya_denetci"] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Yemek kötü bitti. Kenan Bey ile Selim Bey kuyu yüzünden kavga ettiler. Kenan Bey 21:15'te “Bu bağ seni de gömecek!” deyip kapıyı çarptı. Sonra da çalışma odasında Selim Bey ile Murat Bey bağırıştı.", gives: ["i_kenan_tehdit"] },
          { id: "baris", ask: "Oğlunuza ne oldu?", v: [
            { a: "Barış'ım… İki yıl önce Selim Bey onu kasadan para çalmakla suçlayıp kovdu. Oğlum yapmadı, yemin ederim. Kırıldım ama gitmedim; bu ev benim de evim.", gives: ["i_hulya_baris"] },
            { req: ["k_ajanda"], a: "“Barış değilmiş” mi yazmış? (Gözleri dolar.) Selim Bey biliyormuş… özür dileyecekmiş. Demek parayı alan başkasıymış. O zaman da hesaplara Murat Bey bakıyordu, dosyayı o hazırlamıştı.", gives: ["i_hulya_baris", "i_murat_baris"] }
          ] },
          { id: "dugme", locked: "Ne düğmesi evladım? Benim aklım düğmeye mi kaldı?", v: [
            { req: ["k_dugme"], a: "Sabah mahzen merdiveninin dibinde buldum. Yemekte mi düşmüş? Yok evladım, sofrayı ben topladım, tek tek. Masada öyle bir şey yoktu.", gives: ["i_hulya_sofra"] }
          ] },
          { id: "koku", v: [
            { a: "Lavanta mı? Murat Bey sürer onu. Çamaşırlara da lavanta koyarım ama o başka, kuru kuru kokar.", gives: ["i_murat_lavanta"] },
            { req: ["k_kenan_alibi"], a: "Merdivendeki kişiden lavanta kokusu geliyordu. Kenan Bey sandığım için aklıma yatmamıştı ama… Murat Bey sürer o kolonyayı.", gives: ["i_hulya_lavanta", "i_murat_lavanta"] }
          ] },
          { id: "ceset", a: "Emre Bey'in bağırışını duydum, 23:40'tı. Koştum. Selim Bey rafın altındaydı. Şişeler kırılmış, her yer şarap…" },
          { id: "sise", a: "O şişe… Selim Bey onu Defne Hanım doğduğunda almıştı. Düğününde açacaktı." },
          { id: "nasil", a: "Kaza diyorlar ama ben inanmıyorum evladım. Selim Bey o mahzende gözü kapalı yürürdü." },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Allah affetsin, aklıma Kenan Bey'den başkası gelmiyor. Merdivende gördüğüm oydu." },
            { req: ["k_kenan_alibi"], a: "Kenan Bey değilse… O lavanta kokusu. Bu evde o kolonyayı kim sürer, siz de biliyorsunuz." }
          ] },
          { id: "yalan", v: [
            { a: "Ben yirmi beş yıldır bu evde yalan söylemedim evladım." },
            { req: ["c_hulya_kenan"], a: "Yalan değil, yanlış! Karanlıktı, öyle sandım. Kenan Bey değilse… durun, düşüneyim." }
          ] }
        ],
        about: {
          selim: "Selim Bey sert adamdı ama eli açıktı. Hata yaptığında kabul etmesini de bilirdi… Barış'ım meselesi hariç.",
          defne: { a: "Defne Hanım benim kızım gibidir. 22:45'te ona ıhlamur götürdüm ama odada yoktu. Yatak bozulmamıştı bile.", gives: ["i_hulya_defne_oda"] },
          emre: { a: "Emre Bey iyi çocuktur. Laboratuvardaymış, öyle diyor. Ama 23'e doğru o tank alarmı yirmi dakika çaldı, kimse kapatmadı. Bir de o akşam Selim Bey'le aralarında bir şey oldu…", gives: ["i_hulya_alarm"] },
          murat: { a: "Murat Bey ailenin avukatı, Selim Bey'in okul arkadaşı. 21:30'da çalışma odasına kahve götürdüm. Selim Bey ona bağırıyordu: “Yarın denetçi geliyor, her kuruşa bakacak!” Murat Bey'in rengi atmıştı.", gives: ["i_hulya_denetci"] },
          kenan: { v: [
            { a: "Kenan Bey kardeşiyle kuyu yüzünden kavgalıydı. O akşam “Bu bağ seni de gömecek” dedi kapıdan çıkarken. Sonra merdivende gördüm onu, eminim.", gives: ["i_kenan_tehdit", "i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Kenan Bey'e haksızlık etmişim, Allah affetsin. Merdivendeki o değilmiş." }
          ] }
        },
        show: {
          k_kenan_alibi: { a: "Kenan Bey iskeledeymiş… O zaman merdivendeki o değildi! Durun… Yanımdan geçerken lavanta kokusu geldi. Kenan Bey tütün kokar. Bir de, sabah mahzen merdiveninin dibinde bunu buldum, gümüş bir kol düğmesi. Alın evladım.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] },
          c_hulya_kenan: { a: "Demek Kenan Bey değildi… Yanımdan geçerken lavanta kokusu gelmişti. Bir de sabah merdivende bunu buldum. Gümüş bir kol düğmesi.", gives: ["i_hulya_lavanta", "k_dugme"] },
          k_ajanda: { a: "“Barış değilmiş”… Ah Selim Bey, ah! Demek oğlum suçsuzmuş. O dosyayı Murat Bey hazırlamıştı, biliyor musunuz?", gives: ["i_hulya_baris", "i_murat_baris"] },
          k_dugme: { a: "Merdivenin dibinde buldum onu. Yemekte düşmedi, sofrayı ben topladım.", gives: ["i_hulya_sofra"] },
          i_murat_dugme: { a: "Yemekte mi düşürmüş? Yalan! Sofrayı ben topladım, tek tek. Masada düğme falan yoktu.", gives: ["i_hulya_sofra"] },
          c_murat_dugme: { a: "Ben söyledim size, masada yoktu o düğme.", gives: ["i_hulya_sofra"] },
          k_otopsi: "Raf sonradan mı devrilmiş? Ya Rabbi… Kaza değil yani.",
          k_sise: "O şişe… Selim Bey onu Defne Hanım doğduğunda almıştı.",
          i_kenan_fener: "Fener mi? Ben merdivende mum taşıyordum, karşımdaki de karanlıkta koşuyordu. Aynı kişi olmalı, evladım.",
          i_emre_koku: "Mahzende çiçek kokusu mu? Ben çamaşıra lavanta koyarım ama mahzene çamaşır inmez."
        },
        noShow: ["Bunu bana neden gösteriyorsunuz evladım? Ben anlamam.", "Gözlüğüm de yanımda değil… Bilmiyorum.", "Bu konuda bir şey bilmem."],
        repeat: ["Söyledim ya evladım:", "Yaşlandım ama unutmadım:", "Tekrar edeyim:"],
        locked: ["Ben kimsenin işine karışmam evladım.", "Bunu bilmem."],
        deflect: [
          { a: "Onu bilmem evladım. Ama elektrik gidince her odaya mum götürdüm; o sırada gördüklerimi sorun.", until: "i_hulya_merdiven" },
          { a: "Ben kâhyayım, kimsenin işine karışmam. Ama Murat Bey ile Selim Bey o akşam çalışma odasında çok bağırıştı.", until: "i_hulya_denetci" },
          { a: "Bilmiyorum. Ama Defne Hanım o gece pek odasında durmadı gibi geldi bana.", until: "i_hulya_defne_oda" },
          { a: "Ah, aklım karıştı. Emre Bey'in laboratuvarından gelen o alarm sesi hâlâ kulağımda.", until: "i_hulya_alarm" },
          { a: "Merdivendeki Kenan Bey'di, eminim. Biri bana aksini gösterirse o başka.", until: "k_kenan_alibi" },
          { a: "Çayınız soğuyor evladım. Başka bir şey sorun." },
          { a: "Ah, kafam karıştı. Ne sordunuz?" }
        ]
      },

      /* ---------- MURAT ---------- */
      murat: {
        name: "Murat Öztürk", short: "Murat", age: 60, role: "Aile avukatı", initials: "MÖ", color: "#7a62a8",
        bio: "Karahan ailesinin avukatı ve Selim'in lise arkadaşı. Vasiyet değişikliği için iki gün önce adaya geldi.",
        opening: "Sayın dedektif. Elimden gelen her türlü yardıma hazırım. Hukukun sınırları içinde, elbette. Buyurun.",
        topics: [
          { id: "selam", a: "İyi akşamlar. Zor bir gece, değil mi?" },
          { id: "tesekkur", a: "Görevim, dedektif." },
          { id: "kim", ask: "Kendinizi tanıtır mısınız?", a: "Av. Murat Öztürk. Otuz yıldır Karahan ailesinin avukatıyım. Selim'le lise sıralarından beri dostuz. Dosttuk." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "22:00'den itibaren odamdaydım. Selim'in yeni vasiyetnamesini hazırlıyordum. Elektrik kesilince mum yaktım ve çalışmaya devam ettim. Odamdan hiç çıkmadım.", gives: ["i_murat_oda"] },
            { req: ["c_murat_oda"], a: "Hülya Hanım'ın kapıyı çaldığını duymamış olabilirim; kulaklarım eskisi gibi değil. Belki lavabodaydım. Bu bir suçlama mı?" }
          ] },
          { id: "elektrik", a: "Mum yaktım, yazmaya devam ettim. Avukatlar karanlıktan korkmaz, dedektif." },
          { id: "vasiyet", ask: "Vasiyette ne değişiyordu?", a: "Selim bağı bir vakfa bırakmak istiyordu. Defne Hanım'ın bundan pek memnun olmadığını tahmin edersiniz. Ben sadece müvekkilimin iradesini kâğıda döktüm." },
          { id: "hesap", ask: "Bağın hesaplarında bir sorun var mıydı?", v: [
            { a: "Hesaplar mı? Her kuruş kayıtlıdır, dedektif. Selim'in son zamanlarda bir “denetçi” takıntısı vardı. Yaşlılık işte.", gives: ["i_murat_hesap"] },
            { req: ["k_ajanda"], a: "4,2 milyon… Bu, yatırım hesaplarındaki geçici bir… Selim finansal araçları anlamazdı. Bu konuyu müvekkil gizliliği nedeniyle konuşamam.", gives: ["i_murat_hesap"] }
          ] },
          { id: "nasil", ask: "Selim Bey nasıl öldü sizce?", v: [
            { a: "Jandarma rafın devrildiğini söyledi. Trajik bir kaza. Mahzen eski, raflar çürük." },
            { any: ["c_murat_oda", "k_dugme", "d_motive", "c_murat_hesap"], a: "Bakın, olanlar korkunç. O şişeyle… o darbeyle yere yığılmış olması… Yani, öyle tahmin ediyorum. Raf devrilince şişeler de kırılmıştır elbette.", gives: ["i_murat_sise"] }
          ] },
          { id: "sise", v: [
            { a: "Şişe mi? Bir mahzende şişe bulmak pek şaşırtıcı değil, dedektif." },
            { req: ["i_murat_sise"], a: "Ben şişe dediğimi hatırlamıyorum. Yanlış duymuş olmalısınız." }
          ] },
          { id: "dugme", ask: "Kol düğmeleriniz nerede?", locked: "Kol düğmelerim mi? Bunun ne ilgisi var?", v: [
            { req: ["k_dugme"], a: "Ah, kayıp kol düğmem! Akşam yemeğinde düşürmüştüm, her yerde aradım. Nerede bulundu?", gives: ["i_murat_dugme"] },
            { req: ["c_murat_dugme"], a: "Mahzen merdiveninde mi? Ben… Gün içinde Selim bana mahzeni gezdirmişti. Orada düşmüş olmalı. Yemek dediysem yanılmışım." }
          ] },
          { id: "koku", a: "Lavanta, evet. Otuz yıldır aynı kolonya. Bu artık bir suç mu?", gives: ["i_murat_lavanta"] },
          { id: "baris", ask: "Barış neden kovuldu?", a: "Barış meselesi mi? Kasada açık tespit edildi ve çocuk işten çıkarıldı. Dosyayı ben hazırladım. Kapanmış bir konu.", gives: ["i_murat_baris"] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Akşam yemeğinde Kenan Bey ile Selim arasında çirkin bir tartışma oldu. Kenan Bey tehditler savurdu. Ben olsam oradan başlardım.", gives: ["i_kenan_tehdit"] },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Profesyonel görüşümü sorarsanız: Kızı aynı akşam mirastan çıkarıldı, kardeşi aynı akşam onu tehdit etti. Ben olsam oradan başlardım." },
            { any: ["c_murat_sise", "c_murat_dugme"], a: "Kırk yıllık dostluk… (Gözlüğünü çıkarıp siler.) Bundan sonra avukatım olmadan tek kelime etmeyeceğim." }
          ] },
          { id: "yalan", v: [
            { a: "Sayın dedektif, ben bir hukukçuyum. Yalan benim mesleğimde intihardır." },
            { any: ["c_murat_oda", "c_murat_dugme", "c_murat_sise", "c_murat_hesap"], a: "Bir yanlış hatırlama yalan değildir. Bunu hangi hâkim olsa size söyler." }
          ] },
          { id: "ceset", a: "Bağırışları duyunca aşağı indim. Korkunç bir manzaraydı. Hemen jandarmayı aradım; biri soğukkanlı olmalıydı." },
          { id: "borc", a: "Defne Hanım'ın galerisi batmak üzere, borçları ciddi. Babası bu akşam onu mirastan çıkardı. Hesap ortada.", gives: ["i_defne_borc"] }
        ],
        about: {
          selim: "Selim zor bir adamdı. Kibirli, şüpheci. Son zamanlarda herkesten şüpheleniyordu, benden bile. Ama dosttuk.",
          defne: { a: "Defne Hanım'ın galerisi batmak üzere, borçları ciddi. Babası bu akşam onu mirastan çıkardı. Hesap ortada.", gives: ["i_defne_borc"] },
          kenan: { a: "Kenan Bey “Bu bağ seni de gömecek” dedi, hepimiz duyduk. Mahkemede güzel bir cümle olur.", gives: ["i_kenan_tehdit"] },
          emre: "Enolog mu? Taşralı bir çocuk. Defne Hanım'a fazla yakın, bence. Selim bunu öğrenseydi…",
          hulya: "Hülya Hanım sadık bir çalışandır. Gerçi oğlu meselesinden sonra Selim'e küs olduğunu da biliyorum."
        },
        show: {
          k_dugme: { v: [
            { a: "Ah, kayıp kol düğmem! Akşam yemeğinde düşürmüştüm. Nerede buldunuz?", gives: ["i_murat_dugme"] },
            { req: ["c_murat_dugme"], a: "Gün içinde Selim bana mahzeni gezdirmişti. Orada düşmüş olmalı. Bunu bir cinayete bağlamak biraz zorlama, dedektif." }
          ] },
          k_sise: { v: [
            { a: "Bir şişe mi? Bilmiyordum. Korkunç." },
            { req: ["i_murat_sise"], a: "Ben… Şişe dediğimi hatırlamıyorum. Yanlış duymuşsunuz." }
          ] },
          c_murat_sise: "Bu… Herkes tahmin edebilirdi. Mahzende kırık şişe olması kadar doğal ne olabilir?",
          k_ajanda: { a: "4,2 milyon… Yatırım hesaplarında geçici bir hareket. Selim finansal araçları anlamazdı. Müvekkil gizliliği gereği bunu konuşamam.", gives: ["i_murat_hesap"] },
          i_hulya_murat_kapi: "Kapıyı duymamış olabilirim. Yaşım altmış, dedektif.",
          c_murat_oda: "Belki lavabodaydım. Bu kadar küçük bir ayrıntıdan cinayet mi çıkaracaksınız?",
          i_hulya_lavanta: "Bu evde lavanta kokan tek şey ben değilim. Hülya Hanım çamaşırlara da lavanta koyar.",
          d_merdiven: "Uzun boylu ve lavanta kokan biri. Tebrikler dedektif, adanın yarısını tarif ettiniz.",
          i_emre_koku: "Bir enoloğun burnu mahkemede delil sayılmaz.",
          d_koku: "Koku delil değildir, dedektif.",
          k_otopsi: "Ön rapor. Kesin değildir. Ben olsam acele etmezdim.",
          k_kenan_alibi: "Demek Kenan Bey'in tanıkları var. Peki o tanıkların tanığı kim? Gizli bir ilişkiyi saklayan iki kişi mi?",
          i_hulya_denetci: "Hülya Hanım kapı dinlemiş demek. Evet, Selim bir denetçi çağırmıştı. Rutin bir kontrol.",
          i_emre_fatura: "Enolog çocuk şimdi de muhasebeci mi oldu? İhracat faturalarında kur farkı olur, dedektif.",
          d_baris: "Barış dosyası usulüne uygun hazırlandı. Selim'in ajandasına yazdıkları bir yaşlının vehimleri."
        },
        noShow: ["Bunun hukuki bir değeri yok, dedektif.", "Bu konuda yorum yapmayacağım.", "Ne göstermeye çalıştığınızı anlamadım."],
        repeat: ["Daha önce de söylediğim gibi:", "Tekrar ediyorum:", "Kayıtlara geçsin:"],
        locked: ["Bu konuda yorum yapmayacağım.", "Müvekkil gizliliği, dedektif."],
        deflect: [
          { a: "Bu soruyu Kenan Bey'e sorsanız daha verimli olur. Tehdit eden oydu, ben değil.", until: "i_kenan_tehdit" },
          { a: "Müvekkil gizliliği, dedektif. Ama Defne Hanım'ın mali durumunu araştırmanızı tavsiye ederim.", until: "i_defne_borc" },
          { a: "Enolog çocuğa o gece nerede olduğunu sordunuz mu? Bence sorun.", until: "i_emre_lab" },
          { a: "Hukuken bunun bir önemi yok." },
          { a: "Sorularınızın bir yöntemi var mı, dedektif? Yoksa karanlıkta mı ateş ediyorsunuz?" },
          { a: "Bu konuda yorum yapmayacağım." }
        ]
      },

      /* ---------- KENAN ---------- */
      kenan: {
        name: "Kenan Karahan", short: "Kenan", age: 58, role: "Maktulün kardeşi", initials: "KK", color: "#5f7aa6",
        bio: "Selim'in küçük kardeşi ve komşu bağın sahibi. Yemekte Selim'le kavga edip 21:15'te evden ayrıldı.",
        opening: "Ne var? Ağabeyimi ben öldürmedim, bunu baştan söyleyeyim. Sorunuzu sorun, işim var.",
        alias: { selim: "agabey|abim|abin|abiniz|abinizi|abini|kardesin|kardesiniz" },
        topics: [
          { id: "selam", a: "Selam. Kısa kesin." },
          { id: "tesekkur", a: "Hı. Tamam." },
          { id: "kim", ask: "Kimsiniz, ne iş yaparsınız?", a: "Kenan Karahan. Selim'in kardeşiyim. Hemen yandaki bağ benim; babamızdan kalan toprağın küçük yarısı." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "21:15'te çıktım, evime gittim, sabaha kadar da çıkmadım. Bu fırtınada nereye gideyim?", gives: ["i_kenan_eve"] },
            { req: ["c_kenan"], a: "…Peki. Döndüm. 22:50 gibi. Özür dileyecektim. Kapıya kadar gidemedim; iskeledeki bekçi kulübesinin önünde sigara içip durdum, cesaretimi toplayamadım. Sonra ışıklar söndü ve bir şey gördüm: 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arka merdivenine doğru koştu. Yürüyen biri değildi, kaçan biriydi.", gives: ["i_kenan_fener"] }
          ] },
          { id: "gordun", ask: "O gece bir şey gördünüz mü?", v: [
            { a: "Hiçbir şey görmedim. Evdeydim dedim ya." },
            { req: ["c_kenan"], a: "Gördüm. 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arka merdivenine koştu. Kim olduğunu seçemedim. Ama kaçıyordu.", gives: ["i_kenan_fener"] }
          ] },
          { id: "elektrik", v: [
            { a: "Benim evde de elektrik gitti. Mum bile yakmadım, oturdum karanlıkta." },
            { req: ["c_kenan"], a: "Işıklar söndüğünde iskeledeydim. 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arkasına koştu.", gives: ["i_kenan_fener"] }
          ] },
          { id: "tartisma", ask: "Yemekte neden kavga ettiniz?", a: "Kuyu meselesi. Ağabeyim sınırdaki kuyunun suyunu kesecekti; benim bağım kurur. “Bu bağ seni de gömecek” dedim, evet. Öfkeyle söylenmiş laf. Öldürmek başka iş.", gives: ["i_kenan_tehdit"] },
          { id: "arazi", ask: "Kuyu meselesi nedir?", a: "Babam toprağı ikimize bıraktı, kuyuyu da tam sınıra açtırdı. Selim tapuda kuyunun kendi tarafında kaldığını buldu, suyu kesecekti. Yarın mahkemeye gidecektik. Şimdi o da yok." },
          { id: "koku", a: "Lavanta mı? Murat. Kırk yıldır aynı kolonya; odaya ondan önce kokusu girer.", gives: ["i_murat_lavanta"] },
          { id: "hesap", ask: "Ağabeyiniz hesaplardan bahsetti mi?", a: "Bahsetti. Geçen hafta kahvede bana “Murat'a hesap sordum, kıvırıyor” dedi. Ağabeyim kolay kolay kimseden şüphelenmezdi.", gives: ["i_kenan_murat"] },
          { id: "vasiyet", a: "Vakfa mı bırakıyormuş? Hah. Selim'e yakışır. Ölürken bile herkese ders verecekti." },
          { id: "sise", a: "1987 magnum… Babamızın öldüğü yıl. Selim onu Defne'nin düğünü için saklıyordu." },
          { id: "nasil", a: "Raf devrildi diyorlar. Selim o raflara çocukken tırmanırdı. Hiçbiri yıkılmadı." },
          { id: "ceset", a: "Ben orada değildim. Sabah haber geldi… Kimse beni aramadı bile." },
          { id: "baris", a: "Barış iyi çocuktu. Hırsız falan değildi. O dosya kokuyordu ama Selim dinlemedi." },
          { id: "katil", ask: "Sizce kim öldürdü?", v: [
            { a: "Ben değilim. Bu evde bir yılan var, o kadarını söylerim. Ağabeyim de biliyordu." },
            { req: ["i_kenan_fener"], a: "O fenerle kaçan her kimse, o. Bulun onu." }
          ] },
          { id: "yalan", v: [
            { a: "Yalan söylemiyorum! Ne istiyorsunuz benden?" },
            { req: ["c_kenan"], a: "…Tamam. Döndüm. 22:50'de iskeledeydim. Özür dileyecektim, beceremedim. Işıklar sönünce mahzen kapısından kaçan bir fener gördüm.", gives: ["i_kenan_fener"] }
          ] },
          { id: "birlikte", v: [
            { a: "Kiminle olacağım, evde yalnızdım." },
            { req: ["k_kenan_alibi"], a: "Demek beni iskelede gördüler. Ben de onları görmüştüm aslında ama söylemedim. Kızın sırrı benim de sırrım." }
          ] }
        ],
        about: {
          selim: "Ağabeyim inatçı keçinin tekiydi. Kavgalıydık ama kardeşimdi. Çocukken o mahzende saklambaç oynardık.",
          murat: { a: "Murat mı? Selim'in kuyruğu. Kırk yıldır aynı lavanta kolonyası; odaya ondan önce kokusu girer. Hiç sevmedim. Ağabeyim de son zamanlarda ondan şüpheleniyordu. Geçen hafta “Murat'a hesap sordum, kıvırıyor” dedi bana.", gives: ["i_murat_lavanta", "i_kenan_murat"] },
          defne: { v: [
            { a: "Defne'm… Akıllı kızdır ama babası gibi inatçı. O gece… Neyse. Bilmiyorum." },
            { req: ["k_kenan_alibi"], a: "Demek beni iskelede gördüler. Ben de onları görmüştüm aslında, ama söylemedim. Kızın sırrı benim de sırrım." }
          ] },
          emre: "Enolog çocuk. İşini bilir. Defne'ye bakışından ne olduğunu ben anlıyorum.",
          hulya: "Hülya dürüst kadındır. Oğluna yapılan haksızlığa rağmen o evden ayrılmadı."
        },
        show: {
          k_kenan_alibi: { a: "…Görmüşler demek. Peki. Döndüm, 22:50'de. Özür dileyecektim, beceremedim. Kulübenin önünde sigara içtim. Işıklar sönünce mahzen kapısından bir fener çıktı, evin arka merdivenine koştu. 23:15 gibiydi.", gives: ["i_kenan_fener"] },
          c_kenan: { a: "Tamam, yalan söyledim. Döndüm. Ama içeri girmedim. Işıklar sönünce mahzen kapısından kaçan bir fener gördüm.", gives: ["i_kenan_fener"] },
          i_hulya_merdiven: { v: [
            { a: "Merdivende beni mi görmüş? Saçmalık! Ben o eve adım atmadım." },
            { req: ["c_kenan"], a: "Ben değildim. Ben iskeledeydim, siz de biliyorsunuz. Hülya'nın gördüğü, benim gördüğüm fenerli kişidir." }
          ] },
          i_kenan_tehdit: "Öfkeyle söylenmiş laf. Kaç kere söyleyeceğim?",
          k_dugme: "“M.Ö.” Murat Öztürk. Size söylemiştim: yılan.",
          k_ajanda: "“Affetmeyeceğim.” Ağabeyimin tam lafı. Murat'ı affetmeyecekmiş.",
          k_otopsi: "Raf sonradan devrilmiş. Demek ki biri onu öldürüp üstüne rafı devirdi. Kim yaptıysa elimden kurtulamaz.",
          k_sise: "O şişeyle mi? Babamızın yılı… Pislik.",
          i_murat_lavanta: "Söyledim ya. O kolonyayı bu adada başka kimse sürmez."
        },
        noShow: ["Bu ne şimdi?", "Bundan anlamam ben.", "Bunu bana göstereceğinize gidip katili bulun."],
        repeat: ["Söyledim ya!", "Kaç kere soracaksınız?", "Yine mi? Peki:"],
        locked: ["Bunu konuşmayacağım.", "O beni ilgilendirir."],
        deflect: [
          { a: "Bunu bana değil Murat'a sorun. Ağabeyim ona çok kızgındı.", until: "i_kenan_murat" },
          { a: "Hülya'ya sorun. O evde olan hiçbir şey onun gözünden kaçmaz.", until: "i_hulya_merdiven" },
          { a: "Benim bildiğim kuyu, toprak, üzüm. Gerisi sizin işiniz." },
          { a: "Bilmem. Ben o evde ancak yemek boyunca vardım." },
          { a: "Lafı dolandırmayın. Ne soracaksanız açık açık sorun." }
        ]
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = CASE;
  else root.CASE = CASE;
})(this);
