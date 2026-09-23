import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { Suspense } from "react";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arde",
  description: "Velas y esencias artesanales que encienden tu espacio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${open_sans.variable} antialiased`}>
        <Suspense fallback={null}>
          <AppProvider>
            {children}
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
