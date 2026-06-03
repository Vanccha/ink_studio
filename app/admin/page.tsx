'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '../store';

export default function AdminDashboard() {
  const store = useStudioStore();
  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'users' | 'crm'>('appointments');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = store.adminLogin(pinInput);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPinInput('');
    }
  };

  const simulateCRM = (userId: string, type: 'six_month_reminder' | 'birthday_gesture' | 'google_review' | 'aftercare_link') => {
    const user = store.allUsers.find(u => u.id === userId);
    if (user) {
      store.simulateNotification(type, user.firstName);
      alert(`${user.firstName} adlı müşteriye bildirim simülasyonu başlatıldı!`);
    }
  };

  if (!store.isAdminAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 w-full max-w-sm text-center"
        >
          <div className="w-16 h-16 bg-[var(--color-surface-light)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-border)]">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Yönetim Paneli</h1>
          <p className="text-sm text-[var(--color-muted)] mb-8">Erişim için PIN kodunu giriniz (İpucu: 1453)</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN Kodu"
                maxLength={4}
                className={`w-full bg-[var(--color-surface-light)] rounded-xl px-4 py-4 text-center text-2xl tracking-[1em] text-[var(--color-foreground)] border focus:outline-none transition-colors ${
                  error ? 'border-red-500 text-red-500' : 'border-[var(--color-border)] focus:border-[var(--color-accent)]'
                }`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[var(--color-foreground)] text-[var(--color-background)] font-bold hover:shadow-xl transition-all"
            >
              Giriş Yap
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 bg-[var(--color-surface-light)]/50 p-6 rounded-2xl border border-[var(--color-border)]">
          <div>
            <h1 className="text-3xl font-bold gradient-text">CRM & Yönetim</h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">Sistem Genel Bakış: {store.allUsers.length} Müşteri Kaydı</p>
          </div>
          <button
            onClick={() => store.adminLogout()}
            className="px-6 py-2.5 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 font-medium transition-colors self-start md:self-auto"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {[
            { id: 'appointments', label: 'Randevular', icon: '📅' },
            { id: 'users', label: 'Müşteriler', icon: '👥' },
            { id: 'crm', label: 'CRM Bildirimleri', icon: '📱' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--color-accent)] text-black shadow-lg shadow-[var(--color-accent)]/20'
                  : 'bg-[var(--color-surface-light)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6 md:p-8"
          >
            {/* APPOINTMENTS TAB */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Son Randevular</h2>
                {store.appointmentHistory && store.appointmentHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                          <th className="pb-3 font-medium">Tarih</th>
                          <th className="pb-3 font-medium">Müşteri</th>
                          <th className="pb-3 font-medium">Stil</th>
                          <th className="pb-3 font-medium text-right">Tutar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.appointmentHistory.map((apt) => (
                          <tr key={apt.id} className="border-b border-[var(--color-border)]/50 last:border-0">
                            <td className="py-4 text-sm">{new Date(apt.date).toLocaleDateString('tr-TR')}</td>
                            <td className="py-4 text-sm font-medium">{store.allUsers.find(u => u.id === apt.userId)?.firstName || 'Bilinmiyor'}</td>
                            <td className="py-4 text-sm">{apt.style}</td>
                            <td className="py-4 text-sm text-right text-[var(--color-neon-pink)] font-bold">{apt.price.toLocaleString('tr-TR')} ₺</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[var(--color-muted)]">
                    <span className="text-4xl mb-4 block opacity-50">📭</span>
                    <p>Henüz tamamlanmış randevu bulunmuyor.</p>
                  </div>
                )}
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Müşteri Veritabanı (Shadow & Registered)</h2>
                {store.allUsers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {store.allUsers.map((user) => (
                      <div key={user.id} className="bg-[var(--color-surface-light)]/50 border border-[var(--color-border)] p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{user.firstName} {user.lastName}</h3>
                            <p className="text-xs text-[var(--color-muted)]">{user.email}</p>
                            <p className="text-xs text-[var(--color-muted)]">{user.phone}</p>
                          </div>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                            user.accountStatus === 'registered' ? 'bg-green-500/20 text-green-400' : 'bg-[var(--color-muted)]/20 text-[var(--color-muted)]'
                          }`}>
                            {user.accountStatus}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`text-xs px-2 py-1 rounded-full border ${
                            user.loyaltyTier === 'gold' ? 'border-yellow-500 text-yellow-500' : 
                            user.loyaltyTier === 'silver' ? 'border-gray-400 text-gray-400' : 
                            'border-[var(--color-accent)] text-[var(--color-accent)]'
                          }`}>
                            Tier: {user.loyaltyTier.toUpperCase()}
                          </span>
                          <span className="text-xs text-[var(--color-muted)]">
                            Puan: <strong className="text-white">{user.walletPoints}</strong>
                          </span>
                        </div>

                        <div className="pt-4 border-t border-[var(--color-border)]">
                          <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-2">Hızlı CRM İşlemleri</p>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => simulateCRM(user.id, 'google_review')} className="text-xs bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-accent)] px-3 py-1.5 rounded-lg transition-colors">
                              ⭐ Yorum İste
                            </button>
                            <button onClick={() => simulateCRM(user.id, 'six_month_reminder')} className="text-xs bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-accent)] px-3 py-1.5 rounded-lg transition-colors">
                              🔄 6 Ay Hatırlatıcı
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[var(--color-muted)]">
                    <span className="text-4xl mb-4 block opacity-50">👻</span>
                    <p>Kayıtlı müşteri yok.</p>
                  </div>
                )}
              </div>
            )}

            {/* CRM TAB */}
            {activeTab === 'crm' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Otomatik Bildirim Logları</h2>
                {store.notifications.length > 0 ? (
                  <div className="space-y-4">
                    {store.notifications.map((notif) => (
                      <div key={notif.id} className="bg-[var(--color-surface-light)]/50 border-l-4 border-[var(--color-neon-purple)] p-4 rounded-r-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-neon-purple)]">
                            {notif.type.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs text-[var(--color-muted)]">
                            {new Date(notif.scheduledAt).toLocaleString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-1">Alıcı: {notif.recipientName}</p>
                        <p className="text-sm text-[var(--color-muted)] italic bg-[var(--color-background)]/50 p-3 rounded-lg border border-[var(--color-border)]">
                          &quot;{notif.message}&quot;
                        </p>
                        <div className="mt-3">
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                            notif.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {notif.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[var(--color-muted)]">
                    <span className="text-4xl mb-4 block opacity-50">💬</span>
                    <p>Gönderilmiş veya bekleyen bildirim yok.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
