
export enum IkigaiCategory {
  LOVE = 'What you LOVE',
  GOOD_AT = 'What you are GOOD AT',
  WORLD_NEEDS = 'What the world NEEDS',
  PAID_FOR = 'What you can be PAID FOR',
}

export interface IkigaiItem {
  id: string;
  text: string;
  category: IkigaiCategory; // The original category it was added to
}

export interface IkigaiData {
  [IkigaiCategory.LOVE]: IkigaiItem[];
  [IkigaiCategory.GOOD_AT]: IkigaiItem[];
  [IkigaiCategory.WORLD_NEEDS]: IkigaiItem[];
  [IkigaiCategory.PAID_FOR]: IkigaiItem[];
}

export enum IkigaiIntersectionType {
  PASSION = 'Passion', // LOVE + GOOD_AT
  MISSION = 'Mission', // LOVE + WORLD_NEEDS
  VOCATION = 'Vocation', // WORLD_NEEDS + PAID_FOR
  PROFESSION = 'Profession', // GOOD_AT + PAID_FOR
  IKIGAI = 'IKIGAI' // All four
}

export enum DiagramZoneType {
  // Intersections - matching IkigaiIntersectionType for consistency
  PASSION = 'Passion',
  MISSION = 'Mission',
  VOCATION = 'Vocation',
  PROFESSION = 'Profession',
  IKIGAI = 'IKIGAI',

  // Three-Category Intersections
  LOVE_GOOD_NEEDS = 'Love + Good At + Needs',
  LOVE_GOOD_PAID = 'Love + Good At + Paid',
  LOVE_NEEDS_PAID = 'Love + Needs + Paid',
  GOOD_NEEDS_PAID = 'Good At + Needs + Paid',

  // Unique Category Zones
  LOVE_ONLY = 'Love Only',
  GOOD_AT_ONLY = 'Good At Only',
  WORLD_NEEDS_ONLY = 'World Needs Only',
  PAID_FOR_ONLY = 'Paid For Only',
}

// Used to pass calculated items (intersections and unique) to the diagram
export interface DiagramDisplayItems {
  [DiagramZoneType.PASSION]: IkigaiItem[];
  [DiagramZoneType.MISSION]: IkigaiItem[];
  [DiagramZoneType.VOCATION]: IkigaiItem[];
  [DiagramZoneType.PROFESSION]: IkigaiItem[];
  [DiagramZoneType.IKIGAI]: IkigaiItem[];

  [DiagramZoneType.LOVE_GOOD_NEEDS]: IkigaiItem[];
  [DiagramZoneType.LOVE_GOOD_PAID]: IkigaiItem[];
  [DiagramZoneType.LOVE_NEEDS_PAID]: IkigaiItem[];
  [DiagramZoneType.GOOD_NEEDS_PAID]: IkigaiItem[];

  [DiagramZoneType.LOVE_ONLY]: IkigaiItem[];
  [DiagramZoneType.GOOD_AT_ONLY]: IkigaiItem[];
  [DiagramZoneType.WORLD_NEEDS_ONLY]: IkigaiItem[];
  [DiagramZoneType.PAID_FOR_ONLY]: IkigaiItem[];
}
