import { formatNumber } from "../constants";

export const renderTooltip = (props: any) => {
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
        <p className="text-sm font-museо text-maingray">{month}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="text-sm font-museо text-maingray"
          >
            {entry.name}: {formatNumber(entry.value)} ₽
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const tickFormatter = (
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

export const COLORS = ["#EA9635", "#2B2A29"];
