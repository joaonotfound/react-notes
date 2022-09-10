import { TokenAuthModel } from "backend/models/token-auth-model";
import { Axios } from "axios";
import { backendAPI } from "backend/backend-api";
import { UserAuthentication } from "../user-authentication/user-authentication";
import { browserLocalPersistence } from "firebase/auth";

class TokenAuth implements TokenAuthModel {
  constructor(private readonly axios: Axios) { }
  public async isAuthenticated(): Promise<Boolean> {
    const auth = new UserAuthentication(() => { })
    await auth.setPersistent(browserLocalPersistence)
    const currentUser = await auth.currentUser();
    const token = await currentUser?.getIdToken();
    if (!token) {
      return false;
    }
    return await this.axios.get('/token/verify', {
      params: { token }
    })
      .then(res => Promise.resolve(true))
      .catch(_ => Promise.reject(false))
  }
}

export const tokenAuth = new TokenAuth(backendAPI);