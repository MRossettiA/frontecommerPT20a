import { IRegisterProps } from "../register/TypesRegister";

export interface ILoginProps{
email: string;
password: string

}
export interface ILoginError {
    email?: string;
    password?: string
}

export type TRegisterError = Partial<IRegisterProps>