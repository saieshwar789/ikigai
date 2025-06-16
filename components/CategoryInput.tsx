
import React, { useState } from 'react';
import { IkigaiCategory, IkigaiItem } from '../types.ts'; // Added .ts
import { CATEGORY_COLORS } from '../constants.ts'; // Added .ts

interface CategoryInputProps {
  category: IkigaiCategory;
  items: IkigaiItem[];
  onAddItem: (category: IkigaiCategory, text: string) => void;
  onRemoveItem: (category: IkigaiCategory, itemId: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ category, items, onAddItem, onRemoveItem }) => {
  const [inputValue, setInputValue] = useState('');
  const colors = CATEGORY_COLORS[category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddItem(category, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${colors.bg} border ${colors.border}`}>
      <h3 className={`text-xl font-semibold mb-4 ${colors.text}`}>{category}</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an item..."
          className={`flex-grow p-2 border ${colors.border} rounded-md focus:ring-2 focus:${colors.border} focus:outline-none`}
        />
        <button
          type="submit"
          className={`px-4 py-2 ${colors.text.replace('text-', 'bg-').replace('-600', '-500')} text-white rounded-md hover:${colors.text.replace('text-', 'bg-').replace('-600', '-600')} transition-colors`}
        >
          Add
        </button>
      </form>
      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
          >
            <span className="text-slate-700">{item.text}</span>
            <button
              onClick={() => onRemoveItem(category, item.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
              aria-label={`Remove ${item.text}`}
            >
              &times;
            </button>
          </li>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500 italic">No items yet.</p>}
      </ul>
    </div>
  );
};

export default CategoryInput;