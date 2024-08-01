import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchHomeData, fetchMortgageData } from "../../api";
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

interface Bank {
  id: number;
  attributes: {
    Title: string;
    URL: string;
    Rate: string;
    Photo: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface MortgageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  TitleDescription: string;
  Description: DescriptionItem[];
  Photo: string;
  banks_list: Bank[];
}

interface BankOptions {
  [key: string]: {
    name: string;
    rate: number;
    photo: string;
    url: string;
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
    TitleDescription: "",
    Description: [],
    Photo: "",
    banks_list: [],
  });

  const [bankOptions, setBankOptions] = useState<BankOptions>({
    sber: {
      name: "СберБанк",
      rate: 21,
      photo: "",
      url: "https://www.sberbank.ru/ru/person/credits/homenew",
    },
    rosselhoz: {
      name: "РоссельхозБанк",
      rate: 16.25,
      photo: "",
      url: "https://svoe-selo.ru/mortgage/programs/buy-build-house",
    },
    domrf: {
      name: "ДОМ.РФ",
      rate: 20.35,
      photo: "",
      url: "https://domrfbank.ru/mortgage/",
    },
    alfa: {
      name: "Альфабанк",
      rate: 20.1,
      photo: "",
      url: "https://alfabank.ru/get-money/mortgage/ipoteka-na-stroitelstvo-doma/?platformId=yandex_cpc_yxpript_yandex_ipoteka_core_search_brand_rf%257C52079437008_52079437008%257Ccid%257C111720329%257Cgid%257C5455465604%257Caid%257C16212703355%257Caud%257C0%257Cadp%257Cno%257Cpos%257Cpremium1%257Csrc%257Csearch_none%257Cdvc%257Cdesktop%257Creg2_%25D0%25A1%25D0%25B0%25D0%25BD%25D0%25BA%25D1%2582-%25D0%259F%25D0%25B5%25D1%2582%25D0%25B5%25D1%2580%25D0%25B1%25D1%2583%25D1%2580%25D0%25B3",
    },
    gazprom: {
      name: "Газпромбанк",
      rate: 22,
      photo: "",
      url: "https://www.gazprombank.ru/personal/take_credit/mortgage/7131239/",
    },
    pochta: {
      name: "Почта банк",
      rate: 20.9,
      photo: "",
      url: "https://www.pochtabank.ru/service/mortgage/ipoteka_na_stroitelstvo_doma",
    },
    ros: {
      name: "Росбанк",
      rate: 18.9,
      photo: "",
      url: "https://www.rosbank.ru/ipoteka/",
    },
    surgutneftegaz: {
      name: "Сургутнефтегаз",
      rate: 20,
      photo: "",
      url: "https://www.sngb.ru/products/mortgage/chastnyy-dom",
    },
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
  const [showResults, setShowResults] = useState<boolean>(false);

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
        TitleDescription: mortgageDataResponse.TitleDescription,
        Description: mortgageDataResponse.Description,
        Photo: mortgageDataResponse.Photo.data.attributes.url,
        banks_list: mortgageDataResponse.banks_list,
      });
      console.log(mortgageData.banks_list);

      setBankOptions(updatedBankOptions);
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

  const handleSelectBank = (selectedBank: string) => {
    setBank(selectedBank);
    setRate(bankOptions[selectedBank].rate);

    setMonthlyPayment(0);
    setTotalDebt(0);
    setOverpayment(0);
    setEndDate("");
    setShowResults(false);
    setShowAllRows(false);
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
                  {mortgageData.TitleDescription}
                </p>
              </div>
            </div>
            {mortgageData.Description.map((item, index) => (
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
              src={`${API_URL}${mortgageData.Photo}`}
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
