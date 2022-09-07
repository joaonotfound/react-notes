
export interface TokenDatabaseModel {
  getUIDBy(token: string): Promise<String>
}