import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import Rasm from "../../assets/Bu icon .png";
import { Dialog } from "@headlessui/react";

export default function Analitika() {
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    surname: "",
    email: "",
    region: "",
  });
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("https://new-project-backend-production.up.railway.app/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filteredUsers = res.data.filter((user) => user.role !== "admin");
        setUsers(filteredUsers);
      })
      .catch((err) => {
        console.error("Foydalanuvchilarni olishda xatolik:", err);
      });
  }, []);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`https://new-project-backend-production.up.railway.app/api/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedUser({
      name: user.name,
      surname: user.surname,
      email: user.email,
      region: user.region || "",
    });
    setEditModalOpen(true);
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await axios.put(
        `https://new-project-backend-production.up.railway.app/api/users/${selectedUser.id}`,
        editedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.map((u) => (u.id === selectedUser.id ? res.data : u)));
      setEditModalOpen(false);
    } catch (err) {
      console.error("Tahrirlashda xatolik:", err);
    }
  };

  return (
    <div>
      <PageHeader title="Analitika" />

      <div className="m-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`font-medium px-4 py-2 rounded-full ${
              activeTab === "users"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            O‘quvchilar
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`font-medium px-4 py-2 rounded-full ${
              activeTab === "courses"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Kurslar analitikasi
          </button>
          <button
            onClick={() => setActiveTab("tests")}
            className={`font-medium px-4 py-2 rounded-full ${
              activeTab === "tests"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Testlar analitikasi
          </button>
        </div>

        {activeTab === "users" && (
          <>
            <div className="text-xl font-semibold mb-4">
              Jami foydalanuvchilar soni:{" "}
              <span className="text-blue-600">{users.length} ta</span>
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr className="text-sm text-gray-600">
                    <th className="py-3 px-4">№</th>
                    <th className="py-3 px-4">Foydalanuvchi</th>
                    <th className="py-3 px-4">Rasm</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Login</th>
                    <th className="py-3 px-4 text-center">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-gray-50 text-sm"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {user.name} {user.surname}
                      </td>
                      <td className="py-3 px-4">
                        <img
                          src={Rasm}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        {user.login_name || "Noma’lum"}
                      </td>
                      {/* Amallar qismi */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center">
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-center text-gray-500"
                      >
                        Foydalanuvchilar topilmadi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* O'chirish modali */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} // tashqariga bosilsa yopiladi
        className="relative z-50"
      >
        {/* Xira orqa fon */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Foydalanuvchini o‘chirishni hohlaysizmi?
            </Dialog.Title>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                O‘chirish
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
