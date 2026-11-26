/*
 * VAKA: SON HASAT - Ayazma Bağevi Cinayeti
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
    difficulty: "orta",
    duration: "60–90 dk",
    players: "1–4 oyuncu",
    tagline: "Fırtınalı bir hasat gecesi, mahzende bir ceset ve sırlarını saklayan beş kişi.",
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
      "Bazı konular kilitlidir. Şüpheli o konuyu ancak elinizde ona yalanını gösterecek bir bilgi olduğunda konuşur. Defterdeki bir bilgiyi 'Kanıt göster' düğmesiyle şüpheliye gösterebilirsiniz.",
      "İki ifade çelişirse ya da iki bilgi birleşirse defterinize otomatik olarak çelişki veya çıkarım düşer.",
      "Hazır olduğunuzda katili, sebebini ve en güçlü üç kanıtınızı seçerek suçlamayı yapın."
    ],
    startFacts: ["k_otopsi", "k_sise", "k_elektrik"],

    /* ---------------- DEFTER: kanıtlar ve ifadeler ---------------- */
    facts: {
      k_otopsi: { type: "kanit", title: "Ön otopsi raporu", text: "Ölüm 23:00–23:20 arası; kol saati 23:12'de durmuş. Başın arkasına tek, ağır darbe; yarada yeşil cam. Savunma izi yok. Raf ölümden SONRA devrilmiş, kaza süsü verilmiş. Ceketin yakasında kurbana ait olmayan çiçeksi bir esans izi. Tam rapor: Belgeler.", source: "Adli tabip" },
      k_sise: { type: "kanit", title: "Kırık magnum şişe", text: "Rafın dibinde kırık bir 1987 magnum şişe, tabanında kan. Cinayet silahı olduğu düşünülüyor. Bu bilgi şüphelilerle PAYLAŞILMADI; onlara 'raf devrildi' denildi.", source: "Olay yeri" },
      k_elektrik: { type: "kanit", title: "Elektrik kesintisi", text: "Fırtına yüzünden elektrik 23:05–23:20 arasında kesildi. Jeneratör mahzende. Selim jeneratörü çalıştırmak için aşağı inmiş olmalı.", source: "Olay yeri" },
      k_dugme: { type: "kanit", title: "Gümüş kol düğmesi", text: "Üzerinde 'M.Ö.' harfleri olan gümüş bir kol düğmesi. Hülya sabah mahzen merdiveninin dibinde bulmuş.", source: "Hülya" },
      k_ajanda: { type: "kanit", title: "Selim'in ajandası", text: "14 Eylül sayfası, Selim'in el yazısıyla: 'Kasadaki açık Barış değilmiş. M. 4,2 milyon. Yarın denetçi. Affetmeyeceğim. Barış'tan özür dilemeliyim.'", source: "Defne" },
      k_dekont: { type: "kanit", title: "Kasadaki banka dekontları", text: "Selim'in kasasından çıkan dekontlar: Ayazma'nın hesabından MÖ Danışmanlık adlı bir şirkete üç yılda 4,2 milyon lira gönderilmiş. Şirketin sahibi Murat Öztürk.", source: "Kasa" },
      i_hulya_kasa: { type: "ifade", title: "Kasanın şifresi", text: "Hülya'ya göre Selim kasanın şifresini hep en sevdiği şişenin yılından yaparmış.", source: "Hülya" },
      i_emre_ters: { type: "ifade", title: "Tersten yazma huyu", text: "Emre'ye göre Selim şifreleri hep tersten yazarmış, mahzendeki raf etiketlerini bile.", source: "Emre" },
      k_kenan_alibi: { type: "ifade", title: "İskeledeki tanıklar", text: "Defne ve Emre 22:30–23:35 arası gizlice iskelede birlikteydi. Kenan'ı 22:55–23:25 arası bekçi kulübesinin önünde sigara içerken gördüler; hiç ayrılmadı.", source: "Defne & Emre" },

      i_hulya_merdiven: { type: "ifade", title: "Merdivendeki gölge", text: "23:15'te arka merdivende mahzen tarafından hızla çıkan uzun boylu birini gördü. Mum söndü; 'Kenan Bey'di' diyor.", source: "Hülya", deny: ["c_hulya_kenan"] },
      i_hulya_lavanta: { type: "ifade", title: "Lavanta kokusu", text: "Merdivende yanından geçen kişiden lavanta kokusu geliyordu. 'Kenan Bey tütün kokar.'", source: "Hülya" },
      i_hulya_denetci: { type: "ifade", title: "Çalışma odasındaki kavga", text: "21:30'da Selim, Murat'a bağırıyordu: 'Yarın Ankara'dan denetçi geliyor, her kuruşa bakacak!' Murat bembeyaz olmuş.", source: "Hülya" },
      i_hulya_defne_oda: { type: "ifade", title: "Boş oda", text: "22:45'te Defne'ye ıhlamur götürdü. Oda boştu, yatak bozulmamıştı.", source: "Hülya" },
      i_hulya_alarm: { type: "ifade", title: "Susmayan alarm", text: "23:00 civarı laboratuvarın tank alarmı yirmi dakika çaldı, kimse kapatmadı.", source: "Hülya" },
      i_hulya_murat_kapi: { type: "ifade", title: "Cevapsız kapı", text: "23:10'da mum vermek için Murat'ın kapısını çaldı. Ses gelmedi.", source: "Hülya" },
      i_hulya_emre: { type: "ifade", title: "'Bavulunu topla'", text: "21:45'te Selim'in laboratuvarda Emre'ye 'Yarın sabah bavulunu topla!' diye bağırdığını duydu.", source: "Hülya" },
      i_hulya_sofra: { type: "ifade", title: "Sofrada düğme yoktu", text: "Yemekten sonra sofrayı tek tek kendisi topladı; masada kol düğmesi yoktu.", source: "Hülya" },
      i_hulya_baris: { type: "ifade", title: "Barış'ın kovulması", text: "Hülya'nın oğlu Barış iki yıl önce kasadan para çalmakla suçlanıp kovuldu. Hülya oğlunun masum olduğuna yemin ediyor.", source: "Hülya" },

      i_kenan_eve: { type: "ifade", title: "Kenan'ın mazereti", text: "21:15'te çıkıp evine gittiğini, sabaha kadar çıkmadığını söylüyor.", source: "Kenan", deny: ["c_kenan"] },
      i_kenan_tehdit: { type: "ifade", title: "Kenan tehdidi kabul etti", text: "Kenan yemekte 'Bu bağ seni de gömecek' dediğini kabul ediyor: 'Öfkeyle söylenmiş laf.' Kuyu ve su hakkı yüzünden kavgalılar.", source: "Kenan" },

      /* İddialar: birinin başkası hakkında söylediği, teyit edilmesi gereken bilgiler.
         confirm: bu bilgilerden biri bulununca "teyit edildi" olur. */
      ii_tehdit: { type: "iddia", title: "Yemekteki tehdit", text: "Kenan yemekten çıkarken Selim'e 'Bu bağ seni de gömecek' demiş.", source: "Söylenti", confirm: ["i_kenan_tehdit"] },
      ii_murat_hesap: { type: "iddia", title: "Selim, Murat'a hesap soruyordu", text: "Selim son günlerde Murat'a hesap soruyormuş; aralarında soğukluk varmış.", source: "Defne", confirm: ["i_hulya_denetci", "i_kenan_murat"] },
      ii_merdiven: { type: "iddia", title: "Merdivende biri mi vardı?", text: "Hülya sabah mutfakta, gece arka merdivende birini gördüğünü anlatıyormuş.", source: "Emre", confirm: ["i_hulya_merdiven"] },
      ii_defne_borc: { type: "iddia", title: "Defne borç içinde mi?", text: "Defne'nin galerisi batmak üzereymiş, borçları ciddiymiş.", source: "Murat", confirm: ["i_defne_borc"] },
      ii_iliski: { type: "iddia", title: "Defne ile Emre?", text: "Emre ile Defne'nin birbirine fazla yakın olduğu söyleniyor.", source: "Murat / Kenan", confirm: ["k_kenan_alibi"] },
      ii_baris: { type: "iddia", title: "Barış'a haksızlık mı edildi?", text: "Barış hırsız değilmiş; onu suçlayan dosya 'kokuyormuş'.", source: "Kenan", confirm: ["k_ajanda"] },
      i_kenan_fener: { type: "ifade", title: "Kaçan fener", text: "Işıklar sönünce, 23:15 gibi, mahzen kapısından bir el feneri ışığının evin arka merdivenine doğru koştuğunu gördü.", source: "Kenan" },
      i_kenan_murat: { type: "ifade", title: "Selim'in şüphesi", text: "Selim geçen hafta Kenan'a 'Murat'a hesap sordum, kıvırıyor' demiş.", source: "Kenan" },

      i_defne_oda: { type: "ifade", title: "Defne'nin mazereti", text: "22:15'te odasına çıkıp uyuduğunu söylüyor.", source: "Defne", deny: ["c_defne"] },
      i_defne_iskele: { type: "ifade", title: "Defne iskeledeydi", text: "Odasında değil, iskeledeymiş. Yalnız değilmiş ama kiminle olduğunu söylemiyor.", source: "Defne" },
      i_defne_vasiyet: { type: "ifade", title: "Yeni vasiyet", text: "Selim 22:00'de Defne'ye bağı bir vakfa bırakacağını söyledi.", source: "Defne" },
      i_defne_borc: { type: "ifade", title: "Defne'nin borçları", text: "Defne galerisinin batmak üzere olduğunu ve borçlu olduğunu kabul ediyor.", source: "Defne" },
      i_defne_dugme: { type: "ifade", title: "Hediye kol düğmeleri", text: "Defne, 'M.Ö.' kol düğmelerini Murat'a yıllar önce kendisinin hediye ettiğini söylüyor.", source: "Defne" },

      i_emre_lab: { type: "ifade", title: "Emre'nin mazereti", text: "Bütün gece laboratuvarda tankları kontrol ettiğini söylüyor.", source: "Emre", deny: ["c_emre"] },
      i_emre_disarida: { type: "ifade", title: "Emre dışarıdaydı", text: "22:15'te laboratuvardan çıkmış. Birini korumak için nerede olduğunu söylemiyor.", source: "Emre" },
      i_emre_koku: { type: "ifade", title: "Mahzendeki koku", text: "Cesedi bulduğunda mahzende şaraptan başka çiçeksi, kuru, sabunumsu bir koku vardı.", source: "Emre" },
      i_emre_kovulmadi: { type: "ifade", title: "'Kovulmadım'", text: "Emre, Selim'le sadece küçük bir anlaşmazlık yaşadığını, kovulmadığını söylüyor.", source: "Emre", deny: ["c_emre_kovma"] },
      i_emre_fatura: { type: "ifade", title: "Tutmayan faturalar", text: "Emre bir ay önce ihracat faturalarında tutmayan rakamlar görüp Selim'e bildirmiş. Selim ondan sonra hesapları incelemeye başlamış.", source: "Emre" },

      i_murat_oda: { type: "ifade", title: "Murat'ın mazereti", text: "22:00'den sabaha kadar odasında vasiyetnameyi hazırladığını, hiç çıkmadığını söylüyor.", source: "Murat", deny: ["c_murat_oda"] },
      i_murat_sise: { type: "ifade", title: "Murat'ın dil sürçmesi", text: "Murat ölümü anlatırken 'o şişeyle... o darbeyle' dedi.", source: "Murat" },
      i_murat_dugme: { type: "ifade", title: "Murat'ın düğme açıklaması", text: "Murat kol düğmesini 'akşam yemeğinde düşürdüğünü' söyledi.", source: "Murat", deny: ["c_murat_dugme"] },
      i_murat_lavanta: { type: "ifade", title: "Lavanta kolonyası", text: "Murat otuz yıldır aynı lavanta kolonyasını kullanıyor.", source: "Tanıklar" },
      i_murat_hesap: { type: "ifade", title: "'Hesaplar temiz'", text: "Murat hesaplarda hiçbir sorun olmadığını, denetçinin Selim'in 'takıntısı' olduğunu söyledi.", source: "Murat", deny: ["c_murat_hesap"] },
      i_murat_baris: { type: "ifade", title: "Barış dosyası", text: "Barış'ı kasadaki açıkla suçlayan dosyayı Murat hazırlamış.", source: "Murat" }
    },

    /* ------------- Kendiliğinden oluşan çelişkiler ve çıkarımlar ------------- */
    links: [
      { id: "c_defne", type: "celiski", when: ["i_defne_oda", "i_hulya_defne_oda"], title: "Defne odasında değildi", text: "Defne uyuduğunu söylüyor ama Hülya 22:45'te odayı boş buldu." },
      { id: "c_emre", type: "celiski", when: ["i_emre_lab", "i_hulya_alarm"], title: "Emre laboratuvarda değildi", text: "Emre laboratuvardaydım diyor ama tank alarmı yirmi dakika çaldı ve kimse kapatmadı." },
      { id: "c_emre_kovma", type: "celiski", when: ["i_emre_kovulmadi", "i_hulya_emre"], title: "Emre kovulmuştu", text: "Emre kovulmadığını söylüyor ama Hülya, Selim'in ona 'bavulunu topla' dediğini duydu." },
      { id: "c_kenan", type: "celiski", when: ["i_kenan_eve", "k_kenan_alibi"], title: "Kenan geri dönmüştü", text: "Kenan evine gittiğini söyledi ama 22:55–23:25 arası iskeledeydi." },
      { id: "c_hulya_kenan", type: "celiski", when: ["i_hulya_merdiven", "k_kenan_alibi"], title: "Merdivendeki Kenan değildi", text: "Hülya merdivende Kenan'ı gördüğünü sanıyor ama Kenan o saatte iskeledeydi. Merdivendeki başka biriydi." },
      { id: "c_murat_oda", type: "celiski", when: ["i_murat_oda", "i_hulya_murat_kapi"], title: "Murat odasında değildi", text: "Murat odasından hiç çıkmadığını söylüyor ama 23:10'da kapısı çalındığında cevap vermedi." },
      { id: "c_murat_sise", type: "celiski", when: ["i_murat_sise", "k_sise"], title: "Murat silahı biliyor", text: "Şüphelilere 'raf devrildi' denmişti. Murat ise cinayet silahının bir şişe olduğunu biliyor." },
      { id: "c_murat_dugme", type: "celiski", when: ["i_murat_dugme", "k_dugme"], title: "Düğme yemekte düşmedi", text: "Murat düğmeyi yemekte düşürdüğünü söylüyor ama düğme mahzen merdiveninde bulundu." },
      { id: "c_murat_hesap", type: "celiski", when: ["i_murat_hesap", "k_ajanda"], title: "Hesaplar temiz değildi", text: "Murat hesapların temiz olduğunu söyledi; Selim'in ajandasında 'M. 4,2 milyon' yazıyor." },
      { id: "c_murat_dekont", type: "celiski", when: ["i_murat_hesap", "k_dekont"], title: "Para Murat'ın şirketine gitmiş", text: "Murat hesapların temiz olduğunu söyledi ama 4,2 milyon kendi şirketine aktarılmış." },
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
      kasa_sifre: { k: ["sifre|kasanin|kasasinin|kasasi|kasayi|kasaya|celik kasa"], p: 3 },
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
      strong: ["k_dekont", "c_murat_dekont", "k_dugme", "c_murat_dugme", "c_murat_sise", "c_murat_oda", "d_koku", "d_merdiven", "d_motive", "k_ajanda", "c_murat_hesap", "d_baris", "i_hulya_lavanta", "i_defne_dugme"]
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
        text: ["Suçladığınız kişi doğru olabilir ama sebep yanlış. Savcı 'Bu kişi Selim'i neden o gece öldürsün?' diye soruyor. Selim'in son günlerde neyle uğraştığına bakın."]
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
        opening: "Yine mi soru? Jandarmaya her şeyi anlattım zaten. Peki, sorun bakalım.",
        alias: { selim: "baba|babani|babaniz|babanin|babaniza|babana", kenan: "amca|amcan|amcaniz" },
        topics: [
          { id: "selam", a: "Merhaba. Kusura bakmayın, pek konuşacak halim yok." },
          { id: "tesekkur", a: "Rica ederim. Siz sadece babama bunu yapanı bulun." },
          { id: "kim", ask: "Kendinizden bahseder misiniz?", a: "Defne Karahan, Selim Karahan'ın kızıyım. Tek varisi olduğumu düşünüyorsanız artık değilim. Onu da öğrenirsiniz nasılsa." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "Yemekten sonra, 22:15 gibi odama çıktım. Başım ağrıyordu, yattım. Bağırışlara uyandım.", f: "Evet, bütün gece odamdaydım. Neden bu kadar üstüme geliyorsunuz?", gives: ["i_defne_oda"] },
            { req: ["c_defne"], a: "Hülya Abla odaya mı gelmiş? Tamam, odamda değildim. İskeledeydim. Babamla kavga etmiştim, biraz hava almam lazımdı. Yalnız da değildim ama kiminle olduğumu sormayın.", f: "Sormayın dedim. Benim yüzümden onun da başı derde girsin istemiyorum.", gives: ["i_defne_iskele"] },
            { req: ["k_kenan_alibi"], a: "Emre'yleydim, 22:30'dan 23:35'e kadar iskelede. Babam bilmiyordu. Artık hiç bilmeyecek." }
          ] },
          { id: "birlikte", ask: "Kiminleydiniz?", v: [
            { a: "Kiminle olacağım? Odamdaydım dedim ya. Benim özel hayatım sizi ilgilendirmez." },
            { req: ["i_defne_iskele"], a: "Adını vermem. Söylersem onun da hayatı karışır. O kendisi anlatırsa ben de anlatırım." },
            { req: ["i_defne_iskele", "i_emre_disarida"], a: "Emre de anlattı demek. Peki. Bir yıldır birlikteyiz, babam asla kabul etmezdi. O gece 22:30'dan 23:35'e kadar iskeledeydik. Işıklar gitmeden biraz önce bekçi kulübesinin önüne biri gelip sigara yaktı. Amcamdı, o eski fenerini nerede görsem tanırım. Işıklar gelene kadar, 23:25'e kadar oradan kıpırdamadı. Biz de görmesin diye saklandık.", gives: ["k_kenan_alibi"] }
          ] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Amcamla babam yine kuyu yüzünden kapıştı. Amcam çıkarken 'Bu bağ seni de gömecek Selim' dedi. Herkes duydu.", f: "Amcam sinirlenince böyle konuşur. Ama o gece gerçekten çok öfkeliydi, yalan yok.", gives: ["ii_tehdit"] },
          { id: "vasiyet", ask: "Vasiyet konusunda ne biliyorsunuz?", a: "Babam saat on gibi beni çalışma odasına çağırdı. Bağı bir vakfa bırakacakmış. 'Sen burayı satarsın' dedi. Belki haklıydı da. Biliyorum, bu beni şüpheli yapıyor. Ama ben yapmadım.", f: "Ağladım, bağırdım, kapıyı çarpıp çıktım. Hepsi bu.", gives: ["i_defne_vasiyet"] },
          { id: "borc", a: "Galerim batıyor, evet. Kim söyledi, Murat amca mı? Borcum var ama babamı öldürecek kadar değil.", gives: ["i_defne_borc"] },
          { id: "elektrik", ask: "Işıklar söndüğünde ne oldu?", v: [
            { a: "Uyuyordum dedim ya. Uyandığımda ışıklar gelmişti bile." },
            { req: ["i_defne_iskele"], a: "Işıklar gittiğinde iskeledeydim. Bütün koy karardı. Sadece fırtınanın sesi vardı, bir de bekçi kulübesinin önünde yanan bir sigara. Orada biri vardı." }
          ] },
          { id: "nasil", ask: "Babanız nasıl öldü sizce?", a: "Jandarma raf devrildi dedi. Babam o mahzeni avucunun içi gibi bilirdi. Raflar öyle durduk yere devrilmez." },
          { id: "sise", a: "Şişe mi? Ne şişesi? Bize raf devrildi dediler." },
          { id: "ceset", a: "Emre bağırınca hepimiz aşağı koştuk. Ben babamın yüzüne bakamadım, merdivende kaldım." },
          { id: "hesap", ask: "Babanızın hesaplarıyla ilgili bir şey biliyor musunuz?", v: [
            { a: "Babamın hesaplarıyla hep Murat amca ilgilenirdi. Ben hiç karışmadım." },
            { req: ["k_kenan_alibi"], a: "Size bir şey söyleyeceğim. Sabah vasiyetle ilgili bir not var mı diye babamın çalışma odasına girdim, ajandasını aldım. Son sayfaya bakın, hesapları anlarsınız.", gives: ["k_ajanda"] }
          ] },
          { id: "ajanda", ask: "Babanızın çalışma odasından bir şey aldınız mı?", locked: "Babamın odası mı? Hayır, girmedim. Yani... şu an bunu konuşmak istemiyorum.", v: [
            { req: ["k_kenan_alibi"], a: "Evet, aldım. Sabah vasiyetle ilgili bir not var mı diye babamın ajandasına baktım. Alın, son sayfayı okuyun.", gives: ["k_ajanda"] }
          ] },
          { id: "kovulma", v: [
            { a: "Babam Emre'yi mi kovmuş? Bilmiyordum." },
            { req: ["k_kenan_alibi"], a: "O akşam babam bizi bağda görmüş. Emre'ye 'Yarın bavulunu topla' demiş. Emre iskelede anlattı." }
          ] },
          { id: "baris", a: "Barış, Hülya Abla'nın oğlu. Babam ona hırsız dedi ve kovdu. Ben hiç inanmadım; Barış çocukluk arkadaşımdır." },
          { id: "koku", a: "Lavanta mı? Murat amca. Lavanta deyince aklıma o gelir." , gives: ["i_murat_lavanta"] },
          { id: "dugme", locked: "Ne düğmesi?", v: [
            { req: ["k_dugme"], a: "'M.Ö.' Murat Öztürk. Bu kol düğmelerini yıllar önce babamın doğum gününde ona ben hediye ettim.", gives: ["i_defne_dugme"] }
          ] },
          { id: "sucla", ask: "Babanızı siz mi öldürdünüz?", v: [
            { a: "Ne? Hayır! Babamla kavga ettik diye onu öldürecek değilim ya.", f: "Bilmiyorum! Bulmak sizin işiniz. Ben sadece benim yapmadığımı biliyorum." },
            { req: ["k_kenan_alibi"], a: "Hayır. O saatte Emre'yleydim, artık bunu siz de biliyorsunuz." }
          ] },
          { id: "katil", ask: "Sizce babanızı kim öldürdü?", v: [
            { a: "Bilmiyorum. Ama o akşam babama kızgın olan tek kişi ben değildim.", f: { a: "Amcam yemekte babamı herkesin önünde tehdit etti. Murat amcayla da araları bozuktu, son günlerde birbirlerinin yüzüne bakmıyorlardı. Gerisini siz bulun.", gives: ["ii_tehdit", "ii_murat_hesap"] } },
            { req: ["k_ajanda"], a: "Ajandayı okudunuz. 4,2 milyon... Ben de o 'M.' harfinden gözümü alamıyorum." }
          ] },
          { id: "yalan", v: [
            { a: "Neden yalan söyleyeyim? Kanıtınız varsa gösterin." },
            { req: ["c_defne"], a: "Tamam, tamam. Odamda değildim. İskeledeydim. Daha fazlasını şimdilik sormayın.", gives: ["i_defne_iskele"] },
            { req: ["k_kenan_alibi"], a: "Artık saklayacak bir şeyim yok. Emre'yle birlikteydim." }
          ] }
        ],
        about: {
          selim: "Babam inatçı ve gururluydu, bazen de acımasız. Ama dürüsttü. Kandırılmaktan nefret ederdi. Son birkaç gündür bir şeye kafayı takmıştı, çalışma odasından çıkmıyordu.",
          murat: { a: "Murat amca mı? Babamın lise arkadaşı, avukatı. Lavanta kolonyasının kokusunu kilometrelerce öteden alırsınız. Fazla kibar, fazla düzgün biri. Son zamanlarda babamla pek konuşmuyorlardı.", gives: ["i_murat_lavanta"] },
          kenan: { v: [
            { a: "Amcam bağırır çağırır ama babamı severdi. Kuyu meselesi yıllardır sürüyor. O gece çok sinirliydi, inkâr etmeyeceğim." },
            { req: ["k_kenan_alibi"], a: "Amcam yapamaz. O süre boyunca gözümün önündeydi." }
          ] },
          emre: { v: [
            { a: "Emre bağın enoloğu. İyi biridir, babam ona güvenirdi. Neden soruyorsunuz?" },
            { req: ["k_kenan_alibi"], a: "Ben Emre'yi korudum, o da beni. İkimiz de aptalca yalanlar söyledik." }
          ] },
          hulya: "Hülya Abla beni büyüttü sayılır. Bu evde olan biten her şeyi bilir. O gece de elinde mumla her yeri dolaşıyordu."
        },
        show: {
          k_otopsi: "Raf sonradan mı devrilmiş? Yani biri kaza gibi göstermeye çalışmış. Allahım...",
          k_sise: "1987, benim doğduğum yıl. Babam o şişeyi düğünüm için saklıyordu. Onunla mı?",
          i_hulya_defne_oda: { a: "Hülya Abla mı söyledi? Peki. Odamda değildim, iskeledeydim. Yalnız değildim ama kiminle olduğumu söylemem.", gives: ["i_defne_iskele"] },
          c_defne: { a: "Peki, yakaladınız. Odamda değildim, iskeledeydim. Yalnız değildim ama kiminle olduğumu söylemeyeceğim.", gives: ["i_defne_iskele"] },
          i_emre_disarida: { v: [
            { a: "Emre dışarıdaymış. Bunu bana neden söylüyorsunuz?" },
            { req: ["i_defne_iskele"], a: "Demek o da söyledi. Evet, birlikteydik. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar sönmeden az önce bekçi kulübesinin önünde amcamı gördük. O eski feneriyle sigara içiyordu ve 23:25'e kadar hiç kıpırdamadı.", gives: ["k_kenan_alibi"] }
          ] },
          k_ajanda: "Babamın el yazısı. 'Barış değilmiş'... Babam Barış'a hırsız demişti. Hülya Abla'nın yüzüne nasıl bakacağız şimdi?",
          k_dugme: { a: "'M.Ö.' Murat Öztürk. Bu kol düğmelerini ona ben hediye etmiştim.", gives: ["i_defne_dugme"] },
          i_kenan_tehdit: "Amcam öfkelenince ağzına geleni söyler. Ama öldürmez.",
          k_kenan_alibi: "Evet. Amcamdı ve oradan hiç ayrılmadı.",
          i_murat_dugme: "Yemekte mi düşürmüş? Ben bütün yemek boyunca karşısında oturdum. Kollarında ikisi de vardı.",
          d_motive: "Babam onu affetmeyecekti. Ve aynı gece öldü."
        },
        noShow: ["Bunu bana neden gösteriyorsunuz?", "Bu bana bir şey ifade etmiyor.", "Bilmiyorum. Başkasına sorun."],
        repeat: ["Bunu az önce konuştuk.", "Aynı şeyi sormanız cevabı değiştirmez.", "Söyledim ya. Başka bir şey sorun."],
        ack: ["Başka?", "Sorunuz bittiyse biraz yalnız kalmak istiyorum."],
        locked: ["Bu konuyu konuşmak istemiyorum.", "Şimdi olmaz.", "Elinizde bir şey yoksa bu konuda konuşmam."],
        deflect: [
          { a: "Bunu bilmiyorum. Ama şunu söyleyeyim: amcam yemekten çıkarken babama 'Bu bağ seni de gömecek' dedi. Herkes duydu.", gives: ["ii_tehdit"], until: "ii_tehdit" },
          { a: "Bilmiyorum. Bildiğim tek şey, babamın son günlerde Murat amcaya hesap sorduğu. Aralarında bir soğukluk vardı.", gives: ["ii_murat_hesap"], until: "ii_murat_hesap" },
          { a: "O gece ev zifiri karanlıktı. Ben bir şey görmedim, görmek de istemedim." },
          { a: "Sorularınız dağınık, dedektif. Babamın neden öldüğünü bulmanız gerekiyor, benim ne hissettiğimi değil." },
          { a: "Bilmiyorum, gerçekten. Babamı kaybettim, kafam yerinde değil." },
          { a: "Bu konuda söyleyecek bir şeyim yok." }
        ]
      },

      /* ---------- EMRE ---------- */
      emre: {
        name: "Emre Aslan", short: "Emre", age: 31, role: "Enolog", initials: "EA", color: "#4f8a6e",
        bio: "Bağın şarap uzmanı. Dört yıldır Ayazma'da çalışıyor. Cesedi 23:40'ta mahzende ilk o buldu.",
        opening: "Merhaba. Cesedi ben buldum, biliyorsunuzdur. Ne sormak istiyorsanız sorun.",
        topics: [
          { id: "selam", a: "İyi akşamlar. Kusura bakmayın, bütün gece uyuyamadım." },
          { id: "tesekkur", a: "Rica ederim. Elimden geleni yaparım." },
          { id: "kim", ask: "Burada ne iş yapıyorsunuz?", a: "Emre Aslan. Enoloğum, yani bağın şarap işleri bende. Fermantasyon, şişeleme, hepsi. Dört yıldır buradayım." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "Bütün gece laboratuvardaydım. Hasat zamanı tanklar kontrol ister, yarım saatte bir sıcaklıklarına bakarım.", f: "Tanklara baktım, deftere yazdım. Normal bir hasat gecesiydi işte.", gives: ["i_emre_lab"] },
            { req: ["c_emre"], a: "Alarm. Evet... Laboratuvarda değildim. 22:15'te çıktım. Nerede ve kiminle olduğumu söyleyemem, birini korumam lazım.", f: "Söyleyemem dedim. Onun ailesi zaten yıkılmış durumda.", gives: ["i_emre_disarida"] },
            { req: ["k_kenan_alibi"], a: "Defne'yle iskeledeydim. Bunu artık siz de biliyorsunuz." }
          ] },
          { id: "lab", ask: "Laboratuvarda o gece her şey normal miydi?", v: [
            { a: "Tank sıcaklıkları, şeker ölçümleri, her şey normaldi. Hepsini deftere yazdım." },
            { req: ["i_hulya_alarm"], a: "Alarm mı çalmış? Duymamışım demek. Kulaklık takmıştım belki." },
            { req: ["c_emre"], a: "Tamam. Laboratuvarda değildim, 22:15'te çıktım. Alarmı da bu yüzden kimse kapatmadı. Ama nerede olduğumu söyleyemem.", gives: ["i_emre_disarida"] }
          ] },
          { id: "ceset", ask: "Cesedi nasıl buldunuz?", a: "23:40'ta laboratuvara dönerken mahzen kapısını aralık gördüm. Jeneratör çalışıyordu. İndim, Selim Bey rafın altındaydı. Aşağıda garip bir koku da vardı. Şarap değil, çiçek gibi, kuru, sabun gibi bir şey. O mahzen öyle kokmaz.", f: "Hemen bağırıp herkesi çağırdım. Nabzına baktım, yoktu. Sonrası biraz bulanık.", gives: ["i_emre_koku"] },
          { id: "koku", ask: "Mahzendeki koku neye benziyordu?", v: [
            { a: "Burnum benim işim. Mahzende çiçeksi bir koku vardı. Gül değil, daha kuru, sabun gibi. Adını koyamadım.", gives: ["i_emre_koku"] },
            { req: ["i_murat_lavanta"], a: "Lavanta! Evet, oydu. Şimdi çıkardım.", gives: ["i_emre_koku"] }
          ] },
          { id: "elektrik", v: [
            { a: "Elektrik 23:05'te gitti. Jeneratör mahzende, Selim Bey onu hep kendisi çalıştırırdı, kimseye elletmezdi." },
            { req: ["i_emre_disarida"], a: "Işıklar söndüğünde dışarıdaydım. Koy zifiri karanlıktı. Jeneratörü Selim Bey çalıştırırdı, kimseye dokundurmazdı." }
          ] },
          { id: "sise", ask: "Mahzendeki şişeler hakkında ne söyleyebilirsiniz?", a: "1987 magnum mu? Mahzenin en değerli şişesi o. Selim Bey ona dokunanı öldürür... Pardon, ağzımdan kaçtı. Onu raftan alan her kimse ne aldığını umursamamış. Eline ilk geçen ağır şeyi kapmış." },
          { id: "birlikte", v: [
            { a: "Ne ilişkisi? Ben burada çalışıyorum, o kadar." },
            { req: ["i_emre_disarida"], a: "Adını size veremem. Önce o konuşmalı. Sonuçta bu onun ailesi." },
            { req: ["i_defne_iskele", "i_emre_disarida"], a: "Defne de anlattı demek. Evet, birlikteyiz. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar gitmeden önce bekçi kulübesinin önüne Kenan Bey geldi, sigara yaktı. 23:25'e kadar oradan ayrılmadı. Görmesin diye kayıkhanenin arkasına saklandık.", gives: ["k_kenan_alibi"] }
          ] },
          { id: "kovulma", ask: "Selim Bey'le aranızda bir sorun var mıydı?", k: ["kovul|kovdu|kovma|isten cik|isten at|bavul|isini kayb|sorun|anlasmazlik|aranizda bir|arasi"], v: [
            { a: "Kovulmak mı? Yok, küçük bir tartışma oldu sadece.", gives: ["i_emre_kovulmadi"] },
            { req: ["k_kenan_alibi"], a: "Selim Bey 21:45'te laboratuvara geldi. Bizi bağda görmüş. 'Yarın sabah bavulunu topla, kızımdan da uzak dur' dedi. Evet, bu beni şüpheli yapar. Ama o saatte Defne'yleydim." }
          ] },
          { id: "kasa_sifre", ask: "Selim Bey şifreleri nasıl seçerdi?", a: "Şifre mi? Bilmem. Ama Selim Bey'in bir huyu vardı, her şeyi tersten yazardı. Mahzendeki raf etiketlerini bile tersten numaralandırmıştı. Garip adamdı.", gives: ["i_emre_ters"] },
          { id: "tartisma", a: "Yemekte Kenan Bey ile Selim Bey kuyu yüzünden bağırıştı. Kenan Bey çok sinirli çıktı.", gives: ["ii_tehdit"] },
          { id: "hesap", ask: "Bağın hesaplarında bir tuhaflık var mıydı?", a: "Hesaplar benim işim değil ama geçen ay ihracat faturalarında tutmayan rakamlar gördüm, Selim Bey'e söyledim. Ondan sonra bir tuhaf oldu, çalışma odasına kapanıp eski hesapları karıştırmaya başladı.", f: "Rakamları tam hatırlamıyorum. Ama Hamburg'a kesilen faturalarla bankaya gelen para tutmuyordu, onu biliyorum.", gives: ["i_emre_fatura"] },
          { id: "nasil", a: "Raf devrilmiş, öyle görünüyordu. Ama o raflar duvara vidalıdır; devirmek için güç ister." },
          { id: "sucla", v: [
            { a: "Hayır! Selim Bey bana iş verdi, ekmek verdi. Neden öldüreyim?", f: "Ben nereden bileyim? Ben sadece cesedi buldum." },
            { req: ["c_emre_kovma"], a: "Kovuldum diye mi? Hayır. Kızgındım, evet, ama ben kimseye el kaldırmam." },
            { req: ["k_kenan_alibi"], a: "Hayır. O saatte Defne'yleydim, iskelede." }
          ] },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Bilmiyorum. Kenan Bey o akşam tehditler savurdu, herkes duydu. Ama emin değilim.", f: { a: "Bir de mahzendeki o koku var. Kimin kokusu bilmiyorum ama aklımdan çıkmıyor.", gives: ["i_emre_koku"] } },
            { req: ["k_kenan_alibi"], a: "Kenan Bey değil, o kesin. Mahzendeki o koku aklımdan çıkmıyor." }
          ] },
          { id: "yalan", v: [
            { a: "Yalan söylemiyorum. Neden söyleyeyim ki?" },
            { req: ["c_emre"], a: "Haklısınız. Laboratuvarda değildim, dışarıdaydım. Kimi koruduğumu sormayın.", gives: ["i_emre_disarida"] },
            { req: ["c_emre_kovma"], a: "Evet, kovuldum. Ama bunun cinayetle ilgisi yok." }
          ] },
          { id: "baris", a: "Barış'ı az tanırdım; ben geldikten kısa süre sonra kovuldu. Kasadan para çalmakla suçlandı. Hülya Hanım hâlâ kabullenemedi." }
        ],
        about: {
          selim: { a: "Selim Bey zor ama adil bir adamdı. Şaraba saygısı vardı. Tuhaf huyları da vardı tabii, her şeyi tersten yazardı mesela.", gives: ["i_emre_ters"] },
          defne: { v: [
            { a: "Defne Hanım mı? Selim Bey'in kızı. İstanbul'da yaşıyor. Onu pek tanımam." },
            { req: ["k_kenan_alibi"], a: "Onu seviyorum. Bu kadar basit." }
          ] },
          murat: { a: "Murat Bey her hasatta gelir, hesaplara bakar. Bana hep tepeden bakar. Geçen ay ihracat faturalarında tutmayan rakamlar gördüm ve Selim Bey'e söyledim. Ondan sonra Selim Bey kapanıp hesapları incelemeye başladı.", gives: ["i_emre_fatura"] },
          kenan: "Kenan Bey'in bağı bizimkinin hemen yanında. Kuyu iki bağın sınırında; yıllardır kavga konusu.",
          hulya: { a: "Hülya Hanım bu evin direği. Oğlu Barış da burada çalışırdı; iki yıl önce kasadan para çalmakla suçlanıp kovuldu.", gives: ["i_hulya_baris"] }
        },
        show: {
          k_otopsi: "Raf sonradan mı devrilmiş? Yani benim gördüğüm her şey düzmeceymiş.",
          k_sise: "1987 magnum. Mahzenin en değerli şişesi. Kim aldıysa ne aldığını umursamamış, eline ilk geçeni kapmış.",
          i_hulya_alarm: { a: "Alarm... Kapatan olmadı, değil mi? Peki. Laboratuvarda değildim, 22:15'te çıktım. Kiminle olduğumu söyleyemem.", gives: ["i_emre_disarida"] },
          c_emre: { a: "Tamam. Laboratuvarda değildim. Dışarıdaydım. Kimi koruduğumu sormayın.", gives: ["i_emre_disarida"] },
          i_defne_iskele: { a: "Demek anlattı. Evet, benimleydi. 22:30'dan 23:35'e kadar iskeledeydik. Işıklar gitmeden önce bekçi kulübesinin önünde Kenan Bey'i gördük. 23:25'e kadar sigara içti, hiç ayrılmadı.", gives: ["i_emre_disarida", "k_kenan_alibi"] },
          i_hulya_emre: { a: "Evet, kovdu. Defne'yle beni bağda görmüş. Ama insan bunun için adam mı öldürür?", gives: ["i_emre_kovulmadi"] },
          i_murat_lavanta: "Lavanta! Evet, mahzendeki koku buydu.",
          k_dugme: "Murat Bey'in kol düğmeleri bunlar. Her hasat yemeğinde takar.",
          k_ajanda: "'M. 4,2 milyon'... Faturalardaki fark aşağı yukarı bu kadardı.",
          i_murat_hesap: "Temiz mi? Faturaları ben gördüm. Temiz değildi."
        },
        noShow: ["Bunun hakkında bir şey bilmiyorum.", "Hmm... Bu bana bir şey anlatmıyor, kusura bakmayın.", "Bunu başkasına sorsanız daha iyi olur."],
        repeat: ["Az önce anlattım ya.", "Söylediklerimin arkasındayım.", "Bunu konuştuk. Başka bir şey var mı?"],
        ack: ["Başka bir şey var mı?", "Peki."],
        locked: ["Bunu... şimdi konuşamam.", "Bu konuda bir şey söylemem doğru olmaz."],
        deflect: [
          { a: "Bunu bilemem. Ama sabah Hülya Hanım mutfakta, gece arka merdivende birini gördüğünü anlatıyordu. Çok korkmuştu.", gives: ["ii_merdiven"], until: "ii_merdiven" },
          { a: "Bilmiyorum... Ama cesedi bulduğumda mahzende tuhaf bir koku vardı. Çiçeksi, kuru bir koku. Aklımdan çıkmıyor.", gives: ["i_emre_koku"], until: "i_emre_koku" },
          { a: "Benim alanım şarap. Ama geçen ay ihracat faturalarında tutmayan rakamlar görmüştüm, Selim Bey'e söyledim. Sonrasını bilmiyorum.", gives: ["i_emre_fatura"], until: "i_emre_fatura" },
          { a: "Bilmiyorum, kusura bakmayın." },
          { a: "Ben o sırada... Yani, bu konuda bir şey diyemem." },
          { a: "Bu soruya nasıl cevap vereceğimi bilmiyorum." }
        ]
      },

      /* ---------- HÜLYA ---------- */
      hulya: {
        name: "Hülya Tekin", short: "Hülya", age: 56, role: "Kâhya", initials: "HT", color: "#b08a3e",
        bio: "Bağevinin kâhyası, yirmi beş yıldır Karahan ailesinin yanında. Elektrik kesildiğinde odalara mum dağıtan kişi.",
        opening: "Buyur evladım, otur. Çay koyayım mı? Selim Bey'e bunu yapanı bul, Allah rızası için.",
        topics: [
          { id: "selam", a: "Hoş geldiniz evladım. Çayınız geliyor." },
          { id: "tesekkur", a: "Ne demek evladım. Siz yeter ki bulun." },
          { id: "kim", ask: "Kendinizi tanıtır mısınız?", a: "Hülya Tekin. Bu evin kâhyasıyım, yirmi beş yıl oldu. Defne Hanım'ı kucağımda büyüttüm." },
          { id: "nerede", ask: "O gece neredeydiniz?", a: "Mutfaktaydım. Sofrayı topladım, bulaşığı yıkadım. 22:45'te Defne Hanım'a ıhlamur çıkardım. Elektrik gidince de odalara mum dağıttım." },
          { id: "oda", ask: "Defne Hanım'a ıhlamur götürdüğünüzde ne gördünüz?", a: "22:45'te Defne Hanım'a ıhlamur götürdüm. Kapı açıktı, oda boştu. Yatak bile bozulmamıştı. Bahçeye çıkmıştır dedim, üstünde durmadım.", gives: ["i_hulya_defne_oda"] },
          { id: "elektrik", ask: "Elektrik kesilince ne yaptınız?", a: "23:05'te her yer karardı. Mumları aldım, önce mutfağa, sonra yukarı. 23:10'da Murat Bey'in kapısını çaldım, ses gelmedi, uyuyor sandım. Sonra arka merdivenden inerken birini gördüm.", f: { a: "Biri hızla yanımdan geçti, mahzen tarafından geliyordu. Mum söndü. Kenan Bey'di, eminim.", gives: ["i_hulya_merdiven"] }, gives: ["i_hulya_murat_kapi"] },
          { id: "murat_oda", k: ["murat|avukat", "oda|kapi|kapisi|kapisini|mum"], ask: "Murat Bey'in odasına uğradınız mı?", p: 3, a: "Uğradım. 23:10'da mum vermek için kapısını çaldım. Ses gelmedi. Uyuyor sandım, yaşlı adam diye rahatsız etmedim.", gives: ["i_hulya_murat_kapi"] },
          { id: "merdiven", ask: "Merdivende kimi gördünüz?", v: [
            { a: "23:15 sularıydı. Arka merdivende biri mahzen tarafından hızla çıktı, yanımdan geçti. Uzun boylu, iri biri. Mum söndü, yüzünü göremedim. Kenan Bey'di, eminim. O akşam ne kadar öfkeliydi!", f: "Yüzünü görmedim dedim ya. Ama o boy pos, o öfke... Başka kim olacak?", gives: ["i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Kenan Bey iskeledeymiş... O zaman merdivendeki o değildi. Dur, düşüneyim. Yanımdan geçerken bir koku gelmişti, lavanta. Kenan Bey tütün kokar. Bir de sabah mahzen merdiveninin dibinde bir şey buldum, düşünmeden cebime atmışım. Gümüş bir kol düğmesi. Al bak.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] }
          ] },
          { id: "gordun", ask: "O gece tuhaf bir şey gördünüz mü?", v: [
            { a: "Gördüm evladım. 23:15'te arka merdivende biri yanımdan hızla geçti, mahzen tarafından geliyordu. Uzun boylu, iri. Mum söndü. Kenan Bey'di, eminim.", f: "Yüzünü görmedim dedim ya. Ama o boy pos, o öfke... Başka kim olacak?", gives: ["i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Merdivendeki Kenan Bey değilmiş demek. O zaman o lavanta kokusu neydi? Bir de sabah merdivenin dibinde bunu buldum. Gümüş bir kol düğmesi, al.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] }
          ] },
          { id: "lab", ask: "Laboratuvarda bir şey duydunuz mu?", a: "Emre Bey laboratuvardaymış, öyle diyor. Ama 23'e doğru laboratuvarın tank alarmı yirmi dakika çaldı, kimse kapatmadı. Evde biri olsa koşup kapatırdı.", gives: ["i_hulya_alarm"] },
          { id: "kovulma", ask: "Selim Bey o akşam Emre'yle konuştu mu?", k: ["emre|enolog|kovul|kovdu|bavul", "konus|bagir|kovul|kovdu|kovma|bavul|isten|laboratuvara"], a: "21:45'te Selim Bey laboratuvara gitti. Bağırdığını duydum: 'Yarın sabah bavulunu topla!' Emre Bey'e söylüyordu. Neden, bilmiyorum.", gives: ["i_hulya_emre"] },
          { id: "hesap", ask: "Selim Bey ile Murat Bey neden tartıştı?", k: ["hesap|para|zimmet|denetci|denetim|muhasebe|milyon|kasa|murat|avukat|calisma oda", "hesap|para|zimmet|denetci|denetim|muhasebe|milyon|kasa|tartis|kavga|bagir|konus|calisma oda"], a: "21:30'da çalışma odasına kahve götürdüm. Selim Bey bağırıyordu, 'Yarın Ankara'dan denetçi geliyor Murat, her kuruşa bakacak!' diye. Murat Bey bembeyaz olmuştu. Kahveyi bırakıp çıktım.", f: "Murat Bey pek bir şey demedi, 'Selim, abartıyorsun' dedi galiba. Ben de fazla durmadım, ayıp olur.", gives: ["i_hulya_denetci"] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Yemek kötü bitti. Kenan Bey ile Selim Bey kuyu yüzünden kavga ettiler. Kenan Bey 21:15'te 'Bu bağ seni de gömecek!' deyip kapıyı çarptı. Sonra da çalışma odasında Selim Bey ile Murat Bey bağırıştı.", gives: ["ii_tehdit"] },
          { id: "baris", ask: "Oğlunuza ne oldu?", p: 4, k: ["=baris|barisi|barisin|barisa|oglun|oglunuz|=oglu", "=baris|barisi|barisin|barisa|oglun|oglunuz|=oglu|kasa|para|cal|kov|sucla|ne oldu|neden"], v: [
            { a: "Barış'ım... İki yıl önce Selim Bey onu kasadan para çalmakla suçlayıp kovdu. Oğlum yapmadı, yemin ederim. Çok kırıldım ama gitmedim, bu ev benim de evim.", gives: ["i_hulya_baris"] },
            { req: ["k_ajanda"], a: "'Barış değilmiş' mi yazmış? Selim Bey biliyormuş demek... Özür dileyecekmiş. Parayı başkası almış yani. O zaman da hesaplara Murat Bey bakıyordu, dosyayı o hazırlamıştı.", gives: ["i_hulya_baris", "i_murat_baris"] }
          ] },
          { id: "dugme", locked: "Ne düğmesi evladım? Benim aklım düğmeye mi kaldı?", v: [
            { req: ["k_dugme"], a: "Sabah mahzen merdiveninin dibinde buldum. Yemekte mi düşmüş? Yok evladım, sofrayı ben topladım, tek tek. Masada öyle bir şey yoktu.", gives: ["i_hulya_sofra"] }
          ] },
          { id: "koku", v: [
            { a: "Lavanta mı? Murat Bey sürer onu. Çamaşırlara da lavanta koyarım ama o başka, kuru kuru kokar.", gives: ["i_murat_lavanta"] },
            { req: ["k_kenan_alibi"], a: "Merdivendeki kişiden lavanta kokusu geliyordu. Kenan Bey sandığım için aklıma yatmamıştı. Ama o kolonyayı Murat Bey sürer.", gives: ["i_hulya_lavanta", "i_murat_lavanta"] }
          ] },
          { id: "kasa_sifre", ask: "Selim Bey'in kasasının şifresini kim bilir?", k: ["sifre|kasanin|kasasinin|kasasi|kasayi|kasaya|=kasa", "sifre|kasanin|kasasinin|kasasi|kasayi|kasaya|=kasa|kim|bilir|biliyor|nasil"], p: 5, a: "Kasanın şifresini kimse bilmezdi evladım. Ama Selim Bey hep 'en sevdiğim şişenin yılı' derdi, gülerdi. Şifreyi oradan yaptığını söylerdi.", gives: ["i_hulya_kasa"] },
          { id: "ceset", a: "Emre Bey'in bağırışını duydum, 23:40'tı. Koştum. Selim Bey rafın altındaydı. Şişeler kırılmış, her yer şarap olmuştu." },
          { id: "sise", a: "O şişe mi? Selim Bey onu Defne Hanım doğduğunda almıştı. Düğününde açacaktı." },
          { id: "nasil", a: "Kaza diyorlar ama ben inanmıyorum evladım. Selim Bey o mahzende gözü kapalı yürürdü." },
          { id: "sucla", v: [
            { a: "Tövbe tövbe! Yirmi beş yıl bu evin ekmeğini yedim, ben mi kıyacağım ona?", f: { a: "Bilmem evladım. Ama o gece arka merdivende birini gördüm, onu söyleyeyim. Yanımdan koşarak geçti.", gives: ["i_hulya_merdiven"] } },
            { req: ["i_hulya_baris"], a: "Oğlum yüzünden mi? Kırgındım evladım, ama kin tutmam. Allah'tan korkarım." }
          ] },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Allah affetsin, aklıma Kenan Bey'den başkası gelmiyor. Merdivende gördüğüm oydu.", f: { a: "Gözümle gördüm evladım, merdivende. Yüzünü seçemedim ama o iri cüsse... Kenan Bey'di.", gives: ["i_hulya_merdiven"] } },
            { req: ["k_kenan_alibi"], a: "Kenan Bey değilse... O lavanta kokusu. Bu evde o kolonyayı kim sürer, sen de biliyorsun." }
          ] },
          { id: "yalan", v: [
            { a: "Ben yirmi beş yıldır bu evde yalan söylemedim evladım." },
            { req: ["c_hulya_kenan"], a: "Yalan değil, yanılmışım! Karanlıktı, öyle sandım. Kenan Bey değilse... dur, bir düşüneyim." }
          ] }
        ],
        about: {
          selim: "Selim Bey sert adamdı ama eli açıktı. Hatasını da kabul ederdi. Bir tek Barış'ımın meselesinde etmedi.",
          defne: { a: "Defne Hanım benim kızım gibidir. 22:45'te ona ıhlamur götürdüm ama odada yoktu. Yatak bozulmamıştı bile.", gives: ["i_hulya_defne_oda"] },
          emre: { a: "Emre Bey iyi çocuktur. Laboratuvardaymış, öyle diyor. Ama 23'e doğru o tank alarmı yirmi dakika çaldı, kimse kapatmadı. Bir de o akşam Selim Bey'le aralarında bir şey oldu.", gives: ["i_hulya_alarm"] },
          murat: { a: "Murat Bey ailenin avukatı, Selim Bey'in okul arkadaşı. 21:30'da çalışma odasına kahve götürdüm, Selim Bey ona bağırıyordu. 'Yarın denetçi geliyor, her kuruşa bakacak!' dedi. Murat Bey'in rengi atmıştı.", gives: ["i_hulya_denetci"] },
          kenan: { v: [
            { a: "Kenan Bey kardeşiyle kuyu yüzünden kavgalıydı. O akşam 'Bu bağ seni de gömecek' dedi kapıdan çıkarken. Sonra merdivende gördüm onu, eminim.", gives: ["ii_tehdit", "i_hulya_merdiven"] },
            { req: ["k_kenan_alibi"], a: "Kenan Bey'e haksızlık etmişim, Allah affetsin. Merdivendeki o değilmiş." }
          ] }
        },
        show: {
          k_kenan_alibi: { a: "Kenan Bey iskeledeymiş! O zaman merdivendeki o değildi. Dur... Yanımdan geçerken lavanta kokusu gelmişti. Kenan Bey tütün kokar. Bir de sabah mahzen merdiveninin dibinde bunu buldum, gümüş bir kol düğmesi. Al evladım.", gives: ["i_hulya_merdiven", "i_hulya_lavanta", "k_dugme"] },
          c_hulya_kenan: { a: "Demek Kenan Bey değildi. Yanımdan geçerken lavanta kokusu gelmişti. Bir de sabah merdivende bunu buldum, gümüş bir kol düğmesi.", gives: ["i_hulya_lavanta", "k_dugme"] },
          k_ajanda: { a: "'Barış değilmiş'... Ah Selim Bey, ah! Demek oğlum suçsuzmuş. O dosyayı Murat Bey hazırlamıştı, biliyor musun?", gives: ["i_hulya_baris", "i_murat_baris"] },
          k_dugme: { a: "Merdivenin dibinde buldum onu. Yemekte düşmedi, sofrayı ben topladım.", gives: ["i_hulya_sofra"] },
          i_murat_dugme: { a: "Yemekte mi düşürmüş? Yalan! Sofrayı ben topladım, tek tek. Masada düğme falan yoktu.", gives: ["i_hulya_sofra"] },
          c_murat_dugme: { a: "Ben söyledim size, masada yoktu o düğme.", gives: ["i_hulya_sofra"] },
          k_otopsi: "Raf sonradan mı devrilmiş? Ya Rabbim... Kaza değil yani.",
          k_sise: "O şişe mi? Selim Bey onu Defne Hanım doğduğunda almıştı.",
          i_kenan_fener: "Fener mi? Ben merdivende mum taşıyordum, karşımdaki de karanlıkta koşuyordu. Aynı kişi olmalı, evladım.",
          i_emre_koku: "Mahzende çiçek kokusu mu? Ben çamaşıra lavanta koyarım ama mahzene çamaşır inmez."
        },
        noShow: ["Bunu bana neden gösteriyorsunuz evladım? Ben anlamam.", "Gözlüğüm de yanımda değil... Bilmiyorum.", "Bu konuda bir şey bilmem."],
        repeat: ["Söyledim ya evladım.", "Yaşlandım ama unutmadım, anlattım onu.", "Aynı şeyi soruyorsun evladım."],
        ack: ["Çayını iç evladım, soğumasın.", "Başka bir şey soracak mısın?"],
        locked: ["Ben kimsenin işine karışmam evladım.", "Bunu bilmem."],
        deflect: [
          { a: "Onu bilmem evladım. Ama elektrik gidince arka merdivende biri yanımdan koşarak geçti. Kenan Bey'di, eminim. Mum söndü, yüzünü göremedim ama o iri cüssesi...", gives: ["i_hulya_merdiven"], until: "i_hulya_merdiven" },
          { a: "Ben kimsenin işine karışmam. Ama 21:30'da kahve götürdüğümde Selim Bey, Murat Bey'e 'Yarın denetçi geliyor, her kuruşa bakacak!' diye bağırıyordu.", gives: ["i_hulya_denetci"], until: "i_hulya_denetci" },
          { a: "Bilmiyorum. Yalnız Defne Hanım'a 22:45'te ıhlamur götürdüm; oda boştu. Yatak bozulmamıştı bile.", gives: ["i_hulya_defne_oda"], until: "i_hulya_defne_oda" },
          { a: "Ah, aklım karıştı. O gece laboratuvarın tank alarmı yirmi dakika çaldı, kimse kapatmadı. Sesi hâlâ kulağımda.", gives: ["i_hulya_alarm"], until: "i_hulya_alarm" },
          { a: "Merdivendeki Kenan Bey'di, eminim. Biri bana aksini gösterirse o başka.", until: "k_kenan_alibi" },
          { a: "Çayınız soğuyor evladım. Bunu bilmem." },
          { a: "Ah, kafam karıştı. Ne sordunuz?" }
        ]
      },

      /* ---------- MURAT ---------- */
      murat: {
        name: "Murat Öztürk", short: "Murat", age: 60, role: "Aile avukatı", initials: "MÖ", color: "#7a62a8",
        bio: "Karahan ailesinin avukatı ve Selim'in lise arkadaşı. Vasiyet değişikliği için iki gün önce adaya geldi.",
        opening: "Buyurun, dedektif. Elimden gelen yardımı yaparım. Hukukun sınırları içinde tabii.",
        topics: [
          { id: "selam", a: "İyi akşamlar. Zor bir gece, değil mi?" },
          { id: "tesekkur", a: "Görevim, dedektif." },
          { id: "kim", ask: "Kendinizi tanıtır mısınız?", a: "Av. Murat Öztürk. Otuz yıldır Karahan ailesinin avukatıyım. Selim'le lise sıralarından beri dostuz. Dosttuk." },
          { id: "nerede", ask: "O gece neredeydiniz?", v: [
            { a: "Saat ondan itibaren odamdaydım. Selim'in yeni vasiyetnamesini hazırlıyordum. Elektrik kesilince mum yaktım, çalışmaya devam ettim. Odamdan hiç çıkmadım.", f: "Söyledim ya, vasiyetnameyle uğraşıyordum. Sabaha yetişmesi gerekiyordu.", gives: ["i_murat_oda"] },
            { req: ["c_murat_oda"], a: "Hülya Hanım'ın kapıyı çaldığını duymamış olabilirim; kulaklarım eskisi gibi değil. Belki lavabodaydım. Bu bir suçlama mı?" }
          ] },
          { id: "elektrik", a: "Mum yaktım, yazmaya devam ettim. Avukatlar karanlıktan korkmaz, dedektif." },
          { id: "vasiyet", ask: "Vasiyette ne değişiyordu?", a: "Selim bağı bir vakfa bırakmak istiyordu. Defne Hanım'ın bundan pek memnun olmadığını tahmin edersiniz. Ben sadece müvekkilimin iradesini kâğıda döktüm." },
          { id: "hesap", ask: "Bağın hesaplarında bir sorun var mıydı?", v: [
            { a: "Hesaplar mı? Her kuruş kayıtlıdır, dedektif. Selim'in son zamanlarda bir 'denetçi' takıntısı vardı. Yaşlılık işte.", gives: ["i_murat_hesap"] },
            { req: ["k_ajanda"], a: "4,2 milyon mu? Yatırım hesaplarında geçici bir hareket o. Selim bu işlerden anlamazdı. Müvekkil gizliliği yüzünden bu konuyu konuşamam.", gives: ["i_murat_hesap"] }
          ] },
          { id: "nasil", ask: "Selim Bey nasıl öldü sizce?", v: [
            { a: "Jandarma rafın devrildiğini söyledi. Trajik bir kaza. Mahzen eski, raflar çürük." },
            { any: ["c_murat_oda", "k_dugme", "d_motive", "c_murat_hesap"], a: "Bakın, olanlar korkunç. O şişeyle, o darbeyle yere yığılması... Yani öyle tahmin ediyorum. Raf devrilince şişeler de kırılmıştır tabii.", gives: ["i_murat_sise"] }
          ] },
          { id: "sise", v: [
            { a: "Şişe mi? Bir mahzende şişe bulmak pek şaşırtıcı değil, dedektif." },
            { req: ["i_murat_sise"], a: "Ben şişe dediğimi hatırlamıyorum. Yanlış duymuş olmalısınız." }
          ] },
          { id: "dugme", ask: "Kol düğmeleriniz nerede?", locked: "Kol düğmelerim mi? Bunun ne ilgisi var?", v: [
            { req: ["k_dugme"], a: "Ah, kayıp kol düğmem! Akşam yemeğinde düşürmüştüm, her yerde aradım. Nerede bulundu?", gives: ["i_murat_dugme"] },
            { req: ["c_murat_dugme"], a: "Mahzen merdiveninde mi? Şey... Gün içinde Selim bana mahzeni gezdirmişti. Orada düşmüş olmalı. Yemekte dediysem yanılmışım." }
          ] },
          { id: "koku", a: "Lavanta, evet. Otuz yıldır aynı kolonya. Bu artık bir suç mu?", gives: ["i_murat_lavanta"] },
          { id: "baris", ask: "Barış neden kovuldu?", a: "Barış meselesi mi? Kasada açık tespit edildi ve çocuk işten çıkarıldı. Dosyayı ben hazırladım. Kapanmış bir konu.", gives: ["i_murat_baris"] },
          { id: "tartisma", ask: "Akşam yemeğinde ne oldu?", a: "Akşam yemeğinde Kenan Bey ile Selim arasında çirkin bir tartışma oldu. Kenan Bey tehditler savurdu. Ben olsam oradan başlardım.", gives: ["ii_tehdit"] },
          { id: "sucla", v: [
            { a: "Ben mi? Kırk yıllık dostumu mu? Bu soruyu duymamış sayıyorum, dedektif.", f: "Kızına ve kardeşine bakın derim. İkisinin de o akşam sebebi vardı." },
            { any: ["c_murat_sise", "c_murat_dugme"], a: "Bundan sonra avukatım olmadan konuşmayacağım." }
          ] },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Bana sorarsanız, kızı o akşam mirastan çıkarıldı, kardeşi de aynı akşam onu tehdit etti. Ben olsam oradan başlardım.", f: "Bu kadarını söylerim. Gerisi sizin işiniz, dedektif." },
            { any: ["c_murat_sise", "c_murat_dugme"], a: "Kırk yıllık dostluk... Bundan sonra avukatım olmadan tek kelime etmiyorum." }
          ] },
          { id: "yalan", v: [
            { a: "Sayın dedektif, ben bir hukukçuyum. Yalan benim mesleğimde intihardır." },
            { any: ["c_murat_oda", "c_murat_dugme", "c_murat_sise", "c_murat_hesap"], a: "Bir yanlış hatırlama yalan değildir. Bunu hangi hâkim olsa size söyler." }
          ] },
          { id: "ceset", a: "Bağırışları duyunca aşağı indim. Korkunç bir manzaraydı. Hemen jandarmayı aradım; biri soğukkanlı olmalıydı." },
          { id: "borc", a: "Defne Hanım'ın galerisi batmak üzere, borçları ciddi. Babası bu akşam onu mirastan çıkardı. Hesap ortada.", gives: ["ii_defne_borc"] }
        ],
        about: {
          selim: "Selim zor bir adamdı. Kibirli, şüpheci. Son zamanlarda herkesten şüpheleniyordu, benden bile. Ama dosttuk.",
          defne: { a: "Defne Hanım'ın galerisi batmak üzere, borçları ciddi. Babası bu akşam onu mirastan çıkardı. Hesap ortada.", gives: ["ii_defne_borc"] },
          kenan: { a: "Kenan Bey 'Bu bağ seni de gömecek' dedi, hepimiz duyduk. Mahkemede güzel bir cümle olur.", gives: ["ii_tehdit"] },
          emre: { a: "Enolog mu? Taşralı bir çocuk. Defne Hanım'a fazla yakın bence. Selim öğrenseydi kıyamet koparırdı.", gives: ["ii_iliski"] },
          hulya: "Hülya Hanım sadık bir çalışandır. Gerçi oğlu meselesinden sonra Selim'e küs olduğunu da biliyorum."
        },
        show: {
          k_dugme: { v: [
            { a: "Ah, kayıp kol düğmem! Akşam yemeğinde düşürmüştüm. Nerede buldunuz?", gives: ["i_murat_dugme"] },
            { req: ["c_murat_dugme"], a: "Gün içinde Selim bana mahzeni gezdirmişti. Orada düşmüş olmalı. Bunu bir cinayete bağlamak biraz zorlama, dedektif." }
          ] },
          k_sise: { v: [
            { a: "Bir şişe mi? Bilmiyordum. Korkunç." },
            { req: ["i_murat_sise"], a: "Ben şişe dediğimi hatırlamıyorum. Yanlış duymuşsunuz." }
          ] },
          c_murat_sise: "Bunu herkes tahmin edebilir. Mahzende kırık şişe olmasında ne var?",
          k_ajanda: { a: "4,2 milyon mu? Yatırım hesaplarında geçici bir hareket. Selim bu işlerden anlamazdı. Müvekkil gizliliği yüzünden konuşamam.", gives: ["i_murat_hesap"] },
          k_dekont: "MÖ Danışmanlık... Danışmanlık ücretleri, dedektif. Hepsi sözleşmeli. Selim imzalamıştı.",
          c_murat_dekont: "Bu konuyu bundan sonra avukatım olmadan konuşmayacağım.",
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
        repeat: ["Bu soruyu cevapladım, dedektif.", "Tekrarlamama gerek yok sanırım.", "Söylediklerim ortada."],
        ack: ["Devam edin.", "Başka sorunuz?"],
        locked: ["Bu konuda yorum yapmayacağım.", "Müvekkil gizliliği, dedektif."],
        deflect: [
          { a: "Bu soruyu yanlış kişiye soruyorsunuz. Kenan Bey yemekte Selim'i herkesin önünde tehdit etti: 'Bu bağ seni de gömecek.'", gives: ["ii_tehdit"], until: "ii_tehdit" },
          { a: "Müvekkil gizliliği, dedektif. Ama şu kadarını söyleyeyim: Defne Hanım'ın galerisi batmak üzere, borçları ciddi.", gives: ["ii_defne_borc"], until: "ii_defne_borc" },
          { a: "Bilmiyorum. Ama o enolog çocuk Defne Hanım'a fazla yakın, gözümden kaçmadı.", gives: ["ii_iliski"], until: "ii_iliski" },
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
            { a: "21:15'te çıktım, evime gittim, sabaha kadar da çıkmadım. Bu fırtınada nereye gideyim?", f: "Evde oturdum, kafamı dinledim. Tanığım yok, olsa söylerdim.", gives: ["i_kenan_eve"] },
            { req: ["c_kenan"], a: "Peki. Döndüm. 22:50 gibi. Özür dileyecektim. Kapıya kadar gidemedim, iskeledeki bekçi kulübesinin önünde sigara içip durdum, cesaretimi toplayamadım. Sonra ışıklar gitti ve bir şey gördüm. 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arka merdivenine doğru koştu. Yürüyen biri değildi, kaçıyordu.", f: "Kim olduğunu seçemedim. Karanlıktı, yağmur yağıyordu. Ama acelesi vardı, onu söyleyeyim.", gives: ["i_kenan_fener"] }
          ] },
          { id: "gordun", ask: "O gece bir şey gördünüz mü?", v: [
            { a: "Hiçbir şey görmedim. Evdeydim dedim ya." },
            { req: ["c_kenan"], a: "Gördüm. 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arka merdivenine koştu. Kim olduğunu seçemedim. Ama kaçıyordu.", gives: ["i_kenan_fener"] }
          ] },
          { id: "elektrik", v: [
            { a: "Benim evde de elektrik gitti. Mum bile yakmadım, oturdum karanlıkta." },
            { req: ["c_kenan"], a: "Işıklar söndüğünde iskeledeydim. 23:15 gibi mahzen kapısından bir el feneri çıktı, evin arkasına koştu.", gives: ["i_kenan_fener"] }
          ] },
          { id: "tartisma", ask: "Yemekte neden kavga ettiniz?", a: "Kuyu meselesi. Ağabeyim sınırdaki kuyunun suyunu kesecekti, benim bağ kurur. 'Bu bağ seni de gömecek' dedim, evet. Öfkeyle söylenmiş laf. Öldürmek başka iş.", f: "Kuyu tam sınırda. Suyu keserse benim bağ kurur, anlıyor musunuz? Babamızdan kalan toprak bu.", gives: ["i_kenan_tehdit"] },
          { id: "arazi", ask: "Kuyu meselesi nedir?", a: "Babam toprağı ikimize bıraktı, kuyuyu da tam sınıra açtırdı. Selim tapuda kuyunun kendi tarafında kaldığını buldu, suyu kesecekti. Yarın mahkemeye gidecektik. Şimdi o da yok." },
          { id: "koku", a: "Lavanta mı? Murat. Kırk yıldır aynı kolonya; odaya ondan önce kokusu girer.", gives: ["i_murat_lavanta"] },
          { id: "hesap", ask: "Ağabeyiniz hesaplardan bahsetti mi?", a: "Bahsetti. Geçen hafta kahvede bana 'Murat'a hesap sordum, kıvırıyor' dedi. Ağabeyim kolay kolay kimseden şüphelenmezdi.", gives: ["i_kenan_murat"] },
          { id: "vasiyet", a: "Vakfa mı bırakıyormuş? Hah. Selim'e yakışır. Ölürken bile herkese ders verecekti." },
          { id: "sise", a: "1987 magnum. Babamızın öldüğü yıl. Selim onu Defne'nin düğünü için saklıyordu." },
          { id: "nasil", a: "Raf devrildi diyorlar. Selim o raflara çocukken tırmanırdı. Hiçbiri yıkılmadı." },
          { id: "ceset", a: "Ben orada değildim. Sabah haber geldi. Kimse beni aramadı bile." },
          { id: "baris", a: "Barış iyi çocuktu. Hırsız falan değildi. O dosya kokuyordu ama Selim dinlemedi.", gives: ["ii_baris"] },
          { id: "sucla", v: [
            { a: "Hayır! Kavgalıydık ama o benim ağabeyimdi. Kardeş kardeşi öldürür mü hiç?", f: "Ben nereden bileyim? Ağabeyimin etrafında dolanan tipler çoktu. Onlara bakın, bana değil." },
            { req: ["c_kenan"], a: "Yalan söyledim, evet, geri döndüm. Ama o eve adımımı atmadım." }
          ] },
          { id: "katil", ask: "Sizce kim öldürdü?", v: [
            { a: "Bu evde bir yılan var, o kadarını söylerim. Ağabeyim de biliyordu.", f: { a: "Murat. Ağabeyim geçen hafta bana 'Murat'a hesap sordum, kıvırıyor' dedi. Gerisini siz düşünün.", gives: ["i_kenan_murat"] } },
            { req: ["i_kenan_fener"], a: "O fenerle kaçan her kimse, o. Bulun onu." }
          ] },
          { id: "yalan", v: [
            { a: "Yalan söylemiyorum! Ne istiyorsunuz benden?" },
            { req: ["c_kenan"], a: "Tamam. Döndüm. 22:50'de iskeledeydim. Özür dileyecektim, beceremedim. Işıklar gidince mahzen kapısından kaçan bir fener gördüm.", gives: ["i_kenan_fener"] }
          ] },
          { id: "birlikte", v: [
            { a: "Kiminle olacağım, evde yalnızdım." },
            { req: ["k_kenan_alibi"], a: "Demek beni iskelede gördüler. Ben de onları görmüştüm aslında ama söylemedim. Kızın sırrı benim de sırrım." }
          ] }
        ],
        about: {
          selim: "Ağabeyim inatçı keçinin tekiydi. Kavgalıydık ama kardeşimdi. Çocukken o mahzende saklambaç oynardık.",
          murat: { a: "Murat mı? Selim'in kuyruğu. Kırk yıldır aynı lavanta kolonyası; odaya ondan önce kokusu girer. Hiç sevmedim. Ağabeyim de son zamanlarda ondan şüpheleniyordu. Geçen hafta 'Murat'a hesap sordum, kıvırıyor' dedi bana.", gives: ["i_murat_lavanta", "i_kenan_murat"] },
          defne: { v: [
            { a: "Defne'm akıllı kızdır ama babası gibi inatçı. O gece... Neyse, bilmiyorum." },
            { req: ["k_kenan_alibi"], a: "Demek beni iskelede gördüler. Ben de onları görmüştüm aslında, ama söylemedim. Kızın sırrı benim de sırrım." }
          ] },
          emre: { a: "Enolog çocuk. İşini bilir. Defne'ye bakışından ne olduğunu ben anlıyorum.", gives: ["ii_iliski"] },
          hulya: "Hülya dürüst kadındır. Oğluna yapılan haksızlığa rağmen o evden ayrılmadı."
        },
        show: {
          k_kenan_alibi: { a: "Görmüşler demek. Peki. Döndüm, 22:50'de. Özür dileyecektim, beceremedim. Kulübenin önünde sigara içtim. Işıklar gidince mahzen kapısından bir fener çıktı, arka merdivene koştu. 23:15 gibiydi.", gives: ["i_kenan_fener"] },
          c_kenan: { a: "Tamam, yalan söyledim. Döndüm. Ama içeri girmedim. Işıklar sönünce mahzen kapısından kaçan bir fener gördüm.", gives: ["i_kenan_fener"] },
          i_hulya_merdiven: { v: [
            { a: "Merdivende beni mi görmüş? Saçmalık! Ben o eve adım atmadım." },
            { req: ["c_kenan"], a: "Ben değildim. Ben iskeledeydim, siz de biliyorsunuz. Hülya'nın gördüğü, benim gördüğüm fenerli kişidir." }
          ] },
          i_kenan_tehdit: "Öfkeyle söylenmiş laf. Kaç kere söyleyeceğim?",
          k_dugme: "M.Ö. Murat Öztürk. Size yılan dedim mi, demedim mi?",
          k_ajanda: "'Affetmeyeceğim.' Ağabeyimin tam lafı. Murat'ı affetmeyecekmiş.",
          k_dekont: "MÖ Danışmanlık! Kırk yıldır ağabeyimin sırtından geçinmiş. Yılan dedim size.",
          k_otopsi: "Raf sonradan devrilmiş. Demek ki biri onu öldürüp üstüne rafı devirdi. Kim yaptıysa elimden kurtulamaz.",
          k_sise: "O şişeyle mi? Babamızın yılı... Alçak.",
          i_murat_lavanta: "Söyledim ya. O kolonyayı bu adada başka kimse sürmez."
        },
        noShow: ["Bu ne şimdi?", "Bundan anlamam ben.", "Bunu bana göstereceğinize gidip katili bulun."],
        repeat: ["Söyledim ya!", "Kaç kere soracaksınız?", "Aynı şey. Değişen bir şey yok."],
        ack: ["Hı.", "Bitti mi?"],
        locked: ["Bunu konuşmayacağım.", "O beni ilgilendirir."],
        deflect: [
          { a: "Bunu bilmem. Ama ağabeyim geçen hafta kahvede bana 'Murat'a hesap sordum, kıvırıyor' dedi.", gives: ["i_kenan_murat"], until: "i_kenan_murat" },
          { a: "Ben ne bileyim! Hülya'nın oğlu Barış'ı hırsız diye kovdular, o çocuk hırsız değildi. O dosya kokuyordu, onu bilirim.", gives: ["ii_baris"], until: "ii_baris" },
          { a: "Benim bildiğim kuyu, toprak, üzüm. Gerisi sizin işiniz." },
          { a: "Bilmem. Ben o evde ancak yemek boyunca vardım." },
          { a: "Lafı dolandırmayın. Derdiniz neyse açık açık söyleyin." }
        ]
      }
    }
  };


  /* ======================= GÖRSELLER ======================= */

  /* Portre özellikleri (js/portrait.js çizer) */
  CASE.ambience = "yagmur";
  CASE.looks = {
    defne: { skin: "#e9c2a6", hair: "#5a2a1e", style: "uzun", clothes: "#7d2b33", bg: "#3a2326", earrings: true, lips: "#b4505a", voice: { pitch: 1.15, rate: 1.05 } },
    emre: { skin: "#d9a982", hair: "#2a1d16", style: "kivircik", clothes: "#3f6b55", bg: "#1f2c26", stubble: true, voice: { pitch: 0.95, rate: 1.05 } },
    hulya: { skin: "#d8a888", hair: "#b9b3ab", style: "topuz", clothes: "#a07a33", bg: "#33291a", lines: true, voice: { pitch: 1.2, rate: 0.9 } },
    murat: { skin: "#e3bfa3", hair: "#c9c4bd", style: "yana", clothes: "#2f2a3d", bg: "#26213a", glasses: true, tie: "#6b4c9a", lines: true, voice: { pitch: 0.8, rate: 0.95 } },
    kenan: { skin: "#c98f6c", hair: "#8d8780", style: "kel", clothes: "#3c5577", bg: "#1d2635", mustache: true, lines: true, voice: { pitch: 0.7, rate: 1.0 } }
  };

  /* Tam otopsi raporu (Belgeler > Adli Tıp Raporu) */
  CASE.autopsy = {
    no: "ATK-2026/0914",
    date: "15 Eylül 2026, 08:30",
    doctor: "Dr. Nermin Aksoy, Adli Tıp Uzmanı",
    subject: [
      ["Ad Soyad", "Selim Karahan"],
      ["Yaş / Cinsiyet", "63 / Erkek"],
      ["Boy / Kilo", "1,78 m / 84 kg"],
      ["Bulunduğu yer", "Ayazma Bağevi mahzeni, jeneratör ile 1987 rafı arası"],
      ["Bulunma", "14 Eylül, 23:40 (Emre Aslan)"]
    ],
    sections: [
      ["Ölüm zamanı", "23:00 – 23:20. Vücut ısısı ve ölü katılığının başlangıcı bu aralığı gösteriyor. Kurbanın sol bileğindeki kol saati düşme anında kırılmış ve 23:12'de durmuş."],
      ["Ölüm nedeni", "Başın arka kısmına (oksipital bölge) inen tek ve ağır darbeye bağlı kafatası çökme kırığı ve beyin kanaması."],
      ["Yara", "6 cm uzunluğunda, yay biçiminde yarık. İçinden koyu yeşil cam parçaları çıkarıldı; olay yerindeki 1987 magnum şişeyle uyumlu. Darbe arkadan ve yukarıdan aşağı vurulmuş; saldırgan kurbandan kısa değil."],
      ["Savunma izi", "YOK. Ellerde, kollarda ve tırnak altlarında boğuşma bulgusu yok. Kurban saldırganı görmemiş ya da ona arkasını dönecek kadar güvenmiş."],
      ["Raf altındaki ezilmeler", "Sırt ve sağ omuzdaki ezilmelerde hayati reaksiyon (kanama, şişlik) yok. Raf ölümden SONRA devrilmiş; olaya kaza süsü verilmiş."],
      ["Kan tahlili", "Kanda 0,4 promil alkol (akşam yemeğindeki şarapla uyumlu). İlaç veya zehir bulgusu yok."],
      ["Kıyafet", "Ceketin yakasında ve sağ omzunda çiçeksi bir esans izi. Kurbanın kendi kolonyasıyla (sedir) uyuşmuyor. Tür tayini için laboratuvara gönderildi."]
    ],
    conclusion: "Ölüm doğal yolla ya da kaza sonucu gerçekleşmemiştir. Olay CİNAYET olarak soruşturulmalıdır.",
    marks: [
      { n: 1, view: "arka", x: 50, y: 14, kind: "olumcul", label: "Ölümcül darbe: başın arkası, cam parçalı yarık" },
      { n: 2, view: "arka", x: 62, y: 62, kind: "ps", label: "Ölüm sonrası ezilmeler: sırt ve sağ omuz (raf)" },
      { n: 3, view: "arka", x: 55, y: 38, kind: "iz", label: "Çiçeksi esans izi: ceket yakası ve omuz" },
      { n: 4, view: "on", x: 81, y: 114, kind: "not", label: "Kırık kol saati: sol bilek, 23:12'de durmuş" },
      { n: 5, view: "on", x: 18, y: 121, kind: "yok", label: "Ellerde/kollarda savunma izi yok" }
    ]
  };

  CASE.documents = [
    { id: "otopsi", kind: "otopsi", title: "Adli Tıp Ön Raporu", sub: "Ölüm nedeni, yaralar ve vücut şeması" },
    { id: "kroki", kind: "svg", title: "Olay Yeri Krokisi", sub: "Bağevi, mahzen, iskele ve laboratuvar",
      notes: ["Mahzene hem evin arka merdiveninden hem de dışarıdaki mahzen kapısından inilir.", "Bekçi kulübesinden mahzen kapısı görülebilir (yaklaşık 90 m).", "Yatak odaları üst kattadır; üst kata arka merdivenle de çıkılır."],
      svg: '<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="11" fill="#2a221b">' +
        '<rect x="0" y="0" width="92" height="420" fill="#cddfe4"/>' +
        '<path d="M15 60 q10 -6 20 0 t20 0 M15 140 q10 -6 20 0 t20 0 M15 330 q10 -6 20 0 t20 0 M15 390 q10 -6 20 0 t20 0" stroke="#8fb2bd" fill="none"/>' +
        '<text x="46" y="200" transform="rotate(-90 46 200)" text-anchor="middle" font-size="12" letter-spacing="4" fill="#5d8590">EGE DENİZİ</text>' +
        '<rect x="88" y="262" width="80" height="14" fill="#b08a5a" stroke="#6d5236"/>' +
        '<path d="M98 262v14M108 262v14M118 262v14M128 262v14M138 262v14M148 262v14M158 262v14" stroke="#6d5236" stroke-width=".6"/><text x="100" y="294">İskele</text>' +
        '<rect x="176" y="232" width="30" height="24" fill="#e6d6b8" stroke="#2a221b"/><text x="150" y="224">Bekçi kulübesi</text>' +
        '<path d="M168 270 C 200 300, 240 300, 270 290" stroke="#9c8d78" stroke-dasharray="2 4" fill="none"/>' +
        '<rect x="262" y="70" width="230" height="170" fill="#f6efe0" stroke="#2a221b" stroke-width="2.5"/><text x="262" y="62" font-weight="700" font-size="12">AYAZMA BAĞEVİ (zemin kat)' +
        '</text><path d="M372 70v170M262 160h230M432 160v80" stroke="#2a221b" stroke-width="1.5"/><text x="280" y="118">Yemek salonu</text><text x="405" y="118">Mutfak</text>' +
        '<text x="272" y="203">Çalışma odası</text><text x="390" y="203">Hol</text><text x="437" y="174" font-size="9" font-weight="600">Arka merdiven</text>' +
        '<text x="437" y="185" font-size="9">↑ yatak odaları</text><path d="M438 194h48M438 202h48M438 210h48M438 218h48M438 226h48M438 234h48" stroke="#2a221b" stroke-width=".7"/>' +
        '<rect x="452" y="241" width="22" height="12" fill="#2a221b"/><text x="480" y="252" font-size="10" font-weight="600">Mahzen kapısı</text>' +
        '<path d="M206 246 L 452 248" stroke="#a8323f" stroke-dasharray="6 5" stroke-width="1.6"/>' +
        '<text x="270" y="266" fill="#a8323f" font-size="10.5">görüş hattı: kulübeden mahzen kapısına ≈ 90 m</text>' +
        '<rect x="300" y="290" width="230" height="100" fill="#ece3d1" stroke="#2a221b" stroke-width="1.5" stroke-dasharray="7 4"/><text x="306" y="306" font-weight="700">MAHZEN (yer altı)' +
        '</text><path d="M463 253 L 470 290" stroke="#2a221b" stroke-dasharray="3 3"/><text x="476" y="282" font-size="9">merdiven</text>' +
        '<path d="M320 322h80M320 342h80M320 362h80M420 322h50" stroke="#6d5a45" stroke-width="5"/><text x="320" y="382" font-size="10">şarap rafları</text>' +
        '<rect x="488" y="330" width="34" height="26" fill="#9aa1a6" stroke="#2a221b"/><text x="478" y="372" font-size="10">Jeneratör</text>' +
        '<path d="M432 342l16 16M448 342l-16 16" stroke="#a8323f" stroke-width="3"/><text x="418" y="378" fill="#a8323f" font-weight="700" font-size="10">CESET</text>' +
        '<circle cx="458" cy="336" r="4" fill="#2e5b3a"/><text x="464" y="332" font-size="9" fill="#2e5b3a">şişe</text>' +
        '<rect x="540" y="80" width="90" height="70" fill="#f6efe0" stroke="#2a221b" stroke-width="2"/><circle cx="566" cy="112" r="9" fill="none" stroke="#2a221b"/>' +
        '<circle cx="594" cy="112" r="9" fill="none" stroke="#2a221b"/><text x="543" y="74" font-size="10" font-weight="700">LABORATUVAR</text><text x="560" y="140" font-size="9">tanklar' +
        '</text><path d="M110 406h510M110 414h510" stroke="#7b8f4f" stroke-width="2" stroke-dasharray="3 6"/><text x="112" y="400" font-size="10" fill="#4f5f2d">Ayazma bağları</text>' +
        '<path d="M572 190 L 572 420" stroke="#4f5f2d" stroke-dasharray="10 4" stroke-width="1.4"/><circle cx="572" cy="190" r="8" fill="#cddfe4" stroke="#2a221b"/>' +
        '<text x="584" y="194" font-size="10">Kuyu</text><text x="582" y="230" font-size="10">sınır</text><text x="582" y="300" font-size="10">Kenan\'ın</text>' +
        '<text x="582" y="312" font-size="10">bağı →</text><g transform="translate(612 30)"><path d="M0 -16 L6 6 L0 2 L-6 6 Z" fill="#2a221b"/><text x="-4" y="20" font-weight="700">K</text>' +
        '</g></svg>' },
    { id: "sise", kind: "svg", title: "Delil No. 1: Kırık magnum şişe", sub: "Mahzen, rafın dibi",
      notes: ["1987 Ayazma, 1,5 litrelik magnum. Selim bu şişeyi kızı Defne'nin düğününde açmak için saklıyordu.", "Tabanında kan ve saç teli. Ağzı darbeden sonra yere çarpıp kırılmış.", "Şişenin üzerinde parmak izi yok: silinmiş ya da eldivenle tutulmuş."],
      svg: '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="11" fill="#2a221b">' +
        '<ellipse cx="170" cy="160" rx="140" ry="12" fill="#00000018"/>' +
        '<path d="M40 70 Q40 48 64 48 L230 48 Q250 48 262 60 L272 72 L280 64 L276 82 L288 86 L276 96 L284 110 L268 106 L262 124 Q250 136 230 136 L64 136 Q40 136 40 112 Z" fill="#23402c" stroke="#13251a" stroke-width="2"/>' +
        '<path d="M60 58 L220 58" stroke="#5f8a6c" stroke-width="5" stroke-linecap="round" opacity=".6"/>' +
        '<rect x="100" y="66" width="104" height="54" rx="3" fill="#efe6d2" stroke="#8a7a5d"/>' +
        '<text x="152" y="86" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-weight="700" font-size="13">AYAZMA</text>' +
        '<text x="152" y="102" text-anchor="middle" font-size="10">MAGNUM · 1,5 L</text>' +
        '<text x="152" y="115" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-weight="700" font-size="12" fill="#a8323f">1987</text>' +
        '<path d="M44 96 q4 10 0 22" stroke="#6b0f1a" stroke-width="6" stroke-linecap="round" opacity=".85"/>' +
        '<path d="M300 70 l14 6 l-6 10 z M306 112 l16 -2 l-4 12 z M292 140 l10 2 l-6 8 z" fill="#2e5b3a" stroke="#13251a"/>' +
        '<path d="M40 180h100" stroke="#2a221b" stroke-width="2"/><path d="M40 175v10M90 175v10M140 175v10" stroke="#2a221b"/>' +
        '<text x="68" y="196" font-size="10">0 - 10 - 20 cm</text>' +
        '<text x="28" y="40" font-size="10" fill="#6b0f1a">kan + saç teli (taban)</text>' +
        '<text x="250" y="40" font-size="10">kırık ağız</text>' +
        '</svg>' },
    { id: "dugme", kind: "svg", title: "Delil No. 2: Gümüş kol düğmesi", sub: "Mahzen merdiveninin dibi", unlock: "k_dugme",
      notes: ["Hülya sabah mahzen merdiveninin dibinde bulup cebine koymuş.", "Gümüş, oval; üzerinde el oyması 'M.Ö.' harfleri.", "Kopça kısmı zorlanarak açılmış gibi: bir yere takılıp kopmuş olabilir."],
      svg: '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="11" fill="#2a221b">' +
        '<defs><radialGradient id="silver" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cfd3d6"/><stop offset="1" stop-color="#7d858c"/></radialGradient></defs>' +
        '<ellipse cx="180" cy="168" rx="80" ry="8" fill="#00000018"/>' +
        '<rect x="172" y="100" width="16" height="50" rx="4" fill="url(#silver)" stroke="#5f666d"/>' +
        '<rect x="140" y="144" width="80" height="14" rx="7" fill="url(#silver)" stroke="#5f666d" transform="rotate(-8 180 151)"/>' +
        '<ellipse cx="180" cy="80" rx="62" ry="48" fill="url(#silver)" stroke="#5f666d" stroke-width="2"/>' +
        '<ellipse cx="180" cy="80" rx="52" ry="38" fill="none" stroke="#8b9298" stroke-width="1.5"/>' +
        '<text x="180" y="92" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-style="italic" font-weight="700" font-size="34" fill="#5f666d">M.Ö.</text>' +
        '<path d="M300 40h40" stroke="#2a221b" stroke-width="2"/><text x="300" y="56" font-size="10">2 cm</text>' +
        '</svg>' },
    { id: "ajanda", kind: "not", title: "Selim'in ajandası: 14 Eylül", sub: "Çalışma odasından (Defne getirdi)", unlock: "k_ajanda",
      head: "14 EYLÜL · PAZARTESİ",
      lines: [
        { t: "09:00 Hasat, 3. parsel. Emre'yle tanklara bak." },
        { t: "Emre'nin faturaları: kur farkı DEĞİL. Hamburg ve Rotterdam ödemeleri başka hesaba gitmiş." },
        { t: "Kasadaki açık Barış değilmiş.", u: true },
        { t: "M. 4,2 milyon.", big: true, u: true },
        { t: "Yarın denetçi (Ankara, 10:00)." },
        { t: "Affetmeyeceğim.", red: true },
        { t: "Barış'tan özür dilemeliyim. Hülya'ya ne diyeceğim?" },
        { t: "Vasiyet: vakıf. Defne'ye bu akşam söyle.", s: true }
      ] }
  ];

  /* ======================= YAZDIRILABİLİR SET ======================= */
  CASE.print = {
    victim: { name: "Selim Karahan (63)", line: "Ayazma Bağları'nın sahibi. 14 Eylül, 23:40'ta mahzende ölü bulundu." },
    where: "15 Eylül, Ayazma Bağevi",
    sheetTimes: ["20:00", "21:15", "21:30", "21:45", "22:00", "22:30", "22:45", "23:05", "23:10", "23:15", "23:20", "23:40"],
    rules: [
      "Bu dosya bir dedektiflik oyunudur. Yalnız ya da arkadaşlarınızla oynayabilirsiniz.",
      "ZARF A ile başlayın. Belgeleri inceleyin, sorgu tutanaklarını okuyun, not alın.",
      "Her zarfın sonunda bir GEÇİŞ SORUSU var. Cevabınızdan eminseniz bir sonraki zarfı açın. Cevapları en sondaki ters çevrilmiş kontrol sayfasından kontrol edebilirsiniz.",
      "Şüphelilere yalnızca dosyadaki sorular soruldu. Herkes bir şey saklıyor ama herkesin sırrı cinayet değil.",
      "Hazır olduğunuzda SUÇLAMA FORMUNU doldurun: katil, sebep ve en güçlü üç kanıt. ÇÖZÜM sayfasını ancak ondan sonra açın."
    ],
    envelopes: [
      {
        id: "A", title: "Olay gecesi", note: "Buradan başlayın.",
        docs: ["otopsi", "kroki", "sise"],
        interviews: [
          { cid: "defne", items: [{ t: "kim" }, { t: "nerede", v: 0 }, { t: "tartisma" }, { t: "vasiyet" }, { t: "borc", q: "Maddi durumunuz nasıl?" }, { t: "hakkinda_murat", q: "Murat Bey nasıl biridir?" }, { t: "nasil" }, { t: "katil", v: 0 }] },
          { cid: "emre", items: [{ t: "kim" }, { t: "nerede", v: 0 }, { t: "ceset" }, { t: "lab", v: 0 }, { t: "sise" }, { t: "kovulma", v: 0 }, { t: "hakkinda_murat", q: "Murat Bey hakkında ne düşünüyorsunuz?" }, { t: "katil", v: 0 }] },
          { cid: "hulya", items: [{ t: "kim" }, { t: "nerede" }, { t: "oda" }, { t: "elektrik" }, { t: "merdiven", v: 0 }, { t: "lab" }, { t: "kovulma" }, { t: "hesap" }, { t: "baris", v: 0 }, { t: "katil", v: 0 }] },
          { cid: "murat", items: [{ t: "kim" }, { t: "nerede", v: 0 }, { t: "vasiyet" }, { t: "hesap", v: 0 }, { t: "nasil", v: 0 }, { t: "koku", q: "Hangi kolonyayı kullanıyorsunuz?" }, { t: "baris" }, { t: "katil", v: 0 }] },
          { cid: "kenan", items: [{ t: "kim" }, { t: "nerede", v: 0 }, { t: "tartisma" }, { t: "arazi" }, { t: "hesap" }, { t: "hakkinda_murat", q: "Murat Bey'i tanır mısınız?" }, { t: "katil", v: 0 }] }
        ],
        gate: { q: "En az iki şüpheli o gece nerede olduğu konusunda yalan söylüyor. Kimler ve nereden anladınız?", a: "Defne (Hülya 22:45'te odasını boş buldu) ve Emre (laboratuvardaki alarm yirmi dakika çaldı, kimse kapatmadı). Murat da yalan söylüyor olabilir: 23:10'da kapısını çalan Hülya'ya cevap vermedi." }
      },
      {
        id: "B", title: "Saklananlar", note: "Geçiş sorusunu cevapladıktan sonra açın.",
        docs: ["dugme"],
        interviews: [
          { cid: "defne", items: [{ show: "c_defne", q: "Hülya Hanım 22:45'te odanızı boş bulmuş." }, { t: "birlikte", v: 1, q: "Kiminleydiniz?" }] },
          { cid: "emre", items: [{ show: "c_emre", q: "Laboratuvarın alarmı yirmi dakika çalmış ve kimse kapatmamış." }, { show: "i_defne_iskele", q: "Defne Hanım o gece iskelede olduğunu ve yalnız olmadığını söyledi." }, { t: "kovulma", v: 1 }] },
          { cid: "kenan", items: [{ show: "k_kenan_alibi", q: "Sizi 22:55 ile 23:25 arasında iskelede görmüşler." }, { t: "tartisma" }] },
          { cid: "hulya", items: [{ show: "k_kenan_alibi", q: "Kenan Bey 23:15'te iskeledeymiş. İki tanık var." }, { t: "dugme", v: 0, q: "Bu düğmeyi yemekte düşürmüş olabilir mi?" }] },
          { cid: "defne", items: [{ show: "k_dugme", q: "Bu kol düğmesini tanıyor musunuz?" }] }
        ],
        gate: { q: "Hülya'nın merdivende gördüğü kişi Kenan değilse kimdi? Hangi iki ipucu bu kişiyi gösteriyor?", a: "Murat Öztürk: Merdivendeki kişi lavanta kokuyordu (Murat'ın kolonyası) ve mahzen merdiveninde 'M.Ö.' kol düğmesi bulundu." }
      },
      {
        id: "C", title: "Avukat", note: "Son zarf. Okuduktan sonra suçlama formunu doldurun.",
        docs: ["ajanda"], puzzles: ["kasa"],
        interviews: [
          { cid: "defne", items: [{ t: "hesap", v: 1, q: "Babanızın hesaplarıyla ilgili bildiğiniz başka bir şey var mı?" }] },
          { cid: "murat", items: [{ show: "k_dugme", v: 0, q: "Bu kol düğmesi sizin mi?" }, { t: "dugme", v: 1, q: "Düğme mahzen merdiveninde bulundu." }, { t: "nerede", v: 1, q: "23:10'da Hülya Hanım kapınızı çalmış, cevap vermemişsiniz." }, { t: "nasil", v: 1, q: "Selim Bey sizce nasıl öldü?" }, { t: "hesap", v: 1, q: "Ajandada 'M. 4,2 milyon' yazıyor." }, { t: "katil", v: 1 }] },
          { cid: "hulya", items: [{ t: "baris", v: 1, q: "Selim Bey ajandasına 'Barış değilmiş' yazmış." }] },
          { cid: "kenan", items: [{ show: "k_ajanda", q: "Ağabeyinizin ajandası." }] },
          { cid: "hulya", items: [{ t: "kasa_sifre" }] },
          { cid: "emre", items: [{ t: "kasa_sifre" }] },
          { cid: "murat", items: [{ show: "k_dekont", q: "Bu dekontlar Selim Bey'in kasasından çıktı." }] }
        ],
        gate: null
      }
    ],
    timeline: [
      ["20:00", "Hasat yemeği. Selim ile Kenan kuyu yüzünden kavga eder."],
      ["21:15", "Kenan 'Bu bağ seni de gömecek' diyerek çıkar."],
      ["21:30", "Selim, Murat'a ertesi gün denetçi geleceğini söyler."],
      ["21:45", "Selim, Defne ile Emre'yi bağda görmüştür; Emre'yi kovar."],
      ["22:00", "Selim, Defne'ye bağı vakfa bırakacağını söyler."],
      ["22:30", "Defne ve Emre gizlice iskelede buluşur."],
      ["22:55", "Kenan özür dilemek için döner; bekçi kulübesinde bekler."],
      ["23:05", "Elektrik kesilir. Selim jeneratör için mahzene iner."],
      ["23:10", "Murat peşinden iner, magnum şişeyle vurur, rafı devirir. Kol saati 23:12'de durur."],
      ["23:15", "Murat arka merdivenden kaçar; düğmesini düşürür. Hülya karanlıkta onu Kenan sanar; Kenan feneri görür."],
      ["23:40", "Emre cesedi bulur."]
    ]
  };


  /* ======================= SAAT, İPUÇLARI, BULMACALAR ======================= */
  CASE.par = 40;
  CASE.clock = {
    start: "08:00", deadline: "12:00", perQuestion: 4, perShow: 6, perHint: 15,
    goal: "Fırtına diniyor. İlk feribot 12:00'de kalkacak; katil o feribota binerse adadan çıkar.",
    over: "Saat 12:00. Feribot kalktı, katil de onunla birlikte adadan çıktı. Dosya burada kapandı."
  };
  CASE.hints = [
    { until: "c_defne", text: "Herkes o gece nerede olduğunu anlatıyor ama hepsi doğru mu? Defne'nin söylediğiyle Hülya'nın gördüklerini karşılaştır." },
    { until: "c_emre", text: "Emre bütün gece laboratuvardaymış. O gece laboratuvarda garip bir şey oldu mu, evdekilerden birine sor." },
    { until: "k_kenan_alibi", after: ["c_defne", "c_emre"], text: "İki kişi aynı anda yalan söylüyorsa belki birbirlerini koruyorlardır. Yakaladığın çelişkileri onlara göster." },
    { until: "k_dugme", after: ["k_kenan_alibi"], text: "Merdivende Kenan'ı gördüğünden emin olan biri var. Kenan'ın o saatte nerede olduğunu ona göster." },
    { until: "c_murat_dugme", after: ["k_dugme"], text: "Bir kol düğmesinin sahibi kendi düğmesini görünce ne der? Göster ve nerede kaybettiğini sor." },
    { until: "c_murat_sise", after: ["c_murat_oda"], text: "Şüphelilere cinayet silahı söylenmedi. Biri ağzından kaçırırsa çok şey anlatır. Ona Selim'in nasıl öldüğünü sor." },
    { until: "k_dekont", text: "Çalışma odasında kilitli bir kasa var. Selim'in şifreleri nasıl seçtiğini evdekilerden biri biliyordur." }
  ];
  CASE.hintDone = "Elinde bir avukatı mahkûm ettirecek kadar şey var. Suçlamayı yap.";
  CASE.puzzles = [
    { id: "kasa", kind: "kasa", title: "Selim'in çelik kasası", sub: "Çalışma odası, kitaplığın arkası",
      desc: "Dört haneli şifreli, eski bir çelik kasa. Selim şifreyi kimseye söylememiş.",
      code: "7891", digits: 4, gives: ["k_dekont"], why: "Selim şifreyi en sevdiği şişenin yılından (1987) yapar ve her şeyi tersten yazarmış (Hülya ve Emre)",
      solved: "Kasa açıldı. İçinde bir deste banka dekontu var." }
  ];
  CASE.documents.push({ id: "dekont", kind: "svg", title: "Kasadan çıkan dekontlar", sub: "Selim'in çelik kasası", unlock: "k_dekont",
    notes: ["Üç yıl boyunca her ay düzenli ödeme.", "Alıcı: MÖ Danışmanlık Ltd. Şirketin tek ortağı Murat Öztürk.", "Dekontların arkasında Selim'in el yazısıyla: 'Hepsini bugün buldum.'"],
    svg: '<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="12" fill="#2a221b">' +
      '<rect x="40" y="30" width="440" height="240" fill="#fffdf6" stroke="#b9a988" transform="rotate(-2 260 150)"/>' +
      '<rect x="30" y="20" width="440" height="240" fill="#fffef9" stroke="#b9a988"/>' +
      '<text x="50" y="48" font-weight="700" font-size="14">EGE KATILIM BANKASI · HESAP HAREKETLERİ</text>' +
      '<text x="50" y="68" font-size="11" fill="#6d5a45">Hesap: Ayazma Bağcılık A.Ş.</text>' +
      '<path d="M50 80h400" stroke="#2a221b"/>' +
      '<text x="50" y="98" font-weight="600">Tarih</text><text x="150" y="98" font-weight="600">Alıcı</text><text x="380" y="98" font-weight="600">Tutar (TL)</text>' +
      '<text x="50" y="122">03.2024</text><text x="150" y="122">MÖ Danışmanlık Ltd.</text><text x="380" y="122">118.000</text>' +
      '<text x="50" y="146">09.2024</text><text x="150" y="146">MÖ Danışmanlık Ltd.</text><text x="380" y="146">124.500</text>' +
      '<text x="50" y="170">04.2025</text><text x="150" y="170">MÖ Danışmanlık Ltd.</text><text x="380" y="170">131.000</text>' +
      '<text x="50" y="194">08.2026</text><text x="150" y="194">MÖ Danışmanlık Ltd.</text><text x="380" y="194">140.000</text>' +
      '<path d="M50 206h400" stroke="#2a221b"/>' +
      '<text x="150" y="228" font-weight="700">3 yılda toplam</text><text x="380" y="228" font-weight="700" fill="#a8323f">4.200.000</text>' +
      '<ellipse cx="300" cy="226" rx="120" ry="18" fill="none" stroke="#a8323f" stroke-width="2"/>' +
      '</svg>' });

  if (typeof module !== "undefined" && module.exports) module.exports = CASE;
  else (root.CASES = root.CASES || []).push(CASE);
})(this);
