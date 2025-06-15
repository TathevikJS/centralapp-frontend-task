import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/global';
import { Title } from '../../../components';

const Header = styled.div`
  padding: 2rem 2rem 1rem;
  width: 100%;
  align-items: center;
  text-align: center;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  flex-shrink: 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${colors.textLight};
  margin: 0;
  font-weight: 400;
`;

interface HeaderSectionProps {
  title: string;
  subtitle: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ title, subtitle }) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Header>
  );
}; 