import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Production {
    id: number;
    attributes: {
        Name: string;
        Address: string;
    }
}

interface ProductionsListProps {
    productions: Production[];
}

const ProductionsList = ({ productions }: ProductionsListProps) => {
    return (
        <div className="mt-12 grid grid-cols-2 gap-28  max-xl:gap-10  max-sm:grid-cols-1 max-sm:gap-3">
            {productions.map(item => (
                <div key={item.id} className="flex flex-col justify-between">
                    <h2 className="font-museo font-bold text-2xl mb-4 max-[1000px]:w-1/2 max-md:text-xl">{item.attributes.Name}</h2>
                    <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-2">адрес</span>
                    <p className="mt-1 font-museo font-light text-sm leading-5 text-maingray">{item.attributes.Address}</p>
                    <div className="flex justify-start items-center mt-2 gap-2 cursor-pointer arrow-container max-md:mt-5">
                        <a href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_kompozitorov_12/Z0kYdQZkTk0GQFhqfXx0c35nYQ==/?indoorLevel=1&ll=30.314781%2C60.052245&z=17.09"
                            target="_blank" className="text-orange uppercase text-sm font-medium tracking-wider">Посмотреть на карте </a>
                        <FontAwesomeIcon icon={faArrowRightLong} className="text-orange arrow-icon" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductionsList