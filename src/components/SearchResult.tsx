import React from 'react';
import styled from 'styled-components';
import { FaTag, FaPlus } from 'react-icons/fa';
import { NO_CATEGORIES_FOUND, SEARCHING } from '@/constants/texts';

const colors = {
  primary: '#6366f1',
  success: '#10b981',
  text: '#1f2937',
  textLight: '#6b7280',
  white: '#ffffff',
  border: '#e5e7eb',
};

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  margin-top: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 200;
`;

const ResultItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid ${colors.border};
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ResultIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${colors.primary};
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultName = styled.div`
  font-weight: 500;
  color: ${colors.text};
  margin-bottom: 0.25rem;
`;

const ResultPath = styled.div`
  font-size: 0.875rem;
  color: ${colors.textLight};
  font-family: 'JetBrains Mono', monospace;
`;

const AddButton = styled.button`
  background: ${colors.success};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #059669;
    transform: scale(1.05);
  }
`;

const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${colors.textLight};
  font-size: 0.875rem;
`;

interface SearchResult {
  id: string;
  name: string;
  path: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onSelect: (result: SearchResult) => void;
  noResultsMessage?: string;
  searchTerm: string;
}

export const SearchResult: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  onSelect,
  searchTerm,
}) => {
  return (
    <ResultsContainer>
      {isLoading ? (
        <LoadingMessage>{SEARCHING}</LoadingMessage>
      ) : results.length > 0 ? (
        results.map((result) => (
          <ResultItem
            key={result.id}
            onClick={() => onSelect(result)}
          >
            <ResultIcon>
              <FaTag />
            </ResultIcon>
            <ResultContent>
              <ResultName>{result.name}</ResultName>
              <ResultPath>{result.path}</ResultPath>
            </ResultContent>
            <AddButton>
              <FaPlus />
            </AddButton>
          </ResultItem>
        ))
      ) : searchTerm.length >= 2 ? (
        <LoadingMessage>{NO_CATEGORIES_FOUND}</LoadingMessage>
      ) : null}
    </ResultsContainer>
  );
}; 