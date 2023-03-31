import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProfilPage } from "../../pages/ProfilPage/ProfilPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { TestPage1 } from "../../pages/TestPage1";
import { IRouteElement } from "./models";

export const ProjectComponents =[
    { name: "Strona główna", path: "/", element: <HomePage />, auth: false },
    { name: "Test", path: "/test", element: <TestPage1 />, auth: false },
    { name: "Register", path:"/register", element: <RegisterPage/>, auth: false},
    { name: "Login", path: "/login", element: <LoginPage />, auth: false },
    { name: "Profil", path: "/profile", element: <ProfilPage />, auth: false },
] as IRouteElement[]