import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { ScrollUp } from "../sections/scroll";
import useHeaderFooter from "../hooks/useHeaderFooter";
import { LayoutProps } from "../interfaces";
import { useInView } from "react-intersection-observer";

const Layout = ({ children }: LayoutProps) => {
    // TODO ДАЖЕ ТУТ 0o
  const {informationData, isLoading, error} = useHeaderFooter();
  const {ref: refConsultation, inView: inViewConsultation} = useInView({triggerOnce: true})
  const {ref: refFooter, inView: inViewFooter} = useInView({triggerOnce: true})

    if (!informationData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div>
        <Header header={informationData} />
        {children}
        <ScrollUp />
        <div ref={refConsultation}>
            {inViewConsultation && (
                <Consultation />
            )}
        </div>
        <div ref={refFooter}>
            {inViewFooter && (
                <Footer footer={informationData} />
            )}
        </div>
    </div>
  );
};

export default Layout;
