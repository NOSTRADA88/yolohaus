import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ScrollUp = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 400) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {showTopBtn && (
        <div className="fixed bottom-10 right-10 z-20 flex flex-col items-end max-sm:right-5">
          <button
            onClick={ScrollToTop}
            className="transition-all duration-300 p-1 bg-orange rounded-full hover:bg-orange-dark"
          >
            <div className="rounded-full bg-orange w-10 h-10 flex items-center justify-center border-white border-2">
              <FontAwesomeIcon icon={faArrowUpLong} className="text-white" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollUp;
