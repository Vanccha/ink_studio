# 🎨 INK STUDIO - Modern Dövme Stüdyosu Yönetim Sistemi

Bu proje, bir dövme stüdyosunun randevu, CRM, sadakat (loyalty) ve hediye kartı süreçlerini uçtan uca yönetebilen, tamamen modern frontend teknolojileriyle (Next.js, Zustand, TailwindCSS, Framer Motion) inşa edilmiş eğitim seviyesinde bir prototiptir.

Projenin temel amacı; karmaşık iş mantıklarını (business logic) backend'e ihtiyaç duymadan **Zustand Store** üzerinde simüle ederek modern bir mimarinin (Vibecoding) nasıl tasarlanacağını göstermektir.

---

## 🚀 Kullanılan Teknolojiler

*   **Framework:** Next.js (App Router, Turbopack)
*   **Stil (Aesthetic):** TailwindCSS + CSS Değişkenleri (Glassmorphism, Neon efektleri, Dark Mode)
*   **Animasyonlar:** Framer Motion (Mikro animasyonlar, sayfa geçişleri, dinamik step indikasyonları)
*   **State Yönetimi:** Zustand (Store mantığı, Persist middleware ile tarayıcı bazlı DB simülasyonu)
*   **İkonlar & Fontlar:** Inter/Outfit (Sleek Typography)

---

## 🛠️ Temel Modüller ve Mimari Açıklamalar

### 1. Dinamik Randevu Akışı (Multi-Step Booking Engine)
Randevu sistemi `/randevu` rotasında 6 adımlı (Step) bir wizard (sihirbaz) yapısında kurgulanmıştır.

*   **Step 1 (Boyut & Stil & Kişi Sayısı):**
    *   Müşteri stili ve boyutu seçer.
    *   **Öğretici Konsept:** *Çoklu Kişi ve Çift Dövmesi.* Ekrandaki `GuestCounter` bileşeni ile kişi sayısı artırılırsa fiyat dinamik olarak katlanır. Eğer 2 ve üzeri kişi seçilirse "Çift Dövmesi (Couples Tattoo)" opsiyonu açılır ve seçildiğinde sepete %10 indirim uygulanır.
*   **Step 2 (Fiyat & Tahmin):** Seçilen stilin baz fiyatı, boyutun çarpanı (multiplier) ve kişi sayısı formüle dökülerek tahmini bir fiyat aralığı hesaplanır.
*   **Step 3 (Bölge & Tarih & Gizlilik):**
    *   **Öğretici Konsept:** *Private Zone Logic.* Göğüs, kalça gibi özel bölgeler seçildiğinde sistem sadece "Salı ve Perşembe" günlerine ve belirli saatlere randevu verilmesine izin verir.
*   **Step 4 (Guest Checkout & Shadow Account):**
    *   **Öğretici Konsept:** *Frictionless UX.* Müşteriler randevu alırken şifre girmeye/kayıt olmaya zorlanmaz. Sadece iletişim bilgileri (Ad, Tel, E-posta) alınır.
    *   "Devam Et" butonuna basıldığı an, arka planda (`store.ts`) `accountStatus: 'shadow'` (gölge) statüsünde bir hesap otomatik olarak oluşturulur.
*   **Step 5 (Kapora ve Upsell):**
    *   Tahmini fiyatın yanı sıra sabit bir kapora tutarı ödenir.
    *   **Öğretici Konsept:** *Akıllı Upsell.* Kullanıcı büyük boyutlu bir dövme seçmişse, ekranda "3x3 cm minimal tasarımı yarı fiyatına ekle" şeklinde bir Add-on kartı çıkar.
*   **Step 6 (Tamamlandı & Hesap Aktivasyonu):**
    *   Referans numarası oluşturulur ve WhatsApp yönlendirme butonu çıkar.
    *   **Öğretici Konsept:** *Kayıt Dönüşümü.* Sayfanın altında "Sadakat puanı kazanmak için şifre belirle" alanı sunulur. Şifre girilirse gölge hesap `registered` statüsüne terfi ettirilir.

### 2. State Yönetimi ve "Veritabanı" (Zustand Persist)
Proje şu an "Pure Frontend" olduğu için backend veritabanı kullanılmamıştır. `app/store.ts` içindeki Zustand mağazası tüm sistemi yönetir.

*   **Persist Middleware:** Kullanıcı kayıtları (`allUsers`), hediye kartları (`giftCards`), geçmiş randevular (`appointmentHistory`) ve CRM logları (`notifications`) tarayıcının LocalStorage'ına yazılır. Böylece sayfayı yenileseniz bile müşteri bilgileriniz kaybolmaz.
*   **Loyalty (Sadakat) Modülü:** Her tamamlanan randevu, kullanıcının `completedAppointments` sayacını artırır.
    *   0-1 randevu = **Bronze**
    *   2-3 randevu = **Silver** (Örn: Ücretsiz bakım hediyesi)
    *   4+ randevu = **Gold** (%15 anında sepet indirimi)

### 3. Dijital Hediye Kartı (`/hediye-karti`)
Kullanıcıların sevdiklerine bakiye hediye etmesini sağlar.
*   **Öğretici Konsept:** Yapay zeka ile görsel üretmek yerine CSS ve HTML kullanılarak "holografik" ve 3 boyut hissi veren (`perspective`, `rotate-x/y`) şık bir kredi kartı dizaynı yaratılmıştır. Kodlar Store'a kaydedilir ve alıcı bu kodla indirim talep edebilir.

### 4. Gizli CRM ve Yönetim Paneli (`/admin`)
Sistemdeki randevuları ve müşteri datalarını yönetmek için tasarlandı.
*   **Öğretici Konsept:** *Security through Obscurity.* Navbar'da bu link bulunmaz. Sadece `/admin` yazanlar erişebilir.
*   Giriş için **1453** PIN kodu zorunludur.
*   Panel üzerinden gölge ve kayıtlı hesaplar (Shadow & Registered) incelenebilir.
*   **Simüle Edilmiş Backend Görevleri:** Kullanıcıların üzerine tıklayarak "Google Yorumu İste" veya "6 Ay Hatırlatması" gibi CRM tetiklemeleri test amaçlı simüle edilebilir.

---

## 💻 Geliştirme Ortamında Çalıştırma

Proje bilgisayarınıza indirildikten sonra çalıştırmak için terminalde şu komutları kullanabilirsiniz:

```bash
# Bağımlılıkları yükleyin (İlk açılışta)
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```

Tarayıcınızdan `http://localhost:3000` adresine giderek siteyi görüntüleyebilirsiniz.
Yönetim paneli için `http://localhost:3000/admin` rotasını kullanabilirsiniz (PIN: 1453).

---
*Bu sistem, modern React/Next.js mimarilerinin gücünü ve state management kullanılarak karmaşık UI akışlarının nasıl zahmetsizce yönetileceğini göstermek amacıyla kodlanmıştır.*
