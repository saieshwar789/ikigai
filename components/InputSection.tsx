
import React from 'react';
import { IkigaiCategory, IkigaiData, IkigaiItem } from '../types.ts'; // Added .ts
import CategoryInput from './CategoryInput.tsx'; // Added .tsx

interface InputSectionProps {
  ikigaiData: IkigaiData;
  onAddItem: (category: IkigaiCategory, text: string) => void;
  onRemoveItem: (category: IkigaiCategory, itemId: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ ikigaiData, onAddItem, onRemoveItem }) => {
  const categories = Object.values(IkigaiCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {categories.map((category) => (
        <CategoryInput
          key={category}
          category={category}
          items={ikigaiData[category]}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default InputSection;