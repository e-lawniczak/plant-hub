export interface IBasicProps {
  className?: string;
  children?: any;
  [x: string]: any;
}
export interface IRegisterInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
}
export interface IModifyInputs {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
}
export interface ILoginInputs {
  email: string;
  password: string;
}
