import { useState } from "react";

interface SwitchTechnologyProps {
  onTechnologySelect: (technology: string) => void;
}

const SwitchTechnology = ({ onTechnologySelect }: SwitchTechnologyProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState("");

  const handleTechnologySelect = (technology: string) => {
    setSelectedTechnology(technology);
    onTechnologySelect(technology);
  };

  return (
    <div className="flex gap-2 mt-5 mb-5 max-sm:flex-col">
      {["СИП", "Каркас", "Газобетон"].map((technology) => (
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
      ))}
    </div>
  );
};

export default SwitchTechnology;
