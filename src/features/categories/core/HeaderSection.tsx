import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/global';
import { Title, LanguageSwitcher } from '../../../components';

const Header = styled.div`
  padding: 2rem 2rem 1rem;
  height: 10%;
  width: 100%;
  align-items: center;
  text-align: center;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  flex-shrink: 0;
  position: relative;
`;

const LanguageSwitcherContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 5rem;
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
      <LanguageSwitcherContainer>
        <LanguageSwitcher />
      </LanguageSwitcherContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Header>
  );
}; 