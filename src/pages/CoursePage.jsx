import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import Rasm from "../assets/homeuser.png";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("theory");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/lessons/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ma'lumot topilmadi");
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch((err) => console.error("Xatolik:", err));
  }, [courseId]);

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Fayl yuklanmadi:", error);
    }
  };

  if (!course) return <p className="p-6">Yuklanmoqda...</p>;

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Asosiy kontent */}
      <div className="lg:col-span-2 order-2 lg:order-1">
        <p className="text-sm text-gray-500 mb-1">
          Darsliklar / {course.title}
        </p>
        <div>
        </div>
        <div className="flex items-center space-x-4 border-b pb-4">
          <ArrowLeftOutlined
            className="text-xl text-gray-600 cursor-pointer hover:text-black transition"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-2xl md:text-3xl font-bold">
            {course.title}
          </h2>
        </div>

        {/* Video */}
        <div className="w-full h-52 sm:h-64 md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden my-4">
          <ReactPlayer
            url={course.video_url}
            controls
            width="100%"
            height="100%"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "theory"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("theory")}
          >
            Nazariy
          </button>

          {course.materials?.length > 0 && (
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "files"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveTab("files")}
            >
              Biriktirilgan fayl
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {activeTab === "theory" && <p>{course.description}</p>}

          {activeTab === "files" && (
            <div className="space-y-3">
              {course.materials.map((file, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-100 hover:bg-gray-200 p-3 rounded"
                >
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium underline mb-2 sm:mb-0"
                  >
                    {file.name}
                  </a>
                  <button
                    onClick={() => handleDownload(file.url, file.name)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm w-fit"
                  >
                    <DownloadOutlined />
                    Yuklab olish
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* O‘ng panel (sidebar) */}
      <div className="order-1 lg:order-2">
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <h2 className="font-semibold text-lg mb-3">Kurs tarkibi</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-medium">Kirish qismi</span>
              <span>2 min</span>
            </div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-gray-400"
              >
                <span className="flex items-center gap-2">
                  <FaLock className="text-xs" />
                  Lorem Ipsum
                </span>
                <span>{5 + i * 2} min</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Darslik muallifi</h2>
          <div className="flex items-center gap-4">
            <img
              src={Rasm}
              alt="Muallif"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Ismatillayeva Dilfuza</p>
              <p className="text-sm text-gray-500">Fanlar doktori</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
