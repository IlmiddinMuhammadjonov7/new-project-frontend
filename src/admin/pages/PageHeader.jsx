
export default function PageHeader({ title, button }) {
  return (
    <div
      style={{
        height: "100px",
        padding: "28px 50px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E7E7E7",
      }}
    >
      <h1 className="text-[#13265C] h-[44px] flex items-center font-bold text-[32px]">{title}</h1>
      {button && <button className="bg-[#13265C] h-[44px] flex items-center px-12 rounded-[50px] cursor-pointer hover:bg-[#BBBBBB] transition text-white" onClick={button.onClick}>{button.label}</button>}
    </div>
  );
}
