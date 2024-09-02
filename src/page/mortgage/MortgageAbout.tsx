import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { BankSelection, MortgageForm } from "../../components/mortgage";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { useMortgageCalculator } from "../../hooks/useMortgageCalculator";
import { useInView } from "react-intersection-observer";
import { API_URL } from "../../constants";
import { photoMortgage } from "../../assets";

const CalculationResults = lazy(() => import("../../components/mortgage/CalculationResults"));

const MortgageAbout = () => {
  const {
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
    handleShowAllRows,
    handleInputChange,
    handleTermTypeChange,
    handleStartDateChange,
    handleSubmit,
    handleSelectBank,
  } = useMortgageCalculator();

  const { ref: refResult, inView: inViewResult } = useInView({
    triggerOnce: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museо">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!mortgageData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-base font-museо">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{mortgageData.metadata.title}</title>
        <meta name="description" content={mortgageData.metadata.description} />
        <link rel="preload" href={photoMortgage} as="image"/>
        {mortgageData.banks.map(bank => (
            <link rel="preload" href={`${API_URL}${bank.photo.url}`} as="image"/>
        ))}
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs finalTitle={mortgageData.title} />
        <div className="flex justify-between items-center max-xl:mt-20 max-md:mt-10">
          <div className="flex flex-col w-[60%] max-[1111px]:w-full">
            <div className="bg-lightwhite p-5">
              <p className="font-light text-xl font-museо leading-normal text-justify text-maingray">
                {mortgageData.titleDescription}
              </p>
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
          <div className="mt-[32px] max-[1111px]:hidden ">
            <img
              src={photoMortgage}
              alt="MortgagePhoto"
              width={150}
              height={320}
              className="h-[300px]"
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
                  onProjectCostChange={handleInputChange("projectCost")}
                  onInitialPaymentChange={handleInputChange("initialPayment")}
                  onRateChange={handleInputChange("rate")}
                  onTermChange={handleInputChange("term")}
                  onTermTypeChange={handleTermTypeChange}
                  onStartDateChange={handleStartDateChange}
                  onSubmit={handleSubmit}
                  termError={termError}
                  rateError={rateError}
                />
                <div ref={refResult}>
                  {inViewResult && showResults && monthlyPayment > 0 && (
                    <Suspense fallback={isLoading}>
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
    </div>
  );
};

export { MortgageAbout };
