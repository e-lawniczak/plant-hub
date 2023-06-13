import { UserObj } from "../ProfilPage/models";

export interface IOfferData {
  category: string;
  description: string;
  date: Date;
  title: string;
}
export interface IOffer {
  active: boolean;
  category: string;
  date: Date;
  description: string;
  id: number;
  likes: number;
  title: string;
  user: UserObj;
  file: any;
}


export interface IOfferInputs {
  title: string;
  description: string;
  date: Date;
  active: boolean;
}

export interface ICategoryData {
  id: string;
  text: string;
}
