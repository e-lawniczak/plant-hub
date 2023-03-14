import { IBasicProps } from "../models";
import { MainMenu } from "../routing/Menu";

export const Header = (props:IBasicProps) =>{
    return <header>
        <div className="logo">
            Tu bedzie logo
        </div>
        <MainMenu />
        <div className="user-bubble">
            "U"
        </div>
    </header>
}