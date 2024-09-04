import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";

export const useFormSubmission = (
  selectedFiles: File[],
  closeModal: () => void
) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState,
    setError,
  } = useForm();
  const { name, phone, message } = watch();

  const recordForm: SubmitHandler<FieldValues> = async (data) => {
    if (!name)
      setError("name", { type: "manual", message: "Введите ваше имя" });
    if (!phone)
      setError("phone", {
        type: "manual",
        message: "Введите ваш телефон",
      });
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

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(`https://smtp.yolohaus.ru/send`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        reset();
        setValue("phone", "");
        closeModal();
      }
    } catch (error: any) {
      throw error
    }
  };

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    recordForm,
    setError,
  };
};
