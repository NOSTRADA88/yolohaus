import React from "react";
import { LinkBank } from "../../assets";

interface BankOptions {
  [key: string]: {
    name: string;
    rate: number;
    photo: string;
    url: string;
  };
}

interface BankSelectionProps {
  bankOptions: BankOptions;
  selectedBank: string;
  onSelectBank: (bank: string) => void;
}

const BankSelection: React.FC<BankSelectionProps> = ({
  bankOptions,
  selectedBank,
  onSelectBank,
}) => {
  return (
    <aside className="lg:w-1/4">
      <h3 className="text-xl font-museo font-medium text-maingray mb-4">
        Выбор банка
      </h3>
      <ul>
        {Object.entries(bankOptions).map(([key, value]) => (
          <li key={key} className="mb-2 flex items-center">
            <button
              onClick={() => onSelectBank(key)}
              className={`block w-full bg-white text-left p-2 rounded-md font-museo text-base font-medium border ${
                selectedBank === key
                  ? "border-2 border-orange text-white"
                  : "border-contact"
              }`}
            >
              <div className="flex gap-2 justify-center items-center ">
                {value.photo && (
                  <img
                    src={value.photo}
                    alt={value.name}
                    className="w-40 h-10 max-xl:w-32 max-[1050px]:w-24 max-lg:w-40"
                  />
                )}

                <a href={value.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={LinkBank}
                    alt="link"
                    className="w-5 h-5 image-hover transition-opacity duration-300 max-[1050px]:w-4 max-lg:w-5"
                  />
                </a>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BankSelection;
