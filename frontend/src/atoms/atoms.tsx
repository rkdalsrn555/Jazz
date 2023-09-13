import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const IsDark = atom<boolean>({
  key: "IsDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});