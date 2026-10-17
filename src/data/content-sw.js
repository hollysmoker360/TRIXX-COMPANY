/* Kiswahili versions of editorial data that lives in listings.js.
   Entries are aligned by array index (TEAM, FAQ_GROUPS, TESTIMONIALS,
   CASE_STUDIES, PRESS, MILESTONES) or by slug (LISTINGS) so the English
   source stays the single structural definition. */

const TEAM_SW = [
  { role: 'Mwanzilishi na Afisa Mtendaji Mkuu' },
  { role: 'Afisa Mkuu wa Teknolojia' },
  { role: 'Mkuu wa Mali' },
  { role: 'Mkuu wa Ujenzi' },
  { role: 'Mkuu wa Suluhisho za Shamba' },
  { role: 'Mkuu wa Fedha' },
  { role: 'Mkuu wa Uzoefu wa Mteja' },
  { role: 'Mkuu wa Usalama na Uzingatiaji' },
];

const FAQ_SW = [
  [
    {
      q: 'Kiwango cha smart kinabadilisha nini kwenye nyumba?',
      a: 'Kiwango huamua vifaa vipi vinavyowekwa na kuwekwa tayari kabla ya kukabidhi. Basic inashughulikia taa, kufuli, vitambuzi na mita. Comfort inaongeza sola na hifadhi, umwagiliaji wa kiotomatiki na udhibiti wa hali ya hewa kwa kanda. Premium inaongeza hifadhi ya betri kwa nyumba yote, chaja ya EV, shamba linalofuatiliwa na msaada wa kipaumbele. Ratiba kamili ya vifaa kwa kila kiwango iko kwenye ukurasa wa vifurushi smart.',
    },
    {
      q: 'Vifaa smart vimejumuishwa kwenye bei ya nyumba?',
      a: 'Ndiyo. Kila nyumba iliyojengwa na TRIXX ina bei inayojumuisha kiwango chake tayari. Hakuna ankara tofauti ya ufungaji na hakuna usajili wa ada kwa vipengele vya msingi vya programu.',
    },
    {
      q: 'Naweza kubadilisha kiwango baada ya kukabidhi?',
      a: 'Ndiyo. Ujenzi wetu una uti wa huduma na mabomba ya akiba, hivyo kupandisha kutoka Basic hadi Comfort kwa kawaida ni kazi ya siku nne hadi nane wakati nyumba ina wakaaji. Kupandisha hadi Premium kunahitaji nafasi zaidi kwa benki ya betri, ambayo tunaipanga katika hatua ya usanifu.',
    },
    {
      q: 'Mnaithibitishaje orodha ya mmiliki?',
      a: 'Tunakagua hati au kukodisha, tunathibitisha utambulisho wa mtu anayeorodhesha, na tunatuma mpimaji kupiga picha na kupima mali. Hapo tu ndipo orodha inapata beji ya uthibitisho. Orodha ambazo hazijakamilisha hili zinawekwa alama kama orodha za wamiliki bila beji.',
    },
    {
      q: 'Mnasaidia na mkopo wa nyumba?',
      a: 'Tunafanya kazi na Stanbic na wakopeshaji wengine wawili. Timu yetu huandaa rekodi ya ujenzi, kifurushi cha thamani na hati za kiwango cha smart ambazo wakopeshaji huomba, na tunaweza kukuunganisha na mshauri wa mikopo bila gharama.',
    },
  ],
  [
    {
      q: 'Ninalipaje kodi?',
      a: 'Kupitia TRIXX Rent kwenye programu au lango la mpangaji kwenye tovuti hii, kwa M-Pesa au kadi. Unapata risiti ya kidijitali mara moja na salio lako linasasishwa dakika hiyo hiyo.',
    },
    {
      q: 'Ukarabati unashughulikiwa kwa kasi gani?',
      a: 'Unaandika ombi lako na picha kwenye programu au lango. Tunathibitisha ndani ya saa nne za kazi na tunalenga kutatua kwa saa 48 kwa kitu chochote kinachoathiri uwezekano wa kuishi. Hali inaonekana kwako wakati wote.',
    },
    {
      q: 'Kuingia kwangu kunafanya kazi kwenye programu zote?',
      a: 'Ndiyo. Akaunti moja ya TRIXX inashughulikia tovuti na programu zote tano. Jisajili hapa mara moja na tayari wewe ni mtumiaji katika Rent, Market, Home, Farm na School.',
    },
  ],
  [
    {
      q: 'Umwagiliaji utafanya kazi bila intaneti?',
      a: 'Ndiyo. Kidhibiti kinahifadhi ratiba kamili kienyeji na kinaendelea kufanya kazi kwa vichocheo vya unyevu wa udongo ikiwa muunganisho utakatika. Kinasawazisha kumbukumbu kinapounganishwa tena.',
    },
    {
      q: 'Nitaokoa maji kiasi gani kwa kweli?',
      a: 'Kati ya 26% na 42% kutegemea zao na udongo, kulingana na vipimo vya viwanja vyetu vilivyowekwa. Kikokotoo cha akiba kwenye tovuti hii kinatumia takwimu hizo zilizopimwa na kinakuwezesha kuweka gharama yako ya maji.',
    },
    {
      q: 'Mnaweka kwenye ardhi ambayo hamkuiendeleza?',
      a: 'Ndiyo. Vifurushi vya viwanja vya shamba vinawekwa kwenye kiwanja chochote kilicho na chanzo cha maji na pampu. Tunapima kwanza na kukupa mpango wa kanda kabla ya kutoa bei.',
    },
  ],
  [
    {
      q: 'Mnakusanya data gani ya kamera na vifaa?',
      a: 'Kamera zinarekodi kwenye kituo chako cha ndani kwa msingi, na video inabaki hapo isipokuwa uwashe hifadhi ya wingu. Tunapokea data ya afya ya kifaa, hitilafu na matumizi — kwa mfano kwamba kihisi kimezimika au betri imeshuka chini ya 20% — ili tuweze kukusaidia. Hatuangalii wala kukagua video yako, na hatuuzi data ya vifaa kwa yeyote. Maelezo kamili yako kwenye sera ya faragha na kidokezo cha data ya vifaa.',
    },
    {
      q: 'Naweza kuhamisha au kufuta data yangu?',
      a: 'Ndiyo. Unaweza kuhamisha historia ya vifaa vyako, kumbukumbu za nishati na risiti kama CSV kutoka kwenye programu, na unaweza kutuomba kufuta akaunti yako na data inayohusiana. Tunakamilisha maombi ya kufuta ndani ya siku 30, isipokuwa kumbukumbu tunazopaswa kuhifadhi kwa sheria za kodi na kukodisha.',
    },
    {
      q: 'Nini kinatokea ikiwa intaneti itakatika?',
      a: 'Kituo kinaendesha uendeshaji wa kiotomatiki, taa, kufuli na umwagiliaji kienyeji. Programu haitafikia nyumba hadi muunganisho urudi, lakini nyumba inaendelea kufanya kazi.',
    },
  ],
  [
    {
      q: 'Inagharimu kiasi gani kuorodhesha?',
      a: 'Kuorodhesha ni bure kwa siku thelathini za kwanza. Baada ya hapo unachagua mpango: Standard kwa KES 1,500 kwa mwezi kwa orodha moja, Portfolio kwa KES 4,500 kwa mwezi kwa hadi tano, au Agency kwa KES 12,000 kwa mwezi kwa orodha zisizo na kikomo na dashibodi ya timu. Hakuna kamisheni kwenye mauzo.',
    },
    {
      q: 'Naweza kuhariri au kuondoa orodha?',
      a: 'Ndiyo, wakati wowote kutoka dashibodi ya mmiliki. Orodha zilizoondolewa zinaacha kuonekana mara moja na zinaondolewa kwenye matokeo ya utafutaji.',
    },
    {
      q: 'Mnakagua orodha?',
      a: 'Kila orodha inakaguliwa kabla ya kuonekana. Tunakataa orodha za nakala, za kupotosha au zisizoweza kuthibitishwa, na tunasimamisha akaunti zinazokiuka sheria za orodha mara kwa mara.',
    },
  ],
];

