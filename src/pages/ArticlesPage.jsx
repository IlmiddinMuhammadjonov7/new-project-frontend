import React, { useEffect, useState } from "react";
import RecommendedCard from "../components/RecommendedCard";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Maqolani olishda xatolik:", err);
      }
    };

    const fetchAllArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/articles`);
        setArticles(res.data);
      } catch (err) {
        console.error("Barcha maqolalarni olishda xatolik:", err);
      }
    };

    fetchArticle();
    fetchAllArticles();
  }, [id]);

  if (!article) {
    return (
      <p className="text-center mt-10">Maqola topilmadi yoki yuklanmoqda...</p>
    );
  }

  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const recommended = articles.filter((a) => a.id !== article.id).slice(0, 5);

  return (
    <>
      <main className="flex pt-8 flex-col lg:flex-row gap-6 px-4 lg:px-10 py-5">
        <div className="flex-1 max-w-full lg:max-w-[740px] mx-auto">
          <div className="flex items-center gap-6 mb-10 border-b pb-4">
            <ArrowLeftOutlined
              className="text-xl text-gray-600 cursor-pointer hover:text-black transition"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl md:text-2xl font-bold">
              {article.title}
            </h1>
          </div>
          <img
            src={article.imageUrl || "/default.png"}
            alt="Article"
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          <p className="text-base md:text-lg text-gray-800 whitespace-pre-line">
            {article.content}
          </p>

          {/* Prev / Next Buttons */}
          <div className="flex justify-between mt-8">
            <button
              disabled={!prevArticle}
              className={`px-6 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm font-medium text-blue-900 ${
                !prevArticle ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                prevArticle && navigate(`/dashboard/articles/${prevArticle.id}`)
              }
            >
              Oldingi
            </button>
            <button
              disabled={!nextArticle}
              className={`px-6 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm font-medium text-blue-900 ${
                !nextArticle ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                nextArticle && navigate(`/dashboard/articles/${nextArticle.id}`)
              }
            >
              Keyingisi
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] bg-white rounded-lg shadow-md">
          <div className="border-b px-4 py-3">
            <h2 className="text-lg font-semibold">
              Tavsiya etiladigan maqolalar
            </h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {recommended.length > 0 ? (
              recommended.map((rec) => (
                <RecommendedCard key={rec.id} article={rec} />
              ))
            ) : (
              <RecommendedCard article={article} />
            )}
          </div>
        </aside>
      </main>
    </>
  );
};

export default ArticlePage;
