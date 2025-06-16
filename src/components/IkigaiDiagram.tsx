
import React from 'react';
import { IkigaiItem, IkigaiCategory, DiagramZoneType, DiagramDisplayItems } from '../types';
import { CATEGORY_COLORS, SVG_WIDTH, SVG_HEIGHT, CIRCLE_RADIUS, DIAGRAM_CENTERS, OPACITY, DIAGRAM_ZONE_TEXT_POSITIONS } from '../constants';

interface HoverInfo {
  items: IkigaiItem[];
  x: number;
  y: number;
  colorClass: string;
}

interface IkigaiDiagramProps {
  diagramDisplayItems: DiagramDisplayItems;
  onZoneHover: (info: HoverInfo | null) => void;
}

const CategoryLabel: React.FC<{
  centerX: number;
  baseY: number;
  colorClass: string;
  lines: [string, string];
  ariaLabel: string;
}> = ({ centerX, baseY, colorClass, lines, ariaLabel }) => {
  return (
    <text
      x={centerX}
      y={baseY}
      textAnchor="middle"
      className={`font-bold text-sm ${colorClass} select-none`}
      aria-label={ariaLabel}
    >
      <tspan x={centerX} dy="0">{lines[0]}</tspan>
      <tspan x={centerX} dy="1.2em">{lines[1]}</tspan>
    </text>
  );
};

