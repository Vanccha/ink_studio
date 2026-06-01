import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INK STUDIO | Premium Dövme Stüdyosu",
  description: "İstanbul'un en prestijli dövme stüdyosu. Fine-line, dotwork, traditional ve daha fazlası. Ücretsiz danışmanlık ve online randevu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
