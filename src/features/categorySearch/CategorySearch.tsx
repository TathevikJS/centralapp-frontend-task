'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUtensils, FaConciergeBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSearchCategories } from '../../hooks/useCategories';
import { Category as ApiCategory } from '../../types/api';
import { SearchBar } from '../../components/ui/searchBar';
import { Table, ItemOnTable } from '../../components/ui/table';
import { Plate } from '../../components/ui/plate';
import { getFoodIcon } from '../../utils/icons';

const accent = '#b23a48';

const SearchOuter = styled.div`
  background: 
    linear-gradient(120deg, rgba(255, 248, 243, 0.92) 60%, rgba(255, 229, 217, 0.85) 100%),
    url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: unset;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

const TableLabel = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2.1rem;
  color: ${accent};
  text-align: center;
  margin-bottom: 18px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const TableNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => disabled ? '#e5e5e5' : accent};
  color: ${({ disabled }) => disabled ? '#999' : '#fff'};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  font-size: 1.4rem;
  box-shadow: 0 4px 12px rgba(178, 58, 72, 0.2);
  
  &:hover {
    background: ${({ disabled }) => disabled ? '#e5e5e5' : '#8b2c36'};
    transform: ${({ disabled }) => disabled ? 'none' : 'scale(1.1)'};
    box-shadow: ${({ disabled }) => disabled ? 'none' : '0 6px 16px rgba(178, 58, 72, 0.3)'};
  }
`;

const TableIndicator = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: ${accent};
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
`;

const TableWithNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
`;

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

interface CategorySearchProps {
  language?: string;
}

export const CategorySearch: React.FC<CategorySearchProps> = ({ language = 'en' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ApiCategory[]>([]);
  const [rotation, setRotation] = useState(0);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);

  const { data: searchData, isLoading } = useSearchCategories({
    query: searchTerm,
    page: 1,
    limit: 10,
    language,
    level: 'L1'
  });

  const handleCategorySelect = (category: ApiCategory) => {
    if (!selectedCategories.find(c => c.id === category.id)) {
      setSelectedCategories(prev => [...prev, category]);
    }
    setSearchTerm('');
  };

  const handleCategoryRemove = (category: ApiCategory) => {
    setSelectedCategories(prev => prev.filter(c => c.id !== category.id));
    const maxPlatesPerTable = 8;
    const totalTables = Math.ceil(selectedCategories.filter(c => c.id !== category.id).length / maxPlatesPerTable);
    if (currentTableIndex >= totalTables && totalTables > 0) {
      setCurrentTableIndex(totalTables - 1);
    }
  };

  const plateSize = 130;
  const maxPlatesPerTable = 8;

  const groupedCategories = [];
  for (let i = 0; i < selectedCategories.length; i += maxPlatesPerTable) {
    groupedCategories.push(selectedCategories.slice(i, i + maxPlatesPerTable));
  }

  const totalTables = groupedCategories.length;
  const currentCategories = groupedCategories[currentTableIndex] || [];

  const goToNextTable = () => {
    if (currentTableIndex < totalTables - 1) {
      setCurrentTableIndex(prev => prev + 1);
    }
  };

  const goToPreviousTable = () => {
    if (currentTableIndex > 0) {
      setCurrentTableIndex(prev => prev - 1);
    }
  };

  const renderCurrentTable = () => (
    <TableSection>
      <Table
        centerpieceIcon={FaConciergeBell}
        rotation={rotation}
      >
        {currentCategories.map((category, idx) => {
          const Icon = getFoodIcon(category.name);
          const angle = (360 / currentCategories.length) * idx;
          return (
            <ItemOnTable
              key={category.id}
              angle={angle}
              total={currentCategories.length}
              rotation={rotation}
            >
              <Plate
                size={plateSize}
                icon={Icon}
                name={category.name}
                path={category.path}
                onRemove={() => handleCategoryRemove(category)}
              />
            </ItemOnTable>
          );
        })}
      </Table>
    </TableSection>
  );

  return (
    <SearchOuter>
      <TableWrapper>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Type to search... (e.g. Mario's Pizza)"
          icon={FaSearch}
          isLoading={isLoading}
          results={searchData?.categories.map(category => ({
            id: category.id,
            name: category.name,
            path: category.path,
            icon: getFoodIcon(category.name)
          }))}
          onResultClick={handleCategorySelect}
        />

        {totalTables > 1 && (
          <TableIndicator>
            Table {currentTableIndex + 1} of {totalTables}
          </TableIndicator>
        )}

        {selectedCategories.length > 0 && (
          <TableWithNavigation>
            {totalTables > 1 && (
              <NavButton 
                onClick={goToPreviousTable}
                disabled={currentTableIndex === 0}
              >
                <FaChevronLeft />
              </NavButton>
            )}
            
            {renderCurrentTable()}
            
            {totalTables > 1 && (
              <NavButton 
                onClick={goToNextTable}
                disabled={currentTableIndex === totalTables - 1}
              >
                <FaChevronRight />
              </NavButton>
            )}
          </TableWithNavigation>
        )}

      </TableWrapper>
    </SearchOuter>
  );
};