import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function AdminArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchArticle = async () => {
        try {
          const token = localStorage.getItem("adminToken");
          const res = await axios.get(
            `http://new-project-backend-production.up.railway.app/api/articles/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const article = res.data;
          setTitle(article.title);
          setContent(article.content);
          setImageUrl(article.imageUrl);
        } catch (err) {
          console.error("Maqolani olishda xatolik:", err);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("adminToken");
    const articleData = { title, content, imageUrl };

    try {
      if (isEdit) {
        await axios.put(
          `http://new-project-backend-production.up.railway.app/api/articles/${id}`,
          articleData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post("http://new-project-backend-production.up.railway.app/api/articles", articleData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/admin/maqolalarim");
    } catch (err) {
      console.error("Saqlashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f8ff] min-h-screen p-6">
      <div className="flex items-center gap-2">
        <div className="space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-xl font-bold">
        {isEdit ? "Maqolani tahrirlash" : "Yangi maqola qo‘shish"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
      >
        {/* Maqola sarlavhasi va matni */}
        <div className="flex flex-col gap-4">
          <label className="font-medium text-gray-700">Maqola nomi</label>
          <input
            type="text"
            placeholder="Maqola nomi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-3 rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="font-medium text-gray-700">Maqolani yozing</label>
          <textarea
            placeholder="Maqolani yozing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
            className="p-4 rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rasm yuklash */}
        <div className="flex flex-col gap-4">
          <label className="font-medium text-gray-700">Rasm yuklash</label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white shadow-sm hover:bg-blue-50 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <svg
                  className="w-10 h-10 mb-3 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  {imageLoading ? (
                    <span className="text-blue-600 font-medium">
                      Rasm yuklanmoqda...
                    </span>
                  ) : imageUrl ? (
                    <>
                      <span className="text-green-600 font-medium">
                        ✅ Rasm yuklandi
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-blue-600">
                      Yuklash uchun bosing
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  SVG, PNG, JPG yoki GIF (maksimal 800×400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageLoading(true);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageUrl(reader.result);
                      setImageLoading(false);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          {/* Status yoki Preview */}
        </div>

        {/* Submit tugmasi */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Saqlanmoqda..."
              : isEdit
              ? "Maqolani yangilash"
              : "Maqolani qo‘shish"}
          </button>
        </div>
      </form>
    </div>
  );
}
