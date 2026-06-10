'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '../store';
import { useRouter } from 'next/navigation';

// ==================== STYLE TAGS ====================
type StyleTag =
  | 'Fine_Line'
  | 'American_Traditional'
  | 'Neo_Traditional'
  | 'Black_Grey_Realism'
  | 'Geometric_Ornamental'
  | 'Watercolor'
  | 'Trash_Polka_Sketch';

// ==================== STYLE METADATA ====================
const STYLE_META: Record<StyleTag, {
  displayName: string;
  emoji: string;
  color: string;
  description: string;
  bodyPlacements: string[];
  firstTimerWarning: string;
}> = {
  Fine_Line: {
    displayName: 'Fine Line',
    emoji: '✒️',
    color: 'from-[#e0c992] to-[#c9a86c]',
    description: 'İnce, zarif ve detaylı çizgilerle yapılan minimal bir tarz. Küçük semboller ve botanik çizimler için mükemmel.',
    bodyPlacements: ['Bilek iç kısmı', 'Kulak arkası', 'Ayak bileği'],
    firstTimerWarning: 'Fine Line dövmeler çok ince iğneler kullandığı için keskin, çizik benzeri bir his verir. İyileşme süreci rahat olsa da zaman içinde çizgiler hafif yayılabilir — bu normaldir ve küçük bir rötuş ile düzeltilir.',
  },
  American_Traditional: {
    displayName: 'American Traditional',
    emoji: '⚓',
    color: 'from-[#ef4444] to-[#f97316]',
    description: 'Kalın siyah konturlar, düz renk blokları ve ikonik motiflerle tanınan klasik Amerikan tarzı.',
    bodyPlacements: ['Üst kol (biceps)', 'Baldır', 'Göğüs'],
    firstTimerWarning: 'Kalın konturlar yapılırken iğne daha derin girer; bu yüzden ilk birkaç dakika yoğun hissedebilir. Ancak bu tarz en iyi yaşlanan stillerdendir — 20 yıl sonra bile net görünür.',
  },
  Neo_Traditional: {
    displayName: 'Neo Traditional',
    emoji: '🌺',
    color: 'from-[#ec4899] to-[#a855f7]',
    description: 'Traditional\'ın modern yorumu: daha geniş renk paleti, yumuşak gölgelendirme ve detaylı çizimler.',
    bodyPlacements: ['Ön kol', 'Uyluk', 'Omuz'],
    firstTimerWarning: 'Geniş renk alanları ve gölgeleme kombinasyonu nedeniyle seans süresi uzayabilir. Renkli bölgelerde hafif bir yanma hissi olabilir — bu tarz sabır ister ama sonucu çarpıcıdır.',
  },
  Black_Grey_Realism: {
    displayName: 'Black & Grey Realism',
    emoji: '🖤',
    color: 'from-[#374151] to-[#111827]',
    description: 'Siyah ve gri tonlarla fotoğraf gerçekliğinde yapılan portre ve doğa tasarımları.',
    bodyPlacements: ['Ön kol iç kısmı', 'Üst sırt', 'Baldır'],
    firstTimerWarning: 'Gerçekçi gölgeleme için aynı bölgeden birden fazla geçiş yapılır — bu, özellikle koyu tonlarda belirgin bir hassasiyet yaratabilir. İlk seansın ardından kızarıklık normaldir; 3-5 gün içinde geçer.',
  },
  Geometric_Ornamental: {
    displayName: 'Geometric & Ornamental',
    emoji: '◆',
    color: 'from-[#6366f1] to-[#8b5cf6]',
    description: 'Keskin simetri, kutsal geometri desenleri ve ornamental süslemeler. Mandala ve tekrarlayan paternler bu tarzın temelidir.',
    bodyPlacements: ['Sternum (göğüs arası)', 'Ön kol', 'Sırt ortası'],
    firstTimerWarning: 'Simetrik desenlerde milimetrik hassasiyet gerektiğinden seans boyunca çok hareketsiz kalmanız istenir. Özellikle sternum bölgesinde kemik üstü titreşim hissi yoğun olabilir.',
  },
  Watercolor: {
    displayName: 'Watercolor',
    emoji: '🎨',
    color: 'from-[#06b6d4] to-[#3b82f6]',
    description: 'Suluboya estetiğiyle özgün, akışkan renk geçişleri. Sınırları olmayan, serbest ve artistik bir tarz.',
    bodyPlacements: ['Omuz-kol bağlantısı', 'Uyluk dışı', 'Sırt (kürek kemiği)'],
    firstTimerWarning: 'Watercolor dövmeler zaman içinde diğer tarzlara göre daha hızlı solabilir. Güneş koruması (SPF 50+) bu tarz için bir lüks değil, zorunluluktur. İyileşme sürecinde renkler biraz mat görünebilir, bu normaldir.',
  },
  Trash_Polka_Sketch: {
    displayName: 'Trash Polka / Sketch',
    emoji: '🔴',
    color: 'from-[#dc2626] to-[#1f2937]',
    description: 'Siyah-kırmızı kontrastı, kaotik çizgiler, fırça darbeleri ve kolaj estetiği. Alman kökenli avangart bir tarz.',
    bodyPlacements: ['Tam kol (sleeve)', 'Göğüs-omuz hattı', 'Baldır'],
    firstTimerWarning: 'Geniş siyah dolgu alanları ve kırmızı mürekkep farklı hisler verir — siyah daha derin ve baskın, kırmızı ise daha sıcak bir yanma hissi yaratır. Bu tarz genellikle büyük boyutlarda en iyi durur.',
  },
};

