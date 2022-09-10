
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./credentials"

const app = initializeApp(firebaseConfig)
export const appAuth = getAuth(app)
