import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/global';

const EmptyStateContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  color: ${colors.textLight};
  box-sizing: border-box;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${colors.text};
  text-align: center;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  margin: 0 auto;
  max-width: 400px;
  line-height: 1.5;
  text-align: center;
`;

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <EmptyStateContainer>
      <EmptyIcon>{icon}</EmptyIcon>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyStateContainer>
  );
}; 