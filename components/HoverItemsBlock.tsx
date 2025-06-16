import React from 'react';
import { IkigaiItem } from '../types';

interface HoverItemsBlockProps {
  items: IkigaiItem[];
  x: number;
  y: number;
  isVisible: boolean;
  colorClass: string; // To style the text color according to the zone
}

const HoverItemsBlock: React.FC<HoverItemsBlockProps> = ({ items, x, y, isVisible, colorClass }) => {
  if (!isVisible || items.length === 0) {
    return null;
  }

  // Ensure items are actually filtered to show only those beyond the initially displayed ones,
  // or decide if the block should show *all* items for that zone.
  // For now, assuming `items` prop passed are the ones to be displayed in the hover block.

  return (
    <div
      className="fixed p-3 bg-white border border-slate-300 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto min-w-[150px] max-w-sm transition-opacity duration-100 ease-in-out pointer-events-auto"
      style={{
        left: `${x + 5}px`, // Small offset from cursor
        top: `${y + 5}px`,  // Small offset from cursor
        opacity: isVisible ? 1 : 0,
      }}
      role="tooltip"
      aria-live="polite"
    >
      <p className={`text-xs font-semibold mb-2 pb-1 border-b ${colorClass} border-opacity-50`}>Full List:</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={`${colorClass} text-sm break-words`}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverItemsBlock;
