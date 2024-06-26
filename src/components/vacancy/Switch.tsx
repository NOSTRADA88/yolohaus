type TabType = "activeVacancies" | "brigade";

type SwitchProps = {
  activeTab: string;
  setActiveTab: (tab: TabType) => void;
};

const Switch = ({ activeTab, setActiveTab }: SwitchProps) => {
  return (
    <div className="flex gap-2 mt-10  mb-5 max-sm:flex-col">
      <div
        className={`bg-orange p-2 cursor-pointer ${
          activeTab === "activeVacancies" ? "bg-darkorange" : ""
        }`}
        onClick={() => setActiveTab("activeVacancies")}
      >
        <p className="font-museo text-lg text-white hover:text-maingray transition-all duration-300">
          Активные вакансии
        </p>
      </div>
      <div
        className={`bg-orange p-2 cursor-pointer ${
          activeTab === "brigade" ? "bg-darkorange" : ""
        }`}
        onClick={() => setActiveTab("brigade")}
      >
        <p className="font-museo  text-lg text-white hover:text-maingray transition-all duration-300">
          Прорабам и бригадам
        </p>
      </div>
    </div>
  );
};

export default Switch;
