import { CreateUserInterface, User, CreatedUserInterface } from "@/interfaces"
export interface UserDatabaseModel {
  getUserBy(idToken: string): Promise<User>
  createUserOnDatabase(userToBeRegisted: CreateUserInterface): Promise<CreatedUserInterface>
}