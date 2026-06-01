import { create } from 'zustand';

// Pricing data: base prices for each style
export const STYLE_PRICES: Record<string, number> = {
  'Fine-Line': 3500,
  'Traditional': 2500,
  'Dotwork': 3000,
  'Minimalist': 1500,
  'Realistic': 5000,
  'Watercolor': 4000,
  'Geometric': 2800,
  'Japanese': 4500,
};

// Size multipliers
export const SIZE_MULTIPLIERS: Record<string, { label: string; multiplier: number; description: string }> = {
  small: { label: 'Küçük (3-5 cm)', multiplier: 1, description: 'Parmak, bilek, kulak arkası' },
  medium: { label: 'Orta (5-10 cm)', multiplier: 1.8, description: 'Kol, ayak bileği, ense' },
  large: { label: 'Büyük (10-20 cm)', multiplier: 3, description: 'Kol yarım kol, baldır' },
  xlarge: { label: 'Çok Büyük (20+ cm)', multiplier: 5, description: 'Full kol, sırt, bacak' },
};

// Body parts and their privacy status
export const BODY_PARTS: { id: string; label: string; isPrivateZone: boolean }[] = [
  { id: 'wrist', label: 'Bilek', isPrivateZone: false },
  { id: 'forearm', label: 'Ön Kol', isPrivateZone: false },
  { id: 'upper-arm', label: 'Üst Kol', isPrivateZone: false },
  { id: 'shoulder', label: 'Omuz', isPrivateZone: false },
  { id: 'chest', label: 'Göğüs', isPrivateZone: true },
  { id: 'sternum', label: 'Göğüs Altı (Sternum)', isPrivateZone: true },
  { id: 'ribs', label: 'Kaburga', isPrivateZone: true },
  { id: 'back', label: 'Sırt', isPrivateZone: false },
  { id: 'lower-back', label: 'Bel', isPrivateZone: false },
  { id: 'neck', label: 'Boyun', isPrivateZone: false },
  { id: 'behind-ear', label: 'Kulak Arkası', isPrivateZone: false },
  { id: 'ankle', label: 'Ayak Bileği', isPrivateZone: false },
  { id: 'calf', label: 'Baldır', isPrivateZone: false },
  { id: 'thigh', label: 'Uyluk', isPrivateZone: true },
  { id: 'hip', label: 'Kalça', isPrivateZone: true },
  { id: 'finger', label: 'Parmak', isPrivateZone: false },
  { id: 'foot', label: 'Ayak', isPrivateZone: false },
];

interface StudioState {
  // Quiz results
  quizEmotion: string;
  quizTexture: string;
  quizCharacter: string;
  quizResult: string | null;

  // Booking state
  selectedStyle: string;
  selectedSize: string;
  selectedBodyPart: string;
  isPrivateZone: boolean;
  estimatedPrice: { min: number; max: number } | null;
  selectedDate: string;
  selectedTime: string;
  currentStep: number;
  depositPaid: boolean;
  referenceNumber: string;

  // Actions
  setQuizAnswer: (field: 'quizEmotion' | 'quizTexture' | 'quizCharacter', value: string) => void;
  setQuizResult: (result: string) => void;
  setSelectedStyle: (style: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedBodyPart: (part: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  calculatePrice: () => void;
  setCurrentStep: (step: number) => void;
  processDeposit: () => void;
  resetBooking: () => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  quizEmotion: '',
  quizTexture: '',
  quizCharacter: '',
  quizResult: null,

  selectedStyle: '',
  selectedSize: '',
  selectedBodyPart: '',
  isPrivateZone: false,
  estimatedPrice: null,
  selectedDate: '',
  selectedTime: '',
  currentStep: 1,
  depositPaid: false,
  referenceNumber: '',

  setQuizAnswer: (field, value) => set({ [field]: value }),

  setQuizResult: (result) => set({ quizResult: result, selectedStyle: result }),

  setSelectedStyle: (style) => {
    set({ selectedStyle: style });
    get().calculatePrice();
  },

  setSelectedSize: (size) => {
    set({ selectedSize: size });
    get().calculatePrice();
  },

  setSelectedBodyPart: (partId) => {
    const part = BODY_PARTS.find((p) => p.id === partId);
    set({
      selectedBodyPart: partId,
      isPrivateZone: part?.isPrivateZone ?? false,
    });
  },

  calculatePrice: () => {
    const { selectedStyle, selectedSize } = get();
    if (!selectedStyle || !selectedSize) {
      set({ estimatedPrice: null });
      return;
    }
    const basePrice = STYLE_PRICES[selectedStyle] || 2000;
    const sizeData = SIZE_MULTIPLIERS[selectedSize];
    if (!sizeData) {
      set({ estimatedPrice: null });
      return;
    }
    const calculated = basePrice * sizeData.multiplier;
    set({
      estimatedPrice: {
        min: Math.round(calculated * 0.85),
        max: Math.round(calculated * 1.15),
      },
    });
  },

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedTime: (time) => set({ selectedTime: time }),

  setCurrentStep: (step) => set({ currentStep: step }),

  processDeposit: () => {
    const refNum = `RN-${Math.floor(100 + Math.random() * 900)}`;
    set({ depositPaid: true, referenceNumber: refNum, currentStep: 5 });
  },

  resetBooking: () =>
    set({
      selectedStyle: '',
      selectedSize: '',
      selectedBodyPart: '',
      isPrivateZone: false,
      estimatedPrice: null,
      selectedDate: '',
      selectedTime: '',
      currentStep: 1,
      depositPaid: false,
      referenceNumber: '',
    }),
}));
