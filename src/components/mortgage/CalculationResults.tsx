import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

interface CalculationResultsProps {
  monthlyPayment: number;
  totalDebt: number;
  overpayment: number;
  endDate: string;
  pieData: any[];
  barData: any[];
  tableData: any[];
  showAllRows: boolean;
  handleShowAllRows: () => void;
  term: number;
  termType: string;
}

const COLORS = ["#EA9635", "#2B2A29"];

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const renderTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const month = payload[0].payload.month;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p className="text-sm font-museo text-maingray">{month}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-sm font-museo text-maingray"
          >
            {entry.name}: {formatNumber(entry.value)} ₽
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const tickFormatter = (
  tick: string,
  index: number,
  barData: any[],
  term: number,
  termType: string
) => {
  const isLastTick = index === barData.length - 1;
  if (
    (termType === "years" && term > 8) ||
    (termType === "months" && term > 96)
  ) {
    if (isLastTick) {
      return tick;
    }
  }
  if (
    (termType === "years" && term >= 10) ||
    (termType === "months" && term >= 120)
  ) {
    return index % 24 === 0 ? tick : "";
  }

  if (
    (termType === "years" && term >= 20) ||
    (termType === "months" && term >= 240)
  ) {
    return index % 60 === 0 ? tick : "";
  }

  const previousTick = index > 0 ? barData[index - 1].name : null;
  return previousTick !== tick ? tick : "";
};

const CalculationResults: React.FC<CalculationResultsProps> = ({
  monthlyPayment,
  totalDebt,
  overpayment,
  endDate,
  pieData,
  barData,
  tableData,
  showAllRows,
  handleShowAllRows,
  term,
  termType,
}) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-md shadow-md ">
      <h3 className="text-xl font-bold text-maingray font-museо">
        Результаты расчета
      </h3>
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex max-[850px]:flex-col max-[850px]:items-center">
          <div className="p-4  border rounded-lg shadow-md mt-5 bg-white w-[60%] mr-5 max-[850px]:w-full max-[850px]:mr-0">
            <div className="flex justify-between items-center mb-4 max-[450px]:flex-col max-[450px]:items-start">
              <p className="text-maingray font-medium font-museо text-base">
                Ежемесячный платеж
              </p>
              <p className="text-maingray font-museо font-light text-sm">
                {formatNumber(monthlyPayment)} ₽
              </p>
            </div>
            <div className="flex justify-between items-center mb-4 max-[450px]:flex-col max-[450px]:items-start">
              <p className="text-maingray font-medium font-museо text-base">
                Сумма долга
              </p>
              <p className="text-maingray font-museо font-light text-sm">
                {formatNumber(totalDebt)} ₽
              </p>
            </div>
            <div className="flex justify-between items-center mb-4 max-[450px]:flex-col max-[450px]:items-start ">
              <p className="text-maingray font-medium font-museо text-base">
                Переплата
              </p>
              <p className="text-maingray font-museо font-light text-sm">
                {formatNumber(overpayment)} ₽
              </p>
            </div>
            <div className="flex justify-between items-center max-[450px]:flex-col max-[450px]:items-start">
              <p className="text-maingray font-medium font-museо text-base">
                Окончание выплат
              </p>
              <p className="text-maingray  font-museо font-light text-sm">
                {endDate}
              </p>
            </div>
          </div>
          <PieChart width={550} height={200} className="max-sm:hidden block">
            <Pie
              data={pieData}
              cx={280}
              cy={110}
              labelLine={false}
              label={({ name, value }) => {
                const total = pieData.reduce(
                  (sum, entry) => sum + entry.value,
                  0
                );
                const percent = (value / total) * 100;
                return `${name}: ${percent.toFixed(0)}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
          </PieChart>
        </div>
        <div className="w-full mt-8">
          <h2 className="mb-4 text-maingray font-museо font-medium max-sm:hidden block">
            График погашения
          </h2>
          <ResponsiveContainer
            width="100%"
            height={400}
            className="max-sm:hidden block"
          >
            <BarChart
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                className="max-md:hidden block"
                dataKey="name"
                tickFormatter={(tick, index) =>
                  tickFormatter(tick, index, barData, term, termType)
                }
                interval={0}
              />
              <YAxis hide />
              <Tooltip content={renderTooltip} />
              <Legend />
              <Bar dataKey="Основной долг" stackId="a" fill="#EA9635" />
              <Bar dataKey="Проценты" stackId="a" fill="#2B2A29" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8  max-sm:mt-0 ">
        <h2 className="mb-4 text-maingray font-museо font-medium">
          Таблица платежей
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-maingray font-museо font-bold text-sm border">
                <th className="px-4 py-2 border max-sm:px-1">№</th>
                <th className="px-4 py-2 border">Месяц</th>
                <th className="px-4 py-2 border">Сумма платежа</th>
                <th className="px-4 py-2 border">Остаток долга</th>
              </tr>
            </thead>
            <tbody>
              {tableData.slice(0, 5).map((item, index) => (
                <tr
                  key={index}
                  className="text-maingray font-museо text-sm font-light text-center  whitespace-nowrap"
                >
                  <td className="px-4 py-2  border max-sm:px-1">{index + 1}</td>
                  <td className="px-4 py-2 border  ">{item.month}</td>
                  <td className="px-4 py-2 border ">{item.payment} ₽</td>
                  <td className="px-4 py-2 border ">{item.remainingDebt} ₽</td>
                </tr>
              ))}
              {!showAllRows && (
                <>
                  <tr>
                    <td colSpan={6} className="px-4 py-2 text-center border-b ">
                      <button
                        onClick={handleShowAllRows}
                        className="text-orange underline ml-2"
                      >
                        Нажмите, чтобы показать все строки
                      </button>
                    </td>
                  </tr>
                </>
              )}
              {showAllRows &&
                tableData.slice(5, -5).map((item, index) => (
                  <tr
                    key={index + 5}
                    className="text-maingray font-museо text-sm font-light text-center  whitespace-nowrap"
                  >
                    <td className="px-4 py-2 border max-sm:px-1">
                      {index + 6}
                    </td>
                    <td className="px-4 py-2 border">{item.month}</td>
                    <td className="px-4 py-2 border">{item.payment} ₽</td>
                    <td className="px-4 py-2 border ">
                      {item.remainingDebt} ₽
                    </td>
                  </tr>
                ))}
              {tableData.slice(-5).map((item, index) => (
                <tr
                  key={index}
                  className="text-maingray font-museо text-sm font-light text-center  whitespace-nowrap max-sm:whitespace-normal"
                >
                  <td className="px-4 py-2 border max-sm:px-1">
                    {tableData.length - 5 + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{item.month}</td>
                  <td className="px-4 py-2 border">{item.payment} ₽</td>
                  <td className="px-4 py-2 border ">{item.remainingDebt} ₽</td>
                </tr>
              ))}
              <tr className="text-maingray font-museо font-bold text-sm text-center whitespace-nowrap">
                <td className="px-4 py-2 border " colSpan={2}>
                  Итого
                </td>
                <td className="px-4 py-2  border ">
                  {formatNumber(monthlyPayment * tableData.length)} ₽
                </td>
                <td className="px-4 py-2  border ">
                  {formatNumber(overpayment)} ₽
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
