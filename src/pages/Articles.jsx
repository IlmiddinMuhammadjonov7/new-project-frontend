import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ArticleCard from "../components/ArticleCard";
import RecommendedCard from "../components/RecommendedCard";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://new-project-backend-production.up.railway.app/api/articles");
        setArticles(res.data);
      } catch (err) {
        console.error("Maqolalarni olishda xatolik:", err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <PageHeader title="Maqolalarim" />
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Maqolalar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Mobil uchun recommended */}
        {articles.length === 0 && (
          <div className="mt-6 sm:hidden flex flex-col gap-4">
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
          </div>
        )}
      </main>
    </>
  );
};

export default Articles;
