import SwitchTechnology from "./SwitchTechnology";

const Technology = () => {
  return (
    <div>
      <SwitchTechnology />
      <table className="w-full  ">
        <tr>
          <th className="w-[271px] h-[47px] bg-[#E9E9E9] font-museo text-maingray text-base">
            Комплектация
          </th>
          <th className="w-[271px] h-[47px] bg-orange font-museo text-white text-base">
            Базовая
          </th>
          <th className="w-[271px] h-[47px] bg-[#E0861D] font-museo text-white text-base">
            Стандарт
          </th>
          <th className="w-[271px] h-[47px] bg-[#BF6F12] font-museo text-white text-base">
            Комфорт
          </th>
        </tr>
        <tr className="h-[70px]">

          <td className=" font-museo text-maingray text-base font-bold">
            Цена
          </td>
          <td className=" font-museo mt-2 text-orange text-xl font-bold text-center ">
            1
          </td>
          <td className=" font-museo mt-2 text-orange text-xl font-bold text-center ">
            2
          </td>
          <td className=" font-museo mt-2 text-orange text-xl font-bold text-center">
            3
          </td>
        </tr>
        <tr>
          <td className=" font-museo text-maingray text-base font-bold">
            Домокомплект повышенной энергоэффективности
          </td>
          <td className=" ">
            Домокомплект заводского производства. Фундаментный брус 150х200 мм,
            прошедший обработку биозащитой Цокольное перекрытие — СИП 224 мм
            Внешние стены — СИП 174 мм Внутренние стены — каркас 145мм, 95 мм
            Межэтажное перекрытие — СИП 174 мм СИП кровля — 224 мм Силовой
            каркас — сухая строганная антисептированная доска, брус, клееный
            брус (опоры, прогоны, коньки, мауэрлаты) Настил крыльца, террасы —
            сухая строганная антисептированная доска Система "теплый угол",
            элементы пространственной жесткости Рабочий проект
          </td>
        </tr>
        <tr>
          <td className=" font-museo text-maingray text-base font-bold">
            Монтаж домокомплекта
          </td>
          <td className=" ">3</td>
        </tr>
        <tr>
          <td className=" font-museo text-maingray text-base font-bold">
            Фундамент
          </td>
          <td className=" ">3</td>
        </tr>
        <tr>
          <td className=" font-museo text-maingray text-base font-bold">
            Кровля
          </td>
          <td className="">3</td>
        </tr>
        <tr>
          <td className="font-museo text-maingray text-base font-bold">Окна</td>
          <td className="">3</td>
        </tr>
        <tr>
          <td className="font-museo text-maingray text-base font-bold">
            Входные двери
          </td>
          <td className="">3</td>
        </tr>
        <tr>
          <td className=" font-museo text-maingray text-base font-bold">
            Фасад
          </td>
          <td className=" ">3</td>
        </tr>
        <tr>
          <td className="font-museo text-maingray text-base font-bold">
            Подшивка свесов
          </td>
          <td className=" ">3</td>
        </tr>
        <tr>
          <td className="font-museo text-maingray text-base font-bold">
            Водосточная система
          </td>
          <td className="">3</td>
        </tr>
        <tr>
          <td className="font-museo text-maingray text-base font-bold">
            Вентиляционные выходы
          </td>
          <td className="">3</td>
        </tr>
      </table>
    </div>
  );
};

export default Technology;
