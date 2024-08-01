import React from "react";

interface BankOptions {
  [key: string]: {
    name: string;
    rate: number;
    photo: string;
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
      <h3 className="text-xl font-museо font-meduim text-maingray mb-4">
        Выбор банка
      </h3>
      <ul>
        {Object.entries(bankOptions).map(([key, value]) => (
          <li key={key} className="mb-2 flex items-center">
            <button
              onClick={() => onSelectBank(key)}
              className={`block w-full bg-white text-left p-2 rounded-md font-museо text-base font-meduim border border-contact ${
                selectedBank === key ? "border-2 border-orange text-white" : ""
              }`}
            >
              <div className="flex gap-2 justify-center items-center ">
                {value.photo && (
                  <img
                    src={value.photo}
                    alt={value.name}
                    className="w-40 h-10"
                  />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BankSelection;
