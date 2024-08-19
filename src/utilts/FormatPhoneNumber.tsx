import { formatPhoneNumberProps } from "../interfaces";

const FormatPhoneNumber = ({ phoneNumber, color }: formatPhoneNumberProps) => {
  if (!phoneNumber) {
    return null;
  }
  const countryCode = "+7";
  const areaCode = phoneNumber.slice(2, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10, 12);

  return (
    <div>
      <a
        href={`tel:${phoneNumber}`}
        className={`cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center max-md:text-base text-${color}`}
      >
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px]"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    </div>
  );
};

export default FormatPhoneNumber;
