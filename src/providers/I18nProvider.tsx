'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLocale, LocaleMessages, I18nContextType } from '../types/i18n';

// Import locale files
import enMessages from '../locales/en.json';
import itMessages from '../locales/it.json';

const messages: Record<SupportedLocale, LocaleMessages> = {
  en: enMessages as LocaleMessages,
  it: itMessages as LocaleMessages,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: SupportedLocale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  defaultLocale = 'en' 
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(defaultLocale);

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as SupportedLocale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'it')) {
      setLocale(savedLocale);
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key; // Return the key if translation is not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const contextValue: I18nContextType = {
    locale,
    messages: messages[locale],
    setLocale,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}; 