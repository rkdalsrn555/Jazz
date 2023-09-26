import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { userType } from 'types/types';

const { persistAtom } = recoilPersist();

export const IsDark = atom<boolean>({
  key: 'IsDark',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userAccessAtom = atom({
  key: 'userAccessAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userRefreshAtom = atom({
  key: 'userRefreshAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const UserInfo = atom<userType>({
  key: 'UserInfo',
  effects_UNSTABLE: [persistAtom],
});
