import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ModifyPage } from "../../pages/ProfilPage/ModifyPage";
import { ProfilPage } from "../../pages/ProfilPage/ProfilPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { TestPage1 } from "../../pages/TestPage1";
import { IRouteElement } from "./models";

export const ProjectComponents =[
    { name: "Strona główna", path: "/", element: <HomePage />, auth: false },
    { name: "Strona główna", path: "/", element: <HomePage />, auth: true },
    { name: "Test", path: "/test", element: <TestPage1 />, auth: true },
    { name: "Register", path:"/register", element: <RegisterPage/>, auth: false},
    { name: "Login", path: "/login", element: <LoginPage />, auth: false },
    { name: "Profil", path: "/profile", element: <ProfilPage />, auth: true,},
    { name: "Modify", path: "/profile/modify", element: <ModifyPage />, auth: true, hideInMenu: true}
] as IRouteElement[]

