export interface User {
    readonly token: string,
    readonly type: string,
    readonly id: number,
    readonly username: string,
    readonly roles: ReadonlyArray<string>
}