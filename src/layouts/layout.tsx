import React, { ReactNode, useEffect, useState } from "react";
import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { Suspense } from "react";
import { ScrollUp } from "../sections/scroll";
import { FooterHeader } from "../interfaces";
import { fetchHeaderFooterData } from "../api/footer&header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [information, setInformation] = useState<FooterHeader>();

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const fetchHeader = await fetchHeaderFooterData();
        setInformation({
          info: fetchHeader.HeaderInfo,
          phoneNumber: fetchHeader.Phone.Number,
          socials: fetchHeader.Socials.data.map((social: any) => ({
            url: social.attributes.URL,
            photo: {
              name: social.attributes.Photo.data.attributes.name,
              url: social.attributes.Photo.data.attributes.url,
            },
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeader();
  }, []);

  return (
      // TODO почистить suspense
    <div>
      <Header header={information} />
      <Suspense>{children}</Suspense>
      <ScrollUp />
      <Suspense>
        <Consultation />
        <Footer footer={information} />
      </Suspense>
    </div>
  );
};

export default Layout;
