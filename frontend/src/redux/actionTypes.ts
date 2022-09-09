import { User } from "interfaces/user-interface";

export interface IAuth {
    isAuthenticated: boolean,
    user?: User
}