// ==================== WEIGHT MAPPING (from prompt) ====================
const WEIGHT_MAP: {
  question: string;
  field: 'quizVibe' | 'quizTexture' | 'quizColor' | 'quizSubject' | 'quizAging';
  options: {
    value: string;
    label: string;
    emoji: string;
    weights: Partial<Record<StyleTag, number>>;
  }[];
}[] = [
  {
    question: 'Genel estetik tercihiniz hangisine daha yakın?',
    field: 'quizVibe',
    options: [
      { value: 'minimalist', label: 'Minimalist & Zarif', emoji: '🌿', weights: { Fine_Line: 2, Geometric_Ornamental: 1 } },
      { value: 'classic_rich', label: 'Klasik & Zengin', emoji: '👑', weights: { American_Traditional: 2, Neo_Traditional: 2 } },
      { value: 'edgy_raw', label: 'Sivri & Ham', emoji: '⚡', weights: { Trash_Polka_Sketch: 3, Black_Grey_Realism: 1 } },
    ],
  },
  {
    question: 'Hangi çizgi dokusu gözünüze daha hoş geliyor?',
    field: 'quizTexture',
    options: [
      { value: 'sharp_thin', label: 'Keskin & İnce Çizgiler', emoji: '📐', weights: { Fine_Line: 3 } },
      { value: 'soft_fluid', label: 'Yumuşak & Akışkan', emoji: '💧', weights: { Watercolor: 3, Black_Grey_Realism: 1 } },
      { value: 'patterned_sym', label: 'Desenli & Simetrik', emoji: '🔷', weights: { Geometric_Ornamental: 3 } },
      { value: 'raw_sketchy', label: 'Ham & Eskiz Tarzı', emoji: '✏️', weights: { Trash_Polka_Sketch: 3 } },
    ],
  },
  {
    question: 'Dövmenizde hangi renk yaklaşımını tercih edersiniz?',
    field: 'quizColor',
    options: [
      { value: 'black_grey', label: 'Siyah & Gri Tonlar', emoji: '🖤', weights: { Fine_Line: 1, Black_Grey_Realism: 2, Geometric_Ornamental: 1 } },
      { value: 'accent_red', label: 'Siyah + Kırmızı Aksan', emoji: '🔴', weights: { Trash_Polka_Sketch: 2, American_Traditional: 1 } },
      { value: 'bold_primary', label: 'Cesur & Canlı Renkler', emoji: '🟡', weights: { American_Traditional: 3 } },
      { value: 'soft_vibrant', label: 'Yumuşak & Canlı Paletler', emoji: '🌈', weights: { Neo_Traditional: 2, Watercolor: 2 } },
    ],
  },
  {
    question: 'Dövmenizin konusu ne olurdu?',
    field: 'quizSubject',
    options: [
      { value: 'micro_symbol', label: 'Mikro Sembol / Harf', emoji: '✦', weights: { Fine_Line: 2 } },
      { value: 'nature_portrait', label: 'Doğa / Portre', emoji: '🌸', weights: { Neo_Traditional: 2, Black_Grey_Realism: 2 } },
      { value: 'classic_motifs', label: 'Gül, Çapa, Kartal', emoji: '⚓', weights: { American_Traditional: 3 } },
      { value: 'abstract_type', label: 'Soyut / Tipografi', emoji: '🔠', weights: { Trash_Polka_Sketch: 2, Geometric_Ornamental: 1 } },
    ],
  },
  {
    question: 'Dövmenizin zamanla nasıl yaşlanmasını istersiniz?',
    field: 'quizAging',
    options: [
      { value: 'fine_blur', label: 'İnce detaylar zamanla hafif yumuşasın', emoji: '🌫️', weights: { Fine_Line: 2 } },
      { value: 'dim_durable', label: 'Solsa da sağlam kalsın, yıllar boyu net', emoji: '🛡️', weights: { American_Traditional: 3 } },
      { value: 'soft_blend', label: 'Tonlar zamanla iç içe geçsin, doğal dursun', emoji: '🌅', weights: { Black_Grey_Realism: 2, Neo_Traditional: 1 } },
    ],
  },
];

