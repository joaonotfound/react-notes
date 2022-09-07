import * as web from 'express-decorators'
import { Request, Response } from 'express'
import { UserDatabaseModel } from '@/data/models/user-database-model'

@web.basePath('/users')
export class UsersApi {
  constructor(
    private readonly usersDatabase: UserDatabaseModel
  ) { }
  @web.get('/get-user')
  async getUsersBy(req: Request, res: Response) {
    const uid: string = req.query.uid as string;
    await this.usersDatabase.getUserBy(uid)
      .then(response => res.status(200).send(response))
      .catch(_ => res.status(400).send("User doesn't exist."))
  }
}