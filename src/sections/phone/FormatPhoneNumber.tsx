import { formatPhoneNumberProps } from "../../interfaces";

const FormatPhoneNumber = ({ phoneNumber }: formatPhoneNumberProps) => {
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
        className="text-white cursor-pointer transition-all duration-300 font-museo text-lg font-light hover:text-orange flex items-center max-md:text-base"
      >
        {countryCode} ({areaCode})
        <span className="block border-l-[1px] mx-2 border-orange transform rotate-[20deg] h-[17.5px] text-white"></span>
        {firstPart}-{secondPart}-{thirdPart}
      </a>
    </div>
  );
};

export default FormatPhoneNumber;
