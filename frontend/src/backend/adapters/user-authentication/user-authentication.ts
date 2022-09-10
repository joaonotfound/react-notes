import { firebaseConfig } from 'backend/firebase-config/credentials'
import {
    getAuth, GoogleAuthProvider,
    signInWithPopup, signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    Persistence
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { UserBackend } from 'backend/interfaces'

export class UserAuthentication {
    private readonly app = initializeApp(firebaseConfig)
    private readonly auth = getAuth(this.app)
    private readonly db = getFirestore(this.app)

    constructor(
        private readonly onAuthentication: (user: UserBackend) => void,
        private readonly onErrors?: (error: string) => void
    ) { }
    public async setPersistent(persistence: Persistence) {
        await this.auth.setPersistence(persistence)
    }
    public async currentUser() {
        return this.auth.currentUser;
    }
    private async addUserToDatabase(user: UserBackend) {
        await addDoc(collection(this.db, 'users'), {
            uid: user.uid,
            username: user.username,
            email: user.email
        });
    }
    private adaptGoogleUserToUser(googleUserResponse: UserCredential): UserBackend {
        const user = googleUserResponse.user
        return {
            uid: user.uid,
            username: user.phoneNumber!,
            email: user.email!
        }
    }

    async createUserWithEmailAndPassword(username: string, email: string, password: string) {
        try {
            const res = await createUserWithEmailAndPassword(this.auth, email, password)
            const user = res.user
            const new_user: UserBackend = {
                uid: user.uid,
                username: username,
                email: email
            }
            this.onAuthentication(new_user)

        } catch (err: any) {
            this.onErrors?.(err.message)
        }
    }
    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password)
            this.onAuthentication?.(this.adaptGoogleUserToUser(user))
        } catch (err: any) {
            this.onErrors?.(err.message)
        }
    }
    async signInWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(this.auth, googleProvider)
            let user = res.user
            const app_user: UserBackend = {
                uid: user.uid,
                username: user.displayName != null ? user.displayName : "NOUSER",
                authProvider: "google",
                email: user.email!
            }
            this.onAuthentication(app_user)
        } catch (err: any) {
            this.onErrors?.(err.message)
        }
    }
}