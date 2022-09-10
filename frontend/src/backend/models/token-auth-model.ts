

export abstract class TokenAuthModel {
  public abstract isAuthenticated(): Promise<string>
}