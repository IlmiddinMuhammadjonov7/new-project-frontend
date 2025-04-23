import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { Card } from "../../../components/Parts/card";
import PageHeader from "../PageHeader";
import {
  getTestSummary,
  getTestsByLesson,
  deleteTest,
} from "../../../services/testService";

export default function TestListPage() {
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [tests, setTests] = useState([]);
  const [deletingTestId, setDeletingTestId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTestSummary().then(setLessons);
  }, []);

  useEffect(() => {
    if (selectedLessonId) {
      getTestsByLesson(selectedLessonId).then(setTests);
    }
  }, [selectedLessonId]);

  const handleDeleteConfirm = async () => {
    if (deletingTestId) {
      await deleteTest(deletingTestId);
      const updated = await getTestsByLesson(selectedLessonId);
      setTests(updated);
      setDeletingTestId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Testlarni boshqarish"
        button={{
          label: "Test qo'shish",
          onClick: () =>
            navigate(`/admin/tests/create?lessonId=${selectedLessonId}`),
        }}
      />

      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <select
            className="border w-full border-gray-300 rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedLessonId(e.target.value)}
            value={selectedLessonId || ""}
          >
            <option value="">Dars mavzusini tanlang</option>
            {lessons.map((lesson) => (
              <option
                style={{ padding: "5px" }}
                key={lesson.lessonId}
                value={lesson.lessonId}
              >
                {lesson.title} ({lesson.testCount} ta test)
              </option>
            ))}
          </select>
        </div>

        {tests.length > 0 && (
          <div className="grid gap-4">
            {tests.map((test, i) => (
              <Card key={test.id}>
                <div className="flex flex-col gap-4 p-6 transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-2xl bg-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 font-bold w-9 h-9 rounded-lg flex items-center justify-center shadow-inner">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-800 mb-2">
                        {test.question}
                      </p>
                      <p className="text-sm text-gray-500">
                        🕒 {test.timeLimit+60} sekund | {test.options.length} ta
                        variant
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/admin/tests/edit/${test.id}`)}
                      className="bg-green-500 text-white border-none hover:bg-green-600 font-semibold shadow-sm"
                    >
                      ✏️ Tahrirlash
                    </Button>
                    <Button
                      danger
                      className="bg-red-500 text-white border-none hover:bg-red-600 font-semibold shadow-sm"
                      onClick={() => setDeletingTestId(test.id)}
                    >
                      🗑️ O‘chirish
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        title="O‘chirishni tasdiqlang"
        open={!!deletingTestId}
        onOk={handleDeleteConfirm}
        onCancel={() => setDeletingTestId(null)}
        okText="Ha, o‘chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ danger: true }}
      >
        <p>Haqiqatan ham ushbu testni o‘chirmoqchimisiz?</p>
      </Modal>
    </div>
  );
}
