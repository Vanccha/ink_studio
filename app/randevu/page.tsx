'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PainMap from '../components/PainMap';
import { useStudioStore, STYLE_PRICES, SIZE_MULTIPLIERS, BODY_PARTS } from '../store';

const STEPS = [
  { num: 1, label: 'Boyut & Stil' },
  { num: 2, label: 'Fiyat' },
  { num: 3, label: 'Bölge Seçimi' },
  { num: 4, label: 'Kapora' },
  { num: 5, label: 'Tamamlandı' },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              current > step.num
                ? 'step-completed'
                : current === step.num
                ? 'step-active'
                : 'step-pending'
            }`}
          >
            {current > step.num ? '✓' : step.num}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-8 md:w-14 h-0.5 mx-1 rounded-full transition-all duration-500 ${
                current > step.num ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-light)]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function RandevuPage() {
  const store = useStudioStore();

  const canGoToStep2 = store.selectedStyle !== '' && store.selectedSize !== '';
  const canGoToStep3 = store.estimatedPrice !== null;
  const canGoToStep4 = store.selectedBodyPart !== '' && store.selectedDate !== '' && store.selectedTime !== '';

  const handleBodyPartSelect = (partId: string) => {
    store.setSelectedBodyPart(partId);
  };

  const selectedBodyPartData = BODY_PARTS.find((p) => p.id === store.selectedBodyPart);

  // Calendar computation with month navigation
  const [calendarOffset, setCalendarOffset] = useState(1); // start from next month
  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + calendarOffset, 1);
  const calendarYear = viewDate.getFullYear();
  const calendarMonthNum = viewDate.getMonth();
  const calendarMonth = viewDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(calendarYear, calendarMonthNum, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(calendarYear, calendarMonthNum + 1, 0).getDate();
  const calendarDays: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Time slots: filtered for private zones
  const allTimeSlots = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const privateTimeSlots = ['10:00', '14:00', '19:00'];
  const timeSlots = store.isPrivateZone ? privateTimeSlots : allTimeSlots;

  return (
    <main className="flex-1">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-[var(--color-accent)]/30 text-[var(--color-accent)] mb-4">
              ✦ Randevu Oluştur
            </span>
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="gradient-text">Hayalindeki Dövmeye</span>{' '}
              <span className="text-[var(--color-foreground)]">Bir Adım Kaldı</span>
            </h1>
          </motion.div>

          {/* Step Indicator */}
          <StepIndicator current={store.currentStep} />

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {/* ===== STEP 1: Size & Style ===== */}
            {store.currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                {/* Style Selection */}
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">
                    Dövme Stilini Seç
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(STYLE_PRICES).map(([style, price]) => (
                      <motion.button
                        key={style}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => store.setSelectedStyle(style)}
                        className={`p-4 rounded-xl text-center transition-all duration-300 ${
                          store.selectedStyle === style
                            ? 'bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-neon-purple)]/10 border-2 border-[var(--color-accent)]'
                            : 'bg-[var(--color-surface-light)]/50 border-2 border-transparent hover:border-[var(--color-accent)]/20'
                        }`}
                      >
                        <span className={`text-sm font-semibold block ${store.selectedStyle === style ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)]'}`}>
                          {style}
                        </span>
                        <span className="text-xs text-[var(--color-muted)] mt-1 block">
                          {price.toLocaleString('tr-TR')} ₺~
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">
                    Dövme Boyutunu Seç
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(SIZE_MULTIPLIERS).map(([key, data]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => store.setSelectedSize(key)}
                        className={`p-4 rounded-xl text-left transition-all duration-300 ${
                          store.selectedSize === key
                            ? 'bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-neon-purple)]/10 border-2 border-[var(--color-accent)]'
                            : 'bg-[var(--color-surface-light)]/50 border-2 border-transparent hover:border-[var(--color-accent)]/20'
                        }`}
                      >
                        <span className={`font-semibold block ${store.selectedSize === key ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)]'}`}>
                          {data.label}
                        </span>
                        <span className="text-xs text-[var(--color-muted)] mt-1 block">{data.description}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Next button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={canGoToStep2 ? { scale: 1.05 } : {}}
                    whileTap={canGoToStep2 ? { scale: 0.95 } : {}}
                    onClick={() => {
                      if (canGoToStep2) {
                        store.calculatePrice();
                        store.setCurrentStep(2);
                      }
                    }}
                    disabled={!canGoToStep2}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canGoToStep2
                        ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25'
                        : 'bg-[var(--color-surface-light)] text-[var(--color-muted)] cursor-not-allowed'
                    }`}
                  >
                    Devam Et →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 2: Dynamic Pricing ===== */}
            {store.currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">
                    Tahmini Fiyat
                  </h2>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                      <span className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Stil</span>
                      <p className="text-lg font-bold text-[var(--color-accent)] mt-1">{store.selectedStyle}</p>
                    </div>
                    <div className="bg-[var(--color-surface-light)]/50 rounded-lg p-4">
                      <span className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Boyut</span>
                      <p className="text-lg font-bold text-[var(--color-accent)] mt-1">
                        {SIZE_MULTIPLIERS[store.selectedSize]?.label || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Price Display */}
                  {store.estimatedPrice && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <p className="text-sm text-[var(--color-muted)] mb-2">Tahmini Fiyat Aralığı</p>
                      <div className="text-4xl md:text-5xl font-bold gradient-text">
                        {store.estimatedPrice.min.toLocaleString('tr-TR')} ₺ — {store.estimatedPrice.max.toLocaleString('tr-TR')} ₺
                      </div>
                      <p className="text-xs text-[var(--color-muted)] mt-3 max-w-md mx-auto">
                        Hesaplama: {STYLE_PRICES[store.selectedStyle]?.toLocaleString('tr-TR')} ₺ (baz fiyat) × {SIZE_MULTIPLIERS[store.selectedSize]?.multiplier} (boyut çarpanı)
                      </p>
                    </motion.div>
                  )}

                  {/* Warning */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[var(--color-neon-amber)]/10 border border-[var(--color-neon-amber)]/30 rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-neon-amber)]">Lütfen Dikkat</p>
                      <p className="text-xs text-[var(--color-muted)] mt-1">
                        Bu tutar tahmini bir aralıktır. Kesin fiyat, tasarımın detaylarına ve seans süresine göre değişkenlik gösterebilir. Ücretsiz ön görüşmede net fiyat bilgisi verilecektir.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => store.setCurrentStep(1)}
                    className="px-6 py-3 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    ← Geri
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => store.setCurrentStep(3)}
                    disabled={!canGoToStep3}
                    className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300"
                  >
                    Devam Et →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 3: Body Map & Privacy & Calendar ===== */}
            {store.currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                    Vücut Bölgesi Seç
                  </h2>
                  <p className="text-sm text-[var(--color-muted)] mb-6">
                    Dövme yaptırmak istediğiniz bölgeyi haritadan veya listeden seçin.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Interactive Pain Map */}
                    <div>
                      <PainMap
                        interactive={true}
                        onSelectPart={handleBodyPartSelect}
                        selectedPart={store.selectedBodyPart}
                      />
                    </div>

                    {/* Body part list */}
                    <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                      {BODY_PARTS.map((part) => (
                        <motion.button
                          key={part.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleBodyPartSelect(part.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                            store.selectedBodyPart === part.id
                              ? 'bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-neon-purple)]/10 border-2 border-[var(--color-accent)]'
                              : 'bg-[var(--color-surface-light)]/50 border-2 border-transparent hover:border-[var(--color-accent)]/20'
                          }`}
                        >
                          <span className={`text-sm font-medium ${store.selectedBodyPart === part.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)]'}`}>
                            {part.label}
                          </span>
                          <div className="flex items-center gap-2">
                            {part.isPrivateZone && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] font-semibold">
                                Özel Bölge
                              </span>
                            )}
                            {store.selectedBodyPart === part.id && (
                              <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs text-[var(--color-background)]">✓</span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Privacy Protocol Alert */}
                <AnimatePresence>
                  {store.isPrivateZone && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[var(--color-neon-pink)]/10 border border-[var(--color-neon-pink)]/30 rounded-xl p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-neon-pink)]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">🔒</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--color-neon-pink)]">Özel Seans Protokolü</p>
                          <p className="text-sm text-[var(--color-muted)] mt-1">
                            <strong className="text-[var(--color-foreground)]">&quot;{selectedBodyPartData?.label}&quot;</strong> hassas bir bölge olarak tanımlanmıştır. Mahremiyetiniz için <strong className="text-[var(--color-neon-pink)]">Özel Seans (Private)</strong> protokolü uygulanacaktır. Takvimde yalnızca özel seans saatleri gösterilecektir.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Calendar & Time Slot Selection */}
                {store.selectedBodyPart && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 md:p-8"
                  >
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                      📅 Tarih & Saat Seçimi
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] mb-6">
                      {store.isPrivateZone
                        ? 'Özel seans için uygun tarih ve saatleri seçin.'
                        : 'Randevunuz için uygun tarih ve saati seçin.'}
                    </p>

                    {/* Calendar Grid */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => setCalendarOffset(calendarOffset - 1)}
                          disabled={calendarOffset <= 0}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                            calendarOffset <= 0
                              ? 'text-[var(--color-muted)]/30 cursor-not-allowed'
                              : 'text-[var(--color-accent)] hover:bg-[var(--color-surface-light)]'
                          }`}
                        >
                          ←
                        </button>
                        <h3 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                          {calendarMonth}
                        </h3>
                        <button
                          onClick={() => setCalendarOffset(calendarOffset + 1)}
                          disabled={calendarOffset >= 6}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                            calendarOffset >= 6
                              ? 'text-[var(--color-muted)]/30 cursor-not-allowed'
                              : 'text-[var(--color-accent)] hover:bg-[var(--color-surface-light)]'
                          }`}
                        >
                          →
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
                          <div key={day} className="text-center text-xs text-[var(--color-muted)] font-medium py-1">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, i) => {
                          if (!day) {
                            return <div key={`empty-${i}`} />;
                          }
                          const mm = String(calendarMonthNum + 1).padStart(2, '0');
                          const dd = String(day).padStart(2, '0');
                          const dateStr = `${calendarYear}-${mm}-${dd}`;
                          const isSelected = store.selectedDate === dateStr;
                          const dateValue = calendarYear * 10000 + (calendarMonthNum + 1) * 100 + day;
                          const todayValue = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
                          const isToday = dateValue === todayValue;
                          const isPast = dateValue < todayValue;
                          const dayOfWeek = new Date(calendarYear, calendarMonthNum, day).getDay();
                          const isSunday = dayOfWeek === 0;
                          // Private zones: only Tuesdays (2) and Thursdays (4)
                          const isPrivateDay = dayOfWeek === 2 || dayOfWeek === 4;
                          const isDisabled = isPast || isSunday || (store.isPrivateZone && !isPrivateDay);

                          return (
                            <motion.button
                              key={dateStr}
                              whileHover={!isDisabled ? { scale: 1.1 } : {}}
                              whileTap={!isDisabled ? { scale: 0.95 } : {}}
                              onClick={() => {
                                if (!isDisabled) {
                                  store.setSelectedDate(dateStr);
                                  store.setSelectedTime('');
                                }
                              }}
                              disabled={isDisabled}
                              className={`relative aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                                isSelected
                                  ? 'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold'
                                  : isDisabled
                                  ? 'text-[var(--color-muted)]/30 cursor-not-allowed'
                                  : isToday
                                  ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold'
                                  : store.isPrivateZone && isPrivateDay
                                  ? 'text-[var(--color-neon-pink)] bg-[var(--color-neon-pink)]/10 hover:bg-[var(--color-neon-pink)]/20 cursor-pointer font-semibold'
                                  : 'text-[var(--color-foreground)] hover:bg-[var(--color-surface-light)] cursor-pointer'
                              }`}
                            >
                              {day}
                              {store.isPrivateZone && isPrivateDay && !isPast && !isSelected && (
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-neon-pink)]" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    {store.selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h3 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3">
                          Uygun Saatler — {new Date(store.selectedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}
                        </h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <motion.button
                              key={slot}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => store.setSelectedTime(slot)}
                              className={`px-3 py-2.5 rounded-xl text-sm font-medium text-center transition-all duration-300 ${
                                store.selectedTime === slot
                                  ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold'
                                  : 'bg-[var(--color-surface-light)]/50 text-[var(--color-foreground)] hover:border-[var(--color-accent)]/30 border border-transparent hover:bg-[var(--color-surface-light)]'
                              }`}
                            >
                              🕐 {slot}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => store.setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    ← Geri
                  </button>
                  <motion.button
                    whileHover={canGoToStep4 ? { scale: 1.05 } : {}}
                    whileTap={canGoToStep4 ? { scale: 0.95 } : {}}
                    onClick={() => canGoToStep4 && store.setCurrentStep(4)}
                    disabled={!canGoToStep4}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canGoToStep4
                        ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25'
                        : 'bg-[var(--color-surface-light)] text-[var(--color-muted)] cursor-not-allowed'
                    }`}
                  >
                    Devam Et →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 4: Deposit Payment ===== */}
            {store.currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">
                    Kapora Ödemesi
                  </h2>

                  {/* Booking Summary */}
                  <div className="bg-[var(--color-surface-light)]/50 rounded-xl p-5 mb-6 space-y-3">
                    <h3 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-3">Randevu Özeti</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Stil</span>
                      <span className="text-[var(--color-foreground)] font-medium">{store.selectedStyle}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Boyut</span>
                      <span className="text-[var(--color-foreground)] font-medium">{SIZE_MULTIPLIERS[store.selectedSize]?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Bölge</span>
                      <span className="text-[var(--color-foreground)] font-medium">{selectedBodyPartData?.label}</span>
                    </div>
                    {store.isPrivateZone && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-muted)]">Seans Tipi</span>
                        <span className="text-[var(--color-neon-pink)] font-medium">🔒 Özel Seans</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Tarih</span>
                      <span className="text-[var(--color-foreground)] font-medium">
                        {store.selectedDate ? new Date(store.selectedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }) : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Saat</span>
                      <span className="text-[var(--color-foreground)] font-medium">{store.selectedTime || '-'}</span>
                    </div>
                    <div className="border-t border-[var(--color-border)] pt-3 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-muted)]">Tahmini Fiyat</span>
                        <span className="text-[var(--color-foreground)] font-bold">
                          {store.estimatedPrice?.min.toLocaleString('tr-TR')} - {store.estimatedPrice?.max.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Amount */}
                  <div className="text-center py-6 mb-6 border-2 border-dashed border-[var(--color-accent)]/30 rounded-xl">
                    <p className="text-sm text-[var(--color-muted)] mb-1">Kapora Tutarı</p>
                    <p className="text-4xl font-bold gradient-text">500 ₺</p>
                    <p className="text-xs text-[var(--color-muted)] mt-2">Bu tutar toplam fiyattan düşülecektir</p>
                  </div>

                  {/* Mock Card Form */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Kart Numarası</label>
                      <div className="bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)]/50 text-sm border border-[var(--color-border)]">
                        •••• •••• •••• ••••
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">Son Kullanma</label>
                        <div className="bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)]/50 text-sm border border-[var(--color-border)]">
                          AA/YY
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-2">CVV</label>
                        <div className="bg-[var(--color-surface-light)] rounded-xl px-4 py-3 text-[var(--color-foreground)]/50 text-sm border border-[var(--color-border)]">
                          •••
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => store.processDeposit()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold text-lg hover:shadow-2xl hover:shadow-[var(--color-accent)]/30 transition-all duration-300 pulse-cta"
                  >
                    💳 Kredi Kartı ile Öde — 500 ₺
                  </motion.button>

                  <p className="text-xs text-center text-[var(--color-muted)] mt-3">
                    🔒 256-bit SSL şifreleme ile korunan güvenli ödeme
                  </p>
                </div>

                {/* Back */}
                <div className="flex justify-start">
                  <button
                    onClick={() => store.setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    ← Geri
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 5: Confirmation & WhatsApp Handoff ===== */}
            {store.currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="glass-card p-8 md:p-12 text-center">
                  {/* Success Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-4xl">✓</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                  >
                    <span className="gradient-text">Randevunuz Oluşturuldu!</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[var(--color-muted)] mb-8"
                  >
                    Kapora ödemesi başarıyla alındı. Referans numaranızı saklayın.
                  </motion.p>

                  {/* Reference Number */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block glass-card p-6 mb-8 animated-border"
                  >
                    <span className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-2">Referans Numarası</span>
                    <span className="text-4xl md:text-5xl font-bold gradient-text-purple">#{store.referenceNumber}</span>
                  </motion.div>

                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[var(--color-surface-light)]/50 rounded-xl p-5 max-w-md mx-auto mb-8 text-left space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Stil</span>
                      <span className="text-[var(--color-foreground)] font-medium">{store.selectedStyle}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Boyut</span>
                      <span className="text-[var(--color-foreground)] font-medium">{SIZE_MULTIPLIERS[store.selectedSize]?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Bölge</span>
                      <span className="text-[var(--color-foreground)] font-medium">{selectedBodyPartData?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Tarih</span>
                      <span className="text-[var(--color-foreground)] font-medium">
                        {store.selectedDate ? new Date(store.selectedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' }) : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Saat</span>
                      <span className="text-[var(--color-foreground)] font-medium">{store.selectedTime || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Kapora</span>
                      <span className="text-green-400 font-bold">500 ₺ ✓</span>
                    </div>
                  </motion.div>

                  {/* WhatsApp CTA */}
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/905555555555?text=${encodeURIComponent(`Merhaba, #${store.referenceNumber} numaralı randevum için referans görselimi göndermek istiyorum. Stil: ${store.selectedStyle}, Bölge: ${selectedBodyPartData?.label}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Referans Görselini WhatsApp&apos;tan Gönder
                  </motion.a>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xs text-[var(--color-muted)] mt-4"
                  >
                    Referans görselinizi ve ilham kaynaklarınızı WhatsApp üzerinden paylaşarak
                    sanatçımızın hazırlık yapmasını sağlayın.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
