'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import PainMap from '../components/PainMap';
import StyleQuiz from '../components/StyleQuiz';

const STYLES = [
  {
    name: 'Fine-Line',
    description: 'İnce, zarif çizgilerle yapılan bu tarz, minimal ve sofistike görünüm arayanlar için idealdir. Genellikle çiçek, yaprak ve geometrik formlar kullanılır.',
    who: 'Zarafeti seven, minimal estetiğe yatkın kişiler.',
    culture: 'Modern Batı sanatından ilham alır. Özellikle Güney Kore\'daki dövme sanatçıları tarafından popülerleştirilmiştir.',
    color: 'from-[#e0c992] to-[#c9a86c]',
  },
  {
    name: 'Traditional',
    description: 'Kalın konturlar, canlı renkler ve ikonik motiflerle tanınan klasik Amerikan dövme tarzı. Çapa, gül, kartal gibi sembolik figürler sık kullanılır.',
    who: 'Cesur, kendinden emin ve nostaljik tarza meraklı kişiler.',
    culture: 'Amerikan denizci geleneğinden doğmuştur. Sailor Jerry ve Ed Hardy bu tarzın öncüleridir.',
    color: 'from-[#ef4444] to-[#f97316]',
  },
  {
    name: 'Dotwork',
    description: 'Binlerce küçük noktanın bir araya gelmesiyle oluşan bu tarz, hipnotik geometrik desenler ve mandalalar için mükemmeldir.',
    who: 'Sabırlı, detaycı ve spiritüel derinlik arayan kişiler.',
    culture: 'Kadim Güneydoğu Asya dövme geleneklerinden esinlenir. Meditasyon ve kutsal geometri ile bağlantılıdır.',
    color: 'from-[#a855f7] to-[#6366f1]',
  },
];

const BEGINNER_FAQ = [
  { question: 'Çok acır mı?', answer: 'Acı kişiden kişiye ve bölgeden bölgeye değişir. Genel olarak bilek, kol ve baldır gibi bölgeler daha az acıtırken, kaburga, sternum ve ayak bileği gibi kemik üstü bölgeler daha hassastır. Acı seviyesi genellikle tahammül edilebilir düzeydedir.' },
  { question: 'Aç mı gelmeliyim?', answer: 'Hayır, kesinlikle tok karnına gelin! Seansdan 1-2 saat önce doyurucu bir öğün yemenizi öneriyoruz. Kan şekerinizin düşmesi baygınlığa neden olabilir. Yanınıza atıştırmalık ve şekerli içecek de getirebilirsiniz.' },
  { question: 'İlk dövmem için ne kadar büyük olmalı?', answer: 'İlk dövmeniz için küçük-orta boyut (3-10 cm) ideal bir başlangıçtır. Hem süreci tanımanızı sağlar, hem de acı toleransınızı test etmenize yardımcı olur.' },
  { question: 'İyileşme süreci nasıl?', answer: 'Dövmeniz yaklaşık 2-4 haftada yüzeysel olarak iyileşir, tam iyileşme 2-3 ay sürer. Bu süreçte dövmenizi temiz tutmanız, nemlendirici sürmeniz ve güneşten korumanız önemlidir.' },
  { question: 'Seansa nasıl hazırlanmalıyım?', answer: 'İyi uyumuş ve dinlenmiş olun, alkol almayın (24 saat öncesinden), bol su için, rahat kıyafetler giyin ve dövme yapılacak bölgeyi tıraş etmeyin (biz hallediyoruz).' },
  { question: 'Dövme sonrası neler yapmamalıyım?', answer: 'İlk 2 hafta: Havuza/denize girmeyin, doğrudan güneş almayın, saunaya gitmeyin, dövmenizi kaşımayın veya kabukları koparmayın. Temiz ve nemlendirici uygulayarak bakımını yapın.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function IlkDefaPage() {
  return (
    <main className="flex-1">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tattoo-styles.png"
            alt="Dövme stilleri"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/90 to-[var(--color-background)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            {...fadeUp}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] mb-6"
          >
            ✦ İlk Dövme Rehberin
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-[var(--color-foreground)]">Dövme Dünyasına</span>
            <br />
            <span className="gradient-text-purple font-serif italic">Hoş Geldin</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto"
          >
            İlk dövmeni yaptırmadan önce bilmen gereken her şey burada.
            Tarzını keşfet, acı seviyelerini öğren ve kendini hazırla.
          </motion.p>
        </div>
      </section>

      {/* ===== EDUCATIONAL MODULE: Tattoo Styles ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
              Dövme Stilleri
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              <span className="gradient-text">Tarzını</span>{' '}
              <span className="text-[var(--color-foreground)]">Tanı</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 md:p-8 hover:border-[var(--color-accent)]/30 transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Style Icon */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${style.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl md:text-4xl font-bold text-white/90 font-serif">{style.name[0]}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">{style.name}</h3>
                    <p className="text-[var(--color-muted)] leading-relaxed mb-4">{style.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                        <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">Kime Uygun?</span>
                        <p className="text-sm text-[var(--color-foreground)]/80 mt-1">{style.who}</p>
                      </div>
                      <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                        <span className="text-xs font-semibold text-[var(--color-neon-purple)] uppercase tracking-wider">Kültürel Kökeni</span>
                        <p className="text-sm text-[var(--color-foreground)]/80 mt-1">{style.culture}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PAIN MAP ===== */}
      <section id="pain-map" className="py-16 md:py-24 bg-[var(--color-surface)]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[var(--color-neon-pink)] font-semibold">
              Acı Haritası
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              <span className="text-[var(--color-foreground)]">Nerede</span>{' '}
              <span className="gradient-text-purple">Ne Kadar Acır?</span>
            </h2>
            <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto">
              Vücut haritası üzerinde fareyi gezdirerek her bölgenin acı seviyesini öğrenin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-10"
          >
            <PainMap interactive={false} />
          </motion.div>
        </div>
      </section>

      {/* ===== STYLE QUIZ ===== */}
      <section id="quiz" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
              Tarz Keşif Asistanı
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              <span className="gradient-text">Hangi Tarz</span>{' '}
              <span className="text-[var(--color-foreground)]">Sana Uygun?</span>
            </h2>
            <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto">
              3 basit soruyla sana en uygun dövme tarzını keşfet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-10"
          >
            <StyleQuiz />
          </motion.div>
        </div>
      </section>

      {/* ===== BEGINNER FAQ ===== */}
      <FAQ items={BEGINNER_FAQ} title="Yeni Başlayanlar İçin SSS" />

      <Footer />
    </main>
  );
}
