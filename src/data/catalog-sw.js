/* Kiswahili versions of the catalogue data in catalog.js: architectural
   styles, smart packages, the five apps and the farm solution. Entries are
   aligned by slug or by array index so the English source keeps owning the
   structure, exactly as content-sw.js does for editorial data. */

const STYLES_SW = {
  'swahili-coastal': {
    name: 'Pwani ya Kiswahili',
    tagline: 'Kuta zilizopakwa chokaa, milango iliyochongwa na hewa inayotembea.',
    intro: 'Nyumba ya Pwani ya Kiswahili inachukua mantiki ya ua ya Lamu na mji wa kale wa Mombasa na kuijenga upya kwa familia ya kisasa: veranda za kina, kuta za kanda za jiwe la matumbawe, na baraza linalopokea upepo wa bahari saa kumi jioni.',
    story: 'Tulisoma nyumba kumi na moja za Kiswahili zilizosalia kati ya Shela na Mji wa Kale wa Mombasa kabla ya kuchora mpango wa kwanza. Masomo yalikuwa sawa kila mara: kivuli kinashinda kiyoyozi, ua hupoza kila chumba kinachofungukia ndani yake, na mlango uliochongwa ni kazi ya uhandisi sawa na ni mapambo. Kila nyumba ya Pwani ya Kiswahili ya TRIXX inaelekezwa ili veranda ndefu ikabiliane na upepo wa monsoo, unaopunguza joto la ndani kwa nyuzi 4 hadi 6 kabla ya kupoza kwa mashine kuanza.',
    hero: { roofs: 'Makuti juu ya jiwe la matumbawe', walls: 'Plasta ya chokaa iliyopakwa kwa mkono', openings: 'Milango na vifuniko vya mahogany iliyochongwa' },
    plotRange: '0.125 – 0.5 ekari',
    included: ['Ua na chemchemi ya maji', 'Paa la veranda la makuti', 'Mlango wa mbao ngumu uliochongwa', 'Kuta za kanda za jiwe la matumbawe', 'Baraza la kuketi', 'Kukusanya maji ya mvua hadi lita 10,000'],
    materials: ['Jiwe la matumbawe', 'Plasta ya chokaa', 'Makuti', 'Mahogany', 'Terrazzo'],
    bestFor: 'Familia za pwani na wawekezaji wa nyumba za likizo wanaotaka bili ndogo za kupoza.',
  },
  victorian: {
    name: 'Kikoloni',
    tagline: 'Dari ndefu, paa za gable na vyumba vinavyovuta pumzi.',
    intro: 'Umbo la enzi ya kikoloni lenye kiini cha kisasa. Gable zenye mwinuko humwaga mvua ya Nairobi haraka, madirisha marefu ya sash hutoa hewa ya joto kwenye kigongo, na paa zinazojitokeza huweka jua la jioni mbali na kioo.',
    story: 'Gable ya Kikoloni si hamu ya zamani. Ni mashine ya kumwaga mvua: mwinuko wa digrii 42 huondoa maji juu ya paa mara tatu haraka kuliko mwinuko mdogo, jambo muhimu wakati Nairobi inatoa milimita 40 kwa saa moja. Tulihifadhi uwiano na kubadilisha ndani — chokaa la kufunga, dari iliyowekwa maboksi, vioo viwili vilivyofungwa na kiini cha huduma kinachobeba kila waya wa smart bila kukata mapambo ya asili.',
    hero: { roofs: 'Gable yenye mwinuko na vigae vya udongo', walls: 'Jiwe lililopakwa na mawe ya pembe', openings: 'Madirisha ya sash yenye vifuniko vya dhoruba' },
    plotRange: '0.25 – 0.75 ekari',
    included: ['Paa la gable mbili na vigae vya udongo', 'Dirisha la bay kwa sebule', 'Mapambo ya cornice na ua la dari', 'Veranda inayozunguka', 'Chumba cha chini cha ardhi au ghala la divai', 'Miti ya bustani iliyokomaa'],
    materials: ['Jiwe lililokatwa kwa mashine', 'Kigae cha paa cha udongo', 'Chokaa la kufunga', 'Chuma cha kutupwa', 'Mwaloni'],
    bestFor: 'Familia zinazotaka tabia ya urithi kwenye kiwanja kikubwa cha bustani.',
  },
  'art-deco': {
    name: 'Mapambo',
    tagline: 'Minara yenye hatua, mistari imara na shaba kwenye mwanga.',
    intro: 'Mapambo yalifika Nairobi na sinema na majengo ya ofisi ya miaka ya 1930, na bado yanaonekana kama matumaini. Umbo la hatua, mapezi ya wima na mnara wa kona huipa nyumba anga yake yenyewe.',
    story: 'Tulijenga upya sarufi ya Mapambo kutoka kwa michoro iliyopimwa ya majengo matatu ya Nairobi ya miaka ya 1930, kisha tukairahisisha. Hatua zilizopungua huficha matanki ya maji na mtambo wa sola, mapezi ya wima hufunika kioo cha magharibi, na mnara wa kona hubeba ngazi yenye dirisha la mpasuko linalotupa mstari wa mwanga unaotembea kwenye ukumbi kila jioni.',
    hero: { roofs: 'Paa tambarare na ukuta wa kando wenye hatua', walls: 'Plasta laini yenye mapambo ya mapezi', openings: 'Kifuniko cha chuma na mapambo ya shaba' },
    plotRange: '0.2 – 0.5 ekari',
    included: ['Mnara wa kona wenye hatua', 'Mapezi ya wima ya kivuli cha jua', 'Ukumbi wa ngazi wa shaba', 'Dirisha la bay la kioo kilichopinda', 'Paa la juu lenye ukuta wa kando', 'Sakafu za terrazzo na shaba'],
    materials: ['Plasta laini', 'Terrazzo', 'Shaba', 'Kifuniko cha chuma', 'Kioo kilichoganda'],
    bestFor: 'Viwanja vya mjini na wanunuzi wanaotaka alama kwenye eneo dogo.',
  },
  contemporary: {
    name: 'Kisasa',
    tagline: 'Umbo safi, kioo cha urefu kamili na uti wa smart.',
    intro: 'Nyumba ya Kisasa ndiyo ujenzi wetu wa ufanisi zaidi. Umbo mbili zinazoungana, ghorofa ya kwanza inayoninginia, na uti wa huduma katikati unaobeba umeme, maji, data na kila kifaa cha smart.',
    story: 'Lengo la usanifu lilikuwa rahisi: jenga nyumba inayoweza kuchukua teknolojia kwa miaka ishirini bila kufunguliwa tena. Jibu ni uti wa huduma — mfereji wa wima wa milimita 600 kati ya umbo mbili wenye paneli zinazotolewa kwenye kila ghorofa. Kuongeza kamera, mzunguko mpya au waya wa fibre huchukua mchana mmoja, si ukarabati.',
    hero: { roofs: 'Paa tambarare na terasi iliyopandwa', walls: 'Zebaki lisilofunikwa na plasta', openings: 'Kioo cha urefu kamili na mifuko ya kina' },
    plotRange: '0.125 – 0.4 ekari',
    included: ['Ghorofa ya kwanza inayoninginia', 'Sebule ya kioo cha urefu kamili', 'Uti wa huduma wa milimita 600', 'Terasi ya paa tambarare yenye mimea', 'Mwanga wa LED uliofichwa', 'Mfereji wa sakafu kwa nyaya za baadaye'],
    materials: ['Zebaki lisilofunikwa', 'Aluminium iliyopakwa poda', 'Kigae cha porcelain', 'Mbao iliyotengenezwa', 'Micro-cement'],
    bestFor: 'Ujenzi wa haraka kwenye viwanja vidogo vya mjini vyenye matumizi makubwa ya teknolojia.',
  },
  'garden-court': {
    name: 'Bustani ya Ua',
    tagline: 'Kila chumba hufungukia kitu kinachokua.',
    intro: 'Nyumba ya chini na pana iliyozunguka ua uliopandwa. Paa ni bustani inayofanya kazi, ua ni kisima cha maji ya mvua, na jikoni hufungukia moja kwa moja kwenye kitanda cha mboga.',
    story: 'Bustani ya Ua ilianza kama jibu kwa swali la mteja: unawezaje kupanda chakula kwenye kiwanja cha mji bila kuonekana kama shamba? Ua uko katikati, umepandwa miti ya matunda na kitanda kilichoinuliwa, na mfumo wa maji ya kijivu huulisha. Kaya zenye mpango huu kwa kawaida hupunguza matumizi ya mboga kwa theluthi katika mwaka wa kwanza.',
    hero: { roofs: 'Paa la kijani lililopandwa juu ya dawati la mbao', walls: 'Matofali ya udongo yaliyoimarishwa', openings: 'Milango ya kioo yenye fremu ya mbao' },
    plotRange: '0.2 – 0.6 ekari',
    included: ['Ua uliopandwa katikati', 'Vitanda vya mboga vinavyozalisha', 'Mzunguko wa kuchakata maji ya kijivu', 'Paa la kijani lenye umwagiliaji wa matone', 'Bustani ya mvua na mfereji', 'Kituo cha mboji'],
    materials: ['Matofali ya udongo yaliyoimarishwa', 'Dawati la mbao', 'Udongo ulioshinikizwa', 'Kigae cha udongo', 'Mbao zilizokusanywa upya'],
    bestFor: 'Kaya zinazotaka kupanda chakula na kupunguza bili za maji.',
  },
  'courtyard-villa': {
    name: 'Nyumba ya Ua',
    tagline: 'Ya faragha, inayoelekea ndani na tulivu kutoka mtaa.',
    intro: 'Villa iliyopangwa kuzunguka ua wa faragha wenye bwawa, iliyofunikwa kutoka mtaa na mabawa mawili ya kando. Wageni huingia uani; barabara haigusi vyumba vya kuishi.',
    story: 'Faragha ndio usanifu wote. Mabawa mawili ya ghorofa moja hufanya fremu ya blok ya kuishi yenye urefu mara mbili katikati, na fursa pekee zinazoelekea mtaa ni madirisha ya juu ya clerestory. Sauti hupungua kwa desibeli takriban 15 kati ya geti na bwawa, ambao ni tofauti kati ya barabara yenye shughuli na bustani.',
    hero: { roofs: 'Chuma cha mshono wa mwinuko mdogo', walls: 'Plasta mbaya na jiwe', openings: 'Kioo cha kuteleza kwa ua na bwawa' },
    plotRange: '0.4 – 1.25 ekari',
    included: ['Ua wa faragha wenye bwawa', 'Mabawa mawili ya wageni ya kando', 'Blok ya kuishi yenye urefu mara mbili', 'Jikoni ya nje na pergola', 'Nyumba za wafanyakazi na ua wa huduma', 'Bwawa linalopashwa na sola'],
    materials: ['Plasta mbaya', 'Jiwe la bluu la Nairobi', 'Chuma cha mshono', 'Teak', 'Travertine'],
    bestFor: 'Familia zilizoimarika zinazopokea wageni na kuthamini faragha.',
  },
};

