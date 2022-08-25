import { Component, createContext } from "react";

interface IUserContext {
    authenticated: boolean,
    user?: {},
    updateUser?: {}
}

const userContext = createContext<IUserContext>({ authenticated: false });

export class AuthenticationContext extends Component {
    state: IUserContext = { authenticated: false }    
    updateUser(user: {}) {
        this.setState(user)
    }
    render(){
        const {children} = this.props as {children: any}
        return <userContext.Provider value={this.state}>
            {children}
        </userContext.Provider>
    }
}

export const AuthenticationConsumer = userContext.Consumer