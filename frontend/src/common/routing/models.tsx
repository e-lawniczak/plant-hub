export interface IRouteElement {
  auth: boolean;
  element: any;
  name: string;
  path: string;
  hideInMenu?: boolean;
  childComp?: IRouteElement[];
}
