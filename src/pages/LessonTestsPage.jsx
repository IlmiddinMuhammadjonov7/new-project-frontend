import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function LessonTestsPage() {
  const { lessonId } = useParams();
  const [tests, setTests] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/lessons/${lessonId}`).then((res) => {
      setLessonTitle(res.data.title);
    });

    axios.get(`/tests?lessonId=${lessonId}`).then((res) => {
      setTests(res.data);
      const totalSeconds = res.data.length * 2 * 60;
      setTimeLeft(totalSeconds);
      setTotalTime(totalSeconds);
    });
  }, [lessonId]);

  useEffect(() => {
    if (timeLeft <= 0 && tests.length > 0 && !results) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, tests, results]);

  const handleSelect = (testId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [testId]: optionIndex }));
  };

  const handleSubmit = () => {
    const resultDetails = tests.map((test) => {
      const selectedIndex = selectedAnswers[test.id];
      const selectedOption = test.options[selectedIndex];
      const isCorrect = selectedOption === test.correctAnswer;

      return {
        id: test.id,
        question: test.question,
        selectedOption,
        correctAnswer: test.correctAnswer,
        isCorrect,
        options: test.options,
      };
    });

    const correctCount = resultDetails.filter((r) => r.isCorrect).length;
    const score =
      tests.length > 0 ? Math.round((correctCount / tests.length) * 100) : 0;

    setResults({
      details: resultDetails,
      correctCount,
      total: tests.length,
      score,
      timeSpent: totalTime - timeLeft,
    });

    setIsModalOpen(true);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-6 my-4">
        <div className="flex items-center space-x-3 border-b pb-4">
          <ArrowLeftOutlined
            className="text-xl text-gray-600 cursor-pointer hover:text-black transition"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-500">
            {lessonTitle}
          </h2>
        </div>

        {tests.map((test, idx) => (
          <div
            key={test.id}
            className="p-4 rounded-xl space-y-3 bg-white shadow border border-gray-200"
          >
            <p className="font-semibold text-base sm:text-lg text-gray-800">
              {idx + 1}. {test.question}
            </p>
            <div className="space-y-2">
              {test.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(test.id, i)}
                  className={`w-full text-left p-3 rounded-xl transition shadow-sm border text-sm font-medium ${
                    selectedAnswers[test.id] === i
                      ? "bg-blue-500 text-white"
                      : "bg-gray-50 text-gray-800 border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
          disabled={Object.keys(selectedAnswers).length !== tests.length}
        >
          Testni yakunlash
        </button>
      </div>

      {/* Info Panel */}
      <div className="bg-gray-50 p-4 rounded-xl shadow space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">
            Ishlangan testlar
          </h3>
          <span className="text-gray-600 font-medium text-base sm:text-lg">
            ({Object.keys(selectedAnswers).length}/{tests.length})
          </span>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {tests.map((t, idx) => (
            <div
              key={t.id}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ${
                selectedAnswers[t.id] !== undefined
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        <div className="text-base text-gray-700 space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base sm:text-lg">
              Qolgan vaqt:
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-blue-700">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={null}
        width={700}
      >
        {results && (
          <div className="p-4 sm:p-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              {lessonTitle} – Test natijalari
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border rounded-xl p-4 text-center text-sm sm:text-base">
              <div>
                <p className="text-gray-500">Sarflangan vaqt</p>
                <p className="text-blue-700 font-semibold text-lg">
                  {formatTime(results.timeSpent)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">To‘g‘ri javoblar</p>
                <p className="text-green-600 font-semibold text-lg">
                  {results.correctCount} / {results.total}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Natija %</p>
                <p className="text-blue-600 font-semibold text-lg">
                  {isNaN(results.score) ? "0%" : `${results.score}%`}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Ball</p>
                <p className="text-yellow-500 font-semibold text-lg">
                  {results.correctCount > 0 ? 1 : 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-xl p-4">
                <p className="mb-2 font-medium">Xatolar</p>
                <div className="flex flex-wrap gap-2">
                  {results.details
                    .map((res, idx) => ({ ...res, number: idx + 1 }))
                    .filter((r) => !r.isCorrect)
                    .map((r) => (
                      <span
                        key={r.number}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium"
                      >
                        {r.number}
                      </span>
                    ))}
                </div>
              </div>
              <div className="border rounded-xl p-4">
                <p className="mb-2 font-medium">To‘g‘ri javoblar</p>
                <div className="flex flex-wrap gap-2">
                  {results.details
                    .map((res, idx) => ({ ...res, number: idx + 1 }))
                    .filter((r) => r.isCorrect)
                    .map((r) => (
                      <span
                        key={r.number}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg font-medium"
                      >
                        {r.number}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base"
              >
                Testdan chiqish
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
