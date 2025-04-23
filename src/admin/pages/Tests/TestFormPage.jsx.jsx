import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createTest,
  getTestById,
  updateTest,
} from "../../../services/testService";
import { Input, Button, Select, message } from "antd";
import {
  CheckCircleFilled,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

const defaultState = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: null,
  lessonId: null,
  timeLimit: 30,
};

export default function TestFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const lessonIdFromQuery = query.get("lessonId");

  const [form, setForm] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);

  // Darslarni olish
  // useEffect(() => {
  //   getAllLessons().then(setLessons);
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://new-project-backend-production.up.railway.app/api/lessons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // Testni olish
  useEffect(() => {
    if (isEdit && id) {
      getTestById(Number(id)).then((data) => {
        setForm({
          question: data.question,
          options: data.options,
          correctAnswer: data.options.indexOf(data.correctAnswer),
          lessonId: data.lessonId,
          timeLimit: data.timeLimit || 30,
        });
      });
    } else {
      setForm((prev) => ({
        ...prev,
        lessonId: lessonIdFromQuery ? Number(lessonIdFromQuery) : null,
        timeLimit: 30,
      }));
    }
  }, [id, lessonIdFromQuery]);

  const handleChangeOption = (value, index) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async () => {
    if (
      !form.lessonId ||
      !form.question ||
      form.options.some((opt) => !opt.trim()) ||
      form.correctAnswer === null
    ) {
      message.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const payload = {
      lessonId: Number(form.lessonId),
      question: form.question,
      options: form.options,
      correctAnswer: form.options[form.correctAnswer],
      timeLimit: Number(form.timeLimit),
    };

    try {
      setLoading(true);
      if (isEdit) {
        await updateTest(Number(id), payload);
        message.success("Test muvaffaqiyatli yangilandi");
      } else {
        await createTest(payload);
        message.success("Yangi test yaratildi");
      }
      navigate("/admin/testlar");
    } catch (err) {
      console.error(err);
      message.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {isEdit ? "Testni tahrirlash" : "Yangi test yaratish"}
        </h2>
      </div>
      <label className="block font-medium mb-1">Darsni tanlang</label>
      <Select
        className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Darsni tanlang"
        style={{height: "40px"}}
        value={form.lessonId}
        onChange={(val) => setForm({ ...form, lessonId: val })}
      >
        {lessons.map((lesson) => (
          <Select.Option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </Select.Option>
        ))}
      </Select>

      <label className="block font-medium mt-4 mb-1">Savolni kiriting</label>
      <textarea
        className="w-full p-3 border border-gray-300 bg-white rounded-xl resize-none mb-4"
        rows={4}
        placeholder="Savol kiriting"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
      />

      <label className="block font-medium mb-2">Javob variantlari</label>
      <div className="space-y-3 mb-4">
        {form.options.map((opt, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200"
          >
            <div
              onClick={() => setForm({ ...form, correctAnswer: idx })}
              className={clsx(
                "w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center",
                form.correctAnswer === idx
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-400"
              )}
            >
              {form.correctAnswer === idx && (
                <CheckCircleFilled className="text-white text-[10px]" />
              )}
            </div>
            <Input
              className="flex-1 border-none focus:shadow-none"
              value={opt}
              placeholder={`Javob ${idx + 1}`}
              onChange={(e) => handleChangeOption(e.target.value, idx)}
            />
            <MenuOutlined className="text-gray-400 cursor-move" />
            <DeleteOutlined
              className="text-red-400 cursor-pointer hover:text-red-600"
              style={{color:"red"}}
              onClick={() => {
                const newOpts = form.options.filter((_, i) => i !== idx);
                setForm({
                  ...form,
                  options: newOpts,
                  correctAnswer:
                    form.correctAnswer === idx
                      ? null
                      : form.correctAnswer > idx
                      ? form.correctAnswer - 1
                      : form.correctAnswer,
                });
              }}
            />
          </div>
        ))}
        {form.options.length < 6 && (
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({ ...prev, options: [...prev.options, ""] }))
            }
            className="text-blue-600 hover:underline text-sm"
          >
            + Yana variant qo‘shish
          </button>
        )}
      </div>

      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={handleSubmit}
        className="w-full rounded-full"
      >
        {isEdit ? "Saqlash" : "Kiritish"}
      </Button>
    </div>
  );
}
