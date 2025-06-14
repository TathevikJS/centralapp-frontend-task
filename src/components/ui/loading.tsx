import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  padding: 16px;
  z-index: 1001;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #e0cfc2;
  border-top-color: #b23a48;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`;

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <LoadingWrapper>
      <Spinner />
      {text}
    </LoadingWrapper>
  );
}; 