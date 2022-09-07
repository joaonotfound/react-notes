import admin from 'firebase-admin'

import { User, CreateUserInterface, CreatedUserInterface } from '@/interfaces';
import { UserDatabaseModel } from '../models/user-database-model';

export class UsersDatabase implements UserDatabaseModel {
  private readonly store;
  constructor() {
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
  private autoFillCreatedUsed(user: CreateUserInterface): CreatedUserInterface {
    return { name: user.name, finishedSignUp: false }
  }

  public async createUserOnDatabase(userToBeRegisted: CreateUserInterface): Promise<CreatedUserInterface> {
    if (await this.userExists(userToBeRegisted.uid)) {
      return Promise.reject("User already exists. -1 ")
    }
    const user = this.autoFillCreatedUsed(userToBeRegisted)
    this.getUsersCollection().doc(userToBeRegisted.uid).create(user)
    return user
  }

  private async userExists(uid: string): Promise<Boolean> {
    return (await this.getUsersCollection().doc(uid).get()).exists

  }
  private getUsersCollection() {
    return this.store.collection('users')
  }
}