import { atom } from 'recoil'
import { IComplete } from '../Models/IComplete';



export const QrcodeAtom = atom<IComplete>({
    key: "QrcodeAtom",
    default: {IsLoading: false, IsExistingMember: false, email: "tmp@tmp.com", fullname: "john"} as IComplete
});