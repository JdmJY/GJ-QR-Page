import { atom } from 'recoil'
import { IComplete } from '../Models/IComplete';



export const QrcodeAtom = atom<IComplete>({
    key: "QrcodeAtom",
    default: {IsLoading: true} as IComplete
});