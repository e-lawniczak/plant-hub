export interface IUserModel {
  user: {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    votes: number | null;
    accessToken: string | null;
    tokenType: string | null;
  } | null;
}
