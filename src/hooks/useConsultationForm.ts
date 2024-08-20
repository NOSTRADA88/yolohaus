import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export const useConsultationForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
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
    if (!name)
      setError("name", { type: "manual", message: "Введите ваше имя" });
    if (!phone)
      setError("phone", { type: "manual", message: "Введите ваш телефон" });
    if (!message)
      setError("message", {
        type: "manual",
        message: "Введите ваше сообщение",
      });

    try {
      const currentUrl = window.location.href;
      data.url = currentUrl;

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("url", data.url);

      const response = await axios.post("http://149.154.65.51/send", formData, {
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

  return {
    register,
    handleSubmit,
    recordForm,
    formErrors,
    setValue,
  };
};
