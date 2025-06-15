import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { colors } from '@/styles/global';
import { CategoryCard } from './CategoryCard';
import { UICategory as ApiCategory } from '../../../types/api';
import { EmptyState } from './EmptyState';
import { useI18n } from '../../../providers/I18nProvider';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContent = styled.div`
  padding: 2rem;
  max-width: 95%;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ItemCount = styled.span`
  background: ${colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ItemsGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  overflow-y: auto;
  overflow-x: hidden;
  height: 500px;
  min-height: 500px;
  max-height: 500px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
  
  /* Smooth scrolling */
  scroll-behavior: smooth;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 8px;
    margin: 0.5rem 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.primary};
    border-radius: 8px;
    border: 2px solid #f8fafc;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.secondary};
  }
  
  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${colors.primary} #f8fafc;
`;

interface MainContentSectionProps {
  selectedCategories: ApiCategory[];
  onCategoryRemove: (category: ApiCategory) => void;
}

export const MainContentSection: React.FC<MainContentSectionProps> = ({
  selectedCategories,
  onCategoryRemove
}) => {
  const { t } = useI18n();
  
  return (
    <MainContent>
      <SectionHeader>
        <SectionTitle>
          <FaHeart />
          {t('categoryManager.yourCategories')}
          {selectedCategories.length > 0 && (
            <ItemCount>{selectedCategories.length}</ItemCount>
          )}
        </SectionTitle>
      </SectionHeader>

      {selectedCategories.length === 0 ? (
        <EmptyState
          icon={<FaHeart />}
          title={t('emptyState.noCategoriesYet')}
          description={t('emptyState.description')}
        />
      ) : (
        <ItemsGrid>
          {selectedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              path={category.path}
              onRemove={() => onCategoryRemove(category)}
            />
          ))}
        </ItemsGrid>
      )}
    </MainContent>
  );
}; 