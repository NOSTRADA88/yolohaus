import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import axios from "axios";
import { API_URL } from "../../constants";

type ModalProps = {
    closeModal: () => void;
};

const Modal = ({ closeModal }: ModalProps) => {
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
            const formData = new FormData();
            formData.append("file", selectedFile || '');
            formData.append("data", JSON.stringify(data)); 

            const response = await axios.post(
                `${API_URL}/api/feedback/store`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Данные успешно отправлены");
                reset();
                setErrors({});
                setValue("phone", "");
                setSelectedFile(null); 
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
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-[30%] max-md:w-full max-2xl:w-[50%] max-xl:w-[70%] bg-white p-10 max-xl:mx-16 max-md:mx-12 max-sm:mx-4 relative">
                <button
                    className="absolute top-2 right-2 text-black text-2xl font-montserrat cursor-pointer"
                    onClick={closeModal}
                >
                    <FontAwesomeIcon icon={faTimes} className="text-maingray font-light" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="font-museo text-[24px] font-bold text-maingray ">Напишите нам</h1>
                    <form className="w-full" onSubmit={handleSubmit(recordForm)}>
                        <div className="flex flex-col mt-5 mb-5">
                            <div className="flex flex-col gap-4 justify-between mb-2">
                                <input
                                    type="text"
                                    className="w-full h-10 pl-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                                    placeholder="Ваше имя"
                                    {...register("author")}
                                />
                                {errors.author && (
                                    <div className="text-red-400">{errors.author[0]}</div>
                                )}
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    className="w-full h-10 pl-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                                    placeholder="Телефон"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <div className="text-red-400">{errors.phone[0]}</div>
                                )}
                            </div>
                            <div className="w-full mt-2">
                                <textarea
                                    className="w-full h-16 max-h-24 p-2 font-museo text-xs font-light text-center text-maingray border-[1px] border-orange"
                                    placeholder="Ваше сообщение"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <div className="text-red-400">{errors.email[0]}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 mb-2 justify-center items-center mt-2">
                                <h2 className="text-sm font-museo font-medium text-maingray text-center">Прикрепить документ, эскиз дома</h2>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput" className="cursor-pointer">
                                    <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-orange hover:bg-white text-white hover:text-maingray transform w-[140px] h-10 border-[1px] border-orange">
                                        <p className="text-sm font-museo font-medium">Загрузить файл</p>
                                    </div>
                                </label>
                                {selectedFile && (
                                    <p className="text-xs font-museo font-medium text-maingray text-center">{selectedFile.name}</p>
                                )}
                                {!selectedFile && (
                                    <p className="text-xs font-museo font-medium text-maingray text-center">Типы файлов: jpg, png, doc, pdf, rar, zip <br />
                                        (Размер файла не должен превышать 30мб)</p>
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
                                    <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">Отправить</p>
                                </button>
                            </div>
                        </div>
                        <p className="text-xs font-museo font-medium text-maingray text-center">Отправляя форму, я даю согласие на обработку
                            <br /> <a className="underline cursor-pointer " href="/"> персональных данных </a> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal