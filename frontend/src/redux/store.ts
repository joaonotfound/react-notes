
import { IAuth } from './actionTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserBackend } from 'backend/interfaces'

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
        setUser(state, action: PayloadAction<UserBackend>) {
            state.user = action.payload
        }

    }
})

export default AuthStore;