import { IBasicProps } from "../models"
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MasterPage = (props: IBasicProps) => {
    const { children, className } = props;
    return <div className={["master-page", className].join(' ')}>
        <Header />
        {children}

        <Footer />
    </div>
}