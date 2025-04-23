import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/Parts/Button2";
import { Dialog, DialogContent } from "../../components/Parts/Dialog";
import LessonEditor from "./LessonEditor";
import { getAuthHeaders } from "../../utils/auth";
import PageHeader from "./PageHeader";
import LessonPreviewModal from "./LessonPreviewModal"; // yangi qo‘shildi
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function LessonsAdmin() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingLessonId, setDeletingLessonId] = useState(null);
  const [previewLesson, setPreviewLesson] = useState(null); // yangi state

  const fetchLessons = async () => {
    const res = await axios.get(
      "https://new-project-backend-production.up.railway.app/api/lessons",
      getAuthHeaders()
    );
    setLessons(res.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async () => {
    await axios.delete(
      `https://new-project-backend-production.up.railway.app/api/lessons/${deletingLessonId}`,
      getAuthHeaders()
    );
    setShowDeleteModal(false);
    fetchLessons();
  };

  const handleEdit = (lesson) => {
    setSelectedLesson(lesson);
    setIsEditing(true);
    setPreviewLesson(null); // modalni yopamiz
  };

  const handleAdd = () => {
    setSelectedLesson(null);
    setIsEditing(true);
  };

  return (
    <div>
      <PageHeader
        title="Darsliklar"
        button={{
          label: "Darslik qo‘shish",
          onClick: () => handleAdd(),
        }}
      />

      <div
        style={{
          height: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
        className="flex p-6 flex-col gap-4"
      >
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="rounded-xl shadow-md p-4 bg-white relative w-full cursor-pointer hover:bg-blue-50 transition"
            onClick={() => setPreviewLesson(lesson)}
          >
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button
                className="bg-green-600 cursor-pointer border border-green-600 hover:bg-green-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(lesson);
                }}
              >
                <FaEdit style={{color: "white", fontSize: "20px"}}/>
              </Button>
              <Button
                className="bg-red-600 cursor-pointer border border-red-600 hover:bg-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeletingLessonId(lesson.id);
                  setShowDeleteModal(true);
                }}
              >
                <MdDelete style={{color: "white", fontSize: "20px"}}/>
              </Button>
            </div>
            <p className="inline-block bg-blue-100 text-blue-800 font-semibold text-base px-3 py-1 rounded-full mb-2">
              {index + 1}. {lesson.title}
            </p>
            <p className="text-gray-500 mr-[150px] text-sm truncate ">
              {lesson.description}
            </p>
            <p className="text-gray-400 text-xs mt-2">
              {lesson.materials?.length || 0} ta fayl
            </p>
          </div>
        ))}
      </div>

      {isEditing && (
        <LessonEditor
          lesson={selectedLesson}
          onClose={() => {
            setIsEditing(false);
            fetchLessons();
          }}
        />
      )}

      {previewLesson && (
        <LessonPreviewModal
          lesson={previewLesson}
          onClose={() => setPreviewLesson(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-white">
          <h4 className="text-lg font-semibold">
            Haqiqatan ham o'chirmoqchimisiz?
          </h4>
          <div className="flex gap-4 justify-end mt-6">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Yo‘q
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Ha, o‘chirish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
