import React, { useState } from "react";

interface MortgageFormProps {
  projectCost: number;
  initialPayment: number;
  loanAmount: number;
  rate: number;
  term: number;
  termType: string;
  startDate: string;
  onProjectCostChange: (value: number) => void;
  onInitialPaymentChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onTermChange: (value: number) => void;
  onTermTypeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const MortgageForm: React.FC<MortgageFormProps> = ({
  projectCost,
  initialPayment,
  loanAmount,
  rate,
  term,
  termType,
  startDate,
  onProjectCostChange,
  onInitialPaymentChange,
  onRateChange,
  onTermChange,
  onTermTypeChange,
  onStartDateChange,
  onSubmit,
}) => {
  const [termError, setTermError] = useState<string>("");

  const handleTermChange = (value: number) => {
    setTermError("");
    onTermChange(value);
  };

  return (
    <form className="mt-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label
            htmlFor="projectCostFormatted"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Стоимость покупки (руб):
          </label>
          <input
            type="text"
            id="projectCostFormatted"
            name="projectCostFormatted"
            value={projectCost.toLocaleString("ru-RU")}
            onChange={(e) =>
              onProjectCostChange(Number(e.target.value.replace(/\D/g, "")))
            }
            className="mt-1 block w-full py-2 px-3 border border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="initialPaymentFormatted"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Первоначальный взнос (руб):
          </label>
          <input
            type="text"
            id="initialPaymentFormatted"
            name="initialPaymentFormatted"
            value={initialPayment.toLocaleString("ru-RU")}
            onChange={(e) =>
              onInitialPaymentChange(Number(e.target.value.replace(/\D/g, "")))
            }
            className="mt-1 block w-full py-2 px-3 border border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="loanAmountFormatted"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Сумма ипотеки (руб):
          </label>
          <input
            type="text"
            id="loanAmountFormatted"
            name="loanAmountFormatted"
            value={loanAmount.toLocaleString("ru-RU")}
            onChange={(e) =>
              onProjectCostChange(Number(e.target.value.replace(/\D/g, "")))
            }
            className="mt-1 block w-full py-2 px-3 border  border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm"
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="rate"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Процентная ставка (%):
          </label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={rate}
            onChange={(e) => onRateChange(Number(e.target.value))}
            className="mt-1 block w-full py-2 px-3 border  border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Срок ипотеки:
          </label>
          <div className="flex flex-col">
            <div className="flex">
              <input
                type="number"
                id="term"
                name="term"
                value={term}
                onChange={(e) => handleTermChange(Number(e.target.value))}
                className={`mt-1 block w-full py-2 px-3 border ${
                  termError ? "border-red-500" : "border-contact"
                } rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm`}
                required
              />
              <select
                value={termType}
                onChange={(e) => onTermTypeChange(e.target.value)}
                className="mt-1 block py-2 px-3 border border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm ml-2"
              >
                <option value="months">мес.</option>
                <option value="years">лет</option>
              </select>
            </div>
            {termError && (
              <p className="text-red-500 text-sm mt-1">{termError}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-maingray font-museо"
          >
            Начало выплат:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border  border-contact rounded-md shadow-sm focus:outline-none focus:ring-orange focus:border-orange text-sm"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default MortgageForm;
