import { colors } from '@/styles/global';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const ToastContainer = styled.div<{ $show: boolean; $type: 'success' | 'error' }>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: ${({ $type }) => $type === 'success' ? colors.success : colors.accent};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: ${({ $show }) => $show ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: all 0.3s ease;
  z-index: 1000;
  font-weight: 500;
  animation: ${({ $show }) => $show ? slideUp : 'none'} 0.3s ease;
`;

interface ToastProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ show, type, message }) => {
  return (
    <ToastContainer $show={show} $type={type}>
      {message}
    </ToastContainer>
  );
}; 