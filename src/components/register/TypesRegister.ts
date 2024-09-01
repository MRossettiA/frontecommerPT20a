
export interface IRegisterProps {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string
}
export type IRegisterError = Partial<IRegisterProps>