import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "__users";

const { persistAtom } = recoilPersist();

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
