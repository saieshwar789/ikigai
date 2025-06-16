
import { IkigaiCategory, IkigaiData, DiagramZoneType } from './types';

export const CATEGORY_COLORS: Record<IkigaiCategory, { text: string; bg: string; fill: string; border: string }> = {
  [IkigaiCategory.LOVE]: { text: 'text-rose-600', bg: 'bg-rose-50', fill: 'fill-rose-400', border: 'border-rose-500' },
  [IkigaiCategory.GOOD_AT]: { text: 'text-emerald-600', bg: 'bg-emerald-50', fill: 'fill-emerald-400', border: 'border-emerald-500' },
  [IkigaiCategory.WORLD_NEEDS]: { text: 'text-sky-600', bg: 'bg-sky-50', fill: 'fill-sky-400', border: 'border-sky-500' },
  [IkigaiCategory.PAID_FOR]: { text: 'text-amber-600', bg: 'bg-amber-50', fill: 'fill-amber-400', border: 'border-amber-500' },
};

export const INITIAL_IKIGAI_DATA: IkigaiData = {
  [IkigaiCategory.LOVE]: [],
  [IkigaiCategory.GOOD_AT]: [],
  [IkigaiCategory.WORLD_NEEDS]: [],
  [IkigaiCategory.PAID_FOR]: [],
};

// SVG Diagram constants
export const SVG_WIDTH = 600;
export const SVG_HEIGHT = 600;
export const CIRCLE_RADIUS = 150;
export const CIRCLE_STROKE_WIDTH = 2;
export const OPACITY = 0.4;

// Central coordinates for the diagram circles
export const DIAGRAM_CENTERS = {
    [IkigaiCategory.LOVE]: { cx: SVG_WIDTH / 2 - CIRCLE_RADIUS / 2.2, cy: SVG_HEIGHT / 2 - CIRCLE_RADIUS / 2.2 },
    [IkigaiCategory.GOOD_AT]: { cx: SVG_WIDTH / 2 + CIRCLE_RADIUS / 2.2, cy: SVG_HEIGHT / 2 - CIRCLE_RADIUS / 2.2 },
    [IkigaiCategory.WORLD_NEEDS]: { cx: SVG_WIDTH / 2 - CIRCLE_RADIUS / 2.2, cy: SVG_HEIGHT / 2 + CIRCLE_RADIUS / 2.2 },
    [IkigaiCategory.PAID_FOR]: { cx: SVG_WIDTH / 2 + CIRCLE_RADIUS / 2.2, cy: SVG_HEIGHT / 2 + CIRCLE_RADIUS / 2.2 },
};

// Approximate positions for diagram zone labels and item lists
const THREE_CAT_OFFSET_MULTIPLIER = 0.33; 

export const DIAGRAM_ZONE_TEXT_POSITIONS: Record<DiagramZoneType, { x: number; y: number }> = {
    [DiagramZoneType.IKIGAI]:    { x: SVG_WIDTH / 2,     y: SVG_HEIGHT / 2 },

    [DiagramZoneType.LOVE_GOOD_NEEDS]: { x: SVG_WIDTH / 2 - CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER, y: SVG_HEIGHT / 2 - CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER },
    [DiagramZoneType.LOVE_GOOD_PAID]:  { x: SVG_WIDTH / 2 + CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER, y: SVG_HEIGHT / 2 - CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER },
    [DiagramZoneType.LOVE_NEEDS_PAID]: { x: SVG_WIDTH / 2 - CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER, y: SVG_HEIGHT / 2 + CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER },
    [DiagramZoneType.GOOD_NEEDS_PAID]: { x: SVG_WIDTH / 2 + CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER, y: SVG_HEIGHT / 2 + CIRCLE_RADIUS * THREE_CAT_OFFSET_MULTIPLIER },

    [DiagramZoneType.PASSION]:   { x: SVG_WIDTH / 2,     y: SVG_HEIGHT * 0.32 }, 
    [DiagramZoneType.MISSION]:   { x: SVG_WIDTH * 0.32,  y: SVG_HEIGHT / 2 },    
    [DiagramZoneType.PROFESSION]:{ x: SVG_WIDTH * 0.68,  y: SVG_HEIGHT / 2 },    
    [DiagramZoneType.VOCATION]:  { x: SVG_WIDTH / 2,     y: SVG_HEIGHT * 0.68 }, 
    
    [DiagramZoneType.LOVE_ONLY]:        { x: SVG_WIDTH * 0.28, y: SVG_HEIGHT * 0.28 },
    [DiagramZoneType.GOOD_AT_ONLY]:     { x: SVG_WIDTH * 0.72, y: SVG_HEIGHT * 0.28 },
    [DiagramZoneType.WORLD_NEEDS_ONLY]: { x: SVG_WIDTH * 0.28, y: SVG_HEIGHT * 0.72 },
    [DiagramZoneType.PAID_FOR_ONLY]:    { x: SVG_WIDTH * 0.72, y: SVG_HEIGHT * 0.72 },
};
