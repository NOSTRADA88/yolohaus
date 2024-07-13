interface SwitchTechnologyProps {
  onTechnologySelect: (technology: string) => void;
}

const SwitchTechnology = ({ onTechnologySelect }: SwitchTechnologyProps) => {
  return (
    <div className="flex gap-2 mt-5 mb-5 max-sm:flex-col">
      {["СИП", "Каркас", "Газобетон"].map((technology) => (
        <div
          key={technology}
          className={`border-[#E5E5E5] border-[1px] flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange`}
          onClick={() => onTechnologySelect(technology)}
        >
          <p className="font-museo text-lg text-maingray font-bold transition-all duration-300">
            {technology}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SwitchTechnology;
