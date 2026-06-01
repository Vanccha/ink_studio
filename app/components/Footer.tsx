'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)]/50">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-amber)] flex items-center justify-center">
                <span className="text-[var(--color-background)] font-bold text-lg font-serif">İ</span>
              </div>
              <span className="text-xl font-bold gradient-text">INK STUDIO</span>
            </motion.div>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              Premium dövme deneyimi. Sanatı teninize taşıyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Ana Sayfa' },
                { href: '/ilk-defa', label: 'İlk Defa Yaptıracağım' },
                { href: '/randevu', label: 'Randevu Al' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
              İletişim
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-muted)]">
              <li className="flex items-center gap-2">
                <span>📍</span> Kadıköy, İstanbul
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +90 555 555 55 55
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span> info@inkstudio.com
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span> Pzt-Cmt: 11:00 - 21:00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            © 2025 INK STUDIO. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            {['Instagram', 'Twitter', 'TikTok'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
