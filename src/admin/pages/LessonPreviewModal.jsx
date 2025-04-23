import { Dialog, DialogContent } from "../../components/Parts/Dialog";
import ReactPlayer from "react-player";

export default function LessonPreviewModal({ lesson, onClose }) {
  const renderVideo = () => {
    if (lesson.video_url) {
      return (
        <div className="w-full aspect-video rounded overflow-hidden">
          <ReactPlayer
            url={lesson.video_url}
            controls
            width="100%"
            height="100%"
          />
        </div>
      );
    } else if (lesson.video_file_url) {
      return (
        <video controls className="w-full rounded">
          <source src={lesson.video_file_url} type="video/mp4" />
          Sizning brauzeringiz video ko‘rsatishni qo‘llab-quvvatlamaydi.
        </video>
      );
    }
    return <p className="text-sm text-gray-500">Video mavjud emas</p>;
  };

  const renderMaterials = () => {
    if (!lesson.materials || lesson.materials.length === 0) {
      return <p className="text-sm text-gray-500">Materiallar mavjud emas</p>;
    }

    return (
      <ul className="mt-2 space-y-1">
        {lesson.materials.map((mat, idx) => {
          const fileType = mat.url.split(".").pop().toUpperCase();
          return (
            <li
              key={idx}
              className="text-sm flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
            >
              <span>{mat.name}</span>
              <span className="text-gray-400 text-xs">{fileType}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        {/* X tugmasi */}

        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <p
          className="text-gray-600 text-sm mb-4 overflow-y-auto max-h-[7.5em] pr-2"
          style={{ lineHeight: "1.5em" }} // 1.5em * 7 = 10.5em
        >
          {lesson.description}
        </p>

        {/* Video */}
        <div className="mb-4">{renderVideo()}</div>

        {/* Materiallar */}
        <div>
          <h4 className="font-semibold text-sm mb-1">Biriktirilgan fayllar:</h4>
          {renderMaterials()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
