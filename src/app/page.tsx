'use client';

import React from 'react';
import styled from 'styled-components';

import { CategorySearch } from '@/features/categorySearch/CategorySearch';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: none;
`;

export default function Home() {
  return (
    <PageContainer>
      <CategorySearch />
    </PageContainer>
  );
}
