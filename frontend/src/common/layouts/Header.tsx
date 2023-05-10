import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { apiRoutes } from "../ApiRoutes";
import { callPost } from "../Fetch";
import { selectUser, logout } from "../Redux/Slices/userSlice";
import { IBasicProps } from "../models";
import { MainMenu } from "../routing/Menu";
import logo from "../img/logo.png";
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
            <img src={logo} style={logoStyle} />
        </div>
        <MainMenu />
    <UserBubble />
    </header>
}

const UserBubble = (props: any) => {
    const user = useSelector(selectUser)
    console.log(user);
    return <div className="user-bubble d-flex">
        <NavLink className={"profile-link"} to={"/profile"} >
            {user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()}
        </NavLink>
    </div>
}