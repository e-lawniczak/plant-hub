import { RouteObject, createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { NotFound } from "../../pages/NotFound";
import { TestPage1 } from "../../pages/TestPage1";
import { MasterPage } from "../layouts/MasterPage";
import { IRouteElement } from "./models";
import { ProjectComponents } from "./ProjectComponents";


export const ProjectRouter = (props: any) => {


    const routes = ProjectComponents.map((c: IRouteElement) => {
        return {
            path: c.path,
            element: <MasterPage className={c.name.split(" ").join("-").toLocaleLowerCase()}>{c.element}</MasterPage>,
            children: c.childComp ? c.childComp.map(c2 => MapRoute(c2)) : [],
            errorElement: <NotFound />
        } as RouteObject
    }),
        router = createBrowserRouter(routes)


    return <RouterProvider router={router} />

}

const MapRoute = (item: IRouteElement): RouteObject => {
    if (!item.childComp)
        return {
            path: item.path,
            element: item.element,
            errorElement: <NotFound />
        } as RouteObject
    return {
        path: item.path,
        element: item.element,
        children: item.childComp.map(c => MapRoute(c)),
        errorElement: <NotFound />
    } as RouteObject

}