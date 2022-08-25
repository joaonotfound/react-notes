import firebaseSettings from './firebase-settings.json'
import { getAuth, GoogleAuthProvider,
    signInWithPopup, signInWithEmailAndPassword,
    createUserWithEmailAndPassword
    } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, query, where, collection, getDocs, addDoc } from 'firebase/firestore'

interface IUser {
    uid: string,
    username: string,
    email: string,
    authProvider?: string,
    password?: string

}

export class UserAuthentication {
    private readonly app = initializeApp(firebaseSettings)
    private readonly auth = getAuth(this.app)
    private readonly db = getFirestore(this.app)

    private async addUserToDatabase (user: IUser) {
        await addDoc(collection(this.db, 'users'), {
            uid: user.uid,
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
    async createUserWithEmailAndPassword(username: string, email: string, password: string){
        try {
            const res = await createUserWithEmailAndPassword(this.auth, email, password)
            const user = res.user
            const q = query(collection(this.db, 'users'), where('uid', '==', user.uid))
            const docs =  await getDocs(q)
            if(docs.docs.length === 0) {
                await this.addUserToDatabase({
                    uid: user.uid,
                    username: username,
                    password: password,
                    email: email
                })
            }

        }catch(err){
            console.log(err)
        }
    }
    async signInWithEmailAndPassword(email: string, password: string){
        console.log("loggin with email and password")
        try {
            const res = await signInWithEmailAndPassword(this.auth, email, password)
            console.log('successfully logged.')
        }catch(err){
            console.log(err)
        }
    }
    async signInWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(this.auth, googleProvider)
            const user = res.user
            const q = query(collection(this.db, 'users'), where("uid", "==", user.uid))
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await this.addUserToDatabase({
                    uid: user.uid,
                    username: user.displayName!,
                    authProvider: "google",
                    email: user.email!
            })
            }
        } catch (Err) {
            console.log(Err)
        }
    }
}