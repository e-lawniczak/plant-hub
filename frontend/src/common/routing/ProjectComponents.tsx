import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ModifyPage } from "../../pages/ProfilPage/ModifyPage";
import { ProfilPage } from "../../pages/ProfilPage/ProfilPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { TestPage1 } from "../../pages/TestPage1";
import { TestPage2 } from "../../pages/TestPage2";
import { MessagePage } from "../../pages/MessagePage/MessagePage";
import { IRouteElement } from "./models";
import { MyOffers } from "../../pages/MyOffers/MyOffers";
import { CreateOffer } from "../../pages/Offer/CreateOffer";
import { OfferPage } from "../../pages/Offer/OfferPage";

export const ProjectComponents =[
    { name: "Main page", path: "/", element: <HomePage />, auth: false },
    { name: "Main page", path: "/", element: <HomePage />, auth: true },
    { name: "Test", path: "/test", element: <TestPage1 />, auth: true },
    { name: "My offers", path: "/offers", element: <MyOffers />, auth: true},
    { name: "Add offer", path: "/add-offer", element: <CreateOffer  />, auth: true},
    { name: "OfferPage", path: "/offer/:user/:id", element: <OfferPage  />, auth: true, hideInMenu:true},
    { name: "Liked offers", path: "/test2", element: <TestPage2 />, auth: true },
    { name: "Register", path:"/register", element: <RegisterPage/>, auth: false},
    { name: "Login", path: "/login", element: <LoginPage />, auth: false },
    { name: "Profil", path: "/profile", element: <ProfilPage />, auth: true,},
    { name: "Modify", path: "/profile/modify", element: <ModifyPage />, auth: true, hideInMenu: true},
    { name: "Message", path: "/message", element: <MessagePage />, auth: true}
] as IRouteElement[]

