import { firebaseConfig } from 'firebase-settings/firebase-settings'
import {
    getAuth, GoogleAuthProvider,
    signInWithPopup, signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, query, where, collection, getDocs, addDoc } from 'firebase/firestore'
import { User } from 'interfaces/user-interface'

export class UserAuthentication {
    private readonly app = initializeApp(firebaseConfig)
    private readonly auth = getAuth(this.app)
    private readonly db = getFirestore(this.app)

    constructor(
        private readonly onAuthentication: (user: User) => void,
        private readonly onErrors?: (error: string) => void
    ) { }

    private async addUserToDatabase(user: User) {
        await addDoc(collection(this.db, 'users'), {
            uid: user.uid,
            username: user.username,
            email: user.email
        });
    }
    private adaptGoogleUserToUser(googleUserResponse: UserCredential): User {
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
            const q = query(collection(this.db, 'users'), where('uid', '==', user.uid))
            const docs = await getDocs(q)
            if (docs.docs.length === 0) {
                const new_user = {
                    uid: user.uid,
                    username: username,
                    email: email
                }
                await this.addUserToDatabase(new_user)
                this.onAuthentication(new_user)
            }

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
            const q = query(collection(this.db, 'users'), where("uid", "==", user.uid))
            const docs = await getDocs(q);
            const app_user: User = {
                uid: user.uid,
                username: user.displayName != null ? user.displayName : "NOUSER",
                authProvider: "google",
                email: user.email!
            }
            if (docs.docs.length === 0) {
                await this.addUserToDatabase(app_user)
                this.onAuthentication(app_user)
            }
            this.onAuthentication(app_user)
        } catch (err: any) {
            this.onErrors?.(err.message)
        }
    }
}