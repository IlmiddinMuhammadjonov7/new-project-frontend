import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  BookOpen,
  ChartSpline,
  ClipboardCheck,
  FlaskConical,
  PanelsTopLeft,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const items = [
  {
    key: "1",
    icon: <PanelsTopLeft />,
    label: "Darsliklar",
    path: "/admin/darsliklar",
  },
  {
    key: "2",
    icon: <ClipboardCheck />,
    label: "Topshiriqlar",
    path: "/admin/assignments",
  },
  {
    key: "3",
    icon: <FlaskConical />,
    label: "Testlar",
    path: "/admin/testlar",
  },

  {
    key: "4",
    icon: <BookOpen />,
    label: "Maqolalarim",
    path: "/admin/maqolalarim",
  },
  {
    key: "5",
    icon: <ChartSpline />,
    label: "Analitika",
    path: "/admin/analitika",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    const found = items.find((item) => location.pathname.startsWith(item.path));
    if (location.pathname === "/admin") {
      setSelectedKey(null); // hech biri tanlanmasin
    } else if (found) {
      setSelectedKey(found.key);
    }
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    const item = items.find((item) => item.key === e.key);
    if (item) {
      navigate(item.path);
      setSelectedKey(item.key);
    }
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <Layout>
      <Sider
        style={{
          minHeight: "100vh",
          width: "463px",
          backgroundColor: "#13265C",
        }}
        trigger={null}
        collapsible
      >
        <div
          className="h-[100px] pt-5 pl-6 cursor-pointer select-none"
          onClick={handleAdminClick}
        >
          <p className="text-white font-extrabold text-2xl">ADMIN</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={handleMenuClick}
          items={items}
          style={{
            backgroundColor: "#13265C",
            borderRight: "2px solid #334155",
            padding: "0 12px",
            margin: "0",
          }}
          className="custom-menu"
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
