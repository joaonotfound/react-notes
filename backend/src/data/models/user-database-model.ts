import { CreateUserInterface } from "@/interface/create-user-interface"
import { User } from "@/interface/users-interface"
import { CreatedUserInterface } from "@/interface/created-user-interface"
export interface UserDatabaseModel {
  getUserBy(idToken: string): Promise<User>
  createUserOnDatabase(userToBeRegisted: CreateUserInterface): Promise<CreatedUserInterface>
}