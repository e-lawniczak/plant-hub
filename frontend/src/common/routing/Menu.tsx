import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProjectComponents } from "./ProjectComponents";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/userSlice";

export const MainMenu = () => {
  const user = useSelector(selectUser);

  const menuElements = ProjectComponents.map((c, idx) => {
    if (c.hideInMenu) return null;
    if ((user == null && c.auth) || (user != null && !c.auth)) return null;
    return (
      <div key={idx * 27} className="menu-opt">
        <NavLink key={idx} to={c.path}>
          {c.name}
        </NavLink>
      </div>
    );
  }).filter((c) => c);
  const
    menuRef = useRef(null),
    [menuActive, setmenuActive] = useState(false),
    handleMenuClick = () => {
      setmenuActive(!menuActive);
    },
    menuListener = (e: any) => {
      var x = [...e.target.classList].filter((c: string) => c == "line")[0];
      console.log(x);
      if (menuRef.current != e.target && !x) {
        setmenuActive(false);
      }
    }

  useEffect(() => {
    window.addEventListener("click", menuListener);

    return () => {
      window.removeEventListener("click", menuListener);
    };
  })

  return (<>
    <div className="main-menu">{menuElements}</div>
    <div className="mobile-menu">
      <div ref={menuRef} onClick={handleMenuClick} className="hamburger">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
    <div className={`main-menu mobile ${menuActive ? "active" : ""}`}>
      {menuElements}
    </div>
  </>

  );
};
