import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Icon } from './icon';

const ButtonWrapper = styled.button<{ variant?: 'primary' | 'secondary' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #b23a48;
          color: white;
          &:hover {
            background: #9a2f3b;
          }
        `;
      case 'secondary':
        return `
          background: #e0cfc2;
          color: #333;
          &:hover {
            background: #d4c0b0;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #666;
          &:hover {
            background: #f5f5f5;
          }
        `;
      default:
        return `
          background: #b23a48;
          color: white;
          &:hover {
            background: #9a2f3b;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <ButtonWrapper variant={variant} {...props}>
      {icon && iconPosition === 'left' && <Icon icon={icon} size={16} />}
      {children}
      {icon && iconPosition === 'right' && <Icon icon={icon} size={16} />}
    </ButtonWrapper>
  );
}; 