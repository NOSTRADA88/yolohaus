import { useState } from "react";
import { ConsultationPhoto } from "../../assets";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../constants";
import InputMask from 'react-input-mask';

const Consultation = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm()

  const recordForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      const currentUrl = window.location.href;
      data.url = currentUrl;
      if (data.text) {
        data.text = `Запись на консультацию. Вид обращения: [${data.text}]`;
      } else {
        data.text = "Запись на консультацию";
      }
      const response = await axios.post(
        `${API_URL}/api/feedback/store`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <div className="w-full pt-14 pb-10  max-w-[1111px] mx-auto">
      <div className="flex justify-center ">
        <div className="flex flex-col w-full  mx-auto  ">
          <h1 className="text-white font-museo font-bold text-3xl mb-4">Нужна консультация?</h1>
          <p className="font-museo font-light text-sm text-white mr-20">
            Опытный специалист поможет разобраться во всех тонкостях домостроения
          </p>
          <form className="w-[80%]" onSubmit={handleSubmit(recordForm)} >
            <div className="flex flex-col mt-10 mb-5">
              <div className="flex justify-between mb-2">
                <div className="flex-grow ">
                  <input
                    type="text"
                    className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray  bg-[#f9e0c3]"
                    placeholder="Ваше имя"
                    {...register("author")}
                  />
                  {errors.author && (
                    <div className="text-red-400">{errors.author[0]}</div>
                  )}
                </div>
                <div className="flex-grow ml-4">
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    className="w-full h-10 pl-2 font-museo text-xs font-light text-maingray  bg-[#f9e0c3]"
                    placeholder="Телефон"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <div className="text-red-400">{errors.phone[0]}</div>
                  )}
                </div>
              </div>
              <div className="w-full mt-2">
                <textarea
                  className="w-full h-16 max-h-24 p-2 font-museo text-xs font-light text-maingray bg-[#f9e0c3]"
                  placeholder="Ваше сообщение"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-400">{errors.email[0]}</div>
                )}
              </div>
            </div>
            <div className="flex gap-[3.5px] items-center mb-4">
              <div className="parallelogram h-10 border-l-[1px] border-white"></div>
              <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-white hover:bg-orange hover:text-white transform parallelogram w-[140px] h-10 border-[1px] border-white">
                <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">Отправить</p>
              </div>
              <div className="ml-4">
              <p className="text-xs font-museo font-medium text-white">Отправляя форму, я даю согласие на обработку
            <br/> <a className="underline cursor-pointer " href="/"> персональных данных </a> </p>
            </div>
            </div>
          </form>

        </div>

        <div className="w-full ">
          <img src={ConsultationPhoto} alt="photoAbout" className="w-full h-full " />
        </div>
      </div>
    </div>
  );
}

export default Consultation;
