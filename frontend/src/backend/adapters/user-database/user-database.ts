import { Axios } from "axios";
import { backendAPI } from "backend/backend-api";
import { PublicUser } from "backend/interfaces/public-user-interface";

class UserDatabase {
  constructor(private readonly axios: Axios) { }
  async getPublicUserInfo(uid: string): Promise<PublicUser> {
    const response = await this.axios.get('/users/get-user', {
      params: { uid }
    })
    return response.data
  }
}
export const userDatabase = new UserDatabase(backendAPI);