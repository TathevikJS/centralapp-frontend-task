import styled, { keyframes } from 'styled-components';
import { IconType } from 'react-icons';
import { Input } from './input';
import { Loading } from './loading';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 12px;
  width: 340px;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 260px;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(178,58,72,0.10);
  background: #fff;
  position: absolute;
  width: 100%;
  z-index: 1000;
  top: 110%;
  left: 0;
  border: 1.5px solid #fbe6e9;
  animation: ${fadeIn} 0.3s;
`;

const ResultItem = styled.li`
  padding: 16px 18px 12px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f3d1d8;
  transition: background 0.18s, color 0.18s;
  display: flex;
  align-items: center;
  gap: 12px;
  &:last-child { border-bottom: none; }
  &:hover {
    background: #fbe6e9;
    color: #b23a48;
  }
`;

const RestaurantIcon = styled.div<{ as: IconType }>`
  color: #b23a48;
  font-size: 1.1em;
`;

const ResultName = styled.div`
  font-weight: 600;
`;

const ResultPath = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: IconType;
  isLoading?: boolean;
  results?: Array<{
    id: string;
    name: string;
    path: string;
    icon: IconType;
  }>;
  onResultClick: (result: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  icon,
  isLoading,
  results = [],
  onResultClick,
}) => {
  return (
    <SearchBarWrapper>
      <InputWrapper>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          icon={icon}
        />
        {(isLoading || results.length > 0) && value.length >= 2 && (
          <ResultsList>
            {isLoading ? (
              <Loading />
            ) : results.length > 0 ? (
              results.map((result) => (
                <ResultItem
                  key={result.id}
                  onClick={() => onResultClick(result)}
                >
                  <RestaurantIcon as={result.icon} />
                  <div>
                    <ResultName>{result.name}</ResultName>
                    <ResultPath>{result.path}</ResultPath>
                  </div>
                </ResultItem>
              ))
            ) : (
              <Loading text="No results found" />
            )}
          </ResultsList>
        )}
      </InputWrapper>
    </SearchBarWrapper>
  );
}; 