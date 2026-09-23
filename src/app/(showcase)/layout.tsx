"use client";

import { AppProvider, useApp } from "@/context/app-context";

const AppProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <InnerAppProviderWrapper>{children}</InnerAppProviderWrapper>;
};

const InnerAppProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isHydrated } = useApp();

  // Prevents rendering before hydration to avoid mismatches/white flash
  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppProviderWrapper>
        {/* ✅ Ensure global background applied at layout level */}
        <div className="min-h-screen overflow-hidden w-full bg-[var(--background)]">
          {children}
        </div>
      </AppProviderWrapper>
    </AppProvider>
  );
}