const PACKAGES_SW = {
  basic: {
    name: 'Msingi',
    summary: 'Mambo ya msingi. Taa, kufuli na mita ya smart unayoweza kusoma kwenye simu yako.',
    headline: 'Kila kitu unachohitaji ili kuacha kuwa na wasiwasi kuhusu mambo ya msingi.',
    groups: [
      { title: 'Usalama', items: ['Kufuli ya mbele ya smart yenye kibodi', 'Vitambuzi vya milango na madirisha (6)', 'Kitambuzi cha mwendo cha ndani (2)', 'Kengele ya mlango yenye kamera'] },
      { title: 'Mwanga na umeme', items: ['Swichi za smart (mizunguko 8)', 'Udhibiti wa mwanga wa sebule', 'Mita ya nishati ya smart inayoripoti kwenye app'] },
      { title: 'Hali ya hewa na maji', items: ['Thermostat ya smart (kanda 1)', 'Kitambuzi cha kiwango cha tanki la maji', 'Utambuzi wa uvujaji chini ya sinki'] },
      { title: 'Muunganisho na msaada', items: ['TRIXX Home Hub yenye 4G ya akiba', 'App ya TRIXX Home kwa familia yote', 'Udhamini wa miaka 2, msaada wa mbali'] },
    ],
    notIncluded: ['Sola na betri', 'Chaja ya EV', 'Vitambuzi vya shamba', 'Umwagiliaji wa kiotomatiki'],
  },
  comfort: {
    name: 'Faraja',
    summary: 'Inaongeza sola, umwagiliaji wa kiotomatiki na usimamizi mzuri wa nishati.',
    headline: 'Kifurushi kinachochaguliwa na familia nyingi — sola, umwagiliaji na uendeshaji kamili.',
    groups: [
      { title: 'Usalama', items: ['Kila kitu cha Msingi', 'Kamera za nje zenye maono ya usiku (4)', 'Mota ya geti ya smart na intercom', 'Kengele za moshi na gesi (3)'] },
      { title: 'Mwanga na umeme', items: ['Swichi za smart (mizunguko 16)', 'Safu ya sola ya 3 kWp yenye betri ya 5 kWh', 'Ufuatiliaji wa nishati kwa mzunguko', 'Kupanga vifaa kwa bei za kilele'] },
      { title: 'Hali ya hewa na maji', items: ['Thermostat ya smart (kanda 3)', 'Umwagiliaji wa bustani wa kiotomatiki (kanda 4)', 'Kidhibiti cha kukusanya maji ya mvua', 'Kipima muda cha maji ya moto na udhibiti wa geyser ya sola'] },
      { title: 'Muunganisho na msaada', items: ['TRIXX Home Hub yenye 4G na fibre ya akiba', 'Ufikiaji wa wageni na profaili za familia', 'Udhibiti wa sauti kwa taa na matukio', 'Udhamini wa miaka 4, ziara za msaada kwenye eneo'] },
    ],
    notIncluded: ['Chaja ya EV', 'Vitambuzi vya shamba', 'Akiba ya betri ya nyumba yote zaidi ya 5 kWh'],
  },
  premium: {
    name: 'Bora',
    summary: 'Sola kamili na betri, shamba, chaji ya EV na uthabiti wa nje ya gridi.',
    headline: 'Umeme wa kujitegemea, shamba linalofuatiliwa na nafasi ya kukua.',
    groups: [
      { title: 'Usalama', items: ['Kila kitu cha Faraja', 'Kamera za mzunguko zenye utambuzi wa watu kwa AI (8)', 'Uingiaji wa kibaiometriki na kumbukumbu ya wageni', 'Kiungo cha kengele kinachofuatiliwa saa 24 kwa siku kwa timu ya kukabiliana'] },
      { title: 'Mwanga na umeme', items: ['Swichi na dimmers za smart (nyumba yote)', 'Safu ya sola ya 8 kWp yenye betri ya 15 kWh', 'Akiba ya nyumba yote na kubadilisha kiotomatiki', 'Chaja ya EV ya 7 kW yenye chaji iliyopangwa'] },
      { title: 'Hali ya hewa na maji', items: ['Udhibiti wa hali ya hewa kwa kanda na kuhisi unyevu', 'Uendeshaji wa kupasha na kuchuja bwawa', 'Uendeshaji wa kisima na tanki na kuhisi ubora', 'Kidhibiti cha kuchakata maji ya kijivu'] },
      { title: 'Shamba na bustani', items: ['Umwagiliaji wa IoT wenye vitambuzi vya unyevu wa udongo (8)', 'Kituo cha hali ya hewa na muingiliano wa utabiri wa mvua', 'Ufuatiliaji wa kiwango cha maji ya mifugo', 'Kumbukumbu ya mavuno kwenye TRIXX Farm'] },
      { title: 'Muunganisho na msaada', items: ['TRIXX Home Hub yenye WAN mbili na LTE ya akiba', 'Msaada wa kipaumbele kwenye eneo, majibu ya saa 24', 'Ukaguzi wa afya ya mfumo kila mwaka', 'Udhamini wa miaka 6'] },
    ],
    notIncluded: [],
  },
};

