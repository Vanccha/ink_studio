import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ==================== CONSTANTS ====================

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

// Aftercare products catalog
export const AFTERCARE_PRODUCTS: AddOn[] = [
  { id: 'cream-1', name: 'Dövme Bakım Kremi', type: 'product', price: 350, quantity: 0 },
  { id: 'spf-1', name: 'SPF 50+ Koruyucu Losyon', type: 'product', price: 280, quantity: 0 },
  { id: 'wrap-1', name: 'Şeffaf Koruyucu Film (5 Adet)', type: 'product', price: 150, quantity: 0 },
];

// ==================== TYPE DEFINITIONS ====================

// User profile with shadow account support
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;
  tags: string[];
  referralCode: string;
  walletPoints: number;
  completedAppointments: number;
  loyaltyTier: 'bronze' | 'silver' | 'gold';
  accountStatus: 'shadow' | 'registered';
  password: string;
  createdAt: string;
}

// Add-on items (upsell tattoos + aftercare products)
export interface AddOn {
  id: string;
  name: string;
  type: 'tattoo' | 'product';
  price: number;
  discountedPrice?: number;
  quantity: number;
}

// Gift card
export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  remainingBalance: number;
  purchaserName: string;
  recipientName: string;
  recipientPhone: string;
  createdAt: string;
  isUsed: boolean;
}

// CRM notification log
export interface NotificationLog {
  id: string;
  type: 'six_month_reminder' | 'birthday_gesture' | 'google_review' | 'aftercare_link';
  recipientName: string;
  message: string;
  scheduledAt: string;
  sentAt: string | null;
  status: 'pending' | 'sent' | 'failed';
}

// Completed appointment record
export interface AppointmentRecord {
  id: string;
  userId: string;
  style: string;
  size: string;
  bodyPart: string;
  date: string;
  time: string;
  price: number;
  referenceNumber: string;
  completedAt: string;
}

