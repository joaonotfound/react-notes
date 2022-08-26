
export interface IUser {
    name: string
}

export interface IAuth {
    isAuthenticated: boolean,
    user?: IUser
}