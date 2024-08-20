import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { ScrollUp } from "../sections/scroll";
import useHeaderFooter from "../hooks/useHeaderFooter";
import { LayoutProps } from "../interfaces";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Layout = ({ children }: LayoutProps) => {
  const { informationData, isLoading, error } = useHeaderFooter();

  const { ref: refConsultation, inView: inViewConsultation } = useInView({
    triggerOnce: true,
  });
  useEffect(() => {
    console.log("inViewConsultation:", inViewConsultation); // Проверка изменения состояния
  }, [inViewConsultation]);
  const { ref: refFooter, inView: inViewFooter } = useInView({
    triggerOnce: true,
  });

  const { ref: refScroll, inView: inViewScroll } = useInView({
    triggerOnce: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!informationData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header header={informationData} />

      <div className="min-h-screen">{children}</div>
      <div ref={refScroll}>{inViewScroll && <ScrollUp />}</div>

      <div ref={refConsultation} style={{ minHeight: "300px" }}>
        {inViewConsultation && <Consultation />}
      </div>

      <div ref={refFooter} style={{ minHeight: "50px" }}>
        {inViewFooter && <Footer footer={informationData} />}
      </div>
    </div>
  );
};

export default Layout;
