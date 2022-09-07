import express from "express";
import * as web from 'express-decorators'
import { TokenAPI } from "./api/token-api";
import { TokenDatabase } from "./data/database/tokens-database";

const app: express.Application = express();
const tokenDatabase = new TokenDatabase();
const tokenAPI = new TokenAPI(tokenDatabase);

app.use(express.json())
web.register(app, tokenAPI)

app.listen(5000, () => {
  console.log('running on localhost:5000')
})
