'use client';

import { TRPCProvider } from './trpc-provider';
import { I18nProvider } from './I18nProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider defaultLocale="en">
      <TRPCProvider>
        {children}
      </TRPCProvider>
    </I18nProvider>
  );
} 