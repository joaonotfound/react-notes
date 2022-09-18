import {
    GoogleAuthProvider,
    signInWithPopup, signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    Auth
} from 'firebase/auth'
import { UserBackend } from 'backend/interfaces'
import { appAuth } from 'backend/firebase-config/auth'

class UserAuthentication {
    constructor(private readonly auth: Auth) { }
    private adaptGoogleUserToUser(googleUserResponse: UserCredential): UserBackend {
        const user = googleUserResponse.user
        return {
            uid: user.uid,
            username: user.phoneNumber!,
            email: user.email!
        }
    }
    async createUserWithEmailAndPassword(username: string, email: string, password: string): Promise<UserBackend> {
        const res = await createUserWithEmailAndPassword(this.auth, email, password)
            .catch(_ => Promise.reject())
        const user = res.user
        return {
            uid: user.uid,
            username,
            email
        }
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<UserBackend> {
        const user = await signInWithEmailAndPassword(this.auth, email, password)
            .catch(err => Promise.reject(err.message))
        return this.adaptGoogleUserToUser(user)
    }

    async signInWithGoogle(): Promise<UserBackend> {
        const googleProvider = new GoogleAuthProvider();
        const res = await signInWithPopup(this.auth, googleProvider)
            .catch(_ => Promise.reject())
        let user = res.user
        return {
            uid: user.uid,
            username: user.displayName != null ? user.displayName : "NOUSER",
            authProvider: "google",
            email: user.email!
        }
    }
}

export const userAuth = new UserAuthentication(appAuth);