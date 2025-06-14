import { IconType } from 'react-icons';
import styled from 'styled-components';

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  className?: string;
}

const IconWrapper = styled.div<{ size?: number; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.size || 24}px;
  color: ${props => props.color || 'currentColor'};
`;

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, size, color, className }) => {
  return (
    <IconWrapper size={size} color={color} className={className}>
      <IconComponent />
    </IconWrapper>
  );
}; 