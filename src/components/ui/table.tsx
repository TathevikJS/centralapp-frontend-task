import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Icon } from './icon';

const TableWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  background: #fff;
  border-radius: 50%;
  border: 8px solid #e0cfc2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  transition: transform 0.7s cubic-bezier(.4,0,.2,1);
`;

const Centerpiece = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.2em;
  color: #e0cfc2;
  opacity: 0.32;
  pointer-events: none;
  filter: blur(0.5px);
`;

const ItemOnTable = styled.div<{ angle: number; total: number; rotation: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  ${({ angle, rotation }) => {
    const radius = 200;
    const rad = ((angle - rotation) * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    return `transform: translate(-50%, -50%) translate(${x}px, ${y}px);`;
  }}
  transition: transform 0.7s cubic-bezier(.4,0,.2,1);
  z-index: 2;
`;

interface TableProps {
  centerpieceIcon: IconType;
  rotation: number;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ centerpieceIcon, rotation, children }) => {
  return (
    <TableWrapper>
      <Centerpiece>
        <Icon icon={centerpieceIcon} />
      </Centerpiece>
      {children}
    </TableWrapper>
  );
};

export { ItemOnTable }; 