
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../constants";

interface DescriptionItem {
    type: string;
    children: {
        children: any;
        text: string;
        type: string;
    }[];
}

interface ContactInfoProps {
    titleMini: string;
    description: DescriptionItem[];
    address: string;
    urlAdressOffice: string;
    phone: string;
    email: string;
    photoContact: string;
    weekdays: string;
    weekends: string;
}

const ContactInfo = ({ titleMini, description, address, urlAdressOffice, phone, email, photoContact, weekdays, weekends }: ContactInfoProps) => {

    function formatPhoneNumber(number: string) {
        return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    }
    
    return (
        <div className="flex mt-10 flex-col">
            <h2 className="font-museo font-bold text-2xl max-md:text-xl">{titleMini}</h2>
            <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col w-[60%] max-xl:w-full">
                    <div className="">
                        <div className="flex flex-col items-start">
                            {description.map((item, index) => (
                                <div key={index} className="mt-5 ">
                                    <div key={index} className={` ${index === 0 ? 'bg-lightwhite p-5' : ''}`}>
                                        {item.children.map((child, childIndex) => (
                                            <p className="font-light text-sm font-museo leading-relaxed text-justify mr-10 max-sm:mr-0" key={childIndex}>{child.text}</p>
                                        ))}
                                    </div>
                                    {item.type === 'list' && (
                                        <ul className="list-disc ">
                                            {item.children.map((listItem, listIndex) => (
                                                <li key={listIndex}
                                                    className="font-light text-sm font-museo leading-relaxed text-justify ml-8 max-sm:text-start
                                        ">{listItem.children[0].text}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-xl:hidden mt-5">
                    <img src={`${API_URL}${photoContact}`} alt="photoAbout" className="w-[540px]" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-5 max-xl:grid-cols-2 max-xl:gap-10 max-sm:grid-cols-1 max-sm:gap-3">
                <div>
                    <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-2">адрес</span>
                    <h1><a href={`${urlAdressOffice}`}
                        target="_blank" className="font-museo font-light text-sm leading-5 text-maingray mb-3 hover:text-orange cursor-pointer transition-all duration-300">
                        {address}
                    </a>
                    </h1>
                    <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer arrow-container max-md:mt-5">
                        <a href={`${urlAdressOffice}`}
                            target="_blank" className="text-orange uppercase text-sm font-medium tracking-wider">Посмотреть на карте </a>
                        <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" />
                    </div>
                </div>
                <div>
                    <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">телефон</span>
                    <h1 className='mb-3'>
                        <a href={`tel:${phone}`} className="font-museo font-light text-sm leading-5 tracking-wider text-maingray hover:text-orange cursor-pointer 
            transition-all duration-300 ">  {formatPhoneNumber(phone)}</a>
                    </h1>
                </div>
                <div>
                    <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">E-mail</span>
                    <h1 className='mb-4'>
                        <a href={`mailto:${email}`} className="font-museo font-light text-sm leading-5 text-maingray hover:text-orange cursor-pointer transition-all duration-300">{email}</a>
                    </h1>
                </div>
                <div className="gap-2">
                    <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">Время работы</span>
                    <p className="mt-2 font-museo font-light text-sm leading-5 text-maingray">Будни: {weekdays}</p>
                    <p className="mt-1 font-museo font-light text-sm leading-5 text-maingray">Выходные: {weekends}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo