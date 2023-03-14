import { createSlice } from '@reduxjs/toolkit';
import { IUserModel } from '../models';



export interface IUserSlice {
    userData: IUserModel | null,
    userRole: "TEACHER" | "STUDENT" | "ADMIN" | null,
    userName: string,
    confirmationProcess: {
        active: boolean,
        email: string,
        password: string
    },
    [x: string]: any
}

const initialState = {
    userData: {
        authenticated: false,
        user: null
    },
    userName: "",
    userRole: null,
    confirmationProcess: {
        active: false,
        email: "",
        password: ""
    }

} as IUserSlice

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        "user/set": (state, action) => {
            let user = action.payload
            state.userData = { ...user };
            state.userRole = user.user.role
            state.userName = user.user.firstName + " " + user.user.lastName;
        },
        "user/set_role": (state, action) => {
            let role = action.payload.role
            state.userRole = role
        },
        "user/logout": (state, action) => {
            state.userData = {
                authenticated: false,
                user: null
            }
        },
        "user/confirmation_start": (state, action) => {
            state.confirmationProcess = {
                active: true,
                email: action.payload.email,
                password: action.payload.password
            }
        },
        "user/confirmation_end": (state, action) => {
            state.confirmationProcess = {
                active: false,
                email: "",
                password: ""
            }
        },
    }
})

export const userObject = (state: any) => state.userSlice.userData;
export const confirmationProcess = (state: any) => state.userSlice.confirmationProcess;
export const userRole = (state: any) => state.userSlice.userRole;
export const userName = (state: any) => state.userSlice.userName;

export default userSlice.reducer