import styled from 'styled-components';

const CardWrapper = styled.div<{ padding?: string }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '16px'};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string;
}

export const Card: React.FC<CardProps> = ({ children, padding, ...props }) => {
  return (
    <CardWrapper padding={padding} {...props}>
      {children}
    </CardWrapper>
  );
}; 