const IkigaiDiagram: React.FC<IkigaiDiagramProps> = ({ diagramDisplayItems, onZoneHover }) => {
  
  const renderItemsInZone = (items: IkigaiItem[], x: number, y: number, label?: string, colorClass: string = 'text-slate-700') => {
    const itemOffsetY = 18; 
    const maxItemsToShow = 1; 
    const itemFontSize = "text-xs";
    
    let labelFontSizeClass = "text-sm";
    if (label === DiagramZoneType.IKIGAI) {
      labelFontSizeClass = "text-xl";
    } else if (label === DiagramZoneType.PASSION || label === DiagramZoneType.MISSION || label === DiagramZoneType.PROFESSION || label === DiagramZoneType.VOCATION) {
      labelFontSizeClass = "text-lg";
    }

    const startY = label ? (index: number) => (index + 1) * itemOffsetY : (index: number) => (index * itemOffsetY) - ( (Math.min(items.length, maxItemsToShow) -1) * itemOffsetY / 2) + itemOffsetY/2 ;

    const handleMouseEnter = (event: React.MouseEvent) => {
      if (items.length > maxItemsToShow) {
        onZoneHover({
          items: items,
          x: event.clientX,
          y: event.clientY,
          colorClass: colorClass,
        });
      }
    };

    const handleMouseLeave = () => {
      onZoneHover(null);
    };

    return (
      <g 
        transform={`translate(${x}, ${y})`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label && <text x="0" y="0" textAnchor="middle" className={`font-semibold ${labelFontSizeClass} ${colorClass} select-none`}>{label}</text>}
        {items.slice(0, maxItemsToShow).map((item, index) => (
          <text key={item.id} x="0" y={startY(index)} textAnchor="middle" className={`${itemFontSize} ${colorClass} select-none`}>
            {item.text.length > 12 ? `${item.text.substring(0, 10)}...` : item.text}
          </text>
        ))}
        {items.length > maxItemsToShow && (
           <text x="0" y={startY(maxItemsToShow)} textAnchor="middle" className={`text-xs ${colorClass} italic select-none`}>
            +{items.length - maxItemsToShow} more
          </text>
        )}
      </g>
    );
  };
  
  const loveCenter = DIAGRAM_CENTERS[IkigaiCategory.LOVE];
  const goodAtCenter = DIAGRAM_CENTERS[IkigaiCategory.GOOD_AT];
  const worldNeedsCenter = DIAGRAM_CENTERS[IkigaiCategory.WORLD_NEEDS];
  const paidForCenter = DIAGRAM_CENTERS[IkigaiCategory.PAID_FOR];

  const approxLineHeightForSm = 14 * 1.2; 

  const threeCatColors = {
    [DiagramZoneType.LOVE_GOOD_NEEDS]: 'text-teal-600',
    [DiagramZoneType.LOVE_GOOD_PAID]: 'text-orange-600',
    [DiagramZoneType.LOVE_NEEDS_PAID]: 'text-indigo-600',
    [DiagramZoneType.GOOD_NEEDS_PAID]: 'text-lime-700',
  };


  return (
    <div className="flex justify-center items-center p-4 bg-white shadow-xl rounded-xl">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        <circle cx={loveCenter.cx} cy={loveCenter.cy} r={CIRCLE_RADIUS} className={`${CATEGORY_COLORS[IkigaiCategory.LOVE].fill}`} opacity={OPACITY} />
        <circle cx={goodAtCenter.cx} cy={goodAtCenter.cy} r={CIRCLE_RADIUS} className={`${CATEGORY_COLORS[IkigaiCategory.GOOD_AT].fill}`} opacity={OPACITY} />
        <circle cx={worldNeedsCenter.cx} cy={worldNeedsCenter.cy} r={CIRCLE_RADIUS} className={`${CATEGORY_COLORS[IkigaiCategory.WORLD_NEEDS].fill}`} opacity={OPACITY} />
        <circle cx={paidForCenter.cx} cy={paidForCenter.cy} r={CIRCLE_RADIUS} className={`${CATEGORY_COLORS[IkigaiCategory.PAID_FOR].fill}`} opacity={OPACITY} />

        <CategoryLabel
          centerX={loveCenter.cx}
          baseY={loveCenter.cy - CIRCLE_RADIUS - 10 - approxLineHeightForSm}
          colorClass={CATEGORY_COLORS[IkigaiCategory.LOVE].text}
          lines={["What you", "LOVE"]}
          ariaLabel={IkigaiCategory.LOVE}
        />
        <CategoryLabel
          centerX={goodAtCenter.cx}
          baseY={goodAtCenter.cy - CIRCLE_RADIUS - 10 - approxLineHeightForSm}
          colorClass={CATEGORY_COLORS[IkigaiCategory.GOOD_AT].text}
          lines={["What you are", "GOOD AT"]}
          ariaLabel={IkigaiCategory.GOOD_AT}
        />
        <CategoryLabel
          centerX={worldNeedsCenter.cx}
          baseY={worldNeedsCenter.cy + CIRCLE_RADIUS + 20}
          colorClass={CATEGORY_COLORS[IkigaiCategory.WORLD_NEEDS].text}
          lines={["What the", "world NEEDS"]}
          ariaLabel={IkigaiCategory.WORLD_NEEDS}
        />
        <CategoryLabel
          centerX={paidForCenter.cx}
          baseY={paidForCenter.cy + CIRCLE_RADIUS + 20}
          colorClass={CATEGORY_COLORS[IkigaiCategory.PAID_FOR].text}
          lines={["What you can", "be PAID FOR"]}
          ariaLabel={IkigaiCategory.PAID_FOR}
        />

        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.IKIGAI],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.IKIGAI].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.IKIGAI].y,
          DiagramZoneType.IKIGAI,
          'text-purple-700'
        )}

        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.LOVE_GOOD_NEEDS],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_GOOD_NEEDS].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_GOOD_NEEDS].y,
          undefined, 
          threeCatColors[DiagramZoneType.LOVE_GOOD_NEEDS]
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.LOVE_GOOD_PAID],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_GOOD_PAID].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_GOOD_PAID].y,
          undefined, 
          threeCatColors[DiagramZoneType.LOVE_GOOD_PAID]
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.LOVE_NEEDS_PAID],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_NEEDS_PAID].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_NEEDS_PAID].y,
          undefined, 
          threeCatColors[DiagramZoneType.LOVE_NEEDS_PAID]
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.GOOD_NEEDS_PAID],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.GOOD_NEEDS_PAID].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.GOOD_NEEDS_PAID].y,
          undefined, 
          threeCatColors[DiagramZoneType.GOOD_NEEDS_PAID]
        )}

        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.PASSION],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PASSION].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PASSION].y,
          DiagramZoneType.PASSION,
          'text-pink-600'
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.MISSION],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.MISSION].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.MISSION].y,
          DiagramZoneType.MISSION,
          'text-cyan-600'
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.PROFESSION],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PROFESSION].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PROFESSION].y,
          DiagramZoneType.PROFESSION,
          'text-green-600'
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.VOCATION],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.VOCATION].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.VOCATION].y,
          DiagramZoneType.VOCATION,
          'text-yellow-600'
        )}
        
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.LOVE_ONLY],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_ONLY].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.LOVE_ONLY].y,
          undefined, 
          CATEGORY_COLORS[IkigaiCategory.LOVE].text
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.GOOD_AT_ONLY],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.GOOD_AT_ONLY].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.GOOD_AT_ONLY].y,
          undefined,
          CATEGORY_COLORS[IkigaiCategory.GOOD_AT].text
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.WORLD_NEEDS_ONLY],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.WORLD_NEEDS_ONLY].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.WORLD_NEEDS_ONLY].y,
          undefined,
          CATEGORY_COLORS[IkigaiCategory.WORLD_NEEDS].text
        )}
        {renderItemsInZone(
          diagramDisplayItems[DiagramZoneType.PAID_FOR_ONLY],
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PAID_FOR_ONLY].x,
          DIAGRAM_ZONE_TEXT_POSITIONS[DiagramZoneType.PAID_FOR_ONLY].y,
          undefined,
          CATEGORY_COLORS[IkigaiCategory.PAID_FOR].text
        )}
      </svg>
    </div>
  );
};

export default IkigaiDiagram;
