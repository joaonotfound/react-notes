import { TokenDatabaseModel } from "../models/token-database.model";
import { credentials } from "../../admin-firebase-sdk/credentials";
import admin from 'firebase-admin'

export class TokenDatabase implements TokenDatabaseModel {
  private readonly auth;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(credentials)
    });
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