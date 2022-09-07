import * as web from 'express-decorators'
import { Response, Request } from 'express'
import { TokenDatabaseModel } from '@/data/models/token-database.model';

@web.basePath('/token')
export class TokenAPI {
  constructor(
    private readonly tokenDatabase: TokenDatabaseModel
  ) { }
  @web.get('/verify')
  async verifyToken(req: Request, res: Response) {
    const token: string = req.query.token as string;
    await this.tokenDatabase.getUIDBy(token)
      .then(response => res.status(200).send(response))
      .catch(_ => res.status(400).send('Invalid token or token not passed.'))

  }
}