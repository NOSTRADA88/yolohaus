import React from "react";
import { LinkBank } from "../../assets";
import { API_URL } from "../../constants";

interface Photo {
  data: {
    attributes: {
      name: string;
      url: string;
    };
  };
}

interface Bank {
  id: number;
  attributes: {
    Photo: Photo;
    Rate: string;
    Title: string;
    URL: string;
  };
}

interface BankSelectionProps {
  banks: Bank[];
  selectedBank: number;
  onSelectBank: (bankId: number) => void;
}

const BankSelection: React.FC<BankSelectionProps> = ({
  banks,
  selectedBank,
  onSelectBank,
}) => {
  return (
    <aside className="lg:w-1/4">
      <h3 className="text-xl font-museo font-medium text-maingray mb-4">
        Выбор банка
      </h3>
      <ul>
        {banks.map((bank) => (
          <li key={bank.id} className="mb-2 flex items-center">
            <button
              onClick={() => onSelectBank(bank.id)}
              className={`block w-full bg-white text-left p-2 rounded-md font-museo text-base font-medium border ${
                selectedBank === bank.id
                  ? "border-2 border-orange text-white"
                  : "border-contact"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 flex justify-center">
                  <img
                    src={`${API_URL}${bank.attributes.Photo.data.attributes.url}`}
                    alt={bank.attributes.Title}
                    className="w-40 h-10 max-xl:w-32 max-[1050px]:w-30 max-lg:w-40"
                  />
                </div>
                <div className="flex justify-end ml-auto mr-2">
                  <a
                    href={bank.attributes.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkBank}
                      alt="link"
                      className="w-5 h-5  image-hover transition-opacity duration-300 max-[1050px]:w-4 max-lg:w-5"
                    />
                  </a>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BankSelection;
