import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Spin } from "antd";
import axios from "../utils/axios";
import TestResultsModal from "./TestResultsModal";

export default function TestSubmission() {
  const { id: lessonId } = useParams();
  const [tests, setTests] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [resultOpen, setResultOpen] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/tests?lessonId=${lessonId}`).then((res) => {
      setTests(res.data);
      const total = res.data.reduce((sum, t) => sum + (t.timeLimit || 60), 0);
      setTimeLeft(total);
      setLoading(false);
    });
  }, [lessonId]);

  useEffect(() => {
    if (timeLeft === 0 && tests.length > 0) handleFinalSubmit();
    const interval = setInterval(() => setTimeLeft((t) => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSubmitAnswer = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[current] = selected;
    setUserAnswers(updatedAnswers);

    if (current + 1 < tests.length) {
      setSelected(null);
      setCurrent(current + 1);
    } else {
      handleFinalSubmit(updatedAnswers);
    }
  };

  const handleFinalSubmit = (answers = userAnswers) => {
    const results = tests.map((test, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === test.correctAnswer;
      return {
        question: test.question,
        options: test.options,
        correctAnswer: test.correctAnswer,
        selectedAnswer: userAnswer,
        isCorrect,
      };
    });

    const correctCount = results.filter((r) => r.isCorrect).length;
    const score = Math.round((correctCount / results.length) * 100);

    setFinalResult({
      score,
      correctCount,
      total: results.length,
      detailed: results,
    });

    setResultOpen(true);
  };

  if (loading) return <Spin className="mt-10" />;
  if (!tests.length) return <div>Test topilmadi.</div>;

  const test = tests[current];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{test.question}</h2>
        <span className="text-gray-600">
          ⏳ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="space-y-2">
        {test.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-3 border rounded-xl ${
              selected === idx ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <TestResultsModal
        isOpen={resultOpen}
        onClose={() => navigate("/dashboard/tests")}
        results={finalResult}
      />
    </div>
  );
}