const APPS_SW = {
  home: {
    tagline: 'Dhibiti taa, kufuli, hali ya hewa na umeme kutoka skrini moja.',
    description: 'TRIXX Home ni chumba cha udhibiti cha nyumba yako. Husoma sola yako, hufuatilia tanki lako, huweka kamera zako tayari na hukuruhusu kumpa mtu wa kusafisha au mkandarasi ufunguo wa muda bila kukata ufunguo wa chuma.',
    features: [
      'Taa, soketi na matukio chumba kwa chumba',
      'Uzalishaji wa sola wa moja kwa moja, hali ya betri na matumizi ya gridi',
      'Mitiririko ya kamera na historia ya mwendo',
      'Funguo za kidijitali zenye muda wa kuisha kwa wafanyakazi na wageni',
      'Uendeshaji wa kiotomatiki: mwanga wa macheo, hali ya kuondoka, arifa za tanki la maji',
      'Hufanya kazi nje ya mtandao kwenye hub ya ndani wakati internet inapotea',
    ],
    stats: [
      { label: 'Vifaa vinavyotumika' },
      { label: 'Muda wa kusanidi kwa wastani' },
      { label: 'Kiwango' },
    ],
    platforms: ['Android 8.0+', 'iOS 14+', 'Dashibodi ya wavuti'],
  },
  farm: {
    tagline: 'Mwagilia kwa unyevu wa udongo, si kwa kubahatisha.',
    description: 'TRIXX Farm hubadilisha shamba kuwa mfumo unaosimamiwa. Vitambuzi huripoti unyevu kwa kina tatu, kidhibiti humwagilia tu wakati udongo unahitaji, na kila lita na saa hurekodiwa ili uone msimu uligharimu kiasi gani.',
    features: [
      'Kuhisi unyevu na joto la udongo kwa kina 3',
      'Ratiba za umwagiliaji kwa kanda zenye kuruka kulingana na hali ya hewa',
      'Uhasibu wa maji na saa za pampu kwa kila kanda',
      'Ufuatiliaji wa kiwango cha maji ya mifugo na mabwawa',
      'Kalenda ya kupanda yenye kumbukumbu ya mavuno',
      'Ratiba inayofanya kazi bila mtandao',
    ],
    stats: [
      { label: 'Maji yaliyookolewa' },
      { label: 'Kazi iliyookolewa' },
      { label: 'Kanda kwa kidhibiti' },
    ],
    platforms: ['Android 8.0+', 'iOS 14+', 'Dashibodi ya wavuti'],
  },
  rent: {
    tagline: 'Lipa kodi, pata risiti, ripoti ukarabati — kwa miguso mitatu.',
    description: 'TRIXX Rent huondoa mzozo wa kila mwezi. Kodi hutolewa ankara, hulipwa kwa M-Pesa au kadi, hupokea risiti papo hapo na hulinganishwa na mkataba wa kukodisha. Maombi ya ukarabati hubeba picha na hali ambayo mpangaji anaweza kufuatilia.',
    features: [
      'Ankara za kodi zenye malipo ya M-Pesa na kadi',
      'Risiti za kidijitali papo hapo na salio linaloendelea',
      'Maombi ya ukarabati yenye picha na ufuatiliaji wa hali',
      'Hati za mkataba na kumbusho za kuhuisha',
      'Daftari la amana na orodha ya kuondoka',
      'Mitazamo ya mwenye nyumba na mpangaji wa rekodi moja',
    ],
    stats: [
      { label: 'Ukamilishaji wa malipo' },
      { label: 'Uwasilishaji wa risiti' },
      { label: 'Ukarabati uliotatuliwa kwa saa 48' },
    ],
    platforms: ['Android 8.0+', 'iOS 14+', 'Lango la wavuti'],
  },
  market: {
    tagline: 'Nunua na uza mali na watu waliothibitishwa.',
    description: 'TRIXX Market ni upande wa orodha wa biashara. Kila mmiliki huthibitishwa utambulisho, kila nyumba iliyojengwa na TRIXX hubeba rekodi yake ya ujenzi, na wanunuzi huzungumza moja kwa moja na muuzaji badala ya kupitia mnyororo wa madalali.',
    features: [
      'Profaili za wamiliki na mawakala waliothibitishwa',
      'Tafuta kwa eneo, bei, mtindo na kiwango cha smart',
      'Zungumza na mmiliki au wakala kwenye app',
      'Utafutaji uliohifadhiwa wenye arifa za mechi mpya',
      'Picha, video na ziara ya 360 kwenye kila orodha',
      'Kikokotoo cha mkopo na malipo ndani ya app',
    ],
    stats: [
      { label: 'Orodha hai' },
      { label: 'Wamiliki waliothibitishwa' },
      { label: 'Muda wa kati hadi ofa' },
    ],
    platforms: ['Android 8.0+', 'iOS 14+', 'Lango la wavuti'],
  },
  school: {
    tagline: 'Ada, ratiba na ripoti kwa wazazi na shule.',
    description: 'TRIXX School huunganisha shule na wazazi wake. Ada hutolewa ankara na kupokea risiti, ratiba na matokeo huchapishwa kwa walezi wanaofaa tu, na matangazo huwafikia wote wanaohitaji bila karatasi.',
    features: [
      'Ankara za ada, malipo ya M-Pesa na risiti',
      'Ratiba na kalenda ya muhula',
      'Kadi za ripoti na historia ya tathmini',
      'Arifa za mahudhurio na usafiri',
      'Matangazo kwa walezi pekee',
      'Ufuatiliaji wa bursari na mipango ya malipo',
    ],
    stats: [
      { label: 'Shule zilizojiunga' },
      { label: 'Muda wa kukusanya ada ulipunguzwa' },
      { label: 'Walezi wanaotumika' },
    ],
    platforms: ['Android 8.0+', 'iOS 14+', 'Lango la wavuti'],
  },
};

