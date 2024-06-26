
import { API_URL } from '../../constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
interface EmployeeCardProps {
    employees: Employee[];
}

const EmployeeCard = ({ employees }: EmployeeCardProps) => {

    function formatPhoneNumber(number: string) {
        return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    }

    return (
        <div className="mt-20">
            <h2 className="font-museo font-bold text-2xl mb-4 max-md:text-xl">Наши сотрудники</h2>
            <div className="grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {employees.map(employee => (
                    <div key={employee.id} className="flex flex-col mt-8">
                        {employee.attributes.Photo.data && (
                            <div className="employee-photo-container">
                                <img src={`${API_URL}${employee.attributes.Photo.data.attributes.url}`}
                                    alt={`${employee.attributes.FullName}`}
                                    className="w-[280px] h-[280px] object-cover object-center max-[800px]:w-[250px] max-[800px]:h-[250px]" />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <div className="employee-details bg-gray-100 ml-14 px-10 py-6 pt-[50px] max-[800px]:ml-4 max-[800px]:pt-2  ">
                                <div className='grid grid-cols-1 max-sm:grid-cols-2 items-end max-[450px]:grid-cols-1'>
                                    <h3 className="font-museo font-light text-base mb-4 mt-2">
                                        <span className="font-bold text-lg">{employee.attributes.FullName.split(' ')[0]}</span><br />
                                        {employee.attributes.FullName.split(' ').slice(1).join(' ')}
                                    </h3>
                                    <p className=" mb-4 font-museo font-light text-sm leading-5 text-maingray">{employee.attributes.Specialisation}</p>
                        
                                    <p className=" font-museo font-light text-sm leading-5 text-maingray 
                        hover:text-orange cursor-pointer transition-all duration-300">
                                        <span className="mr-2"><FontAwesomeIcon icon={faPhone} className="text-orange arrow-icon" /></span>
                                        {formatPhoneNumber(employee.attributes.PhoneNumber)}</p>
                                    <p className=" font-museo font-light text-sm leading-5 text-maingray
                         hover:text-orange cursor-pointer transition-all duration-300">
                                        <span className="mr-2"><FontAwesomeIcon icon={faEnvelope} className="text-orange arrow-icon" /></span>
                                        {employee.attributes.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default EmployeeCard