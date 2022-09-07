import { User } from "@/interface/User"

export interface UserDatabaseModel {
  getUserBy(idToken: string): Promise<User>
}