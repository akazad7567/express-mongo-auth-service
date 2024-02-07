export interface InterfaceUserHandler {
    healthCheck(): any,
    signup(name: string, email: string, password: string): any;
    login(email: string, password: any): any,
    resetPassword(email: string) : any,
    confirmResetPassword(email: string, password: string, code: number): any
}