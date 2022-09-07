import * as web from 'express-decorators'
import { Request, Response } from 'express'
import { UserDatabaseModel } from '@/data/models/user-database-model'
import { CreateUserInterface } from '@/interfaces';

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
  @web.post('/create-user')
  async createUserOnDatabse(req: Request, res: Response) {
    const requestParams = req.query
    if (requestParams.name === undefined) {
      res.status(400).send("Missing name value")
    }
    if (requestParams.uid === undefined) {
      res.status(400).send("Missing uid value")
    }
    const params: CreateUserInterface = {
      name: requestParams.name as string,
      uid: requestParams.uid as string
    }
    await this.usersDatabase.createUserOnDatabase(params)
      .catch(err => res.status(400).send(err))
      .then(createdUser => res.status(200).send(createdUser))
  }
}