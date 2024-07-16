import { useState } from "react";
import { ConsultationPhoto } from "../../assets";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";

type ConsultationProps = {
  slugPrivacy: string;
};

const Consultation = ({ slugPrivacy }: ConsultationProps) => {
  const [, setErrors] = useState<{ [key: string]: string[] }>({});
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors: formErrors },
    setError,
  } = useForm();
  const { name, phone, message } = watch();
  const recordForm: SubmitHandler<FieldValues> = async (data) => {
    if (!name || !phone || !message) {
      if (!name)
        setError("name", { type: "manual", message: "Введите ваше имя" });
      if (!phone)
        setError("phone", { type: "manual", message: "Введите ваш телефон" });
      if (!message)
        setError("message", {
          type: "manual",
          message: "Введите ваше сообщение",
        });
      return;
    }

    try {
      const currentUrl = window.location.href;
      data.url = currentUrl;

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("url", data.url);

      const response = await axios.post(`http://149.154.65.51/send`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Данные успешно отправлены");
        reset();
        setErrors({});
        setValue("phone", "");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Ошибка запроса:", error);
      }
    }
  };

  return (
    <div
      className={`w-full pt-14 pb-10 max-w-[1111px] mx-auto max-[1111px]:px-12 max-sm:px-5 ${
        location.pathname === "/" ? "max-sm:pt-52" : ""
      }`}
    >
      <div className="flex justify-center max-[1111px]:flex-col ">
        <div className="flex flex-col w-full mx-auto max-[1111px]:items-center max-md:items-start">
          <h1 className="text-white font-museo font-bold text-3xl mb-4 max-md:text-2xl">
            Нужна консультация?
          </h1>
          <p className="font-museo font-light text-sm text-white mr-20">
            Опытный специалист поможет разобраться во всех тонкостях
            домостроения
          </p>
          <form
            className="w-[80%] max-[1111px]:w-full "
            onSubmit={handleSubmit(recordForm)}
          >
            <div className="flex flex-col mt-10 mb-5">
              <div className="flex justify-between mb-2">
                <div className="flex-grow ">
                  <input
                    type="text"
                    className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray  bg-[#f9e0c3]"
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
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray  bg-[#f9e0c3]"
                    placeholder="Телефон"
                    {...register("phone")}
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
            <div className="flex gap-[3.5px] items-center mb-4 ">
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
                    className="underline cursor-pointer "
                    to={`/${slugPrivacy}`}
                  >
                    {" "}
                    персональных данных{" "}
                  </Link>{" "}
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full">
          <img
            src={ConsultationPhoto}
            alt="photoAbout"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Consultation;
