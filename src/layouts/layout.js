
import { Header, Footer } from "../sections";

const Layout = ({ children }) => {
    return (
        <div>
            <section>
                <Header />
            </section>
            {children}
            <section>
                <Footer />
            </section>
        </div>
    );
};

export default Layout;
