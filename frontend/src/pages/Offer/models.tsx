import { UserObj } from "../ProfilPage/models";

export interface OfferData {
    category: string,
    description: string,
    date: Date,
    title: string,
}
export interface Offer {
    active: boolean
    category: string
    date: Date
    description: string
    id: number
    likes: number
    title: string
    user: UserObj;
}
export interface IOfferInputs{
    title: string;
    description: string,
    date: Date,
    active: boolean,
}