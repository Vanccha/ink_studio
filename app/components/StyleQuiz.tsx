'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '../store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QUIZ_QUESTIONS, STYLE_META, CATEGORY_INFO, StyleTag } from '../data/quiz-data';

// Max possible score: sum of max weight from each question
const MAX_POSSIBLE = QUIZ_QUESTIONS.reduce((sum, q) => {
  const maxWeight = Math.max(...q.options.map(o => o.weight));
  return sum + maxWeight;
}, 0);

// ==================== SCORE CALCULATOR ====================
function calculateScores(answers: Record<string, string>): { tag: StyleTag; score: number }[] {
  const scores: Record<StyleTag, number> = {
    Fine_Line: 0,
    Minimalist_Symbolic: 0,
    American_Traditional: 0,
    Neo_Traditional: 0,
    Black_Grey_Realism: 0,
    Color_Realism: 0,
    Micro_Realism: 0,
    Geometric_Ornamental: 0,
    Dotwork_Mandala: 0,
    Watercolor_Abstract: 0,
    Trash_Polka: 0,
    Blackwork_Tribal: 0,
  };

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === optionId);
    
    if (option) {
      option.styleTags.forEach(tag => {
        scores[tag] += option.weight;
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
    Minimalist_Symbolic: 'Azla yetinmeyi bilen, sembollerin gücüne inanan birisin. Sadeliğin içindeki derinliği görüyorsun.',
    American_Traditional: 'Klasiklere saygı duyan, cesur ve kendinden emin bir ruhun var. Zamansız değerlere ve güçlü sembollere çekiliyorsun.',
    Neo_Traditional: 'Geleneği modern bir gözle yeniden yorumlamayı seven, yaratıcı ve renksever bir kişiliğe sahipsin.',
    Black_Grey_Realism: 'Derinlikli, duygusal ve detay odaklı birisin. Sanatı gerçekçi bir şekilde bedenine taşımak seni heyecanlandırıyor.',
    Color_Realism: 'Hayatı renkli yaşayan, fotoğraf gerçekçiliğini arayan vizyoner birisin. Sanatın canlılığı seni yansıtıyor.',
    Micro_Realism: 'Mikro detayların gizli dünyasını seven, inanılmaz bir titizliğe ve dikkate sahip birisin.',
    Geometric_Ornamental: 'Düzen ve simetri seni tatmin ediyor. Spiritüel derinlik ve matematiksel güzelliğin kesiştiği noktada duruyorsun.',
    Dotwork_Mandala: 'Sabırlı, dengeli ve spiritüel bir yolcusun. Noktaların bir araya gelip büyük bir bütünü oluşturması felsefene uyuyor.',
    Watercolor_Abstract: 'Özgür ruhlu ve sanatsal bir bakış açısına sahipsin. Kuralların dışına çıkmayı ve renklerin serbestçe akmasını seviyorsun.',
    Trash_Polka: 'Avangart, cesur ve konfor alanının dışında yaşamayı seven birisin. Kaos içinde kendi düzenini bulan bir isyancı ruhun var.',
    Blackwork_Tribal: 'Ham güce ve güçlü kontrastlara inanan birisin. Cildindeki tasarımların cesur ve ödünsüz olmasını istiyorsun.',
  };
  return personas[primary] + (secondary ? ` İkincil eğilimin ${STYLE_META[secondary].displayName} — bu ikili sende güçlü bir özgünlük yaratıyor.` : '');
}

export default function StyleQuiz() {
  const router = useRouter();
  const { 
    quizAnswers, 
    setQuizAnswer, 
    setQuizResults, 
    quizResultPrimary,
    quizResultSecondary,
    quizConfidence,
    resetQuiz
  } = useStudioStore();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Resume or start fresh
  const answeredCount = Object.keys(quizAnswers).length;
  // If we have a result already, we are done
  const isDone = quizResultPrimary !== null;

  // Move forward based on answers
  const handleAnswer = (questionId: string, optionId: string) => {
    setQuizAnswer(questionId, optionId);
    
    // Automatically advance to the next step
    if (currentStepIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), 300);
    } else {
      // Finished
      const finalAnswers = { ...quizAnswers, [questionId]: optionId };
      const ranked = calculateScores(finalAnswers);
      const primary = ranked[0];
      const secondary = ranked[1].score >= primary.score * 0.6 ? ranked[1] : null;
      const confidence = Math.min(100, Math.round((primary.score / MAX_POSSIBLE) * 100 * 2.5)); // Scaling up for better UI feel
      
      setQuizResults(primary.tag, secondary ? secondary.tag : null, confidence);
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];

  if (isDone && quizResultPrimary) {
    const primaryStyle = STYLE_META[quizResultPrimary as StyleTag];
    const secondaryStyle = quizResultSecondary ? STYLE_META[quizResultSecondary as StyleTag] : null;

    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 relative overflow-hidden">
        {/* Background glow based on primary style color */}
        <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${primaryStyle.color} opacity-10 pointer-events-none`} />

        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] text-3xl mb-6 shadow-xl">
            {primaryStyle.emoji}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ruhun <span className={`text-transparent bg-clip-text bg-gradient-to-r ${primaryStyle.color}`}>{primaryStyle.displayName}</span> İstiyor
          </h2>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-8">
            25 adımlı detaylı analizimiz sonucunda, estetik algın, yaşam tarzın ve anatomik hedeflerin bu tarzı işaret ediyor.
          </p>

          <div className="max-w-md mx-auto mb-10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-muted)]">Uyum Oranı</span>
              <span className="font-bold">%{quizConfidence}</span>
            </div>
            <div className="h-3 w-full bg-[var(--color-background)] rounded-full overflow-hidden border border-[var(--color-border)]">
              <motion.div 
                className={`h-full bg-gradient-to-r ${primaryStyle.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${quizConfidence}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          {/* Left Column: Result details */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${primaryStyle.color}`} />
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">🧠</span> Estetik Profilin
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed">
                {generatePersona(quizResultPrimary as StyleTag, quizResultSecondary as StyleTag)}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] relative overflow-hidden">
               <h3 className="text-lg font-bold mb-3">📍 Önerilen Bölgeler</h3>
               <div className="flex flex-wrap gap-2">
                 {primaryStyle.bodyPlacements.map((bp) => (
                   <span key={bp} className="px-3 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full">
                     {bp}
                   </span>
                 ))}
               </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-amber-500/90 relative overflow-hidden">
              <h3 className="text-sm font-bold tracking-wider uppercase mb-2">⚠️ İlk Dövme Notu</h3>
              <p className="text-sm">{primaryStyle.firstTimerWarning}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-900/30 text-blue-500/90 relative overflow-hidden">
              <h3 className="text-sm font-bold tracking-wider uppercase mb-2">⏳ Yaşlanma Süreci</h3>
              <p className="text-sm">{primaryStyle.agingInfo}</p>
            </div>
          </div>

          {/* Right Column: Style details and action */}
          <div className="flex flex-col h-full space-y-6">
            <div className="flex-1 p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] flex flex-col justify-center">
              <div className="text-5xl mb-4">{primaryStyle.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{primaryStyle.displayName}</h3>
              <p className="text-[var(--color-muted)] mb-6">{primaryStyle.description}</p>
              
              {secondaryStyle && (
                <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-muted)] mb-2 uppercase tracking-wider">İkincil Uyumlu Tarz</p>
                  <div className="flex items-center gap-2 text-lg">
                    <span>{secondaryStyle.emoji}</span>
                    <span className="font-medium">{secondaryStyle.displayName}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  resetQuiz();
                  setCurrentStepIndex(0);
                }}
                className="py-4 px-6 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-all font-medium text-center"
              >
                Tekrar Çöz
              </button>
              <button 
                onClick={() => router.push('/randevu')}
                className={`py-4 px-6 rounded-xl bg-gradient-to-r ${primaryStyle.color} text-white font-bold text-center shadow-lg hover:opacity-90 transition-opacity`}
              >
                Randevu Al
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const categoryMeta = CATEGORY_INFO[currentQuestion.category];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header & Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-sm font-bold tracking-wider uppercase text-[var(--color-muted)] flex items-center gap-2">
              <span className="text-xl">{categoryMeta.emoji}</span>
              {categoryMeta.label}
            </span>
            <h2 className="text-2xl font-bold mt-1 text-[var(--color-foreground)]">
              Soru {currentStepIndex + 1} <span className="text-[var(--color-muted)] font-normal">/ {QUIZ_QUESTIONS.length}</span>
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-sm text-[var(--color-muted)]">{categoryMeta.description}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-[var(--color-border)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--color-foreground)]"
            initial={{ width: `${(currentStepIndex / QUIZ_QUESTIONS.length) * 100}%` }}
            animate={{ width: `${((currentStepIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          />
        </div>
      </div>

      {/* Quiz Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">{currentQuestion.questionText}</h3>
            <p className="text-[var(--color-muted)]">{currentQuestion.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                className={`group relative text-left rounded-2xl p-6 border-2 transition-all duration-200 min-h-[140px] flex flex-col justify-between ${
                  quizAnswers[currentQuestion.id] === option.id 
                    ? 'border-[var(--color-foreground)] bg-[var(--color-foreground)]/5 ring-4 ring-[var(--color-foreground)]/10' 
                    : 'border-[var(--color-border)] hover:border-[var(--color-muted)] bg-[var(--color-background)] hover:bg-[var(--color-surface-light)]'
                }`}
              >
                <div>
                  <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full mb-3 text-[var(--color-muted)]">
                    {option.styleLabel}
                  </div>
                  <h4 className={`text-lg font-medium leading-tight ${
                    quizAnswers[currentQuestion.id] === option.id 
                      ? 'text-[var(--color-foreground)]' 
                      : 'text-[var(--color-foreground)]/80 group-hover:text-[var(--color-foreground)]'
                  }`}>
                    {option.text}
                  </h4>
                </div>

                {/* Selected Indicator */}
                {quizAnswers[currentQuestion.id] === option.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full flex items-center justify-center shadow-lg">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between items-center">
            <button 
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Önceki
            </button>
            
            <span className="text-[var(--color-muted)] text-sm font-medium">
              {currentStepIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
