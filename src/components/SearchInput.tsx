import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Input } from './ui';
import { colors } from '@/styles/global';
import { SEARCH_PLACEHOLDER } from '@/constants/texts';

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textLight};
  font-size: 1.125rem;
`;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ReactNode;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = SEARCH_PLACEHOLDER, onFocus, onBlur, icon = <FaSearch /> }, ref) => {
    return (
      <SearchInputContainer>
        <SearchIcon>{icon}</SearchIcon>
        <Input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </SearchInputContainer>
    );
  }
); 