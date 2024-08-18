import { useCallback, useEffect, useMemo, useState } from "react";
import { MAX_TERM_MONTHS, MAX_TERM_YEARS } from "../constants";
import useMortgagePage from "./useMortgagePage";

export const formatNumber = (number: number) =>
  new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

const useMortgageCalculator = () => {
  const { mortgageData, isLoading, error } = useMortgagePage();
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
  const [termError, setTermError] = useState<string>("");
  const [rateError, setRateError] = useState<string>("");

  const handleShowAllRows = () => setShowAllRows(true);

  const calculateMortgage = useCallback(
    (currentRate: number) => {
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
    },
    [loanAmount, startDate, term, termType]
  );

  const validateTerm = useCallback(
    (value: number) => {
      if (
        (termType === "years" && value > 30) ||
        (termType === "months" && value > 365)
      ) {
        return "Срок не может быть больше 30 лет или 365 месяцев.";
      }
      return "";
    },
    [termType]
  );

  const validateRate = (value: number) =>
    value <= 0 ? "Введите процентную ставку." : "";

  const handleInputChange = useCallback(
    (
        setter: (value: number) => void,
        errorSetter: (message: string) => void,
        validator: (value: number) => string
      ) =>
      (value: number) => {
        const errorMessage = validator(value);
        errorSetter(errorMessage);
        setter(value);
        setShowResults(false);
      },
    []
  );

  const handleTermTypeChange = useCallback(
    (value: string) => {
      setTermType(value);
      setTermError(validateTerm(term));
      setShowResults(false);
    },
    [term, validateTerm]
  );

  const handleStartDateChange = useCallback((value: string) => {
    setStartDate(value);
    setShowResults(false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let hasError = false;

      setTermError("");
      setRateError("");

      if (
        (termType === "years" && term > MAX_TERM_YEARS) ||
        (termType === "months" && term > MAX_TERM_MONTHS)
      ) {
        setTermError("Срок не может быть больше 30 лет или 360 месяцев.");
        hasError = true;
      }

      if (rate <= 0) {
        setRateError("Введите процентную ставку.");
        hasError = true;
      }

      if (hasError) return;

      calculateMortgage(rate);
      setShowResults(true);
      setShowAllRows(false);
    },
    [calculateMortgage, rate, term, termType]
  );

  const handleSelectBank = useCallback(
    (bankId: number) => {
      const selectedBank = mortgageData?.banks.find(
        (bank) => bank.id === bankId
      );
      if (selectedBank) {
        setBank(bankId);
        setRate(parseFloat(selectedBank.rate));
        setLoanAmount(projectCost - initialPayment);
        setMonthlyPayment(0);
        setTotalDebt(0);
        setOverpayment(0);
        setEndDate("");
        setShowResults(false);
        setShowAllRows(false);
      }
    },
    [mortgageData, projectCost, initialPayment]
  );

  useEffect(() => {
    if (mortgageData) {
      setLoanAmount(projectCost - initialPayment);
      calculateMortgage(rate);
    }
  }, [mortgageData, projectCost, initialPayment, rate, calculateMortgage]);

  const pieData = useMemo(
    () => [
      { name: "Основной долг", value: loanAmount },
      { name: "Проценты", value: overpayment },
    ],
    [loanAmount, overpayment]
  );

  const barData = useMemo(() => {
    let remainingDebt = loanAmount;
    return Array.from({
      length: termType === "years" ? term * 12 : term,
    }).map((_, i) => {
      const interestPayment = remainingDebt * (rate / 100 / 12);
      const principalPayment = monthlyPayment - interestPayment;
      remainingDebt -= principalPayment;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      return {
        name: paymentDate.getFullYear().toString(),
        month: paymentDate.toLocaleString("ru-RU", {
          month: "long",
          year: "numeric",
        }),
        "Основной долг": principalPayment,
        Проценты: interestPayment,
        remainingDebt,
      };
    });
  }, [loanAmount, monthlyPayment, rate, startDate, term, termType]);

  const tableData = useMemo(
    () =>
      barData.map((item) => ({
        month: item.month,
        payment: formatNumber(monthlyPayment),
        principal: formatNumber(item["Основной долг"]),
        interest: formatNumber(item["Проценты"]),
        remainingDebt: formatNumber(item.remainingDebt),
      })),
    [barData, monthlyPayment]
  );

  return {
    mortgageData,
    isLoading,
    error,
    bank,
    projectCost,
    initialPayment,
    loanAmount,
    term,
    termType,
    rate,
    monthlyPayment,
    totalDebt,
    overpayment,
    endDate,
    startDate,
    showAllRows,
    showResults,
    termError,
    rateError,
    pieData,
    barData,
    tableData,
    handleSelectBank,
    handleInputChange,
    handleTermTypeChange,
    handleStartDateChange,
    handleSubmit,
    handleShowAllRows,
    setProjectCost, // добавлено
    setInitialPayment, // добавлено
    setRate, // добавлено
    setRateError, // добавлено
    validateRate, // добавлено
    setTerm, // добавлено
    setTermError, // добавлено
    validateTerm, // добавлено
  };
};

export default useMortgageCalculator;
