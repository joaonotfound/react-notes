
export abstract class DatabaseModel{
    public abstract verifyToken(idToken: string): Promise<Boolean>
}