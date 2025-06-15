'use client';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchCategories } from '../../hooks/useCategories';
import { UICategory as ApiCategory } from '../../types/api';
import { Toast } from '../../components';
import { HeaderSection } from './core/HeaderSection';
import { MainContentSection } from './core/MainContentSection';
import { colors } from '@/styles/global';
import { CATEGORY_MANAGER, ADD_AND_ORGANIZE, ADDED_SUCCESSFULLY, ALREADY_ADDED, REMOVED } from '../../constants/texts';
import { SearchSection } from './core/SearchSection';



const Container = styled.div`
  height: 100vh;
  background: ${colors.background};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface CategorySearchProps {
  language: string;
}

export const CategorySearch: React.FC<CategorySearchProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ApiCategory[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: searchData, isLoading } = useSearchCategories({
    query: searchTerm,
    page: 1,
    limit: 10,
    language,
    level: 'L1'
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  }, []);

  const handleCategorySelect = useCallback((category: ApiCategory) => {
    if (!selectedCategories.find(c => c.id === category.id)) {
      setSelectedCategories(prev => [...prev, category]);
      showToast(`${category.name} ${ADDED_SUCCESSFULLY}`);
    } else {
      showToast(`${category.name} ${ALREADY_ADDED}`, 'error');
    }
    setSearchTerm('');
    setShowResults(false);
  }, [selectedCategories, showToast]);

  const handleCategoryRemove = useCallback((category: ApiCategory) => {
    setSelectedCategories(prev => prev.filter(c => c.id !== category.id));
    showToast(`${category.name} ${REMOVED}`);
  }, [showToast]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setShowResults(value.length >= 2);
  }, []);

  return (
    <Container>
      <HeaderSection
        title={CATEGORY_MANAGER}
        subtitle={ADD_AND_ORGANIZE}
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