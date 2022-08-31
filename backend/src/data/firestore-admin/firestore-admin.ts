import { DatabaseModel } from '../database-interface';
import admin from 'firebase-admin'
import { credentials } from "../../admin-firebase-sdk/credentials"

export class FirestoreAdmin extends DatabaseModel{
  private readonly auth;
  constructor(){
    super()
    admin.initializeApp({
      credential: admin.credential.cert(credentials)
    });
    this.auth = admin.auth()
  }

  public async verifyToken(idToken: string): Promise<Boolean>{
    const userVerified = await this.auth.verifyIdToken(idToken);
    return userVerified.uid != null;
  }
}