import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "../../components/Parts/Dialog";
import { Input } from "../../components/Parts/Input";
import { Button } from "../../components/Parts/Button2";
import { getAuthHeaders } from "../../utils/auth";

export default function LessonEditor({ lesson, onClose }) {
  const [title, setTitle] = useState(lesson?.title || "");
  const [description, setDescription] = useState(lesson?.description || "");
  const [videoType, setVideoType] = useState(lesson?.video_url ? "url" : "file");
  const [videoUrl, setVideoUrl] = useState(lesson?.video_url || "");
  const [videoFile, setVideoFile] = useState(null);
  const [materials, setMaterials] = useState(
    lesson?.materials?.map((m) => ({ ...m, file: null, isNew: false })) || []
  );
  const [isLoading, setIsLoading] = useState(false); // ⏳ LOADING HOLATI

  const handleAddMaterial = () => {
    setMaterials([...materials, { name: "", file: null, isNew: true }]);
  };

  const handleMaterialChange = (index, key, value) => {
    const newMaterials = [...materials];
    newMaterials[index][key] = value;
    setMaterials(newMaterials);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = [...materials];
    newMaterials.splice(index, 1);
    setMaterials(newMaterials);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Iltimos, video nomi va tavsifini kiriting!");
      return;
    }

    const isEditing = !!lesson?.id;
    const isFileUpload = videoType === "file";

    const url = isEditing
      ? `https://new-project-backend-production.up.railway.app/api/lessons/${lesson.id}`
      : `https://new-project-backend-production.up.railway.app/api/lessons`;

    const headers = getAuthHeaders().headers;

    setIsLoading(true); // ⏳ LOADING BOSHLANDI
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (isFileUpload && videoFile) {
        formData.append("video_file", videoFile);
      } else if (videoType === "url" && videoUrl) {
        formData.append("video_url", videoUrl);
      }

      const materialNames = [];
      materials.forEach((m) => {
        if (m.name) {
          materialNames.push(m.name);
          if (m.file) {
            formData.append("materials", m.file);
          }
        }
      });
      formData.append("material_names", JSON.stringify(materialNames));

      await axios({
        method: isEditing ? "put" : "post",
        url,
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();
    } catch (error) {
      console.error("Darsni saqlashda xatolik:", error);
      alert("Darsni saqlashda xatolik yuz berdi.");
    } finally {
      setIsLoading(false); // ⏹️ LOADING TUGADI
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-xl font-semibold mb-4">
          {lesson ? "Darsni tahrirlash" : "Video qo‘shish"}
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Chap blok */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Video nomi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Videoni ochiq qilish</label>
              <input type="checkbox" className="toggle" />
            </div>
            <textarea
              placeholder="Nazariy matn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 h-28"
            />
          </div>

          {/* O'ng blok */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-1">Videoni yuklash</h4>
              <p className="text-xs text-gray-500 mb-2">
                Videoingizni bu yerga qo‘shing va maksimal 100 mb videoni yuklashingiz mumkin
              </p>

              {videoType === "file" ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-gray-500">
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer block">
                    📁 Drag your file(s) to start uploading <br /> OR <br />
                    <span className="underline text-blue-600">Browse files</span>
                  </label>
                  <p className="mt-2 text-xs text-gray-400">Only .mp4 supported</p>
                  {videoFile && (
                    <div className="mt-2 text-xs text-green-600 font-medium">
                      ✅ {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB) yuklandi
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  placeholder="YouTube link"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              )}

              <div className="mt-3 flex gap-4">
                <label className="text-sm">
                  <input
                    type="radio"
                    name="videoType"
                    value="url"
                    checked={videoType === "url"}
                    onChange={() => setVideoType("url")}
                    className="mr-1"
                  />
                  Link orqali
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="videoType"
                    value="file"
                    checked={videoType === "file"}
                    onChange={() => setVideoType("file")}
                    className="mr-1"
                  />
                  Local yuklash
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Fayl biriktirish</h4>
              <Button onClick={handleAddMaterial} className="mb-2">
                {materials.length > 0 ? "Fayl qo'shish" : "Fayl tanlash"}
              </Button>

              {materials.map((m, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-between border p-2 rounded-md mb-2"
                >
                  <div>
                    <Input
                      placeholder="Fayl nomi"
                      value={m.name}
                      onChange={(e) =>
                        handleMaterialChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleMaterialChange(index, "file", e.target.files[0])
                    }
                  />
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveMaterial(index)}
                  >
                    ❌
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "⏳ Yuklanmoqda..." : lesson ? "Yangilash" : "Yuklash"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
