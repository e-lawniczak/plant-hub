import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../ApiRoutes";
import { callPost } from "../Fetch";
import { selectUser, logout } from "../Redux/Slices/userSlice";
import { IBasicProps } from "../models";
import { MainMenu } from "../routing/Menu";
import  logo from "../img/logo.png";
import { count } from "console";

export const Header = (props: IBasicProps) => {
    const user = useSelector(selectUser),
        [isAjax, setAjax] = useState(false),
        navigate = useNavigate(),
        dispatch = useDispatch();
    const handleClick = async () => {
        if (user) {
            setAjax(true)
            await callPost(apiRoutes.user + '/' + user.email + '/logout', null, user.accessToken, false)
            setAjax(false)
            dispatch(logout())
            navigate('/');
        }
    }
    const logoStyle = {
        width: 100
    }
    return <header>
        <div className="logo">
            <img src = {logo} style = {logoStyle}/>
        </div>
        <MainMenu />
        <div onClick={handleClick} className="user-bubble">
            "U"
        </div>
    </header>
}