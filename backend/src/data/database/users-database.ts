import admin from 'firebase-admin'
import { credentials } from "../../admin-firebase-sdk/credentials"
import { User } from '@/interface/User';
import { UserDatabaseModel } from '../models/user-database-model';

export class UsersDatabase implements UserDatabaseModel {
  private readonly store;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(credentials)
    });
    this.store = admin.firestore();
  }

  public async getUserBy(uid: string): Promise<User> {
    const userDoc = this.getUsersCollection().doc(uid)
    const user = await userDoc.get();
    const userData = user.data();

    if (!user.exists) {
      Promise.reject("User doesn't exists.")
    }
    return {
      name: userData?.name,
      email: userData?.email
    }

  }
  public getUsersCollection() {
    return this.store.collection('users')
  }
}