const TESTIMONIALS_SW = [
  {
    role: 'Mmiliki wa nyumba, Kiambu Road',
    quote: 'Tulihamia nyumba ya Contemporary ya kiwango cha Comfort mwezi Machi. Sola inashughulikia nyumba yote na pampu, na bili yetu ya KPLC ilishuka kutoka karibu 9,000 hadi chini ya 2,000 kwa mwezi. Programu ilituambia tanki la maji lilikuwa chini kabla hatujagundua.',
  },
  {
    role: 'Mmiliki wa nyumba, Nyali',
    quote: 'Mpango wa Pwani ya Kiswahili ndio pekee niliouona unaoweza kuweka nyumba baridi bila kuendesha kiyoyozi siku nzima. Baraza ni mahali tunapoishi sasa.',
  },
  {
    role: 'Mpangaji, Kilimani',
    quote: 'Kulipa kodi kupitia TRIXX Rent kunamaanisha napata risiti dakika hiyo hiyo na ukarabati niliouandika Jumanne ulifanyika Alhamisi. Hakuna tena kubishana kuhusu kilicholipwa.',
  },
  {
    role: 'Mkulima, Nanyuki',
    quote: 'Ekari mbili za parachichi kwenye kifurushi cha Family Plot. Tunatumia karibu theluthi moja maji kidogo na niliacha kutumia kila asubuhi kusogeza mabomba. Malipo yalirudi chini ya mwaka mmoja.',
  },
  {
    role: 'Mwekezaji, Diani',
    quote: 'Nilinunua nyumba mbili za pwani kwa kukodisha. Rekodi ya ujenzi na hati za kiwango cha smart zilifanya mkopo kuwa rahisi, na lango la mpangaji linamaanisha sifuatilii mtu yeyote kwa risiti.',
  },
  {
    role: 'Mwenye nyumba, Syokimau',
    quote: 'Kuorodhesha kwenye TRIXX Market kulileta maombi ishirini na mawili kwa wiki, yote yaliyokaguliwa utambulisho. Dashibodi ya mmiliki inanionyesha ni yapi yaliyogeuka kuwa ziara.',
  },
];