const FARM_SW = {
  intro: 'Shamba la TRIXX ni mfumo uliopimwa, si kubahatisha. Vitambuzi vya udongo huamua wakati wa kumwagilia, kidhibiti huendesha kanda, na app hukuonyesha lita na saa ambazo hukutumia.',
  howItWorks: [
    { title: 'Kuhisi udongo', body: 'Vichunguzi vya capacitive kwa milimita 150, 300 na 600 huripoti unyevu na joto kila dakika kumi na tano. Kidhibiti humwagilia eneo la mizizi, si uso.' },
    { title: 'Udhibiti unaozingatia hali ya hewa', body: 'Kidhibiti huvuta utabiri wa eneo. Ikiwa mvua ya milimita 8 inatarajiwa ndani ya saa kumi na mbili, mzunguko wa asubuhi hurukwa na kurekodiwa kama akiba.' },
    { title: 'Ugavi wa kanda', body: 'Mistari ya matone hupita kwa kanda kwa mazao na aina ya udongo. Kila kanda ina vali yake, mita ya mtiririko na ratiba, hivyo kitanda cha mchanga na cha udongo mzito haimwagiliwi sawa.' },
    { title: 'Ulinzi wa pampu na tanki', body: 'Vitambuzi vya kiwango huzuia pampu kukauka, na ufuatiliaji wa shinikizo huonyesha mstari uliopasuka ndani ya dakika badala ya mwisho wa siku.' },
    { title: 'Uthibitisho kwenye app', body: 'Lita zilizotumika, saa zilizookolewa, muda wa pampu na mavuno kwa kitanda huingia TRIXX Farm. Mwisho wa msimu unaweza kuona shamba liligharimu kiasi gani kuendesha.' },
  ],
  plotPackages: {
    'starter-plot': {
      name: 'Shamba la Kuanzia',
      size: 'ekari 0.25',
      includes: ['Kanda 2 za umwagiliaji zenye mistari ya matone', 'Vitambuzi 3 vya unyevu wa udongo', 'Kidhibiti kinachozingatia hali ya hewa', 'Kitambuzi cha kiwango cha tanki la maji ya mvua', 'Ufikiaji wa app ya TRIXX Farm'],
    },
    'family-plot': {
      name: 'Shamba la Familia',
      size: 'ekari 1',
      includes: ['Kanda 6 za umwagiliaji zenye matone na micro-sprinkler', 'Vitambuzi 8 vya unyevu wa udongo', 'Kituo cha hali ya hewa na kipimo cha mvua', 'Ulinzi wa pampu na upimaji wa mtiririko', 'Ufuatiliaji wa maji ya mifugo', 'App ya TRIXX Farm yenye kumbukumbu ya mavuno'],
    },
    'estate-plot': {
      name: 'Shamba la Shamba Kubwa',
      size: 'ekari 5 na zaidi',
      includes: ['Hadi kanda 16 za umwagiliaji', 'Vitambuzi 20 vya udongo, mtiririko na shinikizo', 'Uendeshaji wa kisima na tanki', 'Udhibiti wa kipimo cha mbolea', 'Uhasibu wa maji na gharama kwa kila kanda', 'Ziara ya mapitio ya kilimo kila mwaka'],
    },
  },
  savings: [
    { crop: 'Nyanya kwa matone', water: 'maji 42% pungufu', labour: 'saa 11 kwa wiki zimeokolewa', payback: 'miezi 14' },
    { crop: 'Vitanda vya sukuma wiki na mchicha', water: 'maji 34% pungufu', labour: 'saa 8 kwa wiki zimeokolewa', payback: 'miezi 11' },
    { crop: 'Mahindi, yanayotegemea mvua na kuongeza', water: 'maji 26% pungufu', labour: 'saa 6 kwa wiki zimeokolewa', payback: 'miezi 19' },
    { crop: 'Bustani ya parachichi', water: 'maji 38% pungufu', labour: 'saa 9 kwa wiki zimeokolewa', payback: 'miezi 16' },
  ],
  example: {
    title: 'Ekari moja ya sukuma wiki Kiambu, miezi kumi na miwili',
    rows: [
      'Maji yaliyotumika kabla',
      'Maji yaliyotumika baada',
      'Gharama ya maji kabla',
      'Gharama ya maji baada',
      'Kazi ya umwagiliaji kabla',
      'Kazi ya umwagiliaji baada',
      'Mabadiliko ya mavuno ya msimu',
      'Malipo ya Shamba la Familia',
    ],
  },
};

module.exports = { STYLES_SW, PACKAGES_SW, APPS_SW, FARM_SW };
