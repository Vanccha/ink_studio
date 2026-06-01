'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

// Mock review data
const GOOGLE_REVIEWS = [
  { name: 'Ayşe K.', rating: 5, text: 'Hayatımda gördüğüm en profesyonel stüdyo. Fine-line çalışması inanılmazdı!', time: '2 hafta önce' },
  { name: 'Mehmet D.', rating: 5, text: 'İlk dövmem için çok heyecanlıydım, ekip beni çok rahat hissettirdi. Kesinlikle tavsiye ederim.', time: '1 ay önce' },
  { name: 'Zeynep A.', rating: 5, text: 'Dotwork tasarım tam istediğim gibi oldu. Detaycılığınız muhteşem.', time: '3 hafta önce' },
  { name: 'Can B.', rating: 4, text: 'Harika atmosfer, profesyonel ekip. Fiyatlar biraz yüksek ama kalite karşılığı.', time: '1 hafta önce' },
];

const INSTA_COMMENTS = [
  { user: '@inklovers_ist', text: 'Bu çalışma efsane olmuş 🔥🔥', likes: 247 },
  { user: '@tattoo.addict', text: 'Detaylara bak... sanat eseri resmen 😍', likes: 189 },
  { user: '@derya.style', text: 'Randevumu aldım, çok heyecanlıyım! 💜', likes: 132 },
  { user: '@artofink_', text: 'İstanbul\'un en iyi stüdyosu tartışmasız 🏆', likes: 315 },
];

const FAQ_ITEMS = [
  { question: 'Çalışma saatleriniz nedir?', answer: 'Pazartesi - Cumartesi arası 11:00 - 21:00 saatleri arasında hizmet veriyoruz. Pazar günleri kapalıyız. Özel seans randevuları için lütfen iletişime geçin.' },
  { question: 'Stüdyonuz nerede?', answer: 'Kadıköy, İstanbul\'da bulunuyoruz. Metro ve otobüs ile kolayca ulaşabilirsiniz. Detaylı yol tarifi için Google Maps\'ten "INK STUDIO Kadıköy" araması yapabilirsiniz.' },
  { question: 'Randevu almadan gelebilir miyim?', answer: 'Walk-in müşteriler kabul ediyoruz ancak randevulu müşterilerimize öncelik veriyoruz. En iyi deneyim için önceden randevu almanızı öneriyoruz.' },
  { question: 'Kapora iadesi yapılıyor mu?', answer: 'Randevunuzdan 48 saat öncesine kadar iptal etmeniz halinde kaporanız iade edilir. 48 saatten kısa sürede yapılan iptallerde kapora iade edilmez.' },
  { question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?', answer: 'Nakit, kredi kartı, banka kartı ve havale/EFT ile ödeme kabul ediyoruz. Taksit seçenekleri mevcuttur.' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'star-filled' : 'text-[var(--color-muted)]/30'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="flex-1">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="INK STUDIO atmosfer"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/80 via-transparent to-[var(--color-background)]/80" />
          <div className="absolute inset-0 bg-[var(--color-background)]/40" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-[var(--color-accent)]/30 text-[var(--color-accent)] mb-6 glass-card-sm">
              ✦ Premium Dövme Deneyimi
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="gradient-text font-serif italic">Sanatı</span>
            <br />
            <span className="text-[var(--color-foreground)]">Tenine Taşı</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            İstanbul&apos;un kalbinde, senin hikayeni anlatan dövmeler tasarlıyoruz.
            <br className="hidden sm:block" />
            Her çizgi bir anlam, her dövme bir eser.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              href="/randevu"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold text-lg hover:shadow-2xl hover:shadow-[var(--color-accent)]/30 transition-all duration-300 hover:scale-105 pulse-cta"
            >
              <span className="flex items-center justify-center gap-2">
                Randevu Al
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="/ilk-defa"
              className="px-8 py-4 rounded-xl border-2 border-[var(--color-accent)]/40 text-[var(--color-accent)] font-semibold text-lg hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              İlk Defa Yaptıracağım
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/ilk-defa#quiz"
              className="px-4 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] glass-card-sm hover:border-[var(--color-accent)]/30 transition-all"
            >
              🎨 Tarzını Keşfet (Asistan)
            </Link>
            <Link
              href="/ilk-defa#pain-map"
              className="px-4 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] glass-card-sm hover:border-[var(--color-accent)]/30 transition-all"
            >
              🗺️ Acı Haritasını Görüntüle
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-[var(--color-accent)]/40 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-[var(--color-accent)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SOCIAL PROOF SECTION ===== */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
              Müşteri Yorumları
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">
              <span className="gradient-text">Bize Güvenenlerin</span>{' '}
              <span className="text-[var(--color-foreground)]">Sözleri</span>
            </h2>
          </motion.div>

          {/* Google Reviews */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">⭐</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[var(--color-foreground)]">4.9</span>
                  <StarRating rating={5} />
                </div>
                <span className="text-xs text-[var(--color-muted)]">Google Reviews · 127 yorum</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GOOGLE_REVIEWS.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-5 hover:border-[var(--color-accent)]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-neon-purple)] to-[var(--color-neon-pink)] flex items-center justify-center text-xs font-bold text-white">
                        {review.name[0]}
                      </div>
                      <span className="text-sm font-medium text-[var(--color-foreground)]">{review.name}</span>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{review.text}</p>
                  <span className="text-xs text-[var(--color-muted)]/60 mt-3 block">{review.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Instagram Comments */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">📸</div>
              <div>
                <span className="text-lg font-bold text-[var(--color-foreground)]">@inkstudio_ist</span>
                <p className="text-xs text-[var(--color-muted)]">Instagram · 24.8K takipçi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INSTA_COMMENTS.map((comment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ y: -4 }}
                  className="glass-card-sm p-4 hover:border-[var(--color-neon-pink)]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center text-[8px] font-bold text-white">
                      {comment.user[1].toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-neon-pink)]">{comment.user}</span>
                  </div>
                  <p className="text-sm text-[var(--color-foreground)]/80">{comment.text}</p>
                  <span className="text-xs text-[var(--color-muted)] mt-2 block">❤️ {comment.likes}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDIO ATMOSPHERE ===== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
                Stüdyomuz
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-[var(--color-foreground)]">
                Sanatın{' '}
                <span className="gradient-text font-serif italic">Buluşma</span>{' '}
                Noktası
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-6">
                Steril, rahat ve ilham verici ortamımızda kendinizi evinizde hissedin.
                Son teknoloji ekipmanlar ve premium mürekkeplerle çalışıyoruz.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '8+', label: 'Yıllık Deneyim' },
                  { num: '3.500+', label: 'Mutlu Müşteri' },
                  { num: '%100', label: 'Steril Ortam' },
                  { num: '5', label: 'Uzman Sanatçı' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card-sm p-4 text-center"
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.num}</div>
                    <div className="text-xs text-[var(--color-muted)] mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden neon-glow"
            >
              <Image
                src="/studio-interior.png"
                alt="INK STUDIO iç mekan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ items={FAQ_ITEMS} title="Sıkça Sorulan Sorular" />

      <Footer />
    </main>
  );
}
