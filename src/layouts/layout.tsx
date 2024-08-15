import React, { ReactNode } from "react";
import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { ScrollUp } from "../sections/scroll";
import useHeaderFooter from "../hooks/useHeaderFooter";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const informationData = useHeaderFooter();

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
        <Consultation />
        <Footer footer={informationData} />

    </div>
  );
};

export default Layout;
