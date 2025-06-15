'use client';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchCategories } from '../../hooks/useCategories';
import { UICategory as ApiCategory } from '../../types/api';
import { Toast, LanguageSwitcher } from '../../components';
import { HeaderSection } from './core/HeaderSection';
import { MainContentSection } from './core/MainContentSection';
import { colors } from '@/styles/global';
import { SearchSection } from './core/SearchSection';
import { useI18n } from '../../providers/I18nProvider';



const Container = styled.div`
  height: 100vh;
  background: ${colors.background};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CategorySearch: React.FC = () => {
  const { locale } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ApiCategory[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const { data: searchData, isLoading } = useSearchCategories({
    query: searchTerm,
    page: 1,
    limit: 10,
    language: locale,
    level: 'L1'
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  }, []);

  const handleCategorySelect = useCallback((category: ApiCategory) => {
    if (!selectedCategories.find(c => c.id === category.id)) {
      setSelectedCategories(prev => [...prev, category]);
      showToast(`${category.name} ${t('toast.addedSuccessfully')}`);
    } else {
      showToast(`${category.name} ${t('toast.alreadyAdded')}`, 'error');
    }
    setSearchTerm('');
    setShowResults(false);
  }, [selectedCategories, showToast, t]);

  const handleCategoryRemove = useCallback((category: ApiCategory) => {
    setSelectedCategories(prev => prev.filter(c => c.id !== category.id));
    showToast(`${category.name} ${t('toast.removed')}`);
  }, [showToast, t]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setShowResults(value.length >= 2);
  }, []);

  return (
    <Container>
      <HeaderSection
        title={t('categoryManager.title')}
        subtitle={t('categoryManager.subtitle')}
      />

      <SearchSection
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        showResults={showResults}
        onShowResults={setShowResults}
        isLoading={isLoading}
        searchData={searchData}
        onCategorySelect={handleCategorySelect}
        searchInputRef={searchInputRef}
      />

      <MainContentSection
        selectedCategories={selectedCategories}
        onCategoryRemove={handleCategoryRemove}
      />

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
      />
    </Container>
  );
};