// components/SidebarLink.jsx
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function SidebarLink({ to, icon, label }) {
  const location = useLocation();

  const isActive = location.pathname.startsWith(to); // aktivligini tekshir

  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-100",
        isActive && "bg-white text-blue-700 shadow"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
