import React from 'react';
import styled from 'styled-components';
import { Title } from './ui/Title';
import { Badge } from './ui';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  count?: number;
  actions?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  count,
  actions
}) => {
  return (
    <HeaderContainer>
      <Title>
        {icon}
        {title}
        {typeof count === 'number' && (
          <Badge>{count}</Badge>
        )}
      </Title>
      {actions}
    </HeaderContainer>
  );
}; 