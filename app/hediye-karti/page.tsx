'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useStudioStore } from '../store';

const AMOUNTS = [1000, 2500, 5000, 10000];

export default function GiftCardPage() {
  const store = useStudioStore();
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [formData, setFormData] = useState({
    purchaserName: '',
    recipientName: '',
    recipientPhone: '',
    message: ''
  });

  const [generatedCardCode, setGeneratedCardCode] = useState('');

  const finalAmount = selectedAmount === 'custom' ? parseInt(customAmount) || 0 : selectedAmount;
  const isFormValid = formData.purchaserName && formData.recipientName && formData.recipientPhone && finalAmount >= 500;

  const handlePurchase = () => {
    if (isFormValid) {
      const card = store.createGiftCard(
        formData.purchaserName,
        formData.recipientName,
        formData.recipientPhone,
        finalAmount
      );
      setGeneratedCardCode(card.code);
      setStep(3); // Success step
    }
  };

  return (
    <main className="flex-1">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-[var(--color-neon-purple)]/30 text-[var(--color-neon-purple)] mb-4">
              ✦ Hediye Kartı
            </span>
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="text-[var(--color-foreground)]">Sevdiklerinize</span>{' '}
              <span className="gradient-text-purple">Sanat Hediye Edin</span>
            </h1>
            <p className="text-[var(--color-muted)] mt-4 max-w-2xl mx-auto">
              Özel günlerde verilebilecek en kalıcı hediye. Dijital hediye kartınızı oluşturun,
              anında WhatsApp üzerinden hediye edin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Visual Gift Card Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32 perspective-1000"
            >
              <div className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl shadow-[var(--color-neon-purple)]/20 transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12">
                
                {/* Background styling for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-zinc-900" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-neon-purple)] rounded-full blur-[100px] opacity-30" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--color-accent)] rounded-full blur-[100px] opacity-20" />
                
                {/* Card Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between border border-white/10 rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter text-white">INK <span className="text-[var(--color-neon-purple)]">STUDIO</span></h3>
                      <p className="text-xs text-white/50 tracking-widest uppercase mt-1">Dijital Hediye Kartı</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                      <span className="text-xl">✨</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Kime</p>
                    <p className="text-xl font-medium text-white font-serif italic">
                      {formData.recipientName || 'Alıcı Adı'}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Değer</p>
                      <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {finalAmount.toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Kimden</p>
                      <p className="text-sm font-medium text-white/90">
                        {formData.purchaserName || 'Gönderen Adı'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instructions text below card */}
              <div className="mt-8 text-center text-sm text-[var(--color-muted)] flex items-center justify-center gap-2">
                <span className="text-lg">📱</span> Hediye kartınız oluşturulduğunda barkodlu dijital formatta size iletilecektir.
              </div>
            </motion.div>

            {/* Form Area */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="glass-card p-8"
                >
                  <h2 className="text-xl font-bold mb-6">Tutar Belirle</h2>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        className={`p-4 rounded-xl font-bold text-lg transition-all ${
                          selectedAmount === amt
                            ? 'bg-[var(--color-neon-purple)] text-white border-2 border-[var(--color-neon-purple)]'
                            : 'bg-[var(--color-surface-light)] text-[var(--color-foreground)] border-2 border-transparent hover:border-[var(--color-neon-purple)]/30'
                        }`}
                      >
                        {amt.toLocaleString('tr-TR')} ₺
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedAmount('custom')}
                      className={`p-4 rounded-xl font-bold transition-all ${
                        selectedAmount === 'custom'
                          ? 'bg-[var(--color-neon-purple)] text-white border-2 border-[var(--color-neon-purple)]'
                          : 'bg-[var(--color-surface-light)] text-[var(--color-foreground)] border-2 border-transparent hover:border-[var(--color-neon-purple)]/30'
                      }`}
                    >
                      Özel Tutar
                    </button>
                  </div>

                  {selectedAmount === 'custom' && (
                    <div className="mb-6">
                      <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Tutar Girin (₺)</label>
                      <input
                        type="number"
                        min="500"
                        step="100"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Örn: 3000"
                        className="w-full bg-[var(--color-background)] rounded-xl px-4 py-3 text-[var(--color-foreground)] border border-[var(--color-border)] focus:border-[var(--color-neon-purple)] focus:outline-none"
                      />
                      {finalAmount > 0 && finalAmount < 500 && (
                        <p className="text-xs text-[var(--color-neon-amber)] mt-2">Minimum tutar 500 ₺ olmalıdır.</p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => finalAmount >= 500 && setStep(2)}
                    disabled={finalAmount < 500}
                    className="w-full py-4 rounded-xl bg-[var(--color-foreground)] text-[var(--color-background)] font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Devam Et →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="glass-card p-8 space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">Kişi Bilgileri</h2>
                    <button onClick={() => setStep(1)} className="text-sm text-[var(--color-muted)] hover:text-white">Değiştir</button>
                  </div>

                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Senin Adın (Kimden)</label>
                    <input
                      type="text"
                      value={formData.purchaserName}
                      onChange={(e) => setFormData({ ...formData, purchaserName: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      className="w-full bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)] border border-[var(--color-border)] focus:border-[var(--color-neon-purple)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Hediye Edilecek Kişi (Kime)</label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                      placeholder="Arkadaşınızın Adı"
                      className="w-full bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)] border border-[var(--color-border)] focus:border-[var(--color-neon-purple)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Alıcının Telefonu (Sürpriz için)</label>
                    <input
                      type="tel"
                      value={formData.recipientPhone}
                      onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                      placeholder="05XX XXX XX XX"
                      className="w-full bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)] border border-[var(--color-border)] focus:border-[var(--color-neon-purple)] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={!isFormValid}
                    className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[var(--color-neon-purple)] to-[#b066ff] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[var(--color-neon-purple)]/30 transition-all pulse-cta disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    💳 {finalAmount.toLocaleString('tr-TR')} ₺ Öde ve Oluştur
                  </button>
                  <p className="text-xs text-center text-[var(--color-muted)] mt-2">
                    🔒 SSL Güvencesiyle Ödeme
                  </p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-8 text-center border-[var(--color-neon-purple)]/50 border-2"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Hediye Kartı Hazır!</h2>
                  <p className="text-[var(--color-muted)] mb-6">
                    {formData.recipientName} için {finalAmount.toLocaleString('tr-TR')} ₺ değerindeki hediye kartı başarıyla oluşturuldu.
                  </p>

                  <div className="bg-[var(--color-surface-light)] rounded-xl p-4 mb-8">
                    <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-1">Kart Kodu</p>
                    <p className="text-3xl font-mono font-bold tracking-widest text-[var(--color-neon-purple)]">
                      {generatedCardCode}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Sana bir INK STUDIO dövme hediye kartı gönderdim! 🎨 Değer: ${finalAmount} ₺. Kart Kodun: ${generatedCardCode}. Randevu almak için inkstudio.com adresini ziyaret edebilirsin.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp ile Gönder
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
