import { atom } from 'recoil'
import { IComplete } from '../Models/IComplete';



export const QrcodeAtom = atom<IComplete>({
    key: "QrcodeAtom",
    default: {IsLoading: false, IsExistingMember: false, Email: "tmp@tmp.com", Fullname: "john"} as IComplete
});