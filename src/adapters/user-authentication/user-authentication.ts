import firebaseSettings from './firebase-settings.json'
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
    private readonly app = initializeApp(firebaseSettings)
    private readonly auth = getAuth(this.app)
    private readonly db = getFirestore(this.app)

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
                return Promise.resolve(new_user)
            }

        } catch (err) {
            return Promise.reject(err)
        }
    }
    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password)
            return Promise.resolve(this.adaptGoogleUserToUser(user))
        } catch (err) {
            return Promise.reject(err)
        }
    }
    async signInWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(this.auth, googleProvider)
            let user = res.user
            const q = query(collection(this.db, 'users'), where("uid", "==", user.uid))
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                const new_user = {
                    uid: user.uid,
                    username: user.displayName!,
                    authProvider: "google",
                    email: user.email!
                }
                await this.addUserToDatabase(new_user)
                return Promise.resolve(new_user)
            }
            return Promise.resolve(user)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}