import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="flex bg-[#E2EAFF] h-full justify-center w-full items-center"
    >
      <div className="flex flex-col h-full justify-around w-[90%] items-center lg:pb-8 lg:pt-8 py-5 xl:pb-16 xl:pt-12 xl:w-[80%]">
        <div className="h-[150px] w-full max-w-[605px] md:h-[285px] self-start">
          <div className="flex h-[150px] w-full gap-[30px] items-center md:h-[285px] userbacground">
            <div
              className="h-[130px] w-[130px] homeuser br-50 md:h-[200px] md:w-[200px] ml-4 shrink-0"
              style={{ backgroundPosition: "0px -40px", borderRadius: "50%" }}
            ></div>
            <div className="w-full max-w-[310px]">
              <p className="text-[14px] font-normal md:text-[16px] uppercase">
                Fanlar Doktori
              </p>
              <h1 className="text-[#13265C] text-[20px] font-semibold md:text-[32px]">
                Ismatillayeva Dilfuza Botirjonova
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between w-full gap-5 items-start md:flex-row md:gap-8 md:pt-8 pt-3">
          <div className="md:max-w-1/2">
            <div className="mb-4">
              <p className="text-[#464B59] text-[14px] font-medium md:text-[16px] uppercase">
                Biologiya fanini o‘qitish metodikasi zamonaviy texnalogiyalar
                asosida
              </p>
            </div>
            <div className="">
              <h1 className="text-[#13265C] text-[16px] font-semibold lg:text-[32px] md:text-[24px]">
                Raqamli texnologiyalar vositasida o'quvchilarning kognitiv
                faoliyatini rivojlantirish metodikasi (biologiya fani misolida)
              </h1>
            </div>
            <div className="hidden md:block pt-5">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#13265C] h-[44px] rounded-[50px] text-[16px] text-white w-[241px] cursor-pointer duration-500 font-normal hover:bg-[#BBBBBB] transform"
              >
                Darslarni ko’rish{" "}
                <GoArrowRight className="text-[20px] inline" />
              </button>
            </div>
          </div>
          <div className="bg-[#C0D1FF] h-[2px] w-full md:h-[175px] md:w-[2px] min-w-[2px]"></div>
          <div className="md:max-w-1/2">
            <div className="flex h-auto justify-end items-center">
              <h4 className="text-[#13265C] text-[16px] font-normal lg:text-[24px] md:text-[20px]">
                Biologiya o‘qitish fanidan elektron platforma: nazariy darslar,
                amaliy ishlanmalar, interaktiv topshiriqlar va mavzular bo‘yicha
                muammoli savollarni forumlar orqali ochiq muhokama qilish
                imkoniyati.
              </h4>
            </div>
          </div>
          <div className="w-full md:hidden pt-5">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#13265C] h-[44px] rounded-[50px] text-[16px] text-white w-full cursor-pointer duration-500 font-normal hover:bg-[#BBBBBB] transform"
            >
              Darslarni ko’rish <GoArrowRight className="text-[20px] inline" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
