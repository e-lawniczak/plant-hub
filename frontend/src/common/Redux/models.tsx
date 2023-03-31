export interface IUserModel {
    user: {
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        phone: string | null,
        city: string | null,
        votes: number | null,
        accessToken: string | null,
        tokenType: string | null,
    } | null

}