const CASE_STUDIES_SW = {
  'karen-garden-court-water': {
    title: 'Kupunguza bili ya maji ya kaya ya Karen kwa 38%',
    summary: 'Ujenzi wa Garden Court wenye kuchakata maji ya kijivu na umwagiliaji wa unyevu wa udongo ulipunguza matumizi ya maji yaliyopimwa kwa 38% katika mwaka wa kwanza huku ukiongeza maradufu mavuno ya mboga kutoka uani.',
    metrics: ['Kupungua kwa maji', 'Matumizi ya mboga yaliyopunguzwa', 'Ongezeko la mavuno'],
    body: 'Kaya ilihamia wakati wa Januari kame. Uani ulipandwa na sukuma wiki, mchicha na miche miwili ya parachichi, na mzunguko wa maji ya kijivu ulianza wiki ya tatu. Katika miezi kumi na miwili matumizi yaliyopimwa yalishuka kutoka wastani wa 640 m³ hadi 397 m³. Familia inasema uani sasa unatoa sehemu kubwa ya mboga zao na kwamba mfumo wa matone unajiendesha wenyewe.',
  },
  'nyali-solar-independence': {
    title: 'Villa ya Nyali inayoendeshwa na paa lake',
    summary: 'Safu ya 8 kWp yenye hifadhi ya 15 kWh kwenye ujenzi wa Pwani ya Kiswahili iliendesha kaya kwa 94% ya mwaka bila kuchukua umeme wa gridi, ikiwemo pampu ya bwawa.',
    metrics: ['Uhuru wa gridi', 'Akiba ya nishati kwa mwaka', 'Muda wa kurudisha gharama'],
    body: 'Unyevu wa pwani na hewa ya chumvi ni vigumu kwa vifaa, hivyo safu iliwekwa kwenye reli za daraja la bahari zenye nafasi ya 300 mm kwa mzunguko wa hewa. Pampu ya bwawa inaendeshwa kwa ratiba ya mchana inayofuatilia uzalishaji. Katika mwaka nyumba ilichukua 610 kWh kutoka gridi, yote usiku katika wiki mbili zenye mawingu zaidi za masika.',
  },
  'kiambu-road-smart-retrofit': {
    title: 'Kuboresha nyumba ya 1998 hadi kiwango cha Comfort',
    summary: 'Nyumba ya miaka kumi bila mabomba ilipelekwa kwenye kiwango kamili cha Comfort kwa siku kumi na moja bila kufungua ukuta wowote uliokamilika.',
    metrics: ['Muda wa uboreshaji', 'Bili ya nishati iliyopunguzwa', 'Ilikaliwa wakati wote'],
    body: 'Familia haikutaka kuhamia. Tulitumia mifereji ya juu iliyolingana na rangi ya ubao wa chini, relay zisizo na waya kwenye nafasi ya dari, na mfumo wa betri kwenye gereji. Vifaa vipya vinavyoonekana ni kituo na inverter pekee. Nyumba ilikaliwa wakati wote wa ufungaji.',
  },
};

