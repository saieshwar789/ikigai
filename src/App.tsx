
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IkigaiCategory, IkigaiData, IkigaiItem, DiagramZoneType, DiagramDisplayItems } from './types';
import { INITIAL_IKIGAI_DATA } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
// import InstructionPanel from './components/InstructionPanel'; // InstructionPanel is not currently rendered
import InputSection from './components/InputSection';
import IkigaiDiagram from './components/IkigaiDiagram';
import HoverItemsBlock from './components/HoverItemsBlock';

interface HoveredZoneInfo {
  items: IkigaiItem[];
  x: number;
  y: number;
  colorClass: string;
}

const LOCAL_STORAGE_KEY = 'ikigaiExplorerData';

const App: React.FC = () => {
  const [ikigaiData, setIkigaiData] = useState<IkigaiData>(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    return INITIAL_IKIGAI_DATA;
  });
  const [hoveredZoneInfo, setHoveredZoneInfo] = useState<HoveredZoneInfo | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ikigaiData));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [ikigaiData]);


  const handleAddItem = useCallback((category: IkigaiCategory, text: string) => {
    const newItem: IkigaiItem = { id: uuidv4(), text, category };
    setIkigaiData((prevData) => ({
      ...prevData,
      [category]: [...prevData[category], newItem],
    }));
  }, []);

  const handleRemoveItem = useCallback((category: IkigaiCategory, itemId: string) => {
    setIkigaiData((prevData) => ({
      ...prevData,
      [category]: prevData[category].filter((item) => item.id !== itemId),
    }));
  }, []);

  const calculateIntersection = useCallback((data: IkigaiData, catsToIntersect: IkigaiCategory[]): IkigaiItem[] => {
    if (catsToIntersect.length === 0) return [];

    const firstCategoryItems = data[catsToIntersect[0]] || [];
    let commonTexts = new Set<string>(
      firstCategoryItems.map(item => item.text.trim().toLowerCase())
    );

    for (let i = 1; i < catsToIntersect.length; i++) {
      const currentCategoryItems = data[catsToIntersect[i]] || [];
      const currentCategoryItemTexts = new Set<string>(
        currentCategoryItems.map(item => item.text.trim().toLowerCase())
      );
      commonTexts = new Set([...commonTexts].filter(text => currentCategoryItemTexts.has(text)));
    }

    const resultItems: IkigaiItem[] = [];
    const addedTexts = new Set<string>();

    // Prioritize items from the first category in the intersection list for consistent ID/original category
    commonTexts.forEach(text => {
      if (addedTexts.has(text)) return; 
      // Find the first matching item to retain its original properties
      for (const cat of catsToIntersect) { // Check in order of catsToIntersect for consistency
        const foundItem = (data[cat] || []).find(item => item.text.trim().toLowerCase() === text);
        if (foundItem) {
          resultItems.push({ ...foundItem, id: uuidv4() }); // Generate new unique ID for display items
          addedTexts.add(text);
          break; 
        }
      }
    });
    return resultItems;
  }, []);


  const diagramDisplayItems = useMemo<DiagramDisplayItems>(() => {
    const result: DiagramDisplayItems = {
      [DiagramZoneType.IKIGAI]: [],
      [DiagramZoneType.LOVE_GOOD_NEEDS]: [],
      [DiagramZoneType.LOVE_GOOD_PAID]: [],
      [DiagramZoneType.LOVE_NEEDS_PAID]: [],
      [DiagramZoneType.GOOD_NEEDS_PAID]: [],
      [DiagramZoneType.PASSION]: [],
      [DiagramZoneType.MISSION]: [],
      [DiagramZoneType.VOCATION]: [],
      [DiagramZoneType.PROFESSION]: [],
      [DiagramZoneType.LOVE_ONLY]: [],
      [DiagramZoneType.GOOD_AT_ONLY]: [],
      [DiagramZoneType.WORLD_NEEDS_ONLY]: [],
      [DiagramZoneType.PAID_FOR_ONLY]: [],
    };
    const takenTexts = new Set<string>();

    const ikigaiItems = calculateIntersection(ikigaiData, [
      IkigaiCategory.LOVE, IkigaiCategory.GOOD_AT, IkigaiCategory.WORLD_NEEDS, IkigaiCategory.PAID_FOR,
    ]);
    result[DiagramZoneType.IKIGAI] = ikigaiItems;
    ikigaiItems.forEach(item => takenTexts.add(item.text.trim().toLowerCase()));

    const threeCategoryDefs: { zone: DiagramZoneType; cats: IkigaiCategory[] }[] = [
      { zone: DiagramZoneType.LOVE_GOOD_NEEDS, cats: [IkigaiCategory.LOVE, IkigaiCategory.GOOD_AT, IkigaiCategory.WORLD_NEEDS] },
      { zone: DiagramZoneType.LOVE_GOOD_PAID,  cats: [IkigaiCategory.LOVE, IkigaiCategory.GOOD_AT, IkigaiCategory.PAID_FOR] },
      { zone: DiagramZoneType.LOVE_NEEDS_PAID, cats: [IkigaiCategory.LOVE, IkigaiCategory.WORLD_NEEDS, IkigaiCategory.PAID_FOR] },
      { zone: DiagramZoneType.GOOD_NEEDS_PAID, cats: [IkigaiCategory.GOOD_AT, IkigaiCategory.WORLD_NEEDS, IkigaiCategory.PAID_FOR] },
    ];

    for (const def of threeCategoryDefs) {
      const items = calculateIntersection(ikigaiData, def.cats)
        .filter(item => !takenTexts.has(item.text.trim().toLowerCase()));
      result[def.zone] = items;
      items.forEach(item => takenTexts.add(item.text.trim().toLowerCase()));
    }

    const twoCategoryDefs: { zone: DiagramZoneType; cats: IkigaiCategory[] }[] = [
        { zone: DiagramZoneType.PASSION,   cats: [IkigaiCategory.LOVE, IkigaiCategory.GOOD_AT] },
        { zone: DiagramZoneType.MISSION,   cats: [IkigaiCategory.LOVE, IkigaiCategory.WORLD_NEEDS] },
        { zone: DiagramZoneType.PROFESSION,cats: [IkigaiCategory.GOOD_AT, IkigaiCategory.PAID_FOR] },
        { zone: DiagramZoneType.VOCATION,  cats: [IkigaiCategory.WORLD_NEEDS, IkigaiCategory.PAID_FOR] },
    ];
    
    for (const def of twoCategoryDefs) {
        const items = calculateIntersection(ikigaiData, def.cats)
            .filter(item => !takenTexts.has(item.text.trim().toLowerCase()));
        result[def.zone] = items;
        items.forEach(item => takenTexts.add(item.text.trim().toLowerCase()));
    }
    
    const categoryOnlyDefs: { zone: DiagramZoneType; cat: IkigaiCategory }[] = [
        { zone: DiagramZoneType.LOVE_ONLY, cat: IkigaiCategory.LOVE },
        { zone: DiagramZoneType.GOOD_AT_ONLY, cat: IkigaiCategory.GOOD_AT },
        { zone: DiagramZoneType.WORLD_NEEDS_ONLY, cat: IkigaiCategory.WORLD_NEEDS },
        { zone: DiagramZoneType.PAID_FOR_ONLY, cat: IkigaiCategory.PAID_FOR },
    ];

    for (const def of categoryOnlyDefs) {
        result[def.zone] = (ikigaiData[def.cat] || [])
            .filter(item => !takenTexts.has(item.text.trim().toLowerCase()));
    }
    
    return result;
  }, [ikigaiData, calculateIntersection]);

  const handleZoneHover = useCallback((info: HoveredZoneInfo | null) => {
    setHoveredZoneInfo(info);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* <InstructionPanel /> */} {/* Commented out as per previous request */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <InputSection
              ikigaiData={ikigaiData}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0 relative">
            <IkigaiDiagram 
              diagramDisplayItems={diagramDisplayItems}
              onZoneHover={handleZoneHover} 
            />
          </div>
        </div>
      </main>
      {hoveredZoneInfo && (
        <HoverItemsBlock
          items={hoveredZoneInfo.items}
          x={hoveredZoneInfo.x}
          y={hoveredZoneInfo.y}
          isVisible={!!hoveredZoneInfo}
          colorClass={hoveredZoneInfo.colorClass}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