// Max possible score: sum of max weight from each question
const MAX_POSSIBLE = WEIGHT_MAP.reduce((sum, q) => {
  const maxWeight = Math.max(...q.options.flatMap(o => Object.values(o.weights)));
  return sum + maxWeight;
}, 0);

// ==================== SCORE CALCULATOR ====================
function calculateScores(answers: Record<string, string>): { tag: StyleTag; score: number }[] {
  const scores: Record<StyleTag, number> = {
    Fine_Line: 0,
    American_Traditional: 0,
    Neo_Traditional: 0,
    Black_Grey_Realism: 0,
    Geometric_Ornamental: 0,
    Watercolor: 0,
    Trash_Polka_Sketch: 0,
  };

  WEIGHT_MAP.forEach((q) => {
    const selected = q.options.find(o => o.value === answers[q.field]);
    if (selected) {
      Object.entries(selected.weights).forEach(([tag, weight]) => {
        scores[tag as StyleTag] += weight;
      });
    }
  });

  return Object.entries(scores)
    .map(([tag, score]) => ({ tag: tag as StyleTag, score }))
    .sort((a, b) => b.score - a.score);
}

// ==================== PERSONA GENERATOR ====================
function generatePersona(primary: StyleTag, secondary: StyleTag | null): string {
  const personas: Record<StyleTag, string> = {
    Fine_Line: 'Detaylara önem veren, minimal estetiğe tutkulu birisin. "Az çoktur" felsefesiyle, zarafeti sessizce taşıyanlardan.',
    American_Traditional: 'Klasiklere saygı duyan, cesur ve kendinden emin bir ruhun var. Zamansız değerlere ve güçlü sembollere çekiliyorsun.',
    Neo_Traditional: 'Geleneği modern bir gözle yeniden yorumlamayı seven, yaratıcı ve renksever bir kişiliğe sahipsin.',
    Black_Grey_Realism: 'Derinlikli, duygusal ve detay odaklı birisin. Sanatı gerçekçi bir şekilde bedenine taşımak seni heyecanlandırıyor.',
    Geometric_Ornamental: 'Düzen ve simetri seni tatmin ediyor. Spiritüel derinlik ve matematiksel güzelliğin kesiştiği noktada duruyorsun.',
    Watercolor: 'Özgür ruhlu ve sanatsal bir bakış açısına sahipsin. Kuralların dışına çıkmayı ve renklerin serbestçe akmasını seviyorsun.',
    Trash_Polka_Sketch: 'Avangart, cesur ve konfor alanının dışında yaşamayı seven birisin. Kaos içinde kendi düzenini bulan bir isyancı ruhun var.',
  };
  return personas[primary] + (secondary ? ` İkincil eğilimin ${STYLE_META[secondary].displayName} — bu ikili sende güçlü bir kontrast yaratıyor.` : '');
}

