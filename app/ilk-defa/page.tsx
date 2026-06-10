'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import PainMap from '../components/PainMap';
import StyleQuiz from '../components/StyleQuiz';

import { STYLE_META } from '../data/quiz-data';
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
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1598371839696-601e3338ea46?w=1600&h=900&fit=crop"
            alt="Temiz ve profesyonel dövme stüdyosu"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            {...fadeUp}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] mb-6"
          >
            ✦ Güvenli, Temiz, Profesyonel
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-[var(--color-foreground)]">İlk Dövmen Unutulmaz Bir</span>
            <br />
            <span className="gradient-text-purple font-serif italic">Deneyim Olmalı</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto"
          >
            Heyecanını anlıyoruz. Aklındaki tüm soruları silmek, hijyenik ve sakin bir ortamda sanatla buluşmanı sağlamak için adım adım yanındayız.
          </motion.p>
        </div>
      </section>

      {/* ===== TESTIMONIALS (Müşteri Yorumları) ===== */}
      <section className="py-16 bg-[var(--color-surface)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--color-neon-pink)] font-semibold">
              Onlar Da Senin Gibi Hissetmişti
            </span>
            <h2 className="text-3xl font-bold mt-3">
              <span className="text-[var(--color-foreground)]">İlk Defa Yaptıranların</span>{' '}
              <span className="gradient-text">Deneyimleri</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ayşe Y.',
                style: 'Fine Line',
                text: 'İğne korkum yüzünden yıllardır erteliyordum. Stüdyonun sakinliği ve sanatçının her adımı açıklaması beni o kadar rahatlattı ki, acı hissetmedim bile!',
                rating: 5
              },
              {
                name: 'Can B.',
                style: 'Minimal',
                text: 'Hijyen konusunda çok takıntılıyım. Gözümün önünde paketlerin açılması ve otoklav cihazını bana anlatmaları tüm güven problemimi çözdü.',
                rating: 5
              },
              {
                name: 'Elif D.',
                style: 'Neo Traditional',
                text: 'Ne istediğimi tam anlatamıyordum. Benimle oturup 1 saat fikir alışverişi yaptılar, hiç aceleye getirmediler. Sonuç hayal ettiğimden bile güzel oldu.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between hover:border-[var(--color-neon-purple)]/30 transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[var(--color-accent)] text-sm">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className="text-[var(--color-muted)] italic text-sm md:text-base mb-6">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto">
                  <span className="font-bold text-[var(--color-foreground)]">{testimonial.name}</span>
                  <span className="text-xs px-2 py-1 bg-[var(--color-surface)] rounded-md text-[var(--color-muted)]">{testimonial.style}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STEP-BY-STEP GUIDE ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-[var(--color-neon-purple)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
              Belirsizliğe Son
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              <span className="text-[var(--color-foreground)]">Sürecimiz</span>{' '}
              <span className="gradient-text-purple">Adım Adım Nasıl İşler?</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-[var(--color-border)] z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {[
                { step: '01', title: 'Fikir & Danışmanlık', desc: 'WhatsApp veya form üzerinden hayalinizdeki tasarımı konuşur, uygun sanatçıyı belirleriz.' },
                { step: '02', title: 'Tasarım & Onay', desc: 'Sanatçımız size özel taslağı hazırlar, revizyonlarla içinize sinene kadar şekillendiririz.' },
                { step: '03', title: 'Stüdyo Günü', desc: 'Steril ortamda karşılama, transfer kağıdı uygulaması ve konforlu bir dövme seansı.' },
                { step: '04', title: 'İyileşme Desteği', desc: 'Dövme sonrası bakım kitinizle evinize uğurlar, iyileşme sürecini dijital olarak takip ederiz.' }
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-border)] group-hover:border-[var(--color-neon-purple)] flex items-center justify-center font-bold text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS (Güven ve Hijyen) ===== */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/50 border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--color-neon-pink)] font-semibold">
              Sağlığınız Önceliğimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              <span className="gradient-text">Güven</span>{' '}
              <span className="text-[var(--color-foreground)]">ve Hijyen Standartlarımız</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center p-8 bg-[var(--color-background)] rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-4xl mb-6">
                🔬
              </div>
              <h3 className="font-bold text-xl mb-3">Tek Kullanımlık Ekipman</h3>
              <p className="text-[var(--color-muted)] leading-relaxed">İğneler, mürekkep kapsülleri ve eldivenler gözünüzün önünde açılır ve işlem sonrasında tıbbi atık olarak güvenli şekilde imha edilir.</p>
            </motion.div>
            
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center p-8 bg-[var(--color-background)] rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center text-4xl mb-6">
                ⚙️
              </div>
              <h3 className="font-bold text-xl mb-3">Otoklav Sterilizasyon</h3>
              <p className="text-[var(--color-muted)] leading-relaxed">Tekrar kullanılabilir metal ekipmanlar, hastane standartlarındaki yüksek basınçlı otoklav cihazlarımızda her kullanım öncesi sterilize edilir.</p>
            </motion.div>
            
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center p-8 bg-[var(--color-background)] rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-4xl mb-6">
                📜
              </div>
              <h3 className="font-bold text-xl mb-3">Sertifikalı Sanatçılar</h3>
              <p className="text-[var(--color-muted)] leading-relaxed">Tüm ekibimiz güncel İl Sağlık Müdürlüğü hijyen eğitim sertifikalarına ve Kan Yoluyla Bulaşan Hastalıklar protokol eğitimine sahiptir.</p>
            </motion.div>
          </div>
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
            {Object.entries(STYLE_META).map(([key, style], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.1 }}
                className="glass-card p-6 md:p-8 hover:border-[var(--color-accent)]/30 transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Style Image */}
                  <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 group-hover:shadow-lg transition-shadow duration-500">
                    <Image
                      src={style.exampleImage}
                      alt={style.displayName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-2xl shadow-sm">
                      {style.emoji}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">{style.displayName}</h3>
                    <p className="text-[var(--color-muted)] leading-relaxed mb-4">{style.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                        <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">İlk Dövme Notu</span>
                        <p className="text-sm text-[var(--color-foreground)]/80 mt-1">{style.firstTimerWarning}</p>
                      </div>
                      <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                        <span className="text-xs font-semibold text-[var(--color-neon-purple)] uppercase tracking-wider">Yaşlanma & Bakım</span>
                        <p className="text-sm text-[var(--color-foreground)]/80 mt-1">{style.agingInfo}</p>
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
              25 basit soruyla sana en uygun dövme tarzını keşfet. Görsel örneklere bak ve içgüdülerine güven.
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
