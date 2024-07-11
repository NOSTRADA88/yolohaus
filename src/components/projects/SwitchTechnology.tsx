
const SwitchTechnology = () => {
  return (
    <div className="flex gap-2 mt-5  mb-5 max-sm:flex-col">
      <div
      className={`border-[#E5E5E5]  border-[1px] flex items-center  justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange `}
    
    >
      <p className="font-museo text-lg text-maingray font-bold transition-all duration-300 ">
        СИП
      </p>
    </div>
    <div
      className={`border-[#E5E5E5]  border-[1px] flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange `}
    >
      <p className="font-museo  text-lg  text-maingray  font-bold  transition-all duration-300 ">
        Каркас
      </p>
    </div>
    <div
      className={`border-[#E5E5E5]  border-[1px] flex items-center justify-center w-[191px] h-[47px] cursor-pointer hover:border-orange `}
    
    >
      <p className="font-museo text-lg text-maingray font-bold  transition-all duration-300 ">
        Газобетон
      </p>
    </div>
    </div>
  )
}

export default SwitchTechnology
