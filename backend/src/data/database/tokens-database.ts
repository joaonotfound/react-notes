import { TokenDatabaseModel } from "../models/token-database.model";
import { credentials } from "@/admin-firebase-sdk/credentials";
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
    const verifiedToken = await this.auth.verifyIdToken(token);
    if (verifiedToken.uid == null) {
      Promise.reject("Token invalid.")
    }
    return verifiedToken.uid;
  }
}