import { createSlice } from '@reduxjs/toolkit';
import { IUserModel } from '../models';


export interface IUserSlice {
    user: IUserModel | null,
}

const initialState =  {    
    user: null,
} as IUserSlice

export const userSlice = createSlice({
    name: 'user',
    initialState : initialState,
    reducers: {
        login: (state, action) => {
            console.log("login");
            state.user = action.payload;
        },
        logout: (state) => {
            console.log("logout");
            state.user = null;
        }
    }
})

export const {login, logout} = userSlice.actions
export const selectUser = (state: any) => state.user;

export default userSlice.reducer