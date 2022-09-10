import { TokenAuthModel } from "backend/models/token-auth-model";
import { Axios } from "axios";
import { backendAPI } from "backend/backend-api";
import { appAuth } from "backend/firebase-config/auth"
import { browserLocalPersistence } from "firebase/auth";

class TokenAuth implements TokenAuthModel {
  constructor(private readonly axios: Axios) { }
  public async isAuthenticated(): Promise<string> {
    await appAuth.setPersistence(browserLocalPersistence)
    const currentUser = appAuth.currentUser
    const token = await currentUser?.getIdToken();
    if (!token) {
      Promise.reject()
    }
    return await this.axios.get('/token/verify', {
      params: { token }
    })
      .then(res => Promise.resolve(res.data))
      .catch(_ => Promise.reject(false))
  }
}

export const tokenAuth = new TokenAuth(backendAPI);