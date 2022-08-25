import firebaseSettings from './firebase-settings.json'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, query, where, collection, getDocs, addDoc } from 'firebase/firestore'

export class UserAuthentication {
    private readonly app = initializeApp(firebaseSettings)
    private readonly auth = getAuth(this.app)
    private readonly db = getFirestore(this.app)

    async signInWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(this.auth, googleProvider)
            const user = res.user
            const q = query(collection(this.db, 'users'), where("uid", "==", user.uid))
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(this.db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (Err) {
            console.log(Err)
        }
    }
}