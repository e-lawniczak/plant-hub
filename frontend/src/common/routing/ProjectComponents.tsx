import { HomePage } from "../../pages/HomePage";
import { TestPage1 } from "../../pages/TestPage1";
import { IRouteElement } from "./models";

export const ProjectComponents =[
    { name: "Strona główna", path: "/", element: <HomePage />, auth: false },
    { name: "Test", path: "/test", element: <TestPage1 />, auth: false },

] as IRouteElement[]