const PRESS_SW = [
  { title: 'TRIXX yafungua kiwanda cha nyumba smart Athi River' },
  { title: 'Jinsi vitambuzi vya udongo vinavyobadilisha umwagiliaji wa wakulima wadogo' },
  { title: 'Usanifu wa pwani unaopunguza joto bila kiyoyozi' },
  { title: 'TRIXX Rent yavuka miamala 40,000 kwa mwezi' },
  { title: 'Orodha za wamiliki zapata ukaguzi wa utambulisho' },
];

const MILESTONES_SW = [
  { title: 'TRIXX ilianzishwa Nairobi', body: 'Ilianza na watu watatu, nyumba moja iliyokamilika Kiambu na ahadi ya kuweka waya kila ujenzi kwa siku zijazo.' },
  { title: 'Safu ya kwanza ya Pwani ya Kiswahili ilikamilika', body: 'Nyumba sita Kilifi na Watamu, na lugha ya usanifu inayobainisha mkusanyiko wa pwani hadi leo.' },
  { title: 'TRIXX Home ilizinduliwa', body: 'Toleo la kwanza la programu ya nyumba smart lilitolewa kwa kaya 400 kwenye ujenzi wetu.' },
  { title: 'Suluhisho za shamba na TRIXX Farm', body: 'Umwagiliaji wa unyevu wa udongo ulihama kutoka majaribio Nanyuki hadi mstari kamili wa bidhaa.' },
  { title: 'Market na Rent zilizinduliwa', body: 'Soko la mali lilifunguliwa kwa orodha za wamiliki, na uthibitisho wa utambulisho kuanzia siku ya kwanza.' },
  { title: 'Kiwanda cha vifaa smart Athi River', body: 'Ilifungua mstari wa kukusanya wa ndani kwa vituo, vitambuzi na vidhibiti, ikipunguza muda wa kusubiri hadi siku tisa.' },
];

module.exports = {
  TEAM_SW,
  FAQ_SW,
  TESTIMONIALS_SW,
  CASE_STUDIES_SW,
  PRESS_SW,
  MILESTONES_SW,
};
