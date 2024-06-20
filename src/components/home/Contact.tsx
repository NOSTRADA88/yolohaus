import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Yolo } from '../../assets';


const Contact = () => {
  return (
    <YMaps>
      <div className="mt-14">
        <div className="absolute top-35 left-[calc((100%-1111px)/2)]  
        bg-white shadow-xl px-8 py-6 w-[270px] h-[320px] mt-8 z-20">
          <div className=" w-full mb-15 overflow-hidden">
            <span className="  font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-2">адрес</span>
            <h1 className="  font-museo font-light text-sm leading-5 text-maingray mb-3">
              г. Санкт-Петербург<br />
              ул. Композиторов<br />
              д. 12, лит. А, пом.141 Н
            </h1>
          </div>

          <div className=" w-full mb-15 overflow-hidden">
            <span className="  font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">телефон</span>
            <h1 className='mb-3'>
              <a href="tel:78126605050" className="font-museo font-light text-sm leading-5 text-maingray">+7 (812) 660-50-50</a>
            </h1>
          </div>

          <div className=" w-full mb-15 overflow-hidden">
            <span className="  font-museo font-meduim w-full text-xs leading-4 tracking-wider uppercase text-contact mb-6">E-mail</span>
            <h1 className='mb-4'>
              <a href="mailto:info@yolohaus.ru" className="font-museo font-light text-sm leading-5 text-maingray">info@yolohaus.ru</a>
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