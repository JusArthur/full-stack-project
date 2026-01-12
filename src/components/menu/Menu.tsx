import React from 'react';
import type { MenuItem, MenuSection } from './types/menu'; 
import { menuData } from './data/menuData';

const Menu: React.FC = () => {

  const menuSection: MenuSection = {
    id: 1,
    title: "Daily Specials",
    items: menuData
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10 border border-gray-100">
      {/* Section Header */}
      <div className="border-b-2 border-amber-500 pb-2 mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 tracking-tight">
          {menuSection.title}
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
          Freshly Prepared
        </p>
      </div>

      {/* Menu Items List */}
      <div className="space-y-8">
        {menuSection.items.map((item: MenuItem) => (
          <div 
            key={item.id} 
            className="group flex flex-col md:flex-row md:justify-between md:items-end border-b border-dashed border-gray-200 pb-4 transition-all hover:bg-slate-50 p-2 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>
                {/* Visual Connector for menu feel */}
                <div className="hidden md:block flex-1 border-b border-gray-200 border-dotted mx-2 mb-1"></div>
              </div>
              <p className="text-gray-600 italic mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-2 md:mt-0 md:ml-4 text-right">
              <span className="text-lg font-mono font-bold text-gray-800">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;