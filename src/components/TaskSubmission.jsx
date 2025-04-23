import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssignments,
  fetchLesson,
  submitAssignment,
} from "../services/assignmentService";
import SuccessModal from "./ModalTekshirish"; // to'g'ri yo'l bo'lsin

const TaskSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [answer, setAnswer] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const assignments = await fetchAssignments();
      const current = assignments.find((a) => a.id === parseInt(id));
      setAssignment(current);

      if (current) {
        const lessonData = await fetchLesson(current.lessonId);
        setLesson(lessonData);

        const userSubmission = current.userSubmissions?.[0];
        if (userSubmission) {
          setAnswer(userSubmission.description || "");
          setFileUrl(userSubmission.fileUrl || "");
        }
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async () => {
    if (!fileUrl.trim()) {
      message.warning("Fayl havolasini kiriting.");
      return;
    }

    try {
      await submitAssignment(id, { description: answer, fileUrl });
      setIsSuccessModalOpen(true);
    } catch (err) {
      message.error("Yuborishda xatolik yuz berdi");
    }
  };

  if (!assignment || !lesson) return <div>Yuklanmoqda...</div>;

  return (
    <div className="p-8 rounded-2xl w-full m-5 mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-3">
          <ArrowLeftOutlined
            className="text-xl text-gray-600 cursor-pointer hover:text-black transition"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-xl font-semibold text-gray-800">
            {lesson.title}
          </h2>
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="rounded-[50px] px-6 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition !bg-[#13265C] !border-[#13265C] !text-white"
        >
          Topshirish <CheckOutlined />
        </Button>
      </div>

      <div className="mt-6 text-gray-700 text-base space-y-3">
        <p className="font-medium">Topshiriq tavsifi:</p>
        <p>{assignment.description}</p>
        {assignment.fileUrls?.map((url, idx) => (
          <div key={idx}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Faylni ko‘rish
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 shadow-lg p-5">
          <p className="text-sm font-medium text-gray-800 mb-2">
            Javob kiriting
          </p>
          <Input.TextArea
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Javobingizni kiriting..."
            className="resize-none rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex-1 shadow-lg p-5">
          <span className="text-sm font-medium text-white border px-6 mb-2 bg-[#13265C] p-2 rounded-[50px] inline-block">
            Fayl havolasi
          </span>
          <Input
            placeholder="https://..."
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="rounded-lg shadow-sm"
          />
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate("/dashboard/tasks");
        }}
      />
    </div>
  );
};

export default TaskSubmission;
