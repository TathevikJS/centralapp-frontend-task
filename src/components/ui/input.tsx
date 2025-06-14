import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Icon } from './icon';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 48px;
  border: 2px solid #e0cfc2;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #b23a48;
    box-shadow: 0 0 0 2px rgba(178, 58, 72, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #b23a48;
  pointer-events: none;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ icon, error, ...props }) => {
  return (
    <InputWrapper>
      {icon && (
        <IconContainer>
          <Icon icon={icon} size={20} />
        </IconContainer>
      )}
      <StyledInput {...props} />
      {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error}</div>}
    </InputWrapper>
  );
}; 