// ==================== STORE INTERFACE ====================

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

  // Guest checkout fields
  guestFirstName: string;
  guestLastName: string;
  guestPhone: string;
  guestEmail: string;

  // User & shadow account
  userProfile: UserProfile | null;
  allUsers: UserProfile[];

  // Multi-person booking
  guestCount: number;
  isCouplesTattoo: boolean;

  // Add-ons & upsell
  addOns: AddOn[];
  showUpsellModal: boolean;

  // Gift cards
  giftCards: GiftCard[];

  // CRM notifications
  notifications: NotificationLog[];

  // Appointment history
  appointmentHistory: AppointmentRecord[];

  // Admin auth
  isAdminAuthenticated: boolean;

  // ==================== ACTIONS ====================

  // Quiz
  setQuizAnswer: (field: 'quizEmotion' | 'quizTexture' | 'quizCharacter', value: string) => void;
  setQuizResult: (result: string) => void;

  // Booking basics
  setSelectedStyle: (style: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedBodyPart: (part: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  calculatePrice: () => void;
  setCurrentStep: (step: number) => void;
  processDeposit: () => void;
  resetBooking: () => void;

  // Guest checkout
  setGuestField: (field: 'guestFirstName' | 'guestLastName' | 'guestPhone' | 'guestEmail', value: string) => void;
  createShadowAccount: () => UserProfile;
  activateAccount: (password: string) => void;

  // Multi-person
  setGuestCount: (count: number) => void;
  toggleCouplesTattoo: () => void;

  // Add-ons
  addAddOn: (addon: AddOn) => void;
  removeAddOn: (id: string) => void;
  setShowUpsellModal: (show: boolean) => void;
  getCartTotal: () => number;

  // Loyalty
  getLoyaltyDiscount: () => number;

  // Gift cards
  createGiftCard: (purchaserName: string, recipientName: string, recipientPhone: string, amount: number) => GiftCard;

  // Referral
  generateReferralCode: () => string;
  redeemReferral: (code: string) => boolean;

  // CRM
  simulateNotification: (type: NotificationLog['type'], recipientName: string) => NotificationLog;

  // Admin
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
}

// ==================== HELPER FUNCTIONS ====================

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'INK-';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateGiftCardCode(): string {
  const seg = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GC-${seg()}-${seg()}`;
}

function calculateLoyaltyTier(count: number): 'bronze' | 'silver' | 'gold' {
  if (count >= 4) return 'gold';
  if (count >= 2) return 'silver';
  return 'bronze';
}

function getLoyaltyDiscountPercent(tier: 'bronze' | 'silver' | 'gold'): number {
  if (tier === 'gold') return 15;
  return 0;
}

// Admin PIN for demo (not real security)
const ADMIN_PIN = '1453';

// ==================== STORE CREATION ====================

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
      // Quiz state
      quizEmotion: '',
      quizTexture: '',
      quizCharacter: '',
      quizResult: null,

      // Booking state
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

      // Guest checkout
      guestFirstName: '',
      guestLastName: '',
      guestPhone: '',
      guestEmail: '',

      // User & shadow account
      userProfile: null,
      allUsers: [],

      // Multi-person
      guestCount: 1,
      isCouplesTattoo: false,

      // Add-ons
      addOns: [],
      showUpsellModal: false,

      // Gift cards
      giftCards: [],

      // CRM
      notifications: [],

      // Appointment history
      appointmentHistory: [],

      // Admin
      isAdminAuthenticated: false,

      // ==================== ACTION IMPLEMENTATIONS ====================

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
        const { selectedStyle, selectedSize, guestCount, isCouplesTattoo } = get();
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
        let calculated = basePrice * sizeData.multiplier;

        // Multi-person multiplier
        calculated *= guestCount;

        // Couples discount (10% off)
        if (isCouplesTattoo && guestCount >= 2) {
          calculated *= 0.9;
        }

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

      // Guest checkout fields
      setGuestField: (field, value) => set({ [field]: value }),

      // Shadow account creation — runs when guest completes contact info
      createShadowAccount: () => {
        const { guestFirstName, guestLastName, guestPhone, guestEmail, allUsers } = get();
        
        // Check if user already exists by email
        const existing = allUsers.find((u) => u.email === guestEmail);
        if (existing) {
          set({ userProfile: existing });
          return existing;
        }

        const newUser: UserProfile = {
          id: generateId(),
          firstName: guestFirstName,
          lastName: guestLastName,
          phone: guestPhone,
          email: guestEmail,
          birthday: '',
          tags: [],
          referralCode: generateReferralCode(),
          walletPoints: 0,
          completedAppointments: 0,
          loyaltyTier: 'bronze',
          accountStatus: 'shadow',
          password: '',
          createdAt: new Date().toISOString(),
        };

        set({
          userProfile: newUser,
          allUsers: [...allUsers, newUser],
        });
        return newUser;
      },

      // Account activation — user sets password on success page
      activateAccount: (password) => {
        const { userProfile, allUsers } = get();
        if (!userProfile) return;

        const updatedProfile: UserProfile = {
          ...userProfile,
          accountStatus: 'registered',
          password,
        };

        set({
          userProfile: updatedProfile,
          allUsers: allUsers.map((u) => (u.id === updatedProfile.id ? updatedProfile : u)),
        });
      },

      // Process deposit — updated for 6-step flow
      processDeposit: () => {
        const { userProfile, allUsers, selectedStyle } = get();
        const refNum = `RN-${Math.floor(100 + Math.random() * 900)}`;

        // Record the appointment and increment completed count
        if (userProfile) {
          const updatedProfile: UserProfile = {
            ...userProfile,
            completedAppointments: userProfile.completedAppointments + 1,
            loyaltyTier: calculateLoyaltyTier(userProfile.completedAppointments + 1),
            // Auto-tag the style preference
            tags: userProfile.tags.includes(selectedStyle)
              ? userProfile.tags
              : [...userProfile.tags, selectedStyle],
          };

          set({
            depositPaid: true,
            referenceNumber: refNum,
            currentStep: 6,
            userProfile: updatedProfile,
            allUsers: allUsers.map((u) => (u.id === updatedProfile.id ? updatedProfile : u)),
          });
        } else {
          set({ depositPaid: true, referenceNumber: refNum, currentStep: 6 });
        }
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
          guestFirstName: '',
          guestLastName: '',
          guestPhone: '',
          guestEmail: '',
          guestCount: 1,
          isCouplesTattoo: false,
          addOns: [],
          showUpsellModal: false,
        }),

      // Multi-person
      setGuestCount: (count) => {
        set({ guestCount: count });
        get().calculatePrice();
      },

      toggleCouplesTattoo: () => {
        set((s) => ({ isCouplesTattoo: !s.isCouplesTattoo }));
        get().calculatePrice();
      },

      // Add-ons
      addAddOn: (addon) => {
        const { addOns } = get();
        const existing = addOns.find((a) => a.id === addon.id);
        if (existing) {
          set({
            addOns: addOns.map((a) =>
              a.id === addon.id ? { ...a, quantity: a.quantity + 1 } : a
            ),
          });
        } else {
          set({ addOns: [...addOns, { ...addon, quantity: 1 }] });
        }
      },

      removeAddOn: (id) => {
        set((s) => ({ addOns: s.addOns.filter((a) => a.id !== id) }));
      },

      setShowUpsellModal: (show) => set({ showUpsellModal: show }),

      getCartTotal: () => {
        const { estimatedPrice, addOns, userProfile } = get();
        const baseMin = estimatedPrice?.min ?? 0;

        // Add-on total
        const addOnTotal = addOns.reduce(
          (sum, a) => sum + (a.discountedPrice ?? a.price) * a.quantity,
          0
        );

        // Loyalty discount
        const tier = userProfile?.loyaltyTier ?? 'bronze';
        const discountPercent = getLoyaltyDiscountPercent(tier);
        const discountedBase = baseMin * (1 - discountPercent / 100);

        return Math.round(discountedBase + addOnTotal);
      },

      // Loyalty
      getLoyaltyDiscount: () => {
        const { userProfile } = get();
        if (!userProfile) return 0;
        return getLoyaltyDiscountPercent(userProfile.loyaltyTier);
      },

      // Gift cards
      createGiftCard: (purchaserName, recipientName, recipientPhone, amount) => {
        const card: GiftCard = {
          id: generateId(),
          code: generateGiftCardCode(),
          amount,
          remainingBalance: amount,
          purchaserName,
          recipientName,
          recipientPhone,
          createdAt: new Date().toISOString(),
          isUsed: false,
        };
        set((s) => ({ giftCards: [...s.giftCards, card] }));
        return card;
      },

      // Referral
      generateReferralCode: () => {
        const code = generateReferralCode();
        return code;
      },

      redeemReferral: (code) => {
        const { allUsers } = get();
        const referrer = allUsers.find((u) => u.referralCode === code);
        if (!referrer) return false;

        // Add 100 points to referrer wallet
        set({
          allUsers: allUsers.map((u) =>
            u.id === referrer.id
              ? { ...u, walletPoints: u.walletPoints + 100 }
              : u
          ),
        });
        return true;
      },

      // CRM notification simulation
      simulateNotification: (type, recipientName) => {
        const messages: Record<NotificationLog['type'], string> = {
          six_month_reminder: `Merhaba ${recipientName}! 🎨 Son dövmenizin üzerinden 6 ay geçti. Yeni bir tasarım için randevu almak ister misiniz? %10 hoş geldin indirimi sizi bekliyor! INK STUDIO`,
          birthday_gesture: `Doğum gününüz kutlu olsun ${recipientName}! 🎂 Size özel %20 doğum günü indiriminiz bu hafta geçerli. Kod: DGUNU-${generateId().substring(0, 4).toUpperCase()}`,
          google_review: `Merhaba ${recipientName}! Seansınızdan memnun kaldıysanız, deneyiminizi Google'da paylaşır mısınız? ⭐ https://g.page/inkstudio/review`,
          aftercare_link: `${recipientName}, dövme bakım ürünlerinizi sipariş etmeyi unutmayın! 🧴 Bakım kremi ve SPF losyon için: inkstudio.com/bakim`,
        };

        const notification: NotificationLog = {
          id: generateId(),
          type,
          recipientName,
          message: messages[type],
          scheduledAt: new Date().toISOString(),
          sentAt: null,
          status: 'pending',
        };

        set((s) => ({ notifications: [...s.notifications, notification] }));
        return notification;
      },

      // Admin
      adminLogin: (pin) => {
        if (pin === ADMIN_PIN) {
          set({ isAdminAuthenticated: true });
          return true;
        }
        return false;
      },

      adminLogout: () => set({ isAdminAuthenticated: false }),
    }),
    {
      name: 'ink-studio-store',
      // Only persist user data, not transient booking state
      partialize: (state) => ({
        allUsers: state.allUsers,
        giftCards: state.giftCards,
        notifications: state.notifications,
        appointmentHistory: state.appointmentHistory,
        isAdminAuthenticated: state.isAdminAuthenticated,
      }),
    }
  )
);
