import { atom } from 'recoil'

export const Loading = atom<boolean>({
    key: "Loading",
    default: false
});