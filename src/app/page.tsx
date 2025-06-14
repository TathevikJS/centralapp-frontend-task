'use client';

import React from 'react';
import { CategorySearch } from '@/features/categorySearch/CategorySearch';
import styled from 'styled-components';

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
      <CategorySearch language="en" />
    </PageContainer>
  );
}
