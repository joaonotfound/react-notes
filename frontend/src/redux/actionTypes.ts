import { PublicUser } from "backend/interfaces/public-user-interface"

export interface IAuth {
    isAuthenticated: boolean,
    user?: PublicUser
}