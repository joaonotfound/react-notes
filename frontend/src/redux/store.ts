
import { IAuth } from './action-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicUser } from 'backend/interfaces/public-user-interface'

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
        setUser(state, action: PayloadAction<PublicUser>) {
            state.user = action.payload
        }

    }
})

export default AuthStore;