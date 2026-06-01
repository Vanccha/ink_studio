'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '../store';
import { useRouter } from 'next/navigation';

const QUIZ_STEPS = [
  {
    id: 'emotion',
    question: 'Dövmeniz size ne hissettirmeli?',
    field: 'quizEmotion' as const,
    options: [
      { value: 'power', label: 'Güç & Cesaret', emoji: '🔥', style: 'Traditional' },
      { value: 'calm', label: 'Huzur & Zarafet', emoji: '🌿', style: 'Fine-Line' },
      { value: 'mystery', label: 'Gizem & Derinlik', emoji: '🌙', style: 'Dotwork' },
      { value: 'joy', label: 'Neşe & Özgürlük', emoji: '🦋', style: 'Watercolor' },
    ],
  },
  {
    id: 'texture',
    question: 'Hangi doku sizi daha çok çekiyor?',
    field: 'quizTexture' as const,
    options: [
      { value: 'sharp', label: 'Keskin Çizgiler', emoji: '📐', style: 'Geometric' },
      { value: 'soft', label: 'Yumuşak & Akışkan', emoji: '💧', style: 'Watercolor' },
      { value: 'detailed', label: 'Detaylı & Noktalı', emoji: '✨', style: 'Dotwork' },
      { value: 'bold', label: 'Kalın & Cesur', emoji: '💪', style: 'Traditional' },
    ],
  },
  {
    id: 'character',
    question: 'Dövmeniz bir karakter olsa, nasıl biri olurdu?',
    field: 'quizCharacter' as const,
    options: [
      { value: 'warrior', label: 'Savaşçı Ruh', emoji: '⚔️', style: 'Japanese' },
      { value: 'poet', label: 'Şair Ruh', emoji: '🖋️', style: 'Fine-Line' },
      { value: 'explorer', label: 'Kaşif Ruh', emoji: '🧭', style: 'Realistic' },
      { value: 'rebel', label: 'Asi Ruh', emoji: '🎸', style: 'Traditional' },
    ],
  },
];

export default function StyleQuiz() {
  const router = useRouter();
  const { setQuizAnswer, setQuizResult, quizEmotion, quizTexture, quizCharacter } = useStudioStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultStyle, setResultStyle] = useState('');

  const answers = [quizEmotion, quizTexture, quizCharacter];
  const isCurrentAnswered = answers[currentStep] !== '';

  const handleSelect = (field: 'quizEmotion' | 'quizTexture' | 'quizCharacter', value: string) => {
    setQuizAnswer(field, value);
  };

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result - find most common style
      const styles: string[] = [];
      QUIZ_STEPS.forEach((step, i) => {
        const selectedOption = step.options.find((o) => o.value === answers[i]);
        if (selectedOption) styles.push(selectedOption.style);
      });
      const styleCounts: Record<string, number> = {};
      styles.forEach((s) => {
        styleCounts[s] = (styleCounts[s] || 0) + 1;
      });
      const topStyle = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Fine-Line';
      setResultStyle(topStyle);
      setQuizResult(topStyle);
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
            {/* Progress */}
            <div className="flex gap-2 mb-8">
              {QUIZ_STEPS.map((_, i) => (
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

            {/* Question */}
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-foreground)]">
              {QUIZ_STEPS[currentStep].question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {QUIZ_STEPS[currentStep].options.map((option) => {
                const isSelected = answers[currentStep] === option.value;
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(QUIZ_STEPS[currentStep].field, option.value)}
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

            {/* Nav */}
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
                {currentStep === QUIZ_STEPS.length - 1 ? 'Sonucu Gör' : 'İleri →'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-purple)] flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">🎨</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Senin Tarzın</span>
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mb-8 inline-block"
            >
              <span className="text-4xl md:text-5xl font-bold gradient-text-purple">{resultStyle}</span>
            </motion.div>
            <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto">
              Cevaplarına göre sana en uygun dövme tarzı <strong className="text-[var(--color-accent)]">{resultStyle}</strong> olarak belirlendi. Hemen randevunu oluştur!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoToBooking}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-bold text-lg pulse-cta"
            >
              Tarzımı Buldum → Randevu Al
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
