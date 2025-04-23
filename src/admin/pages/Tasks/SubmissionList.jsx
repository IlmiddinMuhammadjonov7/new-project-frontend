import React from "react";

const SubmissionList = ({ submissions }) => {
  return (
    <div className="space-y-4">
      {submissions.map((s) => (
        <div
          key={s.id}
          className="border rounded-2xl p-4 shadow-md bg-white"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-gray-800 font-semibold">
                {s.user?.fullName || "Noma'lum foydalanuvchi"}
              </p>
              <p className="text-gray-600 text-sm mt-1">{s.description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <a
              href={s.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Faylni ko‘rish
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionList;
