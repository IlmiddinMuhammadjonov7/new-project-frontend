import React from "react";
import { useNavigate } from "react-router-dom";
import Rasm from "../../assets/homeuser.png";
import Rasm2 from "../../assets/darslar.png";
import Rasm3 from "../../assets/testlar.png";
import Rasm4 from "../../assets/analitika.png";
import Rasm5 from "../../assets/topshiriqlar.png";
import Rasm6 from "../../assets/maqolalar.png";

const pages = [
  {
    id: 1,
    title: "Darsliklar",
    imagePath: {Rasm2},
    path: "/admin/darsliklar",
  },
  {
    id: 2,
    title: "Testlar",
    imagePath: {Rasm3},
    path: "/admin/testlar",
  },
  {
    id: 3,
    title: "Analitika",
    imagePath: {Rasm4},
    path: "/admin/analitika",
  },
  {
    id: 4,
    title: "Topshiriqlar",
    imagePath: {Rasm5},
    path: "/admin/topshiriqlar",
  },
  {
    id: 5,
    title: "Maqolalarim",
    imagePath: {Rasm6},
    path: "/admin/maqolalarim",
  },
];

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F4F7FF] w-full pb-10">
      <div className="border-b border-[#E7E7E7]">
        <div className="w-[80%] mx-auto h-[100px] flex justify-between items-center">
          <p className="text-[32px] text-[#13265C] font-bold">
            Adminstrator Panel
          </p>
          <button className="bg-white border border-[#E7E7E7] flex gap-[10px] items-center px-3 py-2 rounded-[10px] w-[239px] cursor-pointer">
              <img
                src={Rasm}
                alt="Muallif"
                className="w-12 h-12 rounded-full"
                style={{ objectFit: "cover" }}
              />
            <p>Ismatillayeva Dilfuza</p>
          </button>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <p className="text-[#13265C] text-2xl pt-10 pb-10">
          Hush kelibsiz, Ismatillayeva Dilfuza
        </p>

        <div className="grid grid-cols-3 gap-5">
          {pages.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              key={item.id}
              className="bg-white cursor-pointer flex flex-col items-center justify-center py-12 rounded-[15px]"
            >
              <div className="w-[94px] h-[94px] rounded-[15px] flex items-center justify-center bg-[#F4F7FF] border border-[#E7E7E7]">
                <img
                  width={48}
                  height={48}
                  src={item.imagePath}
                  alt={item.title}
                />
              </div>
              <p className="text-[#13265C] text-[32px] font-bold pt-5 text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
