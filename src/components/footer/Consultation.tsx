import { ConsultationPhoto } from "../../assets";

const Consultation = () => {
  return (
    <div className="w-full pt-14 pb-10">
      <div className="flex justify-center ml-[400px]">
        <div className="flex flex-col w-full  mx-auto  ">
          <h1 className="text-white font-museo font-bold text-3xl mb-4">Нужна консультация?</h1>
          <p className="font-museo font-light text-sm text-white">
            Опытный специалист поможет разобраться во всех тонкостях домостроения
          </p>
          <form>
          <div className="flex gap-[3.5px] items-center mb-4">
          <div className="parallelogram h-10 border-l-[1px] border-white"></div>
          <div className="flex justify-center items-center transition-all duration-300 cursor-pointer bg-white hover:bg-orange hover:text-white transform parallelogram w-[140px] h-10 border-[1px] border-white">
            <p className="text-xs font-museo font-medium uppercase tracking-wider noparallelogram">Отправить</p>
          </div>
        </div>
          </form>
          
        </div>
        
        <div className="ml-auto w-full">
          <img src={ConsultationPhoto} alt="photoAbout" className="w-full h-full " />
        </div>
      </div>
    </div>
  );
}

export default Consultation;
