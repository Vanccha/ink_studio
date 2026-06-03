'use client';

import { motion } from 'framer-motion';
import { useStudioStore } from '../store';

export default function UpsellSection() {
  const store = useStudioStore();

  // Sadece büyük boyut seçildiğinde ve henüz upsell alınmadığında göster
  const isLargeTattoo = store.selectedSize === 'large' || store.selectedSize === 'xlarge';
  const hasMiniAddOn = store.addOns.some(a => a.id === 'upsell-mini');

  if (!isLargeTattoo || hasMiniAddOn) return null;

  const handleAddUpsell = () => {
    store.addAddOn({
      id: 'upsell-mini',
      name: '3x3 cm Minimal Tasarım (Aynı Seans)',
      type: 'tattoo',
      price: 1500,
      discountedPrice: 750, // Yarı fiyatına
      quantity: 1
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[var(--color-neon-purple)]/10 to-[var(--color-neon-pink)]/10 border border-[var(--color-neon-purple)]/30 rounded-xl p-5 mb-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[var(--color-neon-pink)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Size Özel Fırsat
            </span>
          </div>
          <h3 className="text-lg font-bold text-[var(--color-foreground)]">Mini Dövme Ekle!</h3>
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-md">
            Büyük dövmenizin yanına aynı seansta 3x3 cm minimal bir tasarım eklerseniz, <strong className="text-[var(--color-neon-pink)]">ikincisi yarı fiyatına (1500₺ yerine 750₺) !</strong>
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddUpsell}
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-[var(--color-foreground)] text-[var(--color-background)] font-bold text-sm shadow-xl"
        >
          Evet, Ekle! (+750 ₺)
        </motion.button>
      </div>
    </motion.div>
  );
}
