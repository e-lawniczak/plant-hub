import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../Redux/Slices/userSlice";
import { MainMenu } from "../routing/Menu";
import logo from "../img/logo.png";

export const Header = () => {
  const logoStyle = {
    width: 100,
  };
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Planthub logo" style={logoStyle} />
      </div>
      <MainMenu />
      <UserBubble />
    </header>
  );
};

const UserBubble = () => {
  const user = useSelector(selectUser);
  return (
    <div className="user-bubble d-flex">
      {user != null && (
        <NavLink className={"profile-link"} to={"/profile"}>
          {user?.firstName[0]?.toUpperCase() + user?.lastName[0]?.toUpperCase()}
        </NavLink>
      )}
    </div>
  );
};
