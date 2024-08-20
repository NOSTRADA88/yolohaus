import { ConsultationPhoto } from "../../assets";
import { PatternFormat } from "react-number-format";
import { Link, useLocation } from "react-router-dom";
import { slug } from "../../constants";
import { useConsultationForm } from "../../hooks/useConsultationForm";

const Consultation = () => {
  const location = useLocation();
  const { register, handleSubmit, recordForm, formErrors, setValue } =
    useConsultationForm();

  return (
    <div className="bg-orange">
      <div
        className={`w-full pt-14 pb-10 max-w-[1111px] mx-auto max-[1111px]:px-12 max-sm:px-5 ${
          location.pathname === "/" ? "max-sm:pt-52" : ""
        }`}
      >
        <div className="grid grid-cols-2 gap-8 max-[1111px]:grid-cols-1 max-[1111px]:gap-4">
          <div className="flex flex-col w-full mx-auto">
            <h1 className="text-white font-museo font-bold text-3xl mb-4 max-md:text-2xl">
              Нужна консультация?
            </h1>
            <p className="font-museo font-light text-sm text-white">
              Опытный специалист поможет разобраться во всех тонкостях
              домостроения
            </p>
            <form
              className="w-[80%] max-[1111px]:w-full"
              onSubmit={handleSubmit(recordForm)}
            >
              <div className="flex flex-col mt-10 mb-5">
                <div className="flex justify-between mb-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray bg-[#f9e0c3]"
                      placeholder="Ваше имя"
                      {...register("name")}
                    />
                    {formErrors.name && (
                      <div className="text-red-600 font-museo text-xs font-light text-center">
                        {formErrors.name?.message as string}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow ml-4">
                    <PatternFormat
                      format="+7 (###) ###-##-##"
                      allowEmptyFormatting
                      mask="_"
                      className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray bg-[#f9e0c3]"
                      placeholder="Телефон"
                      onValueChange={(values) => {
                        setValue("phone", values.value);
                      }}
                    />
                    {formErrors.phone && (
                      <div className="text-red-600 font-museo text-xs font-light text-center">
                        {formErrors.phone?.message as string}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full mt-2">
                  <textarea
                    className="w-full h-16 max-h-24 p-2 font-museo text-xs font-light text-maingray bg-[#f9e0c3]"
                    placeholder="Ваше сообщение"
                    {...register("message")}
                  />
                  {formErrors.message && (
                    <div className="text-red-600 font-museo text-xs font-light text-center">
                      {formErrors.message?.message as string}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-[3.5px] items-center mb-4">
                <div className="parallelogram h-10 border-l-[1px] border-white"></div>
                <button
                  type="submit"
                  className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-white hover:bg-orange hover:text-white transform parallelogram w-[140px] h-10 border-[1px] border-white"
                >
                  <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">
                    Отправить
                  </p>
                </button>

                <div className="ml-4">
                  <p className="text-xs font-museo font-medium text-white">
                    Отправляя форму, я даю согласие на обработку
                    <Link
                      className="underline cursor-pointer"
                      to={slug.privacy}
                    >
                      {" "}
                      персональных данных
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-center items-center max-[1111px]:hidden">
            <img
              src={ConsultationPhoto}
              alt="photoAbout"
              width={350}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
