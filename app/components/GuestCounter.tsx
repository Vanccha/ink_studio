'use client';

import { motion } from 'framer-motion';
import { useStudioStore } from '../store';

export default function GuestCounter() {
  const store = useStudioStore();

  const handleDecrease = () => {
    if (store.guestCount > 1) {
      store.setGuestCount(store.guestCount - 1);
      if (store.guestCount - 1 < 2 && store.isCouplesTattoo) {
        store.toggleCouplesTattoo(); // Turn off if less than 2
      }
    }
  };

  const handleIncrease = () => {
    if (store.guestCount < 4) {
      store.setGuestCount(store.guestCount + 1);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-foreground)]">Kişi Sayısı</h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Kaç kişi için randevu oluşturuyorsunuz? (Maks: 4)
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[var(--color-surface-light)] rounded-xl p-2 border border-[var(--color-border)]">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrease}
            disabled={store.guestCount <= 1}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
              store.guestCount <= 1
                ? 'text-[var(--color-muted)]/50 cursor-not-allowed'
                : 'text-[var(--color-foreground)] hover:bg-[var(--color-background)]'
            }`}
          >
            −
          </motion.button>
          
          <span className="w-8 text-center font-bold text-lg">{store.guestCount}</span>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrease}
            disabled={store.guestCount >= 4}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
              store.guestCount >= 4
                ? 'text-[var(--color-muted)]/50 cursor-not-allowed'
                : 'text-[var(--color-foreground)] hover:bg-[var(--color-background)]'
            }`}
          >
            +
          </motion.button>
        </div>
      </div>

      {store.guestCount >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-4 border-t border-[var(--color-border)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[var(--color-neon-pink)] flex items-center gap-2">
                💞 Çift / Eşleşen Dövme
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Aynı veya eşleşen tasarımı mı yaptırıyorsunuz? %10 indirim kazanın.
              </p>
            </div>
            
            <button
              onClick={() => store.toggleCouplesTattoo()}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                store.isCouplesTattoo ? 'bg-[var(--color-neon-pink)]' : 'bg-[var(--color-surface-light)]'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm"
                animate={{ x: store.isCouplesTattoo ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
