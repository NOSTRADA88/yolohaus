import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import InputMask from "react-input-mask";
import axios from "axios";
import { fetchPrivacyPolicyData } from "../../api";
import { Link } from "react-router-dom";

type ModalProps = {
  closeModal: () => void;
};

const Modal = ({ closeModal }: ModalProps) => {
  const [, setErrors] = useState<{ [key: string]: string[] }>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [slugPrivacy, setSlugPrivacy] = useState<string>("");

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

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

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
        setSelectedFiles([]);
        closeModal();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Ошибка запроса:", error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length <= maxLength) return fileName;
    const extIndex = fileName.lastIndexOf(".");
    const extension = fileName.substring(extIndex);
    const name = fileName.substring(0, extIndex);
    return `${name.substring(0, maxLength)}...${extension}`;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchData = async () => {
    try {
      const privacyData = await fetchPrivacyPolicyData();
      setSlugPrivacy(privacyData.slug);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[30%] max-md:w-full max-2xl:w-[50%] max-xl:w-[70%] bg-white p-10 max-xl:mx-16 max-md:mx-12 max-sm:mx-4 relative">
        <button
          className="absolute top-2 right-2 text-black text-2xl font-montserrat cursor-pointer"
          onClick={closeModal}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="text-maingray font-light"
          />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="font-museo text-[24px] font-bold text-maingray ">
            Напишите нам
          </h1>
          <form className="w-full" onSubmit={handleSubmit(recordForm)}>
            <div className="flex flex-col mt-5 mb-5">
              <div className="flex flex-col gap-4 justify-between mb-2">
                <input
                  type="text"
                  className="w-full h-10 pl-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                  placeholder="Ваше имя"
                  {...register("name", { required: "Введите ваше имя" })}
                />
                {formErrors.name && (
                  <div className="text-red-400 font-museo text-xs font-light text-center">
                    {formErrors.name?.message as string}
                  </div>
                )}
                <InputMask
                  mask="+7 (999) 999-99-99"
                  className="w-full h-10 pl-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                  placeholder="Телефон"
                  {...register("phone", { required: "Введите ваш телефон" })}
                />
                {formErrors.phone && (
                  <div className="text-red-400 font-museo text-xs font-light text-center">
                    {formErrors.phone?.message as string}
                  </div>
                )}
              </div>
              <div className="w-full mt-2">
                <textarea
                  className="w-full h-16 max-h-24 p-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                  placeholder="Ваше сообщение"
                  {...register("message", {
                    required: "Введите ваше сообщение",
                  })}
                />
                {formErrors.message && (
                  <div className="text-red-400 font-museo text-xs font-light text-center">
                    {formErrors.message?.message as string}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-2 justify-center items-center mt-2">
                <h2 className="text-sm font-museo font-medium text-maingray text-center">
                  Прикрепить документы, эскизы дома
                </h2>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange hover:bg-white text-white hover:text-maingray transform w-[140px] h-10 border-[1px] border-orange">
                    <p className="text-sm font-museo font-medium">
                      {selectedFiles.length > 0
                        ? `Загружено: ${selectedFiles.length}`
                        : "Загрузить файлы"}
                    </p>
                  </div>
                </label>
                {selectedFiles.length > 0 && (
                  <div className="text-xs font-museo font-medium text-maingray text-center">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between w-full gap-2"
                      >
                        <p>{truncateFileName(file.name, 20)}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="ml-2 text-red-500"
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-red-500 font-light text-base"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedFiles.length === 0 && (
                  <p className="text-xs font-museo font-medium text-maingray text-center">
                    Типы файлов: jpg, png, doc, pdf, rar, zip <br />
                    (Размер файла не должен превышать 10мб)
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex gap-[3.5px] items-center mb-4">
                <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
                <button
                  type="submit"
                  className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange hover:bg-white text-white hover:text-maingray transform parallelogram w-[140px] h-10 border-[1px] border-orange"
                >
                  <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">
                    Отправить
                  </p>
                </button>
              </div>
            </div>
            <p className="text-xs font-museo font-medium text-maingray text-center">
              Отправляя форму, я даю согласие на обработку
              <br />{" "}
              <Link
                className="underline cursor-pointer "
                to={`/${slugPrivacy}`}
              >
                {" "}
                персональных данных{" "}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
