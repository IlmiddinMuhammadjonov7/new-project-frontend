import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  BookOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Mobil holatda o'lcham o'zgarishini kuzatamiz
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
      else setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // birinchi yuklanishda ham

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSelectedKey = (path) => {
    if (path.startsWith("/dashboard/tasks")) return "/dashboard/tasks";
    if (path.startsWith("/dashboard/tests")) return "/dashboard/tests";
    if (path.startsWith("/dashboard/articles")) return "/dashboard/articles";
    if (path.startsWith("/dashboard/profile")) return "/dashboard/profile";
    return "/dashboard"; // default
  };

  // Link bosilganda mobilda sidebarni yopamiz
  const handleMenuClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Menuni aniqlash uchun current pathname olamiz
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobil menyu tugmasi */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white border rounded-md p-2 shadow-md"
        >
          <MenuOutlined />
        </button>
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-screen w-[250px] bg-white shadow-md p-4 z-40"
        initial={{ x: -250 }}
        animate={{ x: isOpen || !isMobile ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        {/* "X" tugmasi faqat mobil + ochilgan holatda ko'rinadi */}
        {isMobile && isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-xl z-50"
          >
            ✕
          </button>
        )}

        <h1 className="text-xl font-bold mb-6 ml-5 ">
          <Link to={"/"} style={{fontSize: "25px", color: "rgb(55, 55, 159)"}}>Home</Link>
        </h1>

        <Menu
          mode="vertical"
          selectedKeys={[getSelectedKey(currentPath)]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="/dashboard" icon={<BookOutlined />}>
            <Link to="/dashboard">Darsliklar</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/tasks" icon={<CheckSquareOutlined />}>
            <Link to="/dashboard/tasks">Topshiriqlar</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/tests" icon={<FileTextOutlined />}>
            <Link to="/dashboard/tests">Testlar</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/articles" icon={<ReadOutlined />}>
            <Link to="/dashboard/articles">Maqolalarim</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/profile" icon={<UserOutlined />}>
            <Link to="/dashboard/profile">Mening Profilim</Link>
          </Menu.Item>
        </Menu>

        <div className="absolute bottom-5 left-4 w-[90%] flex items-center gap-3 p-3 border border-[#E7E7E7] rounded-lg shadow-sm">
          <UserOutlined className="text-2xl text-gray-100" />
          <span className="text-gray-800 font-medium">Hush kelibsiz!</span>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
