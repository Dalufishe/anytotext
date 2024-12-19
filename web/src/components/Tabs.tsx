import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("en");

  const tabs: Tab[] = [
    { id: "zh-hans", label: "简体中文" },
    { id: "zh-hant", label: "繁體中文" },
    { id: "en", label: "English" },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs 列 */}
      <div className="flex border-gray-300 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 mx-1 text-center text-sm font-medium rounded-full border transition-colors duration-200 
                ${
              activeTab === tab.id
                ? "bg-gray-200 text-gray-900 border-gray-400"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Tabs;
