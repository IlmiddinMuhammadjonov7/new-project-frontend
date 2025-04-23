import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      {/* Sidebar bo‘sh joyi chapdan 250px — kompyuterda */}
      <div className="flex-1 ml-0 lg:ml-[250px] transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}
