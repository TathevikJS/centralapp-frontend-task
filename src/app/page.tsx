'use client';
import React from 'react';
import styled from 'styled-components';
import { Categories } from '@/features/categories/Categories';


const PageContainer = styled.div`
  align-items: center;
  justify-content: center;
  background: none;
  padding-left: 60px;
  padding-right: 60px;
`;

export default function Home() {
  return (
    <PageContainer>
      <Categories />
    </PageContainer>
  );
}
