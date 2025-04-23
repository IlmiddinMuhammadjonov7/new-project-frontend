import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAssignment,
  getAssignmentById,
  updateAssignment,
  getAllLessons,
} from "./assignmentService";
import { Button } from "../../../components/Parts/Button2";
import { Switch } from "antd";
import { ArrowLeft } from "lucide-react";

const AssignmentEditorPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const [lessonId, setLessonId] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [attachFile, setAttachFile] = useState(false);

  useEffect(() => {
    const load = async () => {
      const allLessons = await getAllLessons();
      setLessons(allLessons);
      if (isEdit) {
        const data = await getAssignmentById(id);
        setLessonId(data.lessonId);
        setDescription(data.description);
      }
    };
    load();
  }, [id, isEdit]);

  const handleSubmit = async () => {
    const data = {
      lessonId,
      description,
      files,
    };

    if (isEdit) {
      await updateAssignment(id, data);
    } else {
      await createAssignment(data);
    }
    navigate("/admin/assignments");
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? "Topshiriqni tahrirlash" : "Topshiriq qo‘shish"}</h1>
      </div>

      <div className="p-6 w-full max-w-xl">
        <div className="mb-4">
          <label className="block font-medium mb-1">Darsni tanlang</label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option value="">Dars tanlang</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Savol kiriting</label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
            placeholder="Savol matni..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center gap-4">
          <span className="font-medium">Fayl biriktirsinmi</span>
          <Switch checked={attachFile} onChange={setAttachFile} />
        </div>

        {attachFile && (
          <div className="mb-4">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium"
        >
          {isEdit ? "Saqlash" : "Topshiriqni qo‘shish"}
        </Button>
      </div>
    </div>
  );
};

export default AssignmentEditorPage;
