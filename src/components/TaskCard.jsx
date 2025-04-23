import React from "react";

export const TaskCard = ({ number, indes, title }) => {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full max-w-sm hover:shadow-md transition">
      {/* Number badge */}
      <div className="min-w-[36px] h-9 bg-indigo-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold">
        {indes+1}
      </div>

      {/* Text and status */}
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base font-semibold text-gray-900">
          {number}-Topshiriq
        </h3>
        <p className="text-sm text-gray-600">
          {title}
        </p>
      </div>

      {/* Status badge */}
      <div className="ml-auto">
        <span className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300 font-medium px-3 py-1 rounded-full">
          Mavjud
        </span>
      </div>
    </div>
  );
};
