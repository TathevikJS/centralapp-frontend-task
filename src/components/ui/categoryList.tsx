import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Plate } from './plate';

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px;
  justify-content: center;
  min-height: 120px;
`;

interface Category {
  id: string;
  name: string;
  path: string;
  icon: IconType;
}

interface CategoryListProps {
  categories: Category[];
  onRemove: (category: Category) => void;
  plateSize?: number;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onRemove,
  plateSize = 100,
}) => {
  return (
    <CategoryListWrapper>
      {categories.map((category) => (
        <Plate
          key={category.id}
          size={plateSize}
          icon={category.icon}
          name={category.name}
          path={category.path}
          onRemove={() => onRemove(category)}
        />
      ))}
    </CategoryListWrapper>
  );
}; 