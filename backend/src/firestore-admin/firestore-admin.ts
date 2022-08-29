import admin from 'firebase-admin'
import { credentials } from "../admin-firebase-sdk/credentials"

export class FirestoreAdmin{
  private readonly auth;
  constructor(){
    admin.initializeApp({
      credential: admin.credential.cert(credentials)
    });
    this.auth = admin.auth()
  }
  public async verifyIdToken(idToken: string){
    return await this.auth.verifyIdToken(idToken)
    
  }
}