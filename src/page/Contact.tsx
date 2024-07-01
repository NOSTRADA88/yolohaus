import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { fetchContactData, fetchHeaderFooterData, fetchHomeData } from "../api";

import { ContactInfo, EmployeeCard, ProductionsList } from "../components/contact";
import { Link } from "react-router-dom";

interface DescriptionItem {
    type: string;
    children: {
        children: any;
        text: string;
        type: string;
    }[];
}

interface Production {
    id: number;
    attributes: {
        Name: string;
        Address: string;
        YandexMapURL:string;
    }
}

interface Employee {
    id: number;
    attributes: {
        FullName: string;
        Specialisation: string;
        email: string;
        PhoneNumber: string;
        Photo: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    url: string;
                };
            };
        };
    };
}

const Contact = () => {
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [titleMini, setTitleMini] = useState<string>('');
    const [description, setDescription] = useState<DescriptionItem[]>([]);
    const [photoContact, setPhotoContact] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [urlAddressOffice, setUrlAddressOffice] = useState<string>('');
    const [weekdays, setWeekdays] = useState<string>('');
    const [weekends, setWeekends] = useState<string>('');
    const [productions, setProductions] = useState<Production[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);


    const fetchData = async () => {
        try {
            const contactData = await fetchContactData();

            setMetaTitle(contactData.Metadata.MetaTitle);
            setMetaDescription(contactData.Metadata.MetaDescription);
            setTitle(contactData.Title);
            setTitleMini(contactData.Information.Title);
            setDescription(contactData.Information.Description);
            setPhotoContact(contactData.Information.Photo.data.attributes.formats.large.url);
            setWeekdays(contactData.WorkingTime.Weekdays);
            setWeekends(contactData.WorkingTime.Weekends);
            setProductions(contactData.productions.data);
            setEmployees(contactData.employees.data);

            const mainData = await fetchHomeData();
            const phoneData = await fetchHeaderFooterData();

            setEmail(mainData.ContactsMap.Email);
            setPhone(phoneData.Header.PhoneNumber.PhoneNumber);
            setAddress(mainData.ContactsMap.Address);
            setUrlAddressOffice(mainData.ContactsMap.YandexMapURL);
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
                <div className="flex justify-between max-sm:flex-col max-sm:gap-4 ">
                    <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">{title}</h1>
                    <div className="flex items-center">
                        <Link to="/" className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300">Главная / </Link>
                        <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs"> {title}</p>
                    </div>
                </div>
                <ContactInfo titleMini={titleMini} description={description} address={address}
                    phone={phone} email={email} photoContact={photoContact} weekdays={weekdays} weekends={weekends} urlAddressOffice={urlAddressOffice}/>
                <ProductionsList productions={productions} />
                <EmployeeCard employees={employees} />
            </div>
        </div>
    )
}

export default Contact