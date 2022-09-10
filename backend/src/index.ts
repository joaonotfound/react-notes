import express from "express";
import * as web from 'express-decorators'
import { TokenAPI } from "./api/token-api";
import { UsersApi } from "./api/users-api";
import { TokenDatabase } from "./data/database/tokens-database";
import { UsersDatabase } from "./data/database/users-database";
import admin from 'firebase-admin'
import { credentials } from 'firebase-config/credentials'

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app: express.Application = express();

const userDatabase = new UsersDatabase();
const userApi = new UsersApi(userDatabase);

const tokenDatabase = new TokenDatabase();
const tokenAPI = new TokenAPI(tokenDatabase);

app.use(express.json())
web.register(app, tokenAPI)
web.register(app, userApi)

app.listen(5000, () => {
  console.log('running on localhost:5000')
})
