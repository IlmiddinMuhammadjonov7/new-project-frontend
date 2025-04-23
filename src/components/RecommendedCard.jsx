import React from 'react'
import { FaRegCalendar } from "react-icons/fa";
import image from "../assets/article-image.png"; // fallback image
import { useNavigate } from 'react-router-dom';

function RecommendedCard({ article }) {
  const navigate = useNavigate();

  const {
    id,
    title = "Maqola sarlavhasi",
    description = "",
    created_at,
    image_url,
  } = article || {};

  return (
    <section
      onClick={() => navigate(`/dashboard/articles/${id}`)}
      className='p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer'
    >
      <div className='flex gap-2 sm:gap-3 items-start'>
        <div className='flex-shrink-0 overflow-hidden w-14 h-14 sm:w-20 sm:h-20 rounded-lg'>
          <img
            src={image_url || image}
            alt="Article"
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex flex-col justify-between gap-1 text-sm sm:text-base w-full'>
          <p className='font-semibold line-clamp-1'>{title}</p>

          <p className='text-gray-600 line-clamp-2 text-xs sm:text-sm'>
            {description || "Maqola tavsifi mavjud emas."}
          </p>

          <div className='flex items-center gap-1 text-gray-500 text-xs sm:text-sm mt-1'>
            <FaRegCalendar className='text-blue-500' />
            <span>{created_at ? new Date(created_at).toLocaleDateString() : "Sana mavjud emas"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendedCard;
