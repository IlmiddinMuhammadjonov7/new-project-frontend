import React, { useState } from "react";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children);
  const labels = tabs.map((tab) => tab.props.label);

  return (
    <div className="w-full">
      <div className="flex gap-4 border-b mb-4">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition-all border-b-2 ${
              activeTab === index
                ? "border-[#13265C] text-[#13265C]"
                : "border-transparent text-gray-500 hover:text-[#13265C]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div>{tabs[activeTab]}</div>
    </div>
  );
};

export const TabPanel = ({ children }) => {
  return <div className="p-4 bg-white rounded-lg shadow">{children}</div>;
};
