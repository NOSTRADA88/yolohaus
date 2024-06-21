import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Yolo } from '../../assets';
import { fetchHeaderFooterData, fetchHomeData } from '../../api';
import { useEffect, useState } from 'react';


const Contact = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const fetchData = async () => {
    try {
      const mainData = await fetchHomeData();
      const phoneData = await fetchHeaderFooterData();
      setEmail(mainData.ContactsMap.Email);
      setPhone(phoneData.PhoneNumber.PhoneNumber);
      setAddress(mainData.ContactsMap.Address);

    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatPhoneNumber(number: string) {
    return number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
  }

  return (
    <YMaps>
      <div className="mt-14">
        <div className="absolute top-35 left-[calc((100%-1111px)/2)]  
        bg-white shadow-xl px-8 py-6 w-[270px] h-[320px] mt-8 z-20">
          <div className=" w-full mb-15 overflow-hidden ">
            <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-2">адрес</span>
            <h1><a href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_kompozitorov_12/Z0kYdQZkTk0GQFhqfXx0c35nYQ==/?indoorLevel=1&ll=30.314781%2C60.052245&z=17.09"
              target="_blank" className="font-museo font-light text-sm leading-5 text-maingray mb-3 hover:text-orange cursor-pointer transition-all duration-300">
              {address}
            </a>
            </h1>
          </div>
          <div className=" w-full mb-15 overflow-hidden mt-2">
            <span className="  font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact  mb-6">телефон</span>
            <h1 className='mb-3'>
              <a href={`tel:${phone}`} className="font-museo font-light text-sm leading-5 tracking-wider text-maingray hover:text-orange cursor-pointer 
              transition-all duration-300 ">  {formatPhoneNumber(phone)}</a>
            </h1>
          </div>

          <div className=" w-full mb-15 overflow-hidden">
            <span className="font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">E-mail</span>
            <h1 className='mb-4'>
              <a href={`mailto:${email}`} className="font-museo font-light text-sm leading-5 text-maingray hover:text-orange cursor-pointer transition-all duration-300">{email}</a>
            </h1> </div>
          <div className="flex gap-[3.5px] items-center mt-2 ">
            <div className="parallelogram h-10 border-l-[1px] border-orange"></div>
            <div className="flex justify-center items-center transition-all duration-300 cursor-pointer hover:bg-orange text-maingray transform parallelogram w-[172px] h-10 border-[1px] border-orange">
              <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram hover:text-white">напишите нам</p>
            </div>
          </div>
        </div>
        <div className="">
          <Map className={'w-full h-[390px] '} defaultState={{ center: [60.051894, 30.313452], zoom: 15 }}>
            <Placemark geometry={[60.051894, 30.313452]}
              options={{
                iconLayout: "default#image",
                iconImageSize: [39, 43],
                iconImageHref: Yolo,
              }}
            />
          </Map>
        </div>
      </div>
    </YMaps>





  )
}

export default Contact