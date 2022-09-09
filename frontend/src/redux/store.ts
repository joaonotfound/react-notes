
import { IAuth } from './actionTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'interfaces/user-interface'

const initialState: IAuth = {
    isAuthenticated: false
}

const AuthStore = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IAuth>) {
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        }

    }
})

export default AuthStore;