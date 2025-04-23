import React from 'react';
import { FaRegCalendar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const date = new Date(article.createdAt).toLocaleDateString();

  return (
    <section className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Rasm */}
      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden p-4">
        <img
          src={article.imageUrl || "/default.png"}
          alt="Article image"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Ma'lumotlar */}
      <div className="flex flex-col gap-4 p-4 flex-1">
        <p className="font-semibold text-lg text-gray-800">{article.title}</p>

        <p className="flex items-center gap-2 text-sm text-gray-500">
          <FaRegCalendar className="text-blue-600" />
          {date}
        </p>

        <p className="text-sm text-gray-600">
          {article.content.slice(0, 100)}...
        </p>

        <div className="mt-auto">
          <button
            className="w-full bg-[#3857AF] cursor-pointer text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#2f4992] transition"
            onClick={() => navigate(`${article.id}`)}
          >
            Maqolani o'qish
          </button>
        </div>
      </div>
    </section>
  );
}

export default ArticleCard;
