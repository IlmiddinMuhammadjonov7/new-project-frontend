import { Modal } from "antd";

export default function TestResultsModal({ isOpen, onClose, results }) {
  if (!results) return null;

  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose} okText="Yopish" cancelButtonProps={{ style: { display: 'none' } }}>
      <h2 className="text-lg font-semibold mb-4">Natijalar</h2>
      <p className="mb-2">To‘g‘ri javoblar: {results.correctCount} / {results.total}</p>
      <p className="mb-4">Ball: {results.score} %</p>

      <div className="space-y-4 max-h-96 overflow-auto">
        {results.detailed.map((res, idx) => (
          <div key={idx} className="p-3 border rounded-xl bg-gray-50">
            <p className="font-medium">{idx + 1}. {res.question}</p>
            <ul className="pl-4 mt-2 space-y-1">
              {res.options.map((opt, i) => {
                const isUser = i === res.selectedAnswer;
                const isCorrect = i === res.correctAnswer;
                return (
                  <li
                    key={i}
                    className={`p-1 rounded ${
                      isCorrect ? "bg-green-100" : isUser ? "bg-red-100" : ""
                    }`}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  );
}
