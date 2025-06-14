import styled, { keyframes } from 'styled-components';
import { IconType } from 'react-icons';
import { Icon } from './icon';
import { FaTrashAlt } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PlateCard = styled.div<{ size: number }>`
  background: radial-gradient(circle at 60% 30%, #fff 70%, #f3f3f3 100%);
  border: 4px solid #e5e5e5;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  position: relative;
  transition: box-shadow 0.25s, transform 0.25s;
  animation: ${fadeIn} 0.7s;
  z-index: 1;

  &:hover {
    box-shadow: none;
    z-index: 3;
    transform: scale(1.04) rotate(-2deg);
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1.08, 1.08);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 60% 30%, #fff 60%, #f3f3f3 100%);
    opacity: 0.1;
    z-index: 0;
    pointer-events: none;
  }
`;

const PlateIcon = styled.div`
  font-size: 2.2em;
  color: #b23a48;
  margin-bottom: 6px;
`;

const PlateName = styled.div`
  font-weight: 600;
  color: #b23a48;
  text-align: center;
  font-size: 1em;
  margin-bottom: 2px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.2;
`;

const PlatePath = styled.div`
  font-size: 0.82em;
  color: #b23a48bb;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
`;

const PlateRemove = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  background: #b23a48;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.18s, background 0.18s;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background: #7c2632;
  }

  ${PlateCard}:hover & {
    opacity: 1;
  }
`;

interface PlateProps {
  size: number;
  icon: IconType;
  name: string;
  path: string;
  onRemove: () => void;
}

export const Plate: React.FC<PlateProps> = ({ size, icon, name, path, onRemove }) => {
  return (
    <PlateCard size={size}>
      <PlateIcon>
        <Icon icon={icon} />
      </PlateIcon>
      <PlateName>{name}</PlateName>
      <PlatePath>{path}</PlatePath>
      <PlateRemove onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Remove">
        <FaTrashAlt />
      </PlateRemove>
    </PlateCard>
  );
}; 