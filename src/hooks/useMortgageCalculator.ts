import { useEffect, useMemo, useState } from "react";
import { formatNumber, MAX_TERM_MONTHS, MAX_TERM_YEARS } from "../constants";
import useMortgagePage from "./useMortgagePage";

export const useMortgageCalculator = () => {
  const { mortgageData, isLoading, error } = useMortgagePage();

  const [state, setState] = useState({
    bank: 0,
    projectCost: 1000000,
    initialPayment: 200000,
    loanAmount: 800000,
    term: 30,
    termType: "months",
    rate: 0,
    monthlyPayment: 0,
    totalDebt: 0,
    overpayment: 0,
    endDate: "",
    startDate: new Date().toISOString().split("T")[0],
    showAllRows: false,
    showResults: false,
    termError: "",
    rateError: "",
  });

  const setField = (field: string) => (value: any) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      showResults: false,
    }));
  };

  const calculateMortgage = () => {
    if (state.rate <= 0) return;

    const monthlyRate = state.rate / 100 / 12;
    const numberOfPayments =
      state.termType === "years" ? state.term * 12 : state.term;

    if (numberOfPayments > 600) {
      setState((prev) => ({
        ...prev,
        monthlyPayment: 0,
        totalDebt: 0,
        overpayment: 0,
        endDate: "",
      }));
      return;
    }

    const monthlyPayment =
      (state.loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalDebt = monthlyPayment * numberOfPayments;
    const overpayment = totalDebt - state.loanAmount;
    const endDate = new Date(state.startDate);
    endDate.setMonth(endDate.getMonth() + numberOfPayments);

    setState((prev) => ({
      ...prev,
      monthlyPayment,
      totalDebt,
      overpayment,
      endDate: endDate.toLocaleDateString(),
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const termError =
      state.termType === "years" && state.term > MAX_TERM_YEARS
        ? "Срок не может быть больше 30 лет."
        : state.termType === "months" && state.term > MAX_TERM_MONTHS
        ? "Срок не может быть больше 360 месяцев."
        : "";

    const rateError = state.rate <= 0 ? "Введите процентную ставку." : "";

    if (termError || rateError) {
      setState((prev) => ({ ...prev, termError, rateError }));
      return;
    }

    calculateMortgage();
    setState((prev) => ({
      ...prev,
      showResults: true,
      showAllRows: false,
      termError: "",
      rateError: "",
    }));
  };

  const handleSelectBank = (bankId: number) => {
    const selectedBank = mortgageData?.banks.find((bank) => bank.id === bankId);
    if (selectedBank) {
      setState((prev) => ({
        ...prev,
        bank: bankId,
        rate: parseFloat(selectedBank.rate),
        loanAmount: prev.projectCost - prev.initialPayment,
        showResults: false,
        showAllRows: false,
      }));
    }
  };

  useEffect(() => {
    if (mortgageData) {
      setState((prev) => ({
        ...prev,
        loanAmount: prev.projectCost - prev.initialPayment,
      }));
      calculateMortgage();
    }
  }, [
    mortgageData,
    state.projectCost,
    state.initialPayment,
    state.term,
    state.termType,
    state.startDate,
    state.rate,
  ]);

  const pieData = useMemo(() => {
    if (!state.showResults) return [];

    return [
      { name: "Основной долг", value: state.loanAmount },
      { name: "Проценты", value: state.overpayment },
    ];
  }, [state.loanAmount, state.overpayment, state.showResults]);
  const barData = useMemo(() => {
    if (!state.showResults) return [];

    const data = [];
    let remainingDebt = state.loanAmount;

    const numberOfPayments =
      state.termType === "years" ? state.term * 12 : state.term;

    for (let i = 0; i < numberOfPayments; i++) {
      const interestPayment = remainingDebt * (state.rate / 100 / 12);
      const principalPayment = state.monthlyPayment - interestPayment;
      remainingDebt -= principalPayment;

      const paymentDate = new Date(state.startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      data.push({
        name: paymentDate.getFullYear().toString(),
        month: paymentDate.toLocaleString("ru-RU", {
          month: "long",
          year: "numeric",
        }),
        "Основной долг": principalPayment,
        Проценты: interestPayment,
      });
    }

    return data;
  }, [
    state.loanAmount,
    state.rate,
    state.monthlyPayment,
    state.term,
    state.termType,
    state.startDate,
    state.showResults,
  ]);

  const tableData = useMemo(() => {
    if (!state.showResults) return [];

    return barData.map((item, index) => ({
      month: item.month,
      payment: formatNumber(state.monthlyPayment),
      principal: formatNumber(item["Основной долг"]),
      interest: formatNumber(item["Проценты"]),
      remainingDebt: formatNumber(
        state.loanAmount -
          barData
            .slice(0, index + 1)
            .reduce((sum, payment) => sum + payment["Основной долг"], 0)
      ),
    }));
  }, [barData, state.loanAmount, state.monthlyPayment, state.showResults]);

  return {
    mortgageData,
    isLoading,
    error,
    ...state,
    pieData,
    barData,
    tableData,
    handleShowAllRows: () =>
      setState((prev) => ({ ...prev, showAllRows: true })),
    handleInputChange: setField,
    handleTermTypeChange: setField("termType"),
    handleStartDateChange: setField("startDate"),
    handleSubmit,
    handleSelectBank,
  };
};
