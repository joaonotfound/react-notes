
import { IUser, IAuth } from './actionTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IAuth = {
    isAuthenticated: false
}

const AuthStore = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IAuth>){
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload
        }

}})

export default AuthStore;