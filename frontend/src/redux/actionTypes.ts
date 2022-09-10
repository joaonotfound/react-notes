import { UserBackend } from "backend/interfaces"

export interface IAuth {
    isAuthenticated: boolean,
    user?: UserBackend
}