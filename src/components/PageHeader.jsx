import React from "react";

export default function PageHeader({ title }) {
  return (
    <div className="bg-white px-16 py-4 border-b-2 border-[#E7E7E7] shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
}
