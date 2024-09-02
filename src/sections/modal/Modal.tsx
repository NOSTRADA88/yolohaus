import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { slug } from "../../constants";
import { useFileSelection } from "../../hooks/useFileSelection";
import { useFormSubmission } from "../../hooks/useFormSubmission";
import truncateFileName from "../../utilts/truncateFileName";
import {memo, useEffect} from "react";

interface ModalProps {
  closeModal: () => void;
}

const Modal = ({ closeModal }: ModalProps) => {
  const { selectedFiles, handleFileChange, handleRemoveFile } =
    useFileSelection();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    recordForm,
  } = useFormSubmission(selectedFiles, closeModal);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[30%] max-md:w-full max-2xl:w-[50%] max-xl:w-[70%] bg-white p-10 max-xl:mx-16 max-md:mx-12 max-sm:mx-4 relative">
        <button
          className="absolute top-2 right-2 text-black text-2xl font-montserrat cursor-pointer"
          onClick={closeModal}
        >
          <p className="text-maingray font-bold  text-[35px]">⨯ </p>
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

                <PatternFormat
                  format="+7 (###) ###-##-##"
                  allowEmptyFormatting
                  mask="_"
                  className="w-full h-10 pl-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                  placeholder="Телефон"
                  onValueChange={(values) => {
                    setValue("phone", values.value);
                  }}
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
                          <p className="text-red-500 font-light text-lg">⨯ </p>
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
                onClick={closeModal}
                className="underline cursor-pointer "
                to={`${slug.privacy}`}
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

export default memo(Modal);
