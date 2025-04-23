import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Pencil, Trash } from "lucide-react";

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // qaysi maqola o‘chiriladi
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
    } catch (err) {
      console.error("Maqolalarni olishda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:8080/api/articles/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setDeleteId(null);
      fetchArticles();
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  return (
    <div>
      <PageHeader
        title="Maqolalarim"
        button={{
          label: "Maqola qo‘shish",
          onClick: () => navigate("/admin/maqolalarim/yangi"),
        }}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-52 w-full object-cover rounded-lg"
            />
            <h2 className="text-base font-semibold">{article.title}</h2>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <CalendarDays size={16} />
              <span>
                {new Date(article.createdAt).toLocaleDateString("uz-UZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={() =>
                  navigate(`/admin/maqolalarim/edit/${article.id}`)
                }
                className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-2 rounded-md hover:bg-blue-200 text-sm font-medium"
              >
                Tahrirlash <Pencil size={16} />
              </button>
              <button
                onClick={() => confirmDelete(article.id)}
                className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-md hover:bg-red-200 text-sm font-medium"
              >
                O‘chirish <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/30 bg-opacity-30 flex items-center justify-center"
          onClick={() => {
            setShowModal(false);
            setDeleteId(null);
          }}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            onClick={(e) => e.stopPropagation()} // modal o'zini bosganda event to'xtaydi
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Rostdan ham o‘chirmoqchimisiz?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
              >
                Ha, o‘chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
