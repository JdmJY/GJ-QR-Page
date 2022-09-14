import { atom } from 'recoil'
import { ISignup } from '../Models/ISignup';



export const SignUpForm = atom<ISignup>({
    key: "SignUpForm",
    default: {email: "temp@email.com", firstName: "john", lastName: "doe"} as ISignup
});