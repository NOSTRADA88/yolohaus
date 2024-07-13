import { useState, useEffect } from "react";

interface SwitchTechnologyProps {
  onTechnologySelect: (technology: string) => void;
}

const SwitchTechnology = ({ onTechnologySelect }: SwitchTechnologyProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleTechnologySelect = (technology: string) => {
    setSelectedTechnology(technology);
    onTechnologySelect(technology);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex gap-2 mt-5 mb-5 max-md:flex-col ">
      {isSmallScreen ? (
        <select
          value={selectedTechnology}
          onChange={(e) => handleTechnologySelect(e.target.value)}
          className="border-orange border-[1px] p-2 font-museo text-lg text-maingray font-bold  after:bg-orange before:bg-orange"
        >
          <option value="" disabled>
            Выберите технологию
          </option>
          {["СИП", "Каркас", "Газобетон"].map((technology) => (
            <option
              key={technology}
              value={technology}
              className="font-museo text-lg text-maingray font-bold"
            >
              {technology}
            </option>
          ))}
        </select>
      ) : (
        ["СИП", "Каркас", "Газобетон"].map((technology) => (
          <div
            key={technology}
            className={`border-[#E5E5E5] border-[1px] flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange ${
              selectedTechnology === technology ? "bg-orange" : ""
            }`}
            onClick={() => handleTechnologySelect(technology)}
          >
            <p
              className={`font-museo text-lg text-maingray font-bold transition-all duration-300 ${
                selectedTechnology === technology ? "text-white" : ""
              }`}
            >
              {technology}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SwitchTechnology;
