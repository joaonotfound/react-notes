export enum AuthErrorsCodes {
  InvaildEmail = "Firebase: Error (auth/invalid-email).",
  EmailAreadyInUse = "Firebase: Error (auth/email-already-in-use).",
  UserNotFound = "Firebase: Error (auth/user-not-found).",
  WeakPassword = "Firebase: Password should be at least 6 characters (auth/weak-password).",
  WrongPassword = "Firebase: Error (auth/wrong-password)."
}

type keyType = keyof typeof AuthErrorsCodes
const keys = Object.keys(AuthErrorsCodes) as keyType[]
export const AuthErrorsCodesValues: string[] = keys.map(code => AuthErrorsCodes[code])

export interface MakedupError {
  type: "password" | "email" | "other" | "ne",
  message?: string
}

export const makeupAuthError = (errMessage: string): MakedupError | null => {
  switch (errMessage) {
    case AuthErrorsCodes.EmailAreadyInUse:
      return { type: "email", message: "E-mail already in use" }
    case AuthErrorsCodes.InvaildEmail:
      return { type: "email", message: "Invalid e-mail" }
    case AuthErrorsCodes.UserNotFound:
      return { type: "email", message: "User not found" }
    case AuthErrorsCodes.WeakPassword:
      return { type: "password", message: "Weak password, at least 6 character" }
    case AuthErrorsCodes.WrongPassword:
      return { type: "password", message: "Wrong password" }
    default:
      return null;
  }

}