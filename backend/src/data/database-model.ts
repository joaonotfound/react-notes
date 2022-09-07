
export abstract class DatabaseModel {
    public abstract verifyToken(idToken: string): Promise<Boolean>
    public abstract isValidToken(idToken: string): Promise<Boolean>
}