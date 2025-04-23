import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssignments, getAllLessons } from "./assignmentService";
import { Button } from "../../../components/Parts/Button2";
import PageHeader from "../PageHeader";

const AssignmentListPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await getAllAssignments();
      const lessonList = await getAllLessons();
      setAssignments(res);
      setLessons(lessonList);
    };
    load();
  }, []);

  const getLessonTitle = (id) => {
    const lesson = lessons.find((l) => l.id === id);
    return lesson ? lesson.title : "Noma'lum dars";
  };

  return (
    <div>
      <PageHeader
        title="Topshiriqlar"
        button={{
          label: "Topshiriq qo‘shish",
          onClick: () => navigate("/admin/assignments/new"),
        }}
      />
      <div className=" p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((a, index) => (
          <div
            key={a.id}
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/admin/assignments/${a.id}`)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 text-blue-700 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <h2 className="text-lg font-semibold">
                {getLessonTitle(a.lessonId)}
              </h2>
            </div>
            <p className="text-gray-600 line-clamp-2">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentListPage;
