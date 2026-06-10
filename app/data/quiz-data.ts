// ==================== STYLE TAG TYPES ====================
export type StyleTag =
  | 'Fine_Line'
  | 'Minimalist_Symbolic'
  | 'American_Traditional'
  | 'Neo_Traditional'
  | 'Black_Grey_Realism'
  | 'Color_Realism'
  | 'Micro_Realism'
  | 'Geometric_Ornamental'
  | 'Dotwork_Mandala'
  | 'Watercolor_Abstract'
  | 'Trash_Polka'
  | 'Blackwork_Tribal';

// ==================== QUIZ OPTION INTERFACE ====================
export interface QuizOption {
  id: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
  styleLabel: string;
  styleTags: StyleTag[];
  weight: number;
}

// ==================== QUIZ QUESTION INTERFACE ====================
export interface QuizQuestion {
  id: string;
  category: 'visual_perception' | 'personality_expression' | 'lifestyle_commitment' | 'anatomical_compatibility';
  categoryLabel: string;
  questionText: string;
  subtitle: string;
  options: QuizOption[];
}

// ==================== STYLE METADATA ====================
export const STYLE_META: Record<StyleTag, {
  displayName: string;
  emoji: string;
  color: string;
  description: string;
  bodyPlacements: string[];
  firstTimerWarning: string;
  agingInfo: string;
  exampleImage: string;
}> = {
  Fine_Line: {
    displayName: 'Fine Line',
    emoji: '✒️',
    color: 'from-[#e0c992] to-[#c9a86c]',
    description: 'İnce, zarif ve detaylı çizgilerle yapılan minimal bir tarz. Küçük semboller ve botanik çizimler için mükemmel.',
    bodyPlacements: ['Bilek iç kısmı', 'Kulak arkası', 'Ayak bileği'],
    firstTimerWarning: 'Fine Line dövmeler çok ince iğneler kullandığı için keskin, çizik benzeri bir his verir. Zaman içinde çizgiler hafif yayılabilir — küçük bir rötuşla düzeltilir.',
    agingInfo: 'İnce çizgiler 3-5 yıl içinde hafif bulanıklaşabilir. SPF koruması şart.',
    exampleImage: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=800&fit=crop',
  },
  Minimalist_Symbolic: {
    displayName: 'Minimalist & Sembolik',
    emoji: '◽',
    color: 'from-[#9ca3af] to-[#6b7280]',
    description: 'Tek çizgi, küçük semboller ve minimal formlar. "Az çoktur" felsefesinin dövmedeki yansıması.',
    bodyPlacements: ['Parmak', 'Bilek', 'Kulak arkası'],
    firstTimerWarning: 'Çok küçük tasarımlarda detay kaybı yaşanabilir. Parmak dövmeleri özellikle hızlı solar — rötuş gerekebilir.',
    agingInfo: 'Küçük semboller zamanla birbirine karışabilir. Minimum 2-3 cm boyut önerilir.',
    exampleImage: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800&h=800&fit=crop',
  },
  American_Traditional: {
    displayName: 'American Traditional',
    emoji: '⚓',
    color: 'from-[#ef4444] to-[#f97316]',
    description: 'Kalın siyah konturlar, düz renk blokları ve ikonik motiflerle tanınan klasik Amerikan tarzı.',
    bodyPlacements: ['Üst kol (biceps)', 'Baldır', 'Göğüs'],
    firstTimerWarning: 'Kalın konturlar yapılırken iğne daha derin girer. Ancak bu tarz en iyi yaşlanan stillerdendir — 20 yıl sonra bile net.',
    agingInfo: 'En dayanıklı tarz. Kalın konturlar ve düz renkler zamanla minimal değişir.',
    exampleImage: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=800&h=800&fit=crop',
  },
  Neo_Traditional: {
    displayName: 'Neo Traditional',
    emoji: '🌺',
    color: 'from-[#ec4899] to-[#a855f7]',
    description: 'Traditional\'ın modern yorumu: geniş renk paleti, yumuşak gölgelendirme ve detaylı çizimler.',
    bodyPlacements: ['Ön kol', 'Uyluk', 'Omuz'],
    firstTimerWarning: 'Geniş renk alanları ve gölgeleme kombinasyonu nedeniyle seans süresi uzayabilir.',
    agingInfo: 'Orta düzey dayanıklılık. Konturlar sağlam kalır, renkler zamanla hafif solar.',
    exampleImage: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=800&h=800&fit=crop',
  },
  Black_Grey_Realism: {
    displayName: 'Black & Grey Realism',
    emoji: '🖤',
    color: 'from-[#374151] to-[#111827]',
    description: 'Siyah ve gri tonlarla fotoğraf gerçekliğinde yapılan portre ve doğa tasarımları.',
    bodyPlacements: ['Ön kol iç kısmı', 'Üst sırt', 'Baldır'],
    firstTimerWarning: 'Gerçekçi gölgeleme için aynı bölgeden birden fazla geçiş yapılır — koyu tonlarda belirgin hassasiyet olabilir.',
    agingInfo: 'Gri tonlar zamanla hafif açılır ama genel etki korunur. Yılda bir rötuş önerilir.',
    exampleImage: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=800&h=800&fit=crop',
  },
  Color_Realism: {
    displayName: 'Renkli Realizm',
    emoji: '🎯',
    color: 'from-[#f59e0b] to-[#ef4444]',
    description: 'Canlı renklerle fotoğraf gerçekliğinde yapılan portre, çiçek ve hayvan tasarımları.',
    bodyPlacements: ['Üst kol', 'Uyluk dışı', 'Sırt'],
    firstTimerWarning: 'Renkli realizm uzman sanatçı gerektirir. Seanslar uzun sürebilir ve fiyatlar yüksek olabilir.',
    agingInfo: 'Açık renkler (sarı, açık yeşil) koyu renklere göre daha hızlı solar.',
    exampleImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=800&fit=crop',
  },
  Micro_Realism: {
    displayName: 'Mikro Realizm',
    emoji: '🔬',
    color: 'from-[#64748b] to-[#475569]',
    description: 'Küçük boyutta inanılmaz detaylı, fotoğraf kalitesinde minyatür dövmeler.',
    bodyPlacements: ['Ön kol iç kısmı', 'Bilek üstü', 'Ayak bileği'],
    firstTimerWarning: 'Mikro detaylar zamanla bulanıklaşabilir. Çok küçük boyutlarda detay kaybı kaçınılmazdır.',
    agingInfo: 'En hızlı değişen tarz. 2-3 yılda bir rötuş gerekebilir.',
    exampleImage: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=800&h=800&fit=crop',
  },
  Geometric_Ornamental: {
    displayName: 'Geometric & Ornamental',
    emoji: '◆',
    color: 'from-[#6366f1] to-[#8b5cf6]',
    description: 'Keskin simetri, kutsal geometri desenleri ve ornamental süslemeler.',
    bodyPlacements: ['Sternum (göğüs arası)', 'Ön kol', 'Sırt ortası'],
    firstTimerWarning: 'Simetrik desenlerde milimetrik hassasiyet gerekir. Seans boyunca çok hareketsiz kalmanız istenir.',
    agingInfo: 'İnce çizgili geometrik işler hafif yayılabilir ama genel simetri korunur.',
    exampleImage: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=800&h=800&fit=crop',
  },
  Dotwork_Mandala: {
    displayName: 'Dotwork & Mandala',
    emoji: '🔘',
    color: 'from-[#a855f7] to-[#7c3aed]',
    description: 'Binlerce küçük noktanın bir araya gelmesiyle oluşan hipnotik desenler ve mandalalar.',
    bodyPlacements: ['Omuz kapağı', 'Sternum', 'Dirsek çevresi'],
    firstTimerWarning: 'Dotwork uzun süren bir tekniktir. Noktalar bireysel olarak yapılır, sabır gerektirir.',
    agingInfo: 'Dotwork kalıcılığı yüksektir. Noktalar zamanla hafif yayılır ama görünüm korunur.',
    exampleImage: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&h=800&fit=crop',
  },
  Watercolor_Abstract: {
    displayName: 'Watercolor',
    emoji: '🎨',
    color: 'from-[#06b6d4] to-[#3b82f6]',
    description: 'Suluboya estetiğiyle özgün, akışkan renk geçişleri. Sınırları olmayan, serbest ve artistik.',
    bodyPlacements: ['Omuz-kol bağlantısı', 'Uyluk dışı', 'Sırt (kürek kemiği)'],
    firstTimerWarning: 'Watercolor dövmeler diğer tarzlara göre daha hızlı solabilir. SPF 50+ koruması zorunludur.',
    agingInfo: 'En hızlı solan tarzlardan biri. Kontur olmayan bölgeler 2-3 yılda belirgin şekilde açılır.',
    exampleImage: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&h=800&fit=crop',
  },
  Trash_Polka: {
    displayName: 'Trash Polka / Sketch',
    emoji: '🔴',
    color: 'from-[#dc2626] to-[#1f2937]',
    description: 'Siyah-kırmızı kontrastı, kaotik çizgiler, fırça darbeleri ve kolaj estetiği.',
    bodyPlacements: ['Tam kol (sleeve)', 'Göğüs-omuz hattı', 'Baldır'],
    firstTimerWarning: 'Kırmızı mürekkep sıcak bir yanma hissi yaratır. Bu tarz genellikle büyük boyutlarda en iyi durur.',
    agingInfo: 'Kırmızı mürekkep siyaha göre daha hızlı solar. Yılda bir rötuş etkiyi korur.',
    exampleImage: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=800&h=800&fit=crop',
  },
  Blackwork_Tribal: {
    displayName: 'Blackwork & Tribal',
    emoji: '▲',
    color: 'from-[#18181b] to-[#3f3f46]',
    description: 'Büyük siyah dolgu alanları, tribal paternler ve negatif space kullanımı.',
    bodyPlacements: ['Tam kol', 'Bacak', 'Sırt'],
    firstTimerWarning: 'Büyük siyah dolgu alanları yoğun his verir. Seanslar uzun sürebilir ve iyileşme süreci daha hassastır.',
    agingInfo: 'Siyah dolgu en dayanıklı mürekkeptir. Zamanla çok az değişir.',
    exampleImage: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=800&h=800&fit=crop',
  },
};

