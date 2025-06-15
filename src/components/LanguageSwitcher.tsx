'use client';
import React from 'react';
import styled from 'styled-components';
import { useI18n } from '../providers/I18nProvider';
import { SupportedLocale } from '../types/i18n';
import { colors } from '../styles/global';

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 0.25rem;
  position: relative;
`;

const LanguageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${({ isActive }) => isActive ? colors.primary : 'transparent'};
  color: ${({ isActive }) => isActive ? colors.white : colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 50px;
  
  &:hover {
    background: ${({ isActive }) => isActive ? colors.primary : colors.background};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const languages: { code: SupportedLocale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <SwitcherContainer>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          isActive={locale === lang.code}
          onClick={() => setLocale(lang.code)}
          title={`Switch to ${lang.label}`}
        >
          <span style={{ marginRight: '0.25rem' }}>{lang.flag}</span>
          {lang.label}
        </LanguageButton>
      ))}
    </SwitcherContainer>
  );
}; 