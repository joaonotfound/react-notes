
import { AnyAction, configureStore } from "@reduxjs/toolkit"
import AuthStore from 'redux/store';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { ThunkAction } from "@reduxjs/toolkit";
import { User } from "interfaces/user-interface";

export const Store = configureStore({
    reducer: {
        authentication: AuthStore.reducer
    }
})

type RootState = ReturnType<typeof Store.getState>
type AppDispatch = typeof Store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actions = AuthStore.actions

export const setAuthValue = (isAuthenticated: boolean): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch, getState) => {
        dispatch(actions.setAuth({ isAuthenticated }))
    }
}

export const setUserValue = (user: User) => {
    return (dispatch: any, _: any) => {
        dispatch(actions.setUser(user))
    }
}
