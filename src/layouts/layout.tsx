import React, {lazy, ReactNode} from "react";
import { Consultation } from "../components/footer";
import { Header, Footer } from "../sections";
import { Suspense } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <section>
                <Header />
            </section>
            <Suspense>
                {children}
            </Suspense>
            <section>
                <Suspense>
                    <Consultation />
                    <Footer />
                </Suspense>
            </section>
        </div>
    );
};

export default Layout;
