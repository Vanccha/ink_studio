'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/ilk-defa', label: 'İlk Defa' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-card-sm !rounded-none border-t-0 border-x-0"
      style={{ borderBottom: '1px solid rgba(201,168,108,0.12)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-neon-amber)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-[var(--color-background)] font-bold text-lg font-serif">İ</span>
            </div>
            <span className="text-xl font-bold gradient-text tracking-wide hidden sm:block">
              INK STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-foreground)]/70 hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-light)] transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/randevu"
              className="ml-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-semibold text-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/25 transition-all duration-300 hover:scale-105"
            >
              Randevu Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-light)] transition-colors"
            aria-label="Menüyü aç"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-[var(--color-foreground)] rounded-full origin-left"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-6 bg-[var(--color-foreground)] rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-[var(--color-foreground)] rounded-full origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card-sm !rounded-none border-x-0 border-b-0"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[var(--color-foreground)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-light)] transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/randevu"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-neon-amber)] text-[var(--color-background)] font-semibold"
              >
                Randevu Al
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
