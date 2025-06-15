import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/global';
import { UICategory as ApiCategory } from '../../../types/api';
import { SearchResult } from '@/components/SearchResult';
import { SearchInput } from '@/components';
import { useI18n } from '../../../providers/I18nProvider';

const SearchSectionContainer = styled.div`
  padding: 2rem;
  height: 10%;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  flex-shrink: 0;
  z-index: 100;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  background: ${colors.white};
  border: 2px solid ${colors.border};
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: ${colors.shadow};
  
  &:focus-within {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

interface SearchSectionProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    showResults: boolean;
    onShowResults: (show: boolean) => void;
    isLoading: boolean;
    searchData: { categories: ApiCategory[]; total: number; page: number; limit: number; } | null | undefined;
    onCategorySelect: (category: ApiCategory) => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
    searchTerm,
    onSearchChange,
    showResults,
    onShowResults,
    isLoading,
    searchData,
    onCategorySelect,
    searchInputRef
}) => {
    return (
        <SearchSectionContainer>
            <SearchContainer>
                <SearchInputWrapper>
                    <SearchInput
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={(value) => onSearchChange(value)}
                        onFocus={() => onShowResults(searchTerm.length >= 2)}
                        onBlur={() => {
                            setTimeout(() => onShowResults(false), 200);
                        }}
                    />

                    {showResults && (
                        <SearchResult
                            results={searchData?.categories || []}
                            isLoading={isLoading}
                            onSelect={onCategorySelect}
                        />
                    )}
                </SearchInputWrapper>
            </SearchContainer>
        </SearchSectionContainer>
    );
};