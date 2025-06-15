import React from 'react';
import styled from 'styled-components';
import { FaTag, FaTimes } from 'react-icons/fa';
import { colors } from '@/styles/global';
import { getRandomShadowColor } from '@/utils/helperFunctions';


const CardContainer = styled.div<{ $shadowColor: string }>`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15), 0 20px 40px -8px ${props => props.$shadowColor};
  max-height: 220px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  transform: translate3d(0, 0, 0);
  transition: transform 0.05s linear;
  
  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 35px 70px -15px ${props => props.$shadowColor};
    border-color: ${colors.primary};
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${colors.accent};
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  
  &:hover {
    background: #db2777;
    transform: scale(1.1);
  }
`;

const ItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ItemName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  padding-right: 2rem;
`;

const ItemPath = styled.p`
  font-size: 0.875rem;
  color: ${colors.textLight};
  margin: 0;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'JetBrains Mono', monospace;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid ${colors.border};
`;

interface CategoryCardProps {
  id: string;
  name: string;
  path: string;
  onRemove: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  id, 
  name, 
  path, 
  onRemove 
}) => {
  return (
    <CardContainer $shadowColor={getRandomShadowColor(id)}>
      <RemoveButton onClick={onRemove}>
        <FaTimes />
      </RemoveButton>
      <ItemIcon>
        <FaTag />
      </ItemIcon>
      <ItemName>{name}</ItemName>
      <ItemPath>{path}</ItemPath>
    </CardContainer>
  );
}; 