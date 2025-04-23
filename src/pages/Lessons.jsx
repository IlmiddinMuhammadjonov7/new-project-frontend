import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://new-project-backend-production.up.railway.app/api/lessons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader title="📚 Darsliklar" />

      <div className="p-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            onClick={() => navigate(`/dashboard/courses/${lesson.id}`)}
            className="cursor-pointer bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 hover:border-blue-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="min-w-[36px] h-9 bg-blue-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-blue-700 line-clamp-2">
                {lesson.title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm line-clamp-3">
              {lesson.description || "Izoh mavjud emas"}
            </p>

            <div className="mt-5 flex items-center gap-2 text-gray-500 text-sm">
              <FaCalendarAlt className="text-blue-500" />
              <span>
                {new Date(lesson.createdAt).toLocaleDateString("uz-UZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Hech qanday darslik topilmadi.
        </p>
      )}
    </div>
  );
};

export default Lessons;
