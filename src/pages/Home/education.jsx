import React from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Education() {
  const navigate = useNavigate();
  return (
    <section
      className="flex bg-[#E2EAFF] h-auto justify-center w-full items-center"
      id="education"
    >
      <div className="flex flex-col h-auto justify-center w-[90%] items-center md:12 md:py-8 py-4 xl:py-16 xl:w-[80%]">
        <div className="flex h-[108px] justify-between w-full items-center lg:pb-10">
          <h2 className="text-[#13265C] text-[24px] font-semibold lg:text-[36px]">
            Tadqiqotning <span className="text-[#3857AF] block">maqsadi:</span>
          </h2>
          <div className="hidden md:block">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#13265C] h-[44px] rounded-[50px] text-[16px] text-white w-[241px] cursor-pointer duration-500 font-normal hover:bg-[#BBBBBB] transform"
            >
              Darslarni ko’rish <GoArrowRight className="text-[20px] inline" />
            </button>
          </div>
        </div>
        <div className="flex mt-4 flex-col h-auto justify-between w-full items-start mb-5 md:flex-row md:items-center">
          <div className="bg-center h-[270px] w-full elementimg lg:h-[384px] max-w-[450px] md:max-w-[600px] sm:w-1/2 mb-4"></div>
          <div className="flex flex-col h-full gap-[20px] md:w-1/2">
            <h1 className="text-[#13265C] text-[16px] font-semibold lg:text-2xl md:text-xl">
              Raqamli texnologiyalar vositasida o'quvchilarning kognitiv
              faoliyatini rivojlantirish metodikasini takomillashtirish:
            </h1>
            <div className="bg-[#C0D1FF] h-[2px] w-full"></div>
            <h4 className="text-[#13265C] text-base font-normal lg:text-xl">
              Raqamli texnologiyalar vositasida Biologiya darslarida, darsdan,
              sinfdan tashqari mashg'ulotlarda va mustaqil ta'limini tashkil
              etishda o'quvchilarning kognitiv faoliyatni rivojlantirish
              mazmuni, metod, shakl va vositalari
            </h4>
            <h4 className="text-[#13265C] text-base font-normal lg:text-xl">
              Dars mashg'ulotlari, darsdan tashqari mashg'ulotlar, sinfdan
              tashqari mashg'ulotlar, mustaqil ta'lim topshiriqlari
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
