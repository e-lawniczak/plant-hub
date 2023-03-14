export interface IUserModel {
    authenticated: false,
    user: {
        firstName: string,
        lastName: string,
        email: string;
    } | null

}