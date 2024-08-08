
import { Header, Footer } from "../sections";
import {Suspense} from "react";

const Layout = ({ children }) => {
    return (
        <div>
            <section>
                <Header />
            </section>
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                </Suspense>
            <section>
                <Footer />
            </section>
        </div>
    );
};

export default Layout;
