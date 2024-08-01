import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchMortgageData } from "../../api";
import { API_URL } from "../../constants";
import { BankSelection, MortgageForm } from "../../components/mortgage";
const CalculationResults = lazy(
  () => import("../../components/mortgage/CalculationResults")
);
interface Child {
  text: string;
  type: string;
}

interface DescriptionItem {
  type: string;
  children: Child[];
}

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

interface MortgageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  titleDescription: string;
  description: DescriptionItem[];
  photoMortgage: string;
  banks: Bank[];
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
    titleDescription: "",
    description: [],
    photoMortgage: "",
    banks: [],
  });

  const [bank, setBank] = useState<number>(0);
  const [projectCost, setProjectCost] = useState<number>(1000000);
  const [initialPayment, setInitialPayment] = useState<number>(200000);
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [term, setTerm] = useState<number>(30);
  const [termType, setTermType] = useState<string>("months");
  const [rate, setRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [showAllRows, setShowAllRows] = useState(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleShowAllRows = () => {
    setShowAllRows(true);
  };

  const fetchData = async () => {
    try {
      const mortgageDataResponse = await fetchMortgageData();
      setMortgageData({
        metaTitle: mortgageDataResponse.Metadata.MetaTitle,
        metaDescription: mortgageDataResponse.Metadata.MetaDescription,
        title: mortgageDataResponse.Title,
        titleDescription: mortgageDataResponse.TitleDescription,
        description: mortgageDataResponse.Description,
        photoMortgage: mortgageDataResponse.Photo.data.attributes.url,
        banks: mortgageDataResponse.banks_list.data,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  const handleInputChange =
    (setter: (value: number) => void) => (value: number) => {
      setter(value);
      setShowResults(false);
    };

  const handleTermTypeChange = (value: string) => {
    setTermType(value);
    setShowResults(false);
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateMortgage(rate);
    setShowResults(true);
  };

  const handleSelectBank = (bankId: number) => {
    const selectedBank = mortgageData.banks.find((bank) => bank.id === bankId);
    if (selectedBank) {
      setBank(bankId);
      setRate(parseFloat(selectedBank.attributes.Rate));
      setLoanAmount(projectCost - initialPayment);
      setMonthlyPayment(0);
      setTotalDebt(0);
      setOverpayment(0);
      setEndDate("");
      setShowResults(false);
      setShowAllRows(false);
    }
  };

  useEffect(() => {
    setLoanAmount(projectCost - initialPayment);
    calculateMortgage(rate);
  }, [bank, rate, projectCost, initialPayment, term, termType, startDate]);

  const pieData = [
    { name: "Основной долг", value: loanAmount },
    { name: "Проценты", value: overpayment },
  ];

  const barData: any[] = [];
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
                  {mortgageData.titleDescription}
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
              src={`${API_URL}${mortgageData.photoMortgage}`}
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
                banks={mortgageData.banks}
                selectedBank={bank}
                onSelectBank={handleSelectBank}
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
                  onProjectCostChange={handleInputChange(setProjectCost)}
                  onInitialPaymentChange={handleInputChange(setInitialPayment)}
                  onRateChange={handleInputChange(setRate)}
                  onTermChange={handleInputChange(setTerm)}
                  onTermTypeChange={handleTermTypeChange}
                  onStartDateChange={handleStartDateChange}
                  onSubmit={handleSubmit}
                />
                {showResults &&
                  monthlyPayment > 0 &&
                  ((termType === "years" && term <= 30) ||
                    (termType === "months" && term <= 365)) && (
                    <Suspense>
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
                    </Suspense>
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
