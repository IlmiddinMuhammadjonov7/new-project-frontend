import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Input, Spin, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { getUserProfile, updateUserProfile } from '../components/UseUserProfile';
import Rasm from "../assets/Bu icon .png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const navigate = useNavigate();
  const userId = 2;

  const fetchUser = async () => {
    try {
      const data = await getUserProfile(userId);
      setUser(data);
      setForm(data);
    } catch (error) {
      message.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile(userId, form);
      message.success("Ma'lumotlar saqlandi!");
      setIsModalOpen(false);
      fetchUser();
    } catch (err) {
      message.error("Xatolik yuz berdi!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Siz tizimdan chiqdingiz");
    navigate("/login");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[400px]"><Spin size="large" /></div>;
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 mx-auto bg-white rounded-lg overflow-hidden">
      {/* Banner */}
      <div className="bg-[#3857AF] h-24 md:h-32 w-full rounded-2xl"></div>

      {/* User Info */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end md:gap-6 gap-4 p-4 -mt-16">
        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-white bg-gray-200 flex justify-center items-center">
          <img src={Rasm} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#13265C]">
            {user?.name} {user?.surname}
          </h2>
        </div>
        <div className="flex gap-3 mt-2 md:mt-0">
          <Button
            className="bg-[#13265C] text-white px-6 py-2 rounded-full hover:bg-[#0F1C47]"
            onClick={() => setIsModalOpen(true)}
          >
            Ma'lumotlarni o‘zgartirish
          </Button>
          <Button
            danger
            icon={<LogoutOutlined />}
            className="px-4 py-2 rounded-full border-none"
            onClick={() => setLogoutModalVisible(true)}
          >
            Chiqish
          </Button>
        </div>
      </div>

      {/* Info blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#F7F9FB] p-4 rounded-xl shadow-sm">
          <p className="text-[#13265C] text-sm mb-1">Foydalanuvchi nomingiz:</p>
          <p className="text-[#13265C] text-lg font-semibold">{user?.login_name}</p>
        </div>
        <div className="bg-[#F7F9FB] p-4 rounded-xl shadow-sm">
          <p className="text-[#13265C] text-sm mb-1">Ro‘yxatdan o‘tilgan sana:</p>
          <p className="text-[#13265C] text-lg font-semibold">
            {new Date(user?.registeredAt).toLocaleString('uz-UZ')}
          </p>
        </div>
        <div className="bg-[#F7F9FB] p-4 rounded-xl shadow-sm">
          <p className="text-[#13265C] text-sm mb-1">Emailingiz:</p>
          <p className="text-[#13265C] text-lg font-semibold">{user?.email}</p>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={<h2 className="text-lg font-semibold">Ma'lumotlarni o‘zgartirish</h2>}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <div className="space-y-4">
          <Input
            placeholder="Ism"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Familiya"
            value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
          />
          <Input
            placeholder="Login"
            value={form.login_name}
            onChange={(e) => setForm({ ...form, login_name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </Modal>

      {/* Logout Confirm Modal */}
      <Modal
        title="Profildan chiqish"
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="Ha"
        cancelText="Yo‘q"
        okButtonProps={{ danger: true }}
      >
        <p>Rostdan ham profildan chiqmoqchimisiz?</p>
      </Modal>
    </div>
  );
};

export default Profile;
