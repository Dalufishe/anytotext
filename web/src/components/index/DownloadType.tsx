import React, { useState } from 'react';
import Button from './Button';

type Tab = {
  label: string;
  content: string;
};

interface DownloadTypeProps {
  tabs: Tab[];
}

const DownloadType: React.FC<DownloadTypeProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsOpen(false); // Close dropdown when a tab is selected
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-black py-2 px-4 rounded-md border-2 focus:outline-none"
      >
        {tabs[activeTab].label}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="w-full origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${
                  index === activeTab ? 'bg-blue-100' : ''
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadType;
