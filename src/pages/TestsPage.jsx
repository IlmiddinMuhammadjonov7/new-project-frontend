import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import PageHeader from "../components/PageHeader";

export default function TestsPage() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/tests/summary").then((res) => {
      setLessons(res.data);
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <PageHeader title="Testlar" />

      <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.lessonId}
            onClick={() => navigate(`/dashboard/tests/${lesson.lessonId}`)}
            className="cursor-pointer flex flex-col gap-3 border border-gray-200 bg-white hover:bg-blue-50 transition rounded-xl shadow-sm p-4"
          >
            {/* Top: Circle Number */}
            <div className="w-9 h-9 bg-indigo-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>

            {/* Middle: Lesson Title */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 break-words">
              {lesson.title}
            </h3>

            {/* Bottom: Test count badge */}
            <div>
              <span className="inline-block bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {lesson.testCount} ta test
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