function generateExplanation(primary: StyleTag, textureAnswer: string, agingAnswer: string): string {
  const textureReasons: Record<string, string> = {
    sharp_thin: 'Keskin ve ince çizgilere olan yatkınlığın',
    soft_fluid: 'Yumuşak ve akışkan dokulara olan ilgin',
    patterned_sym: 'Simetrik ve desenli yapılara olan çekimin',
    raw_sketchy: 'Ham ve eskiz tarzı dokuları sevmen',
  };
  const agingReasons: Record<string, string> = {
    fine_blur: 'zamanla doğal bir yumuşama istemen',
    dim_durable: 'dayanıklılık ve netliğe önem vermen',
    soft_blend: 'tonların zamanla iç içe geçmesinden hoşlanman',
  };

  const t = textureReasons[textureAnswer] || 'estetik tercihlerin';
  const a = agingReasons[agingAnswer] || 'yaşlanma beklentin';

  return `${t} ve ${a}, seni doğrudan ${STYLE_META[primary].displayName} tarzına yönlendiriyor. Bu tarz, tam olarak bu iki beklentinin kesiştiği noktada duruyor.`;
}

// ==================== COMPONENT ====================
export default function StyleQuiz() {
  const router = useRouter();
  const store = useStudioStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<{
    primary: StyleTag;
    secondary: StyleTag | null;
    confidence: number;
    persona: string;
    explanation: string;
  } | null>(null);

  const answers: Record<string, string> = {
    quizVibe: store.quizVibe,
    quizTexture: store.quizTexture,
    quizColor: store.quizColor,
    quizSubject: store.quizSubject,
    quizAging: store.quizAging,
  };

  const currentQ = WEIGHT_MAP[currentStep];
  const currentAnswer = answers[currentQ.field];
  const isCurrentAnswered = currentAnswer !== '';

  const handleSelect = (value: string) => {
    store.setQuizAnswer(currentQ.field, value);
  };

  const handleNext = () => {
    if (currentStep < WEIGHT_MAP.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate
      const sorted = calculateScores(answers);
      const primary = sorted[0];
      const secondary = sorted[1].score >= 4 ? sorted[1] : null;
      const confidence = Math.round((primary.score / MAX_POSSIBLE) * 100);

      const persona = generatePersona(primary.tag, secondary?.tag ?? null);
      const explanation = generateExplanation(primary.tag, store.quizTexture, store.quizAging);

      setResults({
        primary: primary.tag,
        secondary: secondary?.tag ?? null,
        confidence,
        persona,
        explanation,
      });

      store.setQuizResult(STYLE_META[primary.tag].displayName);
      setShowResult(true);
    }
  };

  const handleGoToBooking = () => {
    router.push('/randevu');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
              {WEIGHT_MAP.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    background: i <= currentStep
                      ? 'linear-gradient(90deg, var(--color-accent), var(--color-neon-amber))'
                      : 'var(--color-surface-light)',
                  }}
                />
              ))}
            </div>

            {/* Step Counter */}
            <div className="text-center mb-2">
              <span className="text-xs text-[var(--color-muted)] uppercase tracking-widest">
                Soru {currentStep + 1} / {WEIGHT_MAP.length}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-foreground)]">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(option.value)}
                    className={`relative p-5 rounded-xl text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-neon-purple)]/10 border-2 border-[var(--color-accent)]'
                        : 'glass-card-sm hover:border-[var(--color-accent)]/30 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{option.emoji}</span>
                    <span className={`font-semibold block ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)]'}`}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        layoutId="quiz-check"
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
                      >
                        <span className="text-xs text-[var(--color-background)]">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentStep === 0
                    ? 'invisible'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                }`}
              >
                ← Geri
              </button>
              <button
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isCurrentAnswered
                    ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25 hover:scale-105'
                    : 'bg-[var(--color-surface-light)] text-[var(--color-muted)] cursor-not-allowed'
                }`}
              >
                {currentStep === WEIGHT_MAP.length - 1 ? 'Sonucu Gör' : 'İleri →'}
              </button>
            </div>
          </motion.div>
        ) : results && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${STYLE_META[results.primary].color} flex items-center justify-center mx-auto mb-6`}
            >
              <span className="text-4xl">{STYLE_META[results.primary].emoji}</span>
            </motion.div>

            {/* Primary Result */}
            <div className="text-center mb-6">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">Senin Tarzın</span>
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 inline-block mb-4"
              >
                <span className="text-3xl md:text-4xl font-bold gradient-text-purple">
                  {STYLE_META[results.primary].displayName}
                </span>
              </motion.div>

              {/* Confidence Score */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-32 h-2 bg-[var(--color-surface-light)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${results.confidence}%` }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] rounded-full"
                  />
                </div>
                <span className="text-sm font-bold text-[var(--color-accent)]">%{results.confidence} Uyum</span>
              </motion.div>
            </div>

            {/* Secondary Style */}
            {results.secondary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-[var(--color-surface-light)]/50 rounded-xl p-4 mb-6 flex items-center gap-4 max-w-md mx-auto"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${STYLE_META[results.secondary].color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xl">{STYLE_META[results.secondary].emoji}</span>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">İkincil Tarz</p>
                  <p className="font-bold text-[var(--color-foreground)]">{STYLE_META[results.secondary].displayName}</p>
                </div>
              </motion.div>
            )}

            {/* Persona & Explanation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-8 max-w-lg mx-auto"
            >
              {/* Persona */}
              <div className="bg-[var(--color-surface-light)]/50 rounded-xl p-5 border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🧠</span>
                  <h4 className="text-sm font-bold text-[var(--color-accent)] uppercase tracking-wider">Estetik Profilin</h4>
                </div>
                <p className="text-sm text-[var(--color-foreground)]/80 leading-relaxed">{results.persona}</p>
              </div>

              {/* Explanation */}
              <div className="bg-[var(--color-surface-light)]/50 rounded-xl p-5 border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💡</span>
                  <h4 className="text-sm font-bold text-[var(--color-neon-amber)] uppercase tracking-wider">Neden Bu Tarz?</h4>
                </div>
                <p className="text-sm text-[var(--color-foreground)]/80 leading-relaxed">{results.explanation}</p>
              </div>

              {/* Body Placements */}
              <div className="bg-[var(--color-surface-light)]/50 rounded-xl p-5 border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📍</span>
                  <h4 className="text-sm font-bold text-[var(--color-neon-purple)] uppercase tracking-wider">Önerilen Bölgeler</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STYLE_META[results.primary].bodyPlacements.map((place) => (
                    <span key={place} className="px-3 py-1.5 rounded-lg bg-[var(--color-neon-purple)]/10 text-[var(--color-neon-purple)] text-xs font-medium border border-[var(--color-neon-purple)]/20">
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              {/* First-timer Warning */}
              <div className="bg-[var(--color-neon-amber)]/10 rounded-xl p-5 border border-[var(--color-neon-amber)]/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⚠️</span>
                  <h4 className="text-sm font-bold text-[var(--color-neon-amber)] uppercase tracking-wider">İlk Dövme İpucu</h4>
                </div>
                <p className="text-sm text-[var(--color-foreground)]/80 leading-relaxed">
                  {STYLE_META[results.primary].firstTimerWarning}
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <div className="text-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoToBooking}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold text-lg pulse-cta"
              >
                Tarzımı Buldum → Randevu Al
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
