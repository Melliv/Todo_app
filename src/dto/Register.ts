import { IRegister } from "../types/IRegister"

export class Register implements IRegister {
    email: string = ""
    password: string = ""
    firstName: string = ""
    lastName: string = ""
}