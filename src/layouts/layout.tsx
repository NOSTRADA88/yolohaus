import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { ScrollUp } from "../sections/scroll";
import useHeaderFooter from "../hooks/useHeaderFooter";
import { LayoutProps } from "../interfaces";
import { useInView } from "react-intersection-observer";

const Layout = ({ children }: LayoutProps) => {
  const { informationData, error } = useHeaderFooter();

  const { ref: refConsultation, inView: inViewConsultation } = useInView({
    triggerOnce: true,
  });

  const { ref: refFooter, inView: inViewFooter } = useInView({
    triggerOnce: true,
  });

  const { ref: refScroll, inView: inViewScroll } = useInView({
    triggerOnce: true,
  });

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header header={informationData} />

      {children}
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
