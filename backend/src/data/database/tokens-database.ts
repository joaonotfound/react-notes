import { TokenDatabaseModel } from "../models/token-database.model";
import admin from 'firebase-admin'

export class TokenDatabase implements TokenDatabaseModel {
  private readonly auth;
  constructor() {
    this.auth = admin.auth()
  }

  public async getUIDBy(token: string): Promise<String> {
    const user = await this.auth.verifyIdToken(token)
      .catch(_ => Promise.reject("Token invalid."));
    if (user.uid == null) {
      Promise.reject("Token invalid.")
    }
    return user.uid;
  }
}