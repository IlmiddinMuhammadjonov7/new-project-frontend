import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById, deleteAssignment } from "./assignmentService";
import { getAllUsers } from "../../../components/UseUserProfile"; // yangi servis funksiyani qo‘sh
import { Tabs, TabPanel } from "../../../components/Parts/tabs";
import { Button } from "../../../components/Parts/Button2";
import { Modal } from "antd";
import { ArrowLeft } from "lucide-react";

const AssignmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("info");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [assignmentRes, usersRes] = await Promise.all([
        getAssignmentById(id),
        getAllUsers(), // barcha userlarni olish
      ]);

      // Har bir submission uchun userni topamiz
      const submissionsWithNames = assignmentRes.submissions.map((s) => {
        const user = usersRes.find((u) => u.id === s.userId);
        return {
          ...s,
          fullName: user
            ? `${user.name} ${user.surname}`
            : "Noma'lum foydalanuvchi",
        };
      });

      setUsers(usersRes);
      setAssignment({ ...assignmentRes, submissions: submissionsWithNames });
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    await deleteAssignment(id);
    navigate("/admin/assignments");
  };

  if (!assignment) return <div>Yuklanmoqda...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
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
            {assignment.lesson?.title || "Dars nomi topilmadi"}
          </h1>
        </div>
        <div className="space-x-2">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate(`/admin/assignments/${id}/edit`)}
          >
            Tahrirlash
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            O‘chirish
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabPanel value="info" label="📄 Topshiriq Ma'lumotlari">
          <div className="p-4 bg-white rounded-xl shadow space-y-2">
            <p>
              <strong>Topshiriq matni:</strong> {assignment.description}
            </p>
            {assignment.fileUrls?.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline block"
              >
                📎 Fayl {i + 1}
              </a>
            ))}
          </div>
        </TabPanel>

        <TabPanel value="submissions" label="📬 Kelgan Javoblar">
          <div className="space-y-4">
            {assignment.submissions?.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-lg bg-white border shadow-md"
              >
                <p className="font-semibold text-gray-800">
                  👤 Kimdan: {s.fullName}
                </p>
                <p>
                  <strong>Izoh:</strong> {s.description}
                </p>
                <a
                  href={s.fileUrl}
                  className="text-blue-600 underline block"
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 Faylni ko‘rish
                </a>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>

      <Modal
        title="Tasdiqlash"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Ha, o‘chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ danger: true }}    
      >
        <p>Ushbu topshiriqni o‘chirmoqchimisiz?</p>
      </Modal>
    </div>
  );
};

export default AssignmentDetailPage;
