import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchHomeData, fetchMortgageData } from "../../api";
import { MortgagePhoto } from "../../assets";
import { API_URL } from "../../constants";
import {
  BankSelection,
  CalculationResults,
  MortgageForm,
} from "../../components/mortgage";

interface Child {
  text: string;
  type: string;
}

interface DescriptionItem {
  type: string;
  children: Child[];
}

interface MortgageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleMini: string;
  description: DescriptionItem[];
  photoMortgage: string;
}

interface BankOptions {
  [key: string]: {
    name: string;
    rate: number;
    photo: string;
  };
}

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const MortgageAbout = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    metaTitle: "",
    metaDescription: "",
    title: "",

    titleMini: "Ипотека от «YOLO HAUS» – ваш путь к загородной мечте",
    description: [
      {
        type: "paragraph",
        children: [
          {
            text: "Здесь вы найдете всю необходимую информацию для выбора оптимальной ипотеки, соответствующей вашим финансовым возможностям и жизненным планам.",
            type: "text",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Мы предлагаем широкий выбор ипотечных программ от ведущих банков страны, включая СберБанк, Альфа-Банк, РоссельхозБанк, Газпромбанк, Сургутнефтегаз и ДОМ.РФ. Наша цель - помочь вам сделать правильный выбор и предоставить все инструменты для комфортного оформления ипотеки.",
            type: "text",
          },
        ],
      },
    ],
    photoMortgage: "/images/mortgage_photo.jpg",
  });
  const [bankOptions, setBankOptions] = useState<BankOptions>({
    sber: { name: "СберБанк", rate: 15.9, photo: "" },
    rosselhoz: { name: "РоссельхозБанк", rate: 7.15, photo: "" },
    domrf: { name: "ДОМ.РФ", rate: 5.3, photo: "" },
    alfa: { name: "Альфабанк", rate: 6, photo: "" },
    gazprom: { name: "Газпромбанк", rate: 6.2, photo: "" },
    pochta: { name: "Почта банк", rate: 8, photo: "" },
    ros: { name: "Росбанк", rate: 12.2, photo: "" },
    surgutneftegaz: { name: "Сургутнефтегаз", rate: 6.0, photo: "" },
  });

  const [bank, setBank] = useState<string>("sber");
  const [projectCost, setProjectCost] = useState<number>(1000000);
  const [initialPayment, setInitialPayment] = useState<number>(200000);
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [term, setTerm] = useState<number>(30);
  const [termType, setTermType] = useState<string>("months");
  const [rate, setRate] = useState<number>(bankOptions[bank].rate);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [showAllRows, setShowAllRows] = useState(false);

  const handleShowAllRows = () => {
    setShowAllRows(true);
  };

  const fetchData = async () => {
    try {
      const mortgageDataResponse = await fetchMortgageData();
      const mainData = await fetchHomeData();
      const photos = mainData.Mortgage.Photos.data || [];

      const updatedBankOptions = { ...bankOptions };

      photos.forEach((photo: { attributes: { name: string; url: any } }) => {
        const bankKey = photo.attributes.name.split(".")[0].toLowerCase();
        if (updatedBankOptions[bankKey]) {
          updatedBankOptions[
            bankKey
          ].photo = `${API_URL}${photo.attributes.url}`;
        }
      });

      setMortgageData({
        metaTitle: mortgageDataResponse.Metadata.MetaTitle,
        metaDescription: mortgageDataResponse.Metadata.MetaDescription,
        title: mortgageDataResponse.Title,
        titleMini: "Ипотека от «YOLO HAUS» – ваш путь к загородной мечте",
        description: [
          {
            type: "paragraph",
            children: [
              {
                text: "Здесь вы найдете всю необходимую информацию для выбора оптимальной ипотеки, соответствующей вашим финансовым возможностям и жизненным планам.",
                type: "text",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "Мы предлагаем широкий выбор ипотечных программ от ведущих банков страны, включая СберБанк, Альфа-Банк, РоссельхозБанк, Газпромбанк, Сургутнефтегаз и ДОМ.РФ. Наша цель - помочь вам сделать правильный выбор и предоставить все инструменты для комфортного оформления ипотеки.",
                type: "text",
              },
            ],
          },
        ],
        photoMortgage: "/images/mortgage_photo.jpg",
      });
      setBankOptions(updatedBankOptions);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const bankRate = bankOptions[bank].rate;
    setRate(bankRate);
    setLoanAmount(projectCost - initialPayment);
    calculateMortgage(bankRate);
  }, [bank, projectCost, initialPayment, term, termType, startDate]);

  useEffect(() => {
    calculateMortgage(rate);
  }, [rate]);

  const calculateMortgage = (currentRate: number) => {
    const monthlyRate = currentRate / 100 / 12;
    const numberOfPayments = termType === "years" ? term * 12 : term;

    if (numberOfPayments > 600) {
      setMonthlyPayment(0);
      setTotalDebt(0);
      setOverpayment(0);
      setEndDate("");
      return;
    }

    const monthlyPaymentCalc =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPaymentCalc * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    const endDateCalc = new Date(startDate);
    endDateCalc.setMonth(endDateCalc.getMonth() + numberOfPayments);

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalDebt(totalPayment);
    setOverpayment(totalInterest);
    setEndDate(endDateCalc.toLocaleDateString());
  };

  const pieData = [
    { name: "Основной долг", value: loanAmount },
    { name: "Проценты", value: overpayment },
  ];

  const barData: any[] | undefined = [];
  let remainingDebt = loanAmount;

  for (let i = 0; i < (termType === "years" ? term * 12 : term); i++) {
    const interestPayment = remainingDebt * (rate / 100 / 12);
    const principalPayment = monthlyPayment - interestPayment;
    remainingDebt -= principalPayment;

    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    barData.push({
      name: paymentDate.getFullYear().toString(),
      month: paymentDate.toLocaleString("ru-RU", {
        month: "long",
        year: "numeric",
      }),
      "Основной долг": principalPayment,
      Проценты: interestPayment,
    });
  }

  const tableData = barData.map((item, index) => ({
    month: item.month,
    payment: formatNumber(monthlyPayment),
    principal: formatNumber(item["Основной долг"]),
    interest: formatNumber(item["Проценты"]),
    remainingDebt: formatNumber(
      loanAmount -
        barData
          .slice(0, index + 1)
          .reduce((sum, payment) => sum + payment["Основной долг"], 0)
    ),
  }));

  return (
    <div>
      <Helmet>
        <title>{mortgageData.metaTitle}</title>
        <meta name="description" content={mortgageData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {mortgageData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              Главная /{" "}
            </Link>

            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {mortgageData.title}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            <div className=" bg-lightwhite p-5">
              <div className="flex items-center">
                <p className="font-light text-xl font-museo leading-normal text-justify text-maingray">
                  {mortgageData.titleMini}
                </p>
              </div>
            </div>
            {mortgageData.description.map((item, index) => (
              <div
                key={index}
                className="mt-5 ml-4 w-[85%] max-[1111px]:w-full max-[1111px]:pr-8"
              >
                {item.children.map((child, childIndex) => (
                  <p
                    className="font-light text-sm font-museо leading-relaxed text-justify"
                    key={childIndex}
                  >
                    {child.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className=" mt-[50px] max-[1111px]:hidden">
            <img
              src={MortgagePhoto}
              alt="MortgagePhoto"
              className="w-full h-[350px] object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-museо font-bold text-maingray mb-4">
              Ипотечный калькулятор
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <BankSelection
                bankOptions={bankOptions}
                selectedBank={bank}
                onSelectBank={setBank}
              />
              <div className="w-full">
                <MortgageForm
                  projectCost={projectCost}
                  initialPayment={initialPayment}
                  loanAmount={loanAmount}
                  rate={rate}
                  term={term}
                  termType={termType}
                  startDate={startDate}
                  onProjectCostChange={setProjectCost}
                  onInitialPaymentChange={setInitialPayment}
                  onRateChange={setRate}
                  onTermChange={setTerm}
                  onTermTypeChange={setTermType}
                  onStartDateChange={setStartDate}
                  onSubmit={(e) => {
                    e.preventDefault();
                    calculateMortgage(rate);
                  }}
                />

                {monthlyPayment > 0 &&
                  ((termType === "years" && term <= 30) ||
                    (termType === "months" && term <= 365)) && (
                    <CalculationResults
                      monthlyPayment={monthlyPayment}
                      totalDebt={totalDebt}
                      overpayment={overpayment}
                      endDate={endDate}
                      pieData={pieData}
                      barData={barData}
                      tableData={tableData}
                      showAllRows={showAllRows}
                      handleShowAllRows={handleShowAllRows}
                      term={term}
                      termType={termType}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MortgageAbout };
