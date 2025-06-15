import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/global';

const BadgeContainer = styled.span<{ $variant: BadgeVariant; $size: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 9999px;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `background: ${colors.primary}; color: ${colors.white};`;
      case 'secondary':
        return `background: ${colors.secondary}; color: ${colors.white};`;
      case 'success':
        return `background: ${colors.success}; color: ${colors.white};`;
      case 'warning':
        return `background: ${colors.warning}; color: ${colors.white};`;
      case 'error':
        return `background: ${colors.error}; color: ${colors.white};`;
      default:
        return `background: ${colors.primary}; color: ${colors.white};`;
    }
  }}
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `padding: 0.125rem 0.5rem; font-size: 0.75rem;`;
      case 'md':
        return `padding: 0.25rem 0.75rem; font-size: 0.875rem;`;
      case 'lg':
        return `padding: 0.375rem 1rem; font-size: 1rem;`;
      default:
        return `padding: 0.25rem 0.75rem; font-size: 0.875rem;`;
    }
  }}
`;

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md' 
}) => {
  return (
    <BadgeContainer $variant={variant} $size={size}>
      {children}
    </BadgeContainer>
  );
}; 