// ==================== 25 QUIZ QUESTIONS ====================
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ============ CATEGORY 1: GÖRSEL ALGI (Q1-Q8) ============
  {
    id: 'Q1',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Hangi çizgi kalitesi gözünüze daha çok hitap ediyor?',
    subtitle: 'Bu yakın çekim örneklere bakın ve sizi çeken dokuyu seçin.',
    options: [
      { id: 'A', text: 'Ultra ince, narin tek iğne çizgileri', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Fine line botanik dövme yakın çekim', styleLabel: 'Fine Line', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 3 },
      { id: 'B', text: 'Kalın, cesur geleneksel konturlar', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'American Traditional dövme kalın konturlar', styleLabel: 'Traditional', styleTags: ['American_Traditional', 'Neo_Traditional', 'Blackwork_Tribal'], weight: 3 },
      { id: 'C', text: 'Yumuşak, akışkan fırça darbesi çizgiler', imageUrl: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&h=600&fit=crop', imageAlt: 'Watercolor tarzı yumuşak dövme', styleLabel: 'Watercolor', styleTags: ['Watercolor_Abstract', 'Neo_Traditional'], weight: 3 },
      { id: 'D', text: 'Dokulu, noktalı veya kırık çizgiler', imageUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=600&fit=crop', imageAlt: 'Dotwork geometrik dövme yakın çekim', styleLabel: 'Dotwork', styleTags: ['Dotwork_Mandala', 'Geometric_Ornamental', 'Blackwork_Tribal'], weight: 3 },
    ],
  },
  {
    id: 'Q2',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Hangi kontrast seviyesi gözünüzü çekiyor?',
    subtitle: 'Açıktan koyuya, bu dövme tarzlarını karşılaştırın.',
    options: [
      { id: 'A', text: 'Yüksek kontrast — sert siyah beyaz', imageUrl: 'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=600&h=600&fit=crop', imageAlt: 'Yüksek kontrastlı blackwork dövme', styleLabel: 'Blackwork', styleTags: ['American_Traditional', 'Blackwork_Tribal', 'Trash_Polka'], weight: 3 },
      { id: 'B', text: 'Orta kontrast — gri ton geçişleri', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Black and grey realism dövme', styleLabel: 'B&G Realism', styleTags: ['Black_Grey_Realism', 'Neo_Traditional'], weight: 3 },
      { id: 'C', text: 'Düşük kontrast — yumuşak pastel tonlar', imageUrl: 'https://images.unsplash.com/photo-1543935377-1c684251e415?w=600&h=600&fit=crop', imageAlt: 'Pastel tonlarda watercolor dövme', styleLabel: 'Pastel', styleTags: ['Watercolor_Abstract', 'Fine_Line'], weight: 3 },
      { id: 'D', text: 'Canlı renk patlaması', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Canlı renkli neo-traditional dövme', styleLabel: 'Canlı Renk', styleTags: ['Neo_Traditional', 'Color_Realism'], weight: 3 },
    ],
  },
  {
    id: 'Q3',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Ne kadar detay istiyorsunuz?',
    subtitle: 'Mikro detaydan soyut formaya kadar inceleyin.',
    options: [
      { id: 'A', text: 'Mikroskobik detay — her ince element görünür', imageUrl: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&h=600&fit=crop', imageAlt: 'Hiper detaylı dövme çalışması', styleLabel: 'Hiper Detay', styleTags: ['Micro_Realism', 'Color_Realism', 'Geometric_Ornamental'], weight: 3 },
      { id: 'B', text: 'Orta detay — ana özellikler net', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Neo-traditional dengeli detay dövme', styleLabel: 'Dengeli', styleTags: ['Neo_Traditional', 'Black_Grey_Realism'], weight: 2 },
      { id: 'C', text: 'Minimal detay — sadece temel formlar', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Minimalist tek çizgi dövme', styleLabel: 'Minimal', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 2 },
      { id: 'D', text: 'Soyut — detaydan çok duygu', imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&h=600&fit=crop', imageAlt: 'Soyut ekspresif dövme', styleLabel: 'Soyut', styleTags: ['Trash_Polka', 'Watercolor_Abstract'], weight: 3 },
    ],
  },
  {
    id: 'Q4',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Hangi kompozisyon düzeni sizi çekiyor?',
    subtitle: 'Simetrik mi kaotik mi, düzenli mi organik mi?',
    options: [
      { id: 'A', text: 'Mükemmel simetri ve düzen', imageUrl: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=600&h=600&fit=crop', imageAlt: 'Simetrik mandala dövme', styleLabel: 'Simetrik', styleTags: ['Geometric_Ornamental', 'Dotwork_Mandala'], weight: 3 },
      { id: 'B', text: 'Organik, doğadan esinlenen akış', imageUrl: 'https://images.unsplash.com/photo-1614174486214-fdd6f3bd3655?w=600&h=600&fit=crop', imageAlt: 'Organik çiçek dövme', styleLabel: 'Organik', styleTags: ['Neo_Traditional', 'Watercolor_Abstract', 'Fine_Line'], weight: 2 },
      { id: 'C', text: 'Cesur ve merkezi — bir ana figür', imageUrl: 'https://images.unsplash.com/photo-1581783898382-80f85c1fae3e?w=600&h=600&fit=crop', imageAlt: 'Büyük merkezi figür dövme', styleLabel: 'Merkezi', styleTags: ['American_Traditional', 'Black_Grey_Realism', 'Color_Realism'], weight: 3 },
      { id: 'D', text: 'Kaotik kolaj — kontrollü kaos', imageUrl: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=600&h=600&fit=crop', imageAlt: 'Trash polka kolaj tarzı dövme', styleLabel: 'Kaotik', styleTags: ['Trash_Polka'], weight: 3 },
    ],
  },
  {
    id: 'Q5',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Dövmenizde negatif boşluk (cilt alanı) ne kadar olmalı?',
    subtitle: 'Dolu mu seyrek mi, soluklu mu yoğun mu?',
    options: [
      { id: 'A', text: 'Çok fazla boşluk — nefes alan tasarım', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'Minimal dövme çok boşluklu', styleLabel: 'Nefes Alan', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 3 },
      { id: 'B', text: 'Dengeli — doluluk ve boşluk uyumu', imageUrl: 'https://images.unsplash.com/photo-1586449480584-bbd437e4e15a?w=600&h=600&fit=crop', imageAlt: 'Dengeli kompozisyonlu dövme', styleLabel: 'Dengeli', styleTags: ['Neo_Traditional', 'Geometric_Ornamental'], weight: 2 },
      { id: 'C', text: 'Yoğun doluluk — her yeri kaplayan', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Yoğun blackwork dövme', styleLabel: 'Yoğun', styleTags: ['Blackwork_Tribal', 'Dotwork_Mandala'], weight: 3 },
      { id: 'D', text: 'Organik dağılım — sınırları belirsiz', imageUrl: 'https://images.unsplash.com/photo-1594164281903-0e52e01da3f0?w=600&h=600&fit=crop', imageAlt: 'Watercolor serbest akış dövme', styleLabel: 'Serbest', styleTags: ['Watercolor_Abstract', 'Trash_Polka'], weight: 3 },
    ],
  },
  {
    id: 'Q6',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Dövmenizde hangi renk yaklaşımını tercih edersiniz?',
    subtitle: 'Siyah beyaz mı, aksan renk mi, tam renk mi?',
    options: [
      { id: 'A', text: 'Tamamen siyah ve gri', imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=600&fit=crop', imageAlt: 'Siyah gri ton dövme', styleLabel: 'Siyah & Gri', styleTags: ['Fine_Line', 'Black_Grey_Realism', 'Geometric_Ornamental', 'Blackwork_Tribal'], weight: 2 },
      { id: 'B', text: 'Siyah + tek aksan renk (örn: kırmızı)', imageUrl: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=600&fit=crop', imageAlt: 'Siyah kırmızı trash polka dövme', styleLabel: 'Aksan Renk', styleTags: ['Trash_Polka', 'American_Traditional'], weight: 2 },
      { id: 'C', text: 'Cesur ve canlı tam renk paleti', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop', imageAlt: 'Canlı renkli dövme', styleLabel: 'Tam Renk', styleTags: ['American_Traditional', 'Color_Realism', 'Neo_Traditional'], weight: 3 },
      { id: 'D', text: 'Yumuşak, soluk pastel tonlar', imageUrl: 'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?w=600&h=600&fit=crop', imageAlt: 'Pastel watercolor dövme', styleLabel: 'Pastel', styleTags: ['Watercolor_Abstract', 'Fine_Line'], weight: 2 },
    ],
  },
  {
    id: 'Q7',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Bu gölgeleme tekniklerinden hangisi size hitap ediyor?',
    subtitle: 'Gölgenin dövmeye kattığı derinliği inceleyin.',
    options: [
      { id: 'A', text: 'Gölgeleme yok — sadece saf çizgi', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Sadece çizgiden oluşan dövme', styleLabel: 'Çizgi', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 3 },
      { id: 'B', text: 'Noktasal gölgeleme (stippling)', imageUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=600&fit=crop', imageAlt: 'Dotwork stippling tekniği', styleLabel: 'Stippling', styleTags: ['Dotwork_Mandala', 'Geometric_Ornamental'], weight: 3 },
      { id: 'C', text: 'Yumuşak gradient geçişler', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Gradient gölgeli realist dövme', styleLabel: 'Gradient', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Micro_Realism'], weight: 3 },
      { id: 'D', text: 'Düz renk blokları — gölge yok', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Düz renk bloklu traditional dövme', styleLabel: 'Düz Blok', styleTags: ['American_Traditional', 'Blackwork_Tribal'], weight: 3 },
    ],
  },
  {
    id: 'Q8',
    category: 'visual_perception',
    categoryLabel: 'Görsel Algı',
    questionText: 'Boyut olarak ne düşünüyorsunuz?',
    subtitle: 'Dövmenizin kapladığı alanı hayal edin.',
    options: [
      { id: 'A', text: 'Çok küçük — madeni para boyutu (2-3 cm)', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Çok küçük minimal dövme', styleLabel: 'Mikro', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 2 },
      { id: 'B', text: 'Orta — avuç içi boyutu (5-10 cm)', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Orta boyut dövme', styleLabel: 'Orta', styleTags: ['Neo_Traditional', 'Dotwork_Mandala', 'Watercolor_Abstract'], weight: 2 },
      { id: 'C', text: 'Büyük — kolu/bacağı kaplayacak (15-25 cm)', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Büyük boyut kol dövmesi', styleLabel: 'Büyük', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'American_Traditional'], weight: 3 },
      { id: 'D', text: 'Çok büyük — tam kol/sırt projesi', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Full sleeve dövme projesi', styleLabel: 'Full Proje', styleTags: ['Blackwork_Tribal', 'Trash_Polka', 'Geometric_Ornamental'], weight: 3 },
    ],
  },

  // ============ CATEGORY 2: KİŞİLİK İFADESİ (Q9-Q14) ============
  {
    id: 'Q9',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Dövmeniz bir duygu yansıtsa, hangisi olurdu?',
    subtitle: 'İçgüdüsel olarak en çok çeken görseli seçin.',
    options: [
      { id: 'A', text: 'Huzur ve dinginlik', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'Huzurlu minimal dövme', styleLabel: 'Dinginlik', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Watercolor_Abstract'], weight: 2 },
      { id: 'B', text: 'Güç ve cesaret', imageUrl: 'https://images.unsplash.com/photo-1581783898382-80f85c1fae3e?w=600&h=600&fit=crop', imageAlt: 'Güçlü traditional dövme', styleLabel: 'Güç', styleTags: ['American_Traditional', 'Blackwork_Tribal'], weight: 3 },
      { id: 'C', text: 'Nostalji ve romantizm', imageUrl: 'https://images.unsplash.com/photo-1614174486214-fdd6f3bd3655?w=600&h=600&fit=crop', imageAlt: 'Romantik çiçek dövme', styleLabel: 'Nostalji', styleTags: ['Neo_Traditional', 'Black_Grey_Realism'], weight: 2 },
      { id: 'D', text: 'İsyan ve kaos', imageUrl: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=600&h=600&fit=crop', imageAlt: 'İsyankâr trash polka dövme', styleLabel: 'İsyan', styleTags: ['Trash_Polka', 'Blackwork_Tribal'], weight: 3 },
    ],
  },
  {
    id: 'Q10',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Dövmenizin konusu ne olurdu?',
    subtitle: 'Hayalinizdeki tasarıma en yakın temayı seçin.',
    options: [
      { id: 'A', text: 'Mikro sembol veya harf/yazı', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Küçük sembol dövme', styleLabel: 'Sembol', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 3 },
      { id: 'B', text: 'Doğa / Portre / Hayvan', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Portre realist dövme', styleLabel: 'Doğa/Portre', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Neo_Traditional'], weight: 2 },
      { id: 'C', text: 'Gül, çapa, kartal gibi klasik motifler', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Klasik traditional motifler', styleLabel: 'Klasik Motif', styleTags: ['American_Traditional'], weight: 3 },
      { id: 'D', text: 'Soyut form / Geometrik desen / Tipografi', imageUrl: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=600&h=600&fit=crop', imageAlt: 'Soyut geometrik dövme', styleLabel: 'Soyut/Geometrik', styleTags: ['Geometric_Ornamental', 'Dotwork_Mandala', 'Trash_Polka'], weight: 2 },
    ],
  },
  {
    id: 'Q11',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Dövmeniz başkaları tarafından nasıl algılansın?',
    subtitle: 'Sosyal ortamlarda dövmenizin verdiği mesaj.',
    options: [
      { id: 'A', text: 'Zarif ve sofistike — fark edenler takdir etsin', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Zarif fine line dövme', styleLabel: 'Zarif', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 2 },
      { id: 'B', text: 'Etkileyici ve dikkat çekici — herkes görsün', imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop', imageAlt: 'Göz alıcı renkli dövme', styleLabel: 'Dikkat Çekici', styleTags: ['Color_Realism', 'Neo_Traditional', 'American_Traditional'], weight: 3 },
      { id: 'C', text: 'Mistik ve derin — anlam arayanlar anlasın', imageUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=600&fit=crop', imageAlt: 'Mistik mandala dövme', styleLabel: 'Mistik', styleTags: ['Dotwork_Mandala', 'Geometric_Ornamental', 'Blackwork_Tribal'], weight: 3 },
      { id: 'D', text: 'Provokatif ve cesur — norm bozucu', imageUrl: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=600&h=600&fit=crop', imageAlt: 'Cesur trash polka dövme', styleLabel: 'Provokatif', styleTags: ['Trash_Polka', 'Blackwork_Tribal'], weight: 3 },
    ],
  },
  {
    id: 'Q12',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Müzik zevkinize en yakın hangisi?',
    subtitle: 'Müzik tercihiniz estetik algınızı yansıtır.',
    options: [
      { id: 'A', text: 'Lo-fi, ambient, klasik müzik', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'Sakin minimal dövme', styleLabel: 'Sakin', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Watercolor_Abstract'], weight: 1 },
      { id: 'B', text: 'Rock, blues, country', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Rock tarzı traditional dövme', styleLabel: 'Rock', styleTags: ['American_Traditional', 'Neo_Traditional'], weight: 2 },
      { id: 'C', text: 'Elektronik, techno, trip-hop', imageUrl: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=600&h=600&fit=crop', imageAlt: 'Geometrik desen dövme', styleLabel: 'Elektronik', styleTags: ['Geometric_Ornamental', 'Dotwork_Mandala'], weight: 2 },
      { id: 'D', text: 'Punk, metal, industrial', imageUrl: 'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=600&h=600&fit=crop', imageAlt: 'Agresif blackwork dövme', styleLabel: 'Punk', styleTags: ['Trash_Polka', 'Blackwork_Tribal'], weight: 2 },
    ],
  },
  {
    id: 'Q13',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Bir sanat galerisi ziyaretinde en çok hangi esere bakardınız?',
    subtitle: 'Sanatsal tercihiniz dövme tarzınızı belirler.',
    options: [
      { id: 'A', text: 'Japon kaligrafi / Minimal çizim', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Minimal çizim tarzı dövme', styleLabel: 'Kaligrafi', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 2 },
      { id: 'B', text: 'Rönesans tablosu / Portre', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Realist portre dövme', styleLabel: 'Klasik Sanat', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Micro_Realism'], weight: 2 },
      { id: 'C', text: 'Geometrik soyut / Op Art', imageUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=600&fit=crop', imageAlt: 'Geometrik soyut dövme', styleLabel: 'Op Art', styleTags: ['Geometric_Ornamental', 'Dotwork_Mandala'], weight: 2 },
      { id: 'D', text: 'Pop Art / Kolaj / Street Art', imageUrl: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=600&h=600&fit=crop', imageAlt: 'Kolaj tarzı dövme', styleLabel: 'Pop Art', styleTags: ['Trash_Polka', 'Neo_Traditional', 'Watercolor_Abstract'], weight: 2 },
    ],
  },
  {
    id: 'Q14',
    category: 'personality_expression',
    categoryLabel: 'Kişilik İfadesi',
    questionText: 'Kıyafet tarzınızı hangisi tanımlar?',
    subtitle: 'Giyim tarzınız estetik kimliğinizin bir uzantısıdır.',
    options: [
      { id: 'A', text: 'Minimal, monokrom, temiz çizgiler', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Temiz minimal dövme', styleLabel: 'Minimal Stil', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Geometric_Ornamental'], weight: 1 },
      { id: 'B', text: 'Vintage, retro, Americana', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Retro traditional dövme', styleLabel: 'Vintage', styleTags: ['American_Traditional', 'Neo_Traditional'], weight: 1 },
      { id: 'C', text: 'Bohem, sanatsal, renkli', imageUrl: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&h=600&fit=crop', imageAlt: 'Sanatsal watercolor dövme', styleLabel: 'Bohem', styleTags: ['Watercolor_Abstract', 'Neo_Traditional'], weight: 1 },
      { id: 'D', text: 'Streetwear, urban, koyu tonlar', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Urban blackwork dövme', styleLabel: 'Street', styleTags: ['Blackwork_Tribal', 'Trash_Polka'], weight: 1 },
    ],
  },

  // ============ CATEGORY 3: YAŞAM TARZI & BAĞLILIK (Q15-Q20) ============
  {
    id: 'Q15',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Dövmenizin zamanla nasıl yaşlanmasını istersiniz?',
    subtitle: 'Her tarz farklı yaşlanır — beklentinizi belirleyin.',
    options: [
      { id: 'A', text: 'İnce detaylar zamanla hafif yumuşasın', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'İnce detaylı fine line', styleLabel: 'Yumuşayan', styleTags: ['Fine_Line', 'Micro_Realism', 'Watercolor_Abstract'], weight: 2 },
      { id: 'B', text: 'Solsa da sağlam kalsın, yıllar boyu net', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Dayanıklı traditional dövme', styleLabel: 'Dayanıklı', styleTags: ['American_Traditional', 'Blackwork_Tribal'], weight: 3 },
      { id: 'C', text: 'Tonlar zamanla iç içe geçsin, doğal dursun', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Black grey realism yaşlanma', styleLabel: 'Doğal Geçiş', styleTags: ['Black_Grey_Realism', 'Neo_Traditional'], weight: 2 },
      { id: 'D', text: 'Önemli değil — anı yaşıyorum', imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&h=600&fit=crop', imageAlt: 'Ekspresif soyut dövme', styleLabel: 'Anı Yaşa', styleTags: ['Trash_Polka', 'Watercolor_Abstract'], weight: 1 },
    ],
  },
  {
    id: 'Q16',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Acı toleransınız nasıl?',
    subtitle: 'Dürüst olun — bu tarz seçimini etkiler.',
    options: [
      { id: 'A', text: 'Düşük — mümkün olduğunca az acı', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Küçük minimal dövme', styleLabel: 'Kısa Seans', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 2 },
      { id: 'B', text: 'Orta — birkaç saat dayanabilirim', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Orta boyut dövme', styleLabel: 'Orta Seans', styleTags: ['Neo_Traditional', 'Dotwork_Mandala', 'Geometric_Ornamental'], weight: 2 },
      { id: 'C', text: 'Yüksek — uzun seanslar sorun değil', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Büyük detaylı dövme', styleLabel: 'Uzun Seans', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'American_Traditional'], weight: 3 },
      { id: 'D', text: 'Çok yüksek — "acı güzeldir" düşüncesindeyim', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Büyük blackwork projesi', styleLabel: 'Maraton Seans', styleTags: ['Blackwork_Tribal', 'Trash_Polka'], weight: 3 },
    ],
  },
  {
    id: 'Q17',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Bakım rutinine ne kadar bağlı kalırsınız?',
    subtitle: 'Bazı tarzlar sürekli bakım gerektirir.',
    options: [
      { id: 'A', text: 'Çok titiz — günlük SPF ve nemlendirici', imageUrl: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&h=600&fit=crop', imageAlt: 'Detaylı bakım gerektiren dövme', styleLabel: 'Titiz Bakım', styleTags: ['Watercolor_Abstract', 'Fine_Line', 'Micro_Realism', 'Color_Realism'], weight: 2 },
      { id: 'B', text: 'Normal — gerektiğinde bakarım', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Standart bakımlı dövme', styleLabel: 'Normal Bakım', styleTags: ['Neo_Traditional', 'Black_Grey_Realism', 'Geometric_Ornamental'], weight: 2 },
      { id: 'C', text: 'Az bakım — kendi haline bırakırım', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Dayanıklı traditional dövme', styleLabel: 'Az Bakım', styleTags: ['American_Traditional', 'Blackwork_Tribal'], weight: 3 },
      { id: 'D', text: 'Bakım umurumda değil — yaşansın', imageUrl: 'https://images.unsplash.com/photo-1561574205-8c4059caab4a?w=600&h=600&fit=crop', imageAlt: 'Trash polka dövme', styleLabel: 'Umursamaz', styleTags: ['Trash_Polka', 'Blackwork_Tribal'], weight: 1 },
    ],
  },
  {
    id: 'Q18',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Dövmeniz iş ortamınızda görünür olabilir mi?',
    subtitle: 'Profesyonel yaşamınız yerleşim kararınızı etkiler.',
    options: [
      { id: 'A', text: 'Kesinlikle gizli olmalı', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'Gizli bölge minimal dövme', styleLabel: 'Gizli', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 1 },
      { id: 'B', text: 'Zarif ve küçük olursa sorun yok', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Zarif küçük dövme', styleLabel: 'Yarı Görünür', styleTags: ['Fine_Line', 'Watercolor_Abstract', 'Geometric_Ornamental'], weight: 1 },
      { id: 'C', text: 'Görünür olması umurumda değil', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Görünür kol dövmesi', styleLabel: 'Görünür', styleTags: ['Neo_Traditional', 'American_Traditional', 'Black_Grey_Realism'], weight: 2 },
      { id: 'D', text: 'Tam da görünsün istiyorum — ifade aracım', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Full sleeve dövme', styleLabel: 'Tam Görünür', styleTags: ['Blackwork_Tribal', 'Trash_Polka', 'Color_Realism'], weight: 3 },
    ],
  },
  {
    id: 'Q19',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Bütçe aralığınız nedir?',
    subtitle: 'Farklı tarzlar farklı uzmanlık ve süre gerektirir.',
    options: [
      { id: 'A', text: 'Ekonomik — 1.500-3.000 ₺', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Ekonomik küçük dövme', styleLabel: 'Ekonomik', styleTags: ['Fine_Line', 'Minimalist_Symbolic'], weight: 1 },
      { id: 'B', text: 'Orta — 3.000-7.000 ₺', imageUrl: 'https://images.unsplash.com/photo-1614174486214-fdd6f3bd3655?w=600&h=600&fit=crop', imageAlt: 'Orta bütçe dövme', styleLabel: 'Orta Bütçe', styleTags: ['Neo_Traditional', 'Dotwork_Mandala', 'American_Traditional'], weight: 2 },
      { id: 'C', text: 'Premium — 7.000-15.000 ₺', imageUrl: 'https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=600&h=600&fit=crop', imageAlt: 'Premium realist dövme', styleLabel: 'Premium', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Geometric_Ornamental'], weight: 3 },
      { id: 'D', text: 'Üst segment — 15.000 ₺+', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Üst segment full projesi', styleLabel: 'Lüks', styleTags: ['Micro_Realism', 'Color_Realism', 'Blackwork_Tribal'], weight: 3 },
    ],
  },
  {
    id: 'Q20',
    category: 'lifestyle_commitment',
    categoryLabel: 'Yaşam Tarzı',
    questionText: 'Bu ilk dövmeniz mi?',
    subtitle: 'Deneyim seviyeniz öneri algoritmamızı etkiler.',
    options: [
      { id: 'A', text: 'Evet, hayatımdaki ilk dövme', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'İlk dövme önerisi', styleLabel: 'İlk Dövme', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Neo_Traditional'], weight: 1 },
      { id: 'B', text: '1-2 dövmem var', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Birkaç dövmeli kişi', styleLabel: 'Başlangıç', styleTags: ['Neo_Traditional', 'Dotwork_Mandala', 'Watercolor_Abstract'], weight: 2 },
      { id: 'C', text: '3-5 dövmem var, tecrübeliyim', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Tecrübeli dövme koleksiyonu', styleLabel: 'Tecrübeli', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Geometric_Ornamental'], weight: 2 },
      { id: 'D', text: '5+ dövme — koleksiyoner ruhum', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Full body dövme projesi', styleLabel: 'Koleksiyoner', styleTags: ['Blackwork_Tribal', 'Trash_Polka', 'Micro_Realism'], weight: 3 },
    ],
  },

  // ============ CATEGORY 4: ANATOMİK UYUMLULUK (Q21-Q25) ============
  {
    id: 'Q21',
    category: 'anatomical_compatibility',
    categoryLabel: 'Anatomik Uyumluluk',
    questionText: 'Dövmenizi hangi bölgeye düşünüyorsunuz?',
    subtitle: 'Bölge seçimi tarz uyumunu belirler.',
    options: [
      { id: 'A', text: 'Bilek, parmak, kulak arkası (küçük/gizli)', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Bilek dövme', styleLabel: 'Küçük Bölge', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 2 },
      { id: 'B', text: 'Ön kol, üst kol, baldır (orta/görünür)', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Ön kol dövme', styleLabel: 'Orta Bölge', styleTags: ['Neo_Traditional', 'American_Traditional', 'Black_Grey_Realism'], weight: 2 },
      { id: 'C', text: 'Sırt, göğüs, uyluk (büyük/geniş)', imageUrl: 'https://images.unsplash.com/photo-1581783898382-80f85c1fae3e?w=600&h=600&fit=crop', imageAlt: 'Sırt büyük dövme', styleLabel: 'Büyük Bölge', styleTags: ['Blackwork_Tribal', 'Geometric_Ornamental', 'Color_Realism'], weight: 3 },
      { id: 'D', text: 'Sternum, kaburga, boyun (hassas/özel)', imageUrl: 'https://images.unsplash.com/photo-1586449480584-bbd437e4e15a?w=600&h=600&fit=crop', imageAlt: 'Sternum dövme', styleLabel: 'Hassas Bölge', styleTags: ['Fine_Line', 'Geometric_Ornamental', 'Dotwork_Mandala'], weight: 2 },
    ],
  },
  {
    id: 'Q22',
    category: 'anatomical_compatibility',
    categoryLabel: 'Anatomik Uyumluluk',
    questionText: 'Dövmeniz vücut hatlarınızla nasıl etkileşsin?',
    subtitle: 'Anatomik akış tasarımı belirler.',
    options: [
      { id: 'A', text: 'Bağımsız — düz yüzey üzerinde bir tablo gibi', imageUrl: 'https://images.unsplash.com/photo-1612459284270-27b3a5e5e9b1?w=600&h=600&fit=crop', imageAlt: 'Düz yüzey dövme', styleLabel: 'Bağımsız', styleTags: ['Black_Grey_Realism', 'Color_Realism', 'Micro_Realism'], weight: 2 },
      { id: 'B', text: 'Anatomiye uyumlu — kasları/kemikleri takip etsin', imageUrl: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=600&h=600&fit=crop', imageAlt: 'Anatomiye uyumlu geometrik dövme', styleLabel: 'Uyumlu', styleTags: ['Geometric_Ornamental', 'Dotwork_Mandala', 'Blackwork_Tribal'], weight: 3 },
      { id: 'C', text: 'Sarmalayan — kolu/bacağı sarsın', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Sarmalamalı sleeve dövme', styleLabel: 'Sarmalayan', styleTags: ['Neo_Traditional', 'American_Traditional', 'Blackwork_Tribal'], weight: 3 },
      { id: 'D', text: 'Özgür — sınır tanımayan yerleşim', imageUrl: 'https://images.unsplash.com/photo-1594164281903-0e52e01da3f0?w=600&h=600&fit=crop', imageAlt: 'Serbest watercolor dövme', styleLabel: 'Özgür', styleTags: ['Watercolor_Abstract', 'Trash_Polka'], weight: 2 },
    ],
  },
  {
    id: 'Q23',
    category: 'anatomical_compatibility',
    categoryLabel: 'Anatomik Uyumluluk',
    questionText: 'Cilt tonunuz nasıl?',
    subtitle: 'Bazı tarzlar farklı cilt tonlarında daha iyi görünür.',
    options: [
      { id: 'A', text: 'Açık ten — ince detaylar net görünür', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop', imageAlt: 'Açık tende fine line', styleLabel: 'Açık Ten', styleTags: ['Fine_Line', 'Watercolor_Abstract', 'Micro_Realism', 'Color_Realism'], weight: 1 },
      { id: 'B', text: 'Orta ten — çoğu tarz uyumlu', imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=600&fit=crop', imageAlt: 'Orta tende dövme', styleLabel: 'Orta Ten', styleTags: ['Neo_Traditional', 'American_Traditional', 'Black_Grey_Realism', 'Geometric_Ornamental'], weight: 1 },
      { id: 'C', text: 'Koyu ten — kalın çizgiler ve kontrast en iyisi', imageUrl: 'https://images.unsplash.com/photo-1542856204-00101eb6def4?w=600&h=600&fit=crop', imageAlt: 'Koyu tende blackwork', styleLabel: 'Koyu Ten', styleTags: ['Blackwork_Tribal', 'American_Traditional', 'Dotwork_Mandala'], weight: 2 },
      { id: 'D', text: 'Çok koyu ten — bold tarzlar parlar', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Koyu tende bold dövme', styleLabel: 'Çok Koyu', styleTags: ['Blackwork_Tribal', 'American_Traditional'], weight: 2 },
    ],
  },
  {
    id: 'Q24',
    category: 'anatomical_compatibility',
    categoryLabel: 'Anatomik Uyumluluk',
    questionText: 'Fiziksel aktivite seviyeniz?',
    subtitle: 'Kas kütlesi değişimi dövme görünümünü etkiler.',
    options: [
      { id: 'A', text: 'Sedanter — masabaşı çalışıyorum', imageUrl: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=600&fit=crop', imageAlt: 'Sakin yaşam tarzı dövme', styleLabel: 'Sakin', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Micro_Realism'], weight: 1 },
      { id: 'B', text: 'Orta — haftada 2-3 gün spor', imageUrl: 'https://images.unsplash.com/photo-1614174486214-fdd6f3bd3655?w=600&h=600&fit=crop', imageAlt: 'Aktif yaşam dövme', styleLabel: 'Aktif', styleTags: ['Neo_Traditional', 'Geometric_Ornamental', 'Dotwork_Mandala'], weight: 1 },
      { id: 'C', text: 'Yoğun — sporcuyum, kas kütlem değişiyor', imageUrl: 'https://images.unsplash.com/photo-1581783898382-80f85c1fae3e?w=600&h=600&fit=crop', imageAlt: 'Sporcu vücudunda dövme', styleLabel: 'Sporcu', styleTags: ['American_Traditional', 'Blackwork_Tribal', 'Black_Grey_Realism'], weight: 2 },
      { id: 'D', text: 'Su sporları yapıyorum — sürekli güneş/su', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57c511c5e6c1?w=600&h=600&fit=crop', imageAlt: 'Dayanıklı dövme su sporu', styleLabel: 'Su Sporu', styleTags: ['American_Traditional', 'Blackwork_Tribal'], weight: 2 },
    ],
  },
  {
    id: 'Q25',
    category: 'anatomical_compatibility',
    categoryLabel: 'Anatomik Uyumluluk',
    questionText: 'Gelecekte dövme koleksiyonunuzu genişletmeyi düşünüyor musunuz?',
    subtitle: 'Uzun vadeli plan, ilk tasarımın yerleşimini etkiler.',
    options: [
      { id: 'A', text: 'Hayır — tek bir anlamlı parça yeterli', imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=600&fit=crop', imageAlt: 'Tek anlamlı dövme', styleLabel: 'Tek Parça', styleTags: ['Fine_Line', 'Minimalist_Symbolic', 'Black_Grey_Realism'], weight: 1 },
      { id: 'B', text: 'Belki — ilham gelirse yaptırırım', imageUrl: 'https://images.unsplash.com/photo-1614174486214-fdd6f3bd3655?w=600&h=600&fit=crop', imageAlt: 'Küçük koleksiyon dövme', styleLabel: 'Belki', styleTags: ['Neo_Traditional', 'Watercolor_Abstract', 'Dotwork_Mandala'], weight: 1 },
      { id: 'C', text: 'Evet — yarım kol veya tematik koleksiyon', imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&h=600&fit=crop', imageAlt: 'Yarım kol projesi', styleLabel: 'Koleksiyon', styleTags: ['Neo_Traditional', 'American_Traditional', 'Geometric_Ornamental'], weight: 2 },
      { id: 'D', text: 'Kesinlikle — full kol/sırt projesi planlıyorum', imageUrl: 'https://images.unsplash.com/photo-1533635297321-49a042d58730?w=600&h=600&fit=crop', imageAlt: 'Full proje dövme', styleLabel: 'Full Proje', styleTags: ['Blackwork_Tribal', 'Trash_Polka', 'Color_Realism'], weight: 3 },
    ],
  },
];

// ==================== CATEGORY LABELS ====================
export const CATEGORY_INFO: Record<QuizQuestion['category'], { label: string; emoji: string; description: string }> = {
  visual_perception: { label: 'Görsel Algı', emoji: '👁️', description: 'Estetik tercihlerinizi keşfediyoruz' },
  personality_expression: { label: 'Kişilik İfadesi', emoji: '🧠', description: 'İç dünyanızı yansıtan tarzı arıyoruz' },
  lifestyle_commitment: { label: 'Yaşam Tarzı', emoji: '🌿', description: 'Günlük hayatınıza uyumlu tercihleri belirliyoruz' },
  anatomical_compatibility: { label: 'Anatomik Uyumluluk', emoji: '🦾', description: 'Vücudunuza en uygun tarzı öneriyoruz' },
};
