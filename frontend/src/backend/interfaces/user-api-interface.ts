
export interface UserBackend {
  uid: string,
  username: string,
  email?: string,
  authProvider?: string
}