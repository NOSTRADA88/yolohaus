import { Link } from "react-router-dom";
import { slug } from "../constants";

const renderTextWithHighlights = (text: string) => {
  const parts = text.split(/(YoloHaus)/);
  return parts.map((part, index) =>
    part === "YoloHaus" ? (
      <Link key={index} to={slug.main} className="text-orange underline">
        {part}
      </Link>
    ) : (
      part
    )
  );
};

export default renderTextWithHighlights;
