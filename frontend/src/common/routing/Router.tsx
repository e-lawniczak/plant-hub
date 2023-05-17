import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { NotFound } from "../../pages/NotFound";
import { MasterPage } from "../layouts/MasterPage";
import { selectUser } from "../Redux/Slices/userSlice";
import { IRouteElement } from "./models";
import { ProjectComponents } from "./ProjectComponents";

export const ProjectRouter = (props: any) => {
  const user = useSelector(selectUser);

  const routes = ProjectComponents.map((c: IRouteElement) => {
      let el = c.element;
      if ((user == null && c.auth) || (user != null && !c.auth))
        return null as unknown as RouteObject;
      return {
        path: c.path,
        element: (
          <MasterPage
            className={c.name.split(" ").join("-").toLocaleLowerCase()}
          >
            {el}
          </MasterPage>
        ),
        children: c.childComp ? c.childComp.map((c2) => MapRoute(c2)) : [],
        errorElement: (
          <MasterPage
            className={c.name.split(" ").join("-").toLocaleLowerCase()}
          >
            <NotFound />
          </MasterPage>
        ),
      } as RouteObject;
    }).filter((c) => c),
    router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

const MapRoute = (item: IRouteElement): RouteObject => {
  if (!item.childComp)
    return {
      path: item.path,
      element: item.element,
      errorElement: <NotFound />,
    } as RouteObject;
  return {
    path: item.path,
    element: item.element,
    children: item.childComp.map((c) => MapRoute(c)),
    errorElement: <NotFound />,
  } as RouteObject;
};
