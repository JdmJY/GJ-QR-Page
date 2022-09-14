import { atom } from 'recoil'

export const ShowForm = atom<Boolean>({
    key: "ShowForm",
    default: true
});