/*
 * VAKA: GECE TRENİ (kolay)
 * SPOILER: Bu dosya çözümü içerir.
 *
 * Ne oldu:
 *  21:00  Yemek vagonunda Nazmi, fotoğrafçı Oğuz'un kamerasını iter; kısa bir kavga.
 *  22:15  Sevgi görevli Cemal'den su ister, "annemin kalp ilacı" der. İlaç çantasında.
 *  23:00  Sevgi, Nazmi'nin kompartımanına (4) gider. Nazmi iki çay ister; Cemal çayları bırakır,
 *         içeride kırmızı atkılı bir kadın görür.
 *  23:15  Nazmi, dükkânı Kars'ta gizlice satacağını itiraf eder. Sevgi "Bunu bana yapamazsın!" diye bağırır
 *         (Oğuz yan kompartımandan duyar). Nazmi tuvalete gittiğinde Sevgi ezdiği ilaçları çayına katar.
 *  23:20  Sevgi çıkar; Oğuz koridorda çektiği bir karede onu yakalar.
 *  06:10  Cemal cesedi bulur. Çöpte Nazmi'nin yırtılmış notu vardır.
 */
(function (root) {
  "use strict";

  var CASE = {
    id: "gece-treni",
    difficulty: "kolay",
    duration: "10–15 dk",
    players: "1–3 oyuncu",
    tagline: "Kars'a giden gece treninde bir antikacı kompartımanında ölü bulunuyor. Tren varmadan katili bul.",
    title: "Gece Treni",
    subtitle: "Doğu Ekspresi'nde Ölüm",
    place: "Doğu Ekspresi · 3 Şubat · Erzurum ile Kars arası",
    intro: [
      "Doğu Ekspresi karlar arasında Kars'a ilerlerken yataklı vagon görevlisi sabah 06:10'da 4 numaralı kompartımanın kapısını çaldı. İçeride antikacı Nazmi Erel (58) ölü yatıyordu.",
      "Önce kalp krizi sandılar. Ama trende bulunan doktor, masadaki çay bardağını görünce şüphelendi. Nazmi zehirlenmişti.",
      "Vagonda üç kişi var. Tren 09:00'da Kars'a varacak. Yolcular inmeden kimin yaptığını bulmalısın."
    ],
    howto: [
      "Bir şüpheli seçip sorunu kendi cümlelerinle yaz.",
      "Şüpheliler bazen başkaları hakkında konuşur. Bunlar deftere söylenti olarak düşer, doğru olup olmadığını o kişiye sorarak anlarsın.",
      "Bazı konularda şüpheli ancak elinde bir kanıt olunca konuşur. 'Kanıt göster' ile defterdeki bir bilgiyi ona gösterebilirsin.",
      "Belgeler bölümüne bak. Bazı şeyler kilitlidir ve bulmaca çözünce açılır.",
      "Her soru trenin saatini ilerletir. Takılırsan Komiser'e danış."
    ],
    startFacts: ["k_otopsi", "k_bardak"],

    facts: {
      k_otopsi: { type: "kanit", title: "Ön otopsi", text: "Ölüm 23:30 ile 00:30 arası. Yüksek doz digoksin (bir kalp ilacı) zehirlenmesi. Nazmi'nin kalbi sağlammış, böyle bir ilaç kullanmıyormuş. Savunma izi yok. Tam rapor: Belgeler.", source: "Trendeki doktor" },
      k_bardak: { type: "kanit", title: "İki çay bardağı", text: "Kompartımanın masasında iki bardak var. Nazmi'nin bardağında ezilmiş tablet kalıntısı bulundu. Yani biri onunla birlikte çay içmiş.", source: "Olay yeri" },
      k_foto: { type: "kanit", title: "Koridor fotoğrafı, 23:20", text: "Oğuz'un kamerasındaki karede kırmızı atkılı bir kadın 4 numaralı kompartımandan çıkıyor. Köşede saat damgası: 23:20.", source: "Oğuz'un kamerası" },
      k_not: { type: "kanit", title: "Yırtık not", text: "Nazmi'nin el yazısı: 'Kars, 3 Şubat 10:00. Alıcı H. Demirtaş, Kars Otel. Dükkân ve stok: 9 milyon. Sevgi'ye söyleme.'", source: "4 numaranın çöp kutusu" },

      i_sevgi_ortak: { type: "ifade", title: "Ortaklık", text: "Sevgi ile Nazmi'nin İstanbul'da yarı yarıya ortak oldukları bir antika dükkânı var.", source: "Sevgi" },
      i_sevgi_oda: { type: "ifade", title: "Sevgi'nin mazereti", text: "Sevgi 22:30'da kendi kompartımanına (2) geçtiğini ve sabaha kadar çıkmadığını söylüyor.", source: "Sevgi", deny: ["c_sevgi_oda", "c_sevgi_foto"] },
      i_sevgi_gitti: { type: "ifade", title: "Sevgi oradaydı", text: "Sevgi 23:00'te dükkân hakkında konuşmak için Nazmi'nin yanına gittiğini kabul ediyor. 'Ben çıktığımda yaşıyordu' diyor.", source: "Sevgi" },
      i_sevgi_ilac: { type: "ifade", title: "Çantadaki ilaç", text: "Sevgi annesinin kalp ilaçlarını hep çantasında taşıyor. Akşam ilaç için Cemal'den su istemiş.", source: "Sevgi / Cemal" },
      i_atki: { type: "ifade", title: "Kırmızı atkı", text: "Sevgi'nin kırmızı bir atkısı var. Yemekte boynundaymış.", source: "Oğuz / Sevgi" },
      i_cemal_misafir: { type: "ifade", title: "23:00'teki misafir", text: "Cemal 23:00'te 4 numaraya iki çay götürdüğünde içeride kırmızı atkılı bir kadın görmüş. Yüzü cama dönükmüş.", source: "Cemal" },
      i_cemal_sikayet: { type: "ifade", title: "Şikâyet", text: "Nazmi, Cemal'i çaylar geç geldi diye şirkete şikâyet etmiş. Cemal kızgın olduğunu kabul ediyor.", source: "Cemal" },
      i_cemal_cop: { type: "ifade", title: "Çöpteki kâğıt", text: "Cemal sabah 4 numaranın çöp kutusunda yırtık bir kâğıt bulup cebine koymuş.", source: "Cemal" },
      i_oguz_kavga: { type: "ifade", title: "Yemekteki kavga", text: "Oğuz yemekte Nazmi'nin masasındaki bir ikonun fotoğrafını çekmek istemiş, Nazmi kamerasını itmiş. Kısa bir bağrışma olmuş.", source: "Oğuz" },
      i_oguz_ses: { type: "ifade", title: "Duvarın öbür yanından", text: "Oğuz 23:15'te yan kompartımandan bir kadının 'Bunu bana yapamazsın!' diye bağırdığını duymuş.", source: "Oğuz" },

      ii_oguz_kavga: { type: "iddia", title: "Fotoğrafçıyla kavga", text: "Fotoğrafçı Oğuz yemekte Nazmi'yle tartışmış.", source: "Sevgi", confirm: ["i_oguz_kavga"] },
      ii_cemal_sikayet: { type: "iddia", title: "Görevliye şikâyet", text: "Nazmi görevli Cemal'i şirkete şikâyet etmiş.", source: "Sevgi", confirm: ["i_cemal_sikayet"] },
      ii_oguz_foto: { type: "iddia", title: "Gece fotoğrafları", text: "Oğuz bütün gece koridorda flaşla fotoğraf çekmiş.", source: "Söylenti", confirm: ["k_foto"] }
    },

    links: [
      { id: "d_misafir", type: "cikarim", when: ["i_cemal_misafir", "i_atki"], title: "Misafir Sevgi'ydi", text: "23:00'te Nazmi'nin yanındaki kırmızı atkılı kadın büyük olasılıkla Sevgi." },
      { id: "c_sevgi_oda", type: "celiski", when: ["i_sevgi_oda", "d_misafir"], title: "Sevgi kompartımanında değildi", text: "Sevgi sabaha kadar çıkmadığını söylüyor ama 23:00'te Nazmi'nin yanındaydı." },
      { id: "c_sevgi_foto", type: "celiski", when: ["i_sevgi_oda", "k_foto"], title: "Fotoğraf yalanı ortaya çıkardı", text: "Sevgi kompartımanından çıkmadığını söyledi; fotoğraf onu 23:20'de 4 numaradan çıkarken gösteriyor." },
      { id: "d_ilac", type: "cikarim", when: ["k_otopsi", "i_sevgi_ilac"], title: "Zehir ve ilaç", text: "Nazmi'yi öldüren digoksin bir kalp ilacı. Sevgi çantasında tam da böyle bir ilaç taşıyor." },
      { id: "d_ses", type: "cikarim", when: ["i_oguz_ses", "k_not"], title: "'Bunu bana yapamazsın!'", text: "23:15'teki bağırış, Nazmi'nin dükkânı ortağına söylemeden satma planıyla örtüşüyor." }
    ],

    keys: {
      fotograf: { k: ["fotograf|foto|kamera|makine|flas|cekim|cektin|cektiniz|kare"], p: 2 },
      ilac: { k: ["ilac|kalp|hap|hasta|digoksin|tablet"], p: 2 },
      atki: { k: ["atki|kirmizi|sal|esarp"], p: 2 },
      cay: { k: ["cay|bardak|seker|tepsi|ikram"], p: 2 },
      dukkan: { k: ["dukkan|antika|satis|satacak|satiyor|alici|ortaklik|ortak|fuar"], p: 2 },
      cop: { k: ["cop|kagit|yirtik|=not|kagidi|bir sey bul|bir sey buldunuz|bir sey buldun"], p: 2 },
      sikayet: { k: ["sikayet|isten|sirket|kovul|amir"], p: 2 }
    },

    people: {
      nazmi: { name: "Nazmi Erel", aliases: "nazmi|kurban|olen|maktul|merhum|rahmetli|antikaci" },
      sevgi: { name: "Sevgi Aral", aliases: "sevgi|ortak|ortagi|ortaginiz" },
      oguz: { name: "Oğuz Tan", aliases: "oguz|fotografci" },
      cemal: { name: "Cemal Doğan", aliases: "cemal|gorevli|kondukter|usta" }
    },

    motives: [
      { id: "satis", label: "Dükkânın gizlice satılması" },
      { id: "foto", label: "Yemekteki fotoğraf kavgası" },
      { id: "sikayet", label: "İşten atılma korkusu" },
      { id: "para", label: "Antikaları çalmak" }
    ],

    solution: {
      killer: "sevgi",
      motive: "satis",
      strong: ["k_foto", "c_sevgi_foto", "c_sevgi_oda", "d_misafir", "d_ilac", "k_not", "d_ses", "i_sevgi_gitti"]
    },

    endings: {
      win: {
        title: "Dava çözüldü",
        text: [
          "Tren Kars garına girerken Sevgi Aral'ın elleri kelepçeliydi.",
          "Yirmi yıllık ortağı Nazmi, dükkânı ona söylemeden Kars'ta bir alıcıya satacaktı. Sevgi o gece konuşmak için yanına gitti. Nazmi gerçeği söyleyince 'Bunu bana yapamazsın!' diye bağırdı.",
          "Nazmi bir dakikalığına dışarı çıktığında Sevgi, çantasında taşıdığı annesinin kalp ilaçlarını ezip onun çayına kattı. Sonra hiçbir şey olmamış gibi kompartımanına döndü.",
          "Onu ele veren, bütün gece koridorda fotoğraf çeken bir gencin flaşı oldu."
        ]
      },
      weak: { title: "Savcı ikna olmadı", text: ["Doğru kişiyi buldun ama elindeki kanıt yetmiyor. Onu olay yerine bağlayan bir şey bul."] },
      wrongMotive: { title: "Sebep tutmuyor", text: ["Kişi doğru olabilir ama sebep yanlış. Nazmi'nin o gece neyi sakladığını bul."] },
      wrong: {
        oguz: { title: "Yanlış kişi", text: ["Oğuz Nazmi'yle tartıştı, evet. Ama bütün gece ne yaptığı kamerasında saatleriyle duruyor. O kameraya bir bak."] },
        cemal: { title: "Yanlış kişi", text: ["Çayı Cemal götürdü ama zehir çaya kompartımanın içinde katıldı. İçeride kim vardı?"] },
        sevgi: { title: "", text: [""] }
      }
    },

    characters: {
      sevgi: {
        name: "Sevgi Aral", short: "Sevgi", age: 41, role: "Maktulün ortağı", initials: "SA", color: "#b5525a",
        bio: "Nazmi'yle İstanbul'da bir antika dükkânı işletiyor. 2 numaralı kompartımanda kalıyor.",
        opening: "Nazmi'yle yirmi yıl çalıştım. Hâlâ inanamıyorum. Sorun, ne bilmek istiyorsanız.",
        topics: [
          { id: "selam", a: "Günaydın. Pek günaydın sayılmaz ama." },
          { id: "tesekkur", a: "Rica ederim." },
          { id: "kim", ask: "Kendinizden bahseder misiniz?", a: "Sevgi Aral. Nazmi'yle İstanbul'da bir antika dükkânımız var, yarı yarıya ortağız. Kars'taki bir fuara gidiyorduk.", gives: ["i_sevgi_ortak"] },
          { id: "nerede", ask: "Dün gece neredeydiniz?", v: [
            { a: "Yemekten sonra 22:30 gibi kompartımanıma geçtim, 2 numara. Biraz kitap okudum, uyudum. Sabaha kadar da çıkmadım.", gives: ["i_sevgi_oda"], f: "Yorgundum. Koridora bile çıkmadım." },
            { any: ["c_sevgi_oda", "c_sevgi_foto"], a: "Peki... Uğradım. 23:00 gibi dükkânla ilgili konuşmaya gittim. Çaylar geldi, içtik, çıktım. Ben çıktığımda yaşıyordu!", gives: ["i_sevgi_gitti"] }
          ] },
          { id: "tartisma", ask: "Yemekte bir şey oldu mu?", a: "Yemekte bir sorun yoktu. Sadece o genç fotoğrafçıyla Nazmi biraz atıştı, kamerası yüzünden.", gives: ["ii_oguz_kavga"] },
          { id: "dukkan", ask: "Dükkânınızın durumu nasıldı?", v: [
            { a: "Dükkân ikimizin. Nazmi parayla, ben işin kendisiyle uğraşırım. Sorunsuz bir ortaklıktı." },
            { req: ["k_not"], a: "Satacakmış... Bana söylemeden. Yirmi yıl! Bilmiyordum, yemin ederim." }
          ] },
          { id: "ilac", a: "İlaç mı? Annemin kalp ilaçlarını hep çantamda taşırım, bakımı bende. Bunun ne ilgisi var?", gives: ["i_sevgi_ilac"] },
          { id: "atki", a: "Kırmızı atkı mı? Evet, benim de var. Trende başka kimsede yok mu sanki?", gives: ["i_atki"] },
          { id: "cay", a: "Çay mı? Akşamları pek içmem, uykum kaçar." },
          { id: "nasil", a: "Önce kalp krizi dediler. Nazmi'nin kalbi turp gibiydi. Zehir diyorsanız... Allahım." },
          { id: "katil", ask: "Sizce kim yaptı?", v: [
            { a: "Bilmiyorum. Ama o fotoğrafçı çocuk yemekte çok sinirlenmişti.", gives: ["ii_oguz_kavga"], f: { a: "Bir de görevli var, Cemal. Nazmi onu şirkete şikâyet etmişti, duydum.", gives: ["ii_cemal_sikayet"] } }
          ] },
          { id: "sucla", v: [
            { a: "Ben mi? Yirmi yıllık ortağımı mı? Hayır." },
            { any: ["d_ilac", "c_sevgi_foto"], a: "Avukatımla konuşmadan başka bir şey söylemeyeceğim." }
          ] },
          { id: "yalan", v: [
            { a: "Neden yalan söyleyeyim?" },
            { any: ["c_sevgi_oda", "c_sevgi_foto"], a: "Tamam, yanına gittim. Ama sadece konuşmak için. Ben çıktığımda yaşıyordu.", gives: ["i_sevgi_gitti"] }
          ] }
        ],
        about: {
          nazmi: "Titiz, inatçı, biraz da cimri. Ama iyi bir ortaktı. Ya da ben öyle sanıyordum.",
          oguz: { a: "Genç bir fotoğrafçı. Bütün gece elinde kamerayla koridorda dolaştı, flaş patlatıp durdu.", gives: ["ii_oguz_foto"] },
          cemal: { a: "Görevli mi? Nazmi onu şirkete şikâyet etmişti, çaylar geç geliyor diye. Adam bozulmuştu.", gives: ["ii_cemal_sikayet"] }
        },
        show: {
          k_otopsi: "Digoksin mi? O... kalp ilacı değil mi?",
          k_bardak: "İki bardak mı? Belki biri uğramıştır, ne bileyim.",
          i_cemal_misafir: "Kırmızı atkılı bir kadın mı? Trende benden başka kadın yok mu?",
          c_sevgi_oda: { a: "Peki. Gittim. 23:00 gibi, dükkânla ilgili konuşmak için. Ama ben çıktığımda yaşıyordu!", gives: ["i_sevgi_gitti"] },
          k_foto: { a: "Bu... benim. Evet. Konuşmaya gittim, o kadar. Ben çıktığımda yaşıyordu!", gives: ["i_sevgi_gitti"] },
          k_not: "Satacakmış! Bana söylemeden! Yirmi yıl... Hayır, bilmiyordum. Bilseydim... Bilmiyordum işte.",
          d_ilac: "Annemin ilacı... Bu bir tesadüf. Avukatım gelmeden başka bir şey söylemeyeceğim.",
          i_oguz_ses: "Ben bağırmadım. Başka bir kompartımandan gelmiştir."
        },
        noShow: ["Bunu bana neden gösteriyorsunuz?", "Bu bana bir şey anlatmıyor."],
        repeat: ["Bunu söyledim.", "Aynı şeyi soruyorsunuz.", "Cevabım değişmedi."],
        ack: ["Başka?", "Peki."],
        locked: ["Bu konuda konuşmak istemiyorum."],
        deflect: [
          { a: "Bilmiyorum. Ama o fotoğrafçı bütün gece koridorda flaş patlatıp durdu, kimse uyuyamadı.", gives: ["ii_oguz_foto"], until: "ii_oguz_foto" },
          { a: "Bunu bilemem. Nazmi'nin görevliyle bir derdi vardı, onu biliyorum.", gives: ["ii_cemal_sikayet"], until: "ii_cemal_sikayet" },
          { a: "Bilmiyorum." },
          { a: "Bunun Nazmi'yle ne ilgisi var?" },
          { a: "Yorgunum, dedektif. Başka bir şey sorun." }
        ]
      },

      oguz: {
        name: "Oğuz Tan", short: "Oğuz", age: 27, role: "Fotoğrafçı", initials: "OT", color: "#4f8a6e",
        bio: "Bir sergi için Doğu Ekspresi'nin gece fotoğraflarını çekiyor. Nazmi'nin yan kompartımanında (5) kalıyor.",
        opening: "Merhaba. Ben bir şey yapmadım, baştan söyleyeyim. Ama sorun tabii.",
        topics: [
          { id: "selam", a: "Selam. Hiç uyumadım, kusura bakmayın." },
          { id: "tesekkur", a: "Ne demek." },
          { id: "kim", ask: "Kendinizden bahseder misiniz?", a: "Oğuz Tan, fotoğrafçıyım. Bir sergi için Doğu Ekspresi'nin gece fotoğraflarını çekiyorum. 5 numaradayım, Nazmi Bey'in yanındaki kompartıman." },
          { id: "nerede", ask: "Dün gece neredeydiniz?", a: "Gece boyunca koridorda ve yemek vagonunda çekim yaptım. Gece ışıkları, karlı istasyonlar falan. 01:00 gibi yattım.", f: "Her şey kamerada, saatleriyle. İsterseniz bakın." },
          { id: "tartisma", ask: "Yemekte ne oldu?", a: "Nazmi Bey'in masasında eski bir ikon vardı, fotoğrafını çekmek istedim. Kızdı, kameramı itti. Biraz bağrıştık, o kadar.", gives: ["i_oguz_kavga"] },
          { id: "fotograf", ask: "Gece koridorda ne fotoğrafladınız?", a: "Var tabii, hepsi kamerada. Bakın, 23:20'de çektiğim şu kare: 4 numaradan biri çıkıyor. Kırmızı atkılı bir kadın. O an fark etmemiştim bile.", gives: ["k_foto"] },
          { id: "atki", a: "Kırmızı atkı mı? Yemekte Sevgi Hanım'ın boynundaydı. Rengi çok güzeldi, aklımda kalmış.", gives: ["i_atki"] },
          { id: "gordun", ask: "Gece bir şey duydunuz mu?", a: "Görmedim ama duydum. 23:15 gibi yan kompartımandan bir kadın sesi geldi, 'Bunu bana yapamazsın!' diye. Sonra sustu.", gives: ["i_oguz_ses"] },
          { id: "cay", a: "Ben çay içmem, kahveciyim. Cemal Usta gece iki kere kahve getirdi." },
          { id: "nasil", a: "Kalp krizi sanmıştım. Zehir mi? Vay be." },
          { id: "katil", ask: "Sizce kim yaptı?", a: "Bilmiyorum. Ama 23:15'te yan taraftan gelen o kadın sesi aklımdan çıkmıyor.", gives: ["i_oguz_ses"] },
          { id: "sucla", a: "Hayır! Bir fotoğraf yüzünden mi adam öldüreceğim? Ciddi misiniz?", f: "Kameraya bakın. Bütün gece ne yaptığım orada, saatleriyle." },
          { id: "yalan", a: "Yalan söylemiyorum. İsterseniz kameramdaki bütün kareleri gösteririm." }
        ],
        about: {
          nazmi: "Huysuz bir adamdı. Antikalarına kimseyi yaklaştırmıyordu.",
          sevgi: { a: "Sevgi Hanım mı? Yemekte kırmızı bir atkısı vardı. Pek konuşmadı, Nazmi Bey'e bozuk gibiydi.", gives: ["i_atki"] },
          cemal: "Cemal Usta iyi adam. Gece bana iki kere kahve getirdi."
        },
        show: {
          k_otopsi: "Çaya mı koymuşlar? Korkunç.",
          i_cemal_misafir: { a: "Kırmızı atkılı mı? Sevgi Hanım'da vardı öyle bir atkı.", gives: ["i_atki"] },
          k_foto: "Evet, benim çektiğim kare. 23:20, saat köşede yazıyor.",
          ii_oguz_foto: { a: "Evet, bütün gece çektim. Dur, bir bakayım... İşte, 23:20'de 4 numaradan biri çıkıyor. Kırmızı atkılı bir kadın.", gives: ["k_foto"] },
          k_not: "Dükkânı satıyormuş demek. Ortağı bilse kıyamet koparırdı herhalde."
        },
        noShow: ["Bundan pek bir şey anlamadım.", "Bilmiyorum, kusura bakmayın."],
        repeat: ["Az önce söyledim.", "Aynı şey, değişen bir şey yok.", "Bunu konuştuk."],
        ack: ["Başka bir şey var mı?", "Tamam."],
        locked: ["Bunu bilmiyorum."],
        deflect: [
          { a: "Bilmiyorum. Ama 23:15 gibi yan taraftan bir kadın bağırdı, 'Bunu bana yapamazsın!' diye.", gives: ["i_oguz_ses"], until: "i_oguz_ses" },
          { a: "Onu bilemem. Ben bütün gece kamerayla dolaştım, gördüğüm her şey kamerada." },
          { a: "Hiçbir fikrim yok, açıkçası." },
          { a: "Bilmiyorum. Cemal Usta gece boyu çay taşıdı durdu, onu gördüm sadece." }
        ]
      },

      cemal: {
        name: "Cemal Doğan", short: "Cemal", age: 60, role: "Yataklı vagon görevlisi", initials: "CD", color: "#5f7aa6",
        bio: "Otuz yıldır Doğu Ekspresi'nde görevli. Nazmi'ye gece çay götüren ve sabah cesedi bulan kişi.",
        opening: "Buyurun beyim. Otuz yıldır bu trendeyim, böyle bir şey görmedim. Ne lazımsa sorun.",
        topics: [
          { id: "selam", a: "Günaydın beyim. Çay ister misiniz?" },
          { id: "tesekkur", a: "Estağfurullah." },
          { id: "kim", ask: "Kendinizden bahseder misiniz?", a: "Cemal Doğan, yataklı vagon görevlisiyim. Otuz yıldır Doğu Ekspresi'ndeyim. Çay, yatak, ne lazımsa ben." },
          { id: "nerede", ask: "Dün gece neredeydiniz?", a: "Gece boyu vagondaydım. Çay taşıdım, yatak açtım. 01:00'den sonra görevli kompartımanında biraz kestirdim." },
          { id: "cay", ask: "Nazmi Bey'e çay götürdünüz mü?", a: "23:00'te Nazmi Bey iki çay istedi, götürdüm. İçeride bir hanım vardı, kırmızı atkılı, yüzü cama dönüktü. Çayları bıraktım, çıktım. Şekerlik masadaydı, şekerlerini kendileri attılar.", gives: ["i_cemal_misafir"] },
          { id: "gordun", a: "Gördüm beyim. 23:00'te çayları götürdüğümde Nazmi Bey'in yanında kırmızı atkılı bir hanım vardı.", gives: ["i_cemal_misafir"] },
          { id: "atki", a: "Kırmızı atkı... O hanımın boynundaydı, onu iyi hatırlıyorum. Yüzünü görmedim ama.", gives: ["i_cemal_misafir"] },
          { id: "sikayet", v: [
            { a: "Şikâyet mi? Yok canım, ne şikâyeti." },
            { req: ["ii_cemal_sikayet"], a: "Duydunuz demek. Evet, Nazmi Bey çaylar geç geldi diye beni şirkete yazmış. Otuz yıllık emeğim... Kızdım ama adam mı öldüreceğim beyim?", gives: ["i_cemal_sikayet"] }
          ] },
          { id: "cop", ask: "Kompartımanda bir şey buldunuz mu?", a: "Sabah toplarken çöp kutusunda yırtık bir kâğıt buldum. Ne olur ne olmaz diye cebime koydum. Buyurun.", gives: ["i_cemal_cop"] },
          { id: "fotograf", a: "Fotoğrafçı çocuk mu? Bütün gece koridorda flaş patlattı, yolcular şikâyet etti. Bir şey çektiyse kamerasındadır.", gives: ["ii_oguz_foto"] },
          { id: "ilac", a: "İlaç mı? Sevgi Hanım akşam 22:15'te su istedi, annesinin kalp ilacı dedi. Çantasından bir kutu çıkardı.", gives: ["i_sevgi_ilac"] },
          { id: "ceset", a: "06:10'da kahvaltı için kapıyı çaldım, ses yok. Açtım, Nazmi Bey koltukta, başı yana düşmüş. Hemen doktoru çağırdım." },
          { id: "nasil", a: "06:10'da kahvaltı için kapıyı çaldım, ses yok. Açtım, Nazmi Bey koltukta, başı yana düşmüş. Çay bardağı masada duruyordu." },
          { id: "katil", ask: "Sizce kim yaptı?", a: "Bilmem beyim. Ama 23:00'te o kompartımanda bir hanım vardı, onu söyleyeyim.", gives: ["i_cemal_misafir"] },
          { id: "sucla", v: [
            { a: "Ben mi? Çayı ben götürdüm diye mi? Beyim, otuz yıl kimsenin çayına bir şey katmadım.", f: "Çayları ocaktan aldım, tepsiyle götürdüm. Kapı kapandıktan sonra içeride ne oldu, bilemem." }
          ] },
          { id: "yalan", a: "Otuz yıldır bu trende kimseye yalan söylemedim beyim." }
        ],
        about: {
          nazmi: "Titiz adamdı, her şeye kusur bulurdu. Allah rahmet eylesin.",
          sevgi: { a: "Sevgi Hanım 2 numarada. Kibar hanım. Akşam ilaç için su istedi benden, annesinin kalp ilacı dedi.", gives: ["i_sevgi_ilac"] },
          oguz: { a: "Fotoğrafçı çocuk. Gece boyu koridorda flaş patlattı durdu.", gives: ["ii_oguz_foto"] }
        },
        show: {
          k_otopsi: "Digoksin... Çaya mı katılmış? Ben çayları ocaktan aldım, kimse elleyemez. Kompartımanda katılmış olmalı.",
          k_bardak: "İki bardak, evet. İkisini de ben götürdüm. Biri o hanımındı.",
          k_foto: "Bu o hanım! 23:00'te içerideki. Atkı aynı.",
          k_not: "Bu benim çöpte bulduğum kâğıt. Demek buymuş.",
          i_sevgi_ilac: "Evet, akşam su istedi, ilacı için.",
          ii_cemal_sikayet: { a: "Duydunuz demek. Evet, Nazmi Bey beni şirkete yazmış. Kızdım ama adam mı öldüreceğim?", gives: ["i_cemal_sikayet"] }
        },
        noShow: ["Bundan anlamam beyim.", "Valla bilemem."],
        repeat: ["Söyledim ya beyim.", "Aynısı beyim, değişen bir şey yok.", "Anlattım onu."],
        ack: ["Başka bir emriniz var mı?", "Tamam beyim."],
        locked: ["Onu bilemem beyim."],
        deflect: [
          { a: "Bilmem beyim. Ama sabah çöpte yırtık bir kâğıt buldum, cebimde duruyor. Buyurun, belki işinize yarar.", gives: ["i_cemal_cop"], until: "i_cemal_cop" },
          { a: "Onu bilemem. Ama o fotoğrafçı çocuk bütün gece koridorda flaş patlattı.", gives: ["ii_oguz_foto"], until: "ii_oguz_foto" },
          { a: "Bilmem beyim, benim işim çay, yatak." },
          { a: "Valla onu bilemem." }
        ]
      }
    }
  };

  /* ---------------- Görseller ---------------- */
  CASE.ambience = "tren";
  CASE.looks = {
    sevgi: { skin: "#e6bfa3", hair: "#2b1a14", style: "uzun", clothes: "#5a2a33", bg: "#2e2026", earrings: true, lips: "#a8323f", voice: { pitch: 1.1, rate: 1.0 } },
    oguz: { skin: "#dcae8a", hair: "#3a2a1e", style: "kivircik", clothes: "#3d5a6e", bg: "#1d2731", stubble: true, voice: { pitch: 1.0, rate: 1.1 } },
    cemal: { skin: "#cf9a78", hair: "#a9a39b", style: "yana", clothes: "#27384f", bg: "#1b2433", mustache: true, tie: "#8a2b35", lines: true, voice: { pitch: 0.75, rate: 0.9 } }
  };

  CASE.autopsy = {
    no: "ATK-2026/0203",
    date: "3 Şubat 2026, 07:30",
    doctor: "Dr. Kemal Usta, trendeki doktor (ön inceleme)",
    subject: [
      ["Ad Soyad", "Nazmi Erel"],
      ["Yaş / Cinsiyet", "58 / Erkek"],
      ["Bulunduğu yer", "Doğu Ekspresi, yataklı vagon, 4 numaralı kompartıman"],
      ["Bulunma", "3 Şubat, 06:10 (Cemal Doğan)"]
    ],
    sections: [
      ["Ölüm zamanı", "23:30 ile 00:30 arası. Vücut ısısı ve ölü katılığı bu aralığı gösteriyor."],
      ["Ölüm nedeni", "Yüksek doz digoksin (bir kalp ilacı) zehirlenmesi. Bu ilaç fazla alınınca kalp ritmini bozar ve durdurur."],
      ["Mide ve ağız", "Mide içeriğinde çay ve ezilmiş tablet kalıntısı. Dudak kenarında aynı kalıntı."],
      ["Kendi ilacı mı?", "Hayır. Nazmi'nin eşyalarında böyle bir ilaç yok, kalbi de sağlam. İlacı başkası vermiş."],
      ["Savunma izi", "Yok. Nazmi zehri farkında olmadan içmiş."]
    ],
    conclusion: "Ölüm doğal değildir. Zehirlenme, cinayet olarak soruşturulmalıdır.",
    marks: [
      { n: 1, view: "on", x: 56, y: 55, kind: "olumcul", label: "Kalp: ritim bozukluğu (digoksin)" },
      { n: 2, view: "on", x: 50, y: 22, kind: "iz", label: "Dudak kenarında çay ve tablet kalıntısı" },
      { n: 3, view: "on", x: 18, y: 121, kind: "yok", label: "Ellerde savunma izi yok" }
    ]
  };

  CASE.documents = [
    { id: "otopsi", kind: "otopsi", title: "Doktorun ön raporu", sub: "Ölüm nedeni ve bulgular" },
    { id: "kroki", kind: "svg", title: "Yataklı vagon planı", sub: "Kompartımanlar ve koridor",
      notes: ["Koridorun bir ucunda görevli kompartımanı, öbür ucunda yemek vagonuna geçiş var.", "Kompartımanlar arasındaki duvarlar ince; yan kompartımandaki konuşmalar duyulabilir."],
      svg: '<svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="12" fill="#2a221b">' +
        '<rect x="20" y="40" width="580" height="170" rx="18" fill="#f6efe0" stroke="#2a221b" stroke-width="2.5"/>' +
        '<path d="M20 160h580" stroke="#2a221b" stroke-width="1.5"/>' +
        '<text x="300" y="192" text-anchor="middle" fill="#6d5a45">KORİDOR</text>' +
        '<path d="M110 40v120M200 40v120M290 40v120M380 40v120M470 40v120M540 40v120" stroke="#2a221b" stroke-width="1.5"/>' +
        '<text x="40" y="104" font-size="11">Görevli</text>' +
        '<text x="148" y="96" font-weight="700">1</text>' +
        '<text x="238" y="96" font-weight="700">2</text><text x="222" y="116" font-size="11">Sevgi</text>' +
        '<text x="328" y="96" font-weight="700">3</text><text x="318" y="116" font-size="11">boş</text>' +
        '<text x="418" y="96" font-weight="700" fill="#a8323f">4</text><text x="402" y="116" font-size="11" fill="#a8323f">Nazmi</text>' +
        '<path d="M410 128l16 16M426 128l-16 16" stroke="#a8323f" stroke-width="2.5"/>' +
        '<text x="500" y="96" font-weight="700">5</text><text x="487" y="116" font-size="11">Oğuz</text>' +
        '<text x="552" y="104" font-size="10">WC</text>' +
        '<path d="M600 120h18M612 112l8 8-8 8" stroke="#2a221b" fill="none"/><text x="540" y="236" font-size="11">yemek vagonu →</text>' +
        '<circle cx="580" cy="184" r="7" fill="#c9a25a"/><text x="470" y="236" font-size="11" fill="#8a6a2a"></text>' +
        '<path d="M574 184 L 430 168" stroke="#c9a25a" stroke-dasharray="5 4"/><text x="488" y="152" font-size="10" fill="#8a6a2a">Oğuz 23:20</text>' +
        '</svg>' },
    { id: "foto", kind: "svg", title: "Koridor fotoğrafı, 23:20", sub: "Oğuz'un kamerası", unlock: "k_foto",
      notes: ["Kare koridorun ucundan, 5 numaranın önünden çekilmiş.", "Kadının yüzü görünmüyor ama atkısı net: koyu kırmızı.", "Saat damgası 23:20."],
      svg: '<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif">' +
        '<rect width="480" height="320" fill="#1a1612"/>' +
        '<path d="M0 0 L190 120 L190 220 L0 320 Z" fill="#2b241d"/><path d="M480 0 L290 120 L290 220 L480 320 Z" fill="#231d17"/>' +
        '<rect x="190" y="120" width="100" height="100" fill="#0f0c0a"/>' +
        '<path d="M190 220 L0 320 L480 320 L290 220 Z" fill="#3a2e22"/>' +
        '<path d="M40 60 L120 110 L120 180 L40 210 Z" fill="#6f8fa5" opacity=".35"/>' +
        '<rect x="330" y="70" width="70" height="190" fill="#4a3b2c" stroke="#6b563f"/><text x="352" y="100" fill="#c9a25a" font-size="20" font-weight="700">4</text>' +
        '<ellipse cx="300" cy="150" rx="16" ry="19" fill="#2a1f1a"/>' +
        '<path d="M278 172 Q300 160 322 172 L330 280 L270 280 Z" fill="#3a2f2a"/>' +
        '<path d="M282 170 Q300 182 318 170 L322 182 Q300 196 278 182 Z" fill="#b3202c"/><path d="M310 182 L318 230 L306 230 Z" fill="#b3202c"/>' +
        '<rect x="0" y="0" width="480" height="320" fill="url(#g)" opacity=".0"/>' +
        '<text x="460" y="304" text-anchor="end" fill="#ff9a3c" font-size="18" font-family="monospace">03.02 23:20</text>' +
        '</svg>' },
    { id: "not", kind: "not", title: "Nazmi'nin yırtık notu", sub: "4 numaranın çöp kutusu", unlock: "k_not",
      head: "NOT",
      lines: [{ t: "Kars, 3 Şubat 10:00" }, { t: "Alıcı: H. Demirtaş, Kars Otel" }, { t: "Dükkân + stok: 9 milyon", big: true, u: true }, { t: "Sevgi'ye söyleme.", red: true }] }
  ];

  CASE.puzzles = [
    { id: "yirtik", kind: "yapboz", title: "Yırtık kâğıt", sub: "Cemal'in çöpten çıkardığı parçalar", unlock: "i_cemal_cop",
      desc: "Dört parçaya yırtılmış bir kâğıt. Parçalara dokunup doğru yöne çevir.",
      lines: ["Kars, 3 Şubat 10:00", "Alıcı: H. Demirtaş, Kars Otel", "Dükkân + stok: 9 milyon", "Sevgi'ye söyleme."],
      gives: ["k_not"], solved: "Parçalar birleşti. Bu Nazmi'nin el yazısı." }
  ];

  CASE.par = 20;
  CASE.clock = {
    start: "06:30", deadline: "09:00", perQuestion: 3, perShow: 4, perHint: 10,
    goal: "Tren 09:00'da Kars'a varıyor. Yolcular indikten sonra kimseyi tutamazsın.",
    over: "Saat 09:00. Tren Kars garına girdi, yolcular indi. Katil kalabalığa karıştı."
  };
  CASE.hints = [
    { until: "i_cemal_misafir", text: "Masada iki bardak var. Demek ki Nazmi yalnız değildi. Çayı kim götürdüyse içeride kimi gördüğünü ona sor." },
    { until: "d_misafir", after: ["i_cemal_misafir"], text: "Misafirin kırmızı bir atkısı varmış. Trende kimin kırmızı atkısı var?" },
    { until: "k_foto", text: "Biri bütün gece koridorda fotoğraf çekmiş. O karelere bakmak lazım." },
    { until: "d_ilac", text: "Zehir bir kalp ilacı. Trende böyle bir ilaç taşıyan biri var mı?" },
    { until: "k_not", text: "Görevli sabah kompartımanı toplamış. Çöpte bir şey bulmuş olabilir mi?" }
  ];
  CASE.hintDone = "Elinde yeterince şey var. Suçlamayı yap.";

  CASE.print = {
    victim: { name: "Nazmi Erel (58)", line: "Antikacı. 3 Şubat sabahı 06:10'da 4 numaralı kompartımanda ölü bulundu." },
    where: "3 Şubat, Doğu Ekspresi",
    sheetTimes: ["21:00", "22:15", "22:30", "23:00", "23:15", "23:20", "00:00", "06:10"],
    rules: [
      "Bu dosya kısa bir dedektiflik oyunu. Yalnız ya da arkadaşlarınla oynayabilirsin.",
      "ZARF A ile başla. Belgeleri incele, sorgu tutanaklarını oku.",
      "Zarfın sonundaki soruyu cevaplayabiliyorsan ZARF B'yi aç.",
      "Yırtık notu kesip birleştirebilirsin.",
      "Hazır olunca suçlama formunu doldur, sonra çözüm sayfasına bak."
    ],
    envelopes: [
      {
        id: "A", title: "Vagon", note: "Buradan başla.",
        docs: ["otopsi", "kroki"],
        interviews: [
          { cid: "sevgi", items: [{ t: "kim" }, { t: "nerede", v: 0 }, { t: "tartisma" }, { t: "dukkan", v: 0 }, { t: "katil", v: 0 }] },
          { cid: "oguz", items: [{ t: "kim" }, { t: "nerede" }, { t: "tartisma" }, { t: "gordun" }, { t: "hakkinda_sevgi", q: "Sevgi Hanım'ı gördünüz mü?" }] },
          { cid: "cemal", items: [{ t: "kim" }, { t: "cay" }, { t: "hakkinda_sevgi", q: "Sevgi Hanım'la gece konuştunuz mu?" }, { t: "nasil", q: "Cesedi nasıl buldunuz?" }, { t: "cop" }] }
        ],
        gate: { q: "Gece 23:00'te Nazmi'nin yanındaki kadın kimdi ve bu konuda kim yalan söylüyor?", a: "Sevgi. Cemal içeride kırmızı atkılı bir kadın gördü, Oğuz yemekte o atkının Sevgi'de olduğunu söylüyor. Sevgi ise kompartımanından hiç çıkmadığını söyledi." }
      },
      {
        id: "B", title: "Kamera ve not", note: "Geçiş sorusunu cevapladıktan sonra aç.",
        docs: ["foto"], puzzles: ["yirtik"],
        interviews: [
          { cid: "oguz", items: [{ t: "fotograf" }] },
          { cid: "sevgi", items: [{ show: "k_foto", q: "Bu fotoğraf 23:20'de çekilmiş." }, { t: "ilac", q: "Çantanızda ilaç taşıyor musunuz?" }, { show: "k_not", q: "Bu not çöpten çıktı." }] }
        ],
        gate: null
      }
    ],
    timeline: [
      ["21:00", "Yemekte Nazmi, fotoğrafçı Oğuz'un kamerasını iter."],
      ["22:15", "Sevgi, Cemal'den ilacı için su ister."],
      ["23:00", "Sevgi, Nazmi'nin kompartımanına gider. Cemal iki çay getirir."],
      ["23:15", "Nazmi dükkânı satacağını söyler. Sevgi 'Bunu bana yapamazsın!' diye bağırır."],
      ["23:18", "Nazmi bir dakikalığına çıktığında Sevgi ilacı çayına katar."],
      ["23:20", "Sevgi çıkarken Oğuz'un fotoğrafına girer."],
      ["06:10", "Cemal cesedi bulur, çöpte yırtık notu bulur."]
    ]
  };

  if (typeof module !== "undefined" && module.exports) module.exports = CASE;
  else (root.CASES = root.CASES || []).push(CASE);
})(this);
