import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {
  userType,
  TempUserGameInfoType,
  TempGameSessionType,
  TempInitGameMessage,
} from 'types/types';

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

// export const UserInfo = atom<userType>({
//   key: 'UserInfo',
//   effects_UNSTABLE: [persistAtom],
// });

export const TempUserGameInfo = atom<TempUserGameInfoType>({
  key: 'TempUserGameInfo',
  default: {
    gameRoomId: '',
    me: {
      level: 0,
      nickname: '',
      currentCharactor: 1,
    },
    other: {
      level: 0,
      nickname: '',
      currentCharactor: 1,
    },
  },
});

export const TempMyGameSession = atom<TempGameSessionType>({
  key: 'TempMyGameSession',
  default: {
    mySession: '',
  },
});

export const TempGameMessage = atom<TempInitGameMessage>({
  key: 'TempGameMessage',
  default: {
    session: '',
    message: '',
    messageType: '',
    winner: '',
    round: 0,
    user1: {
      session: '',
      lives: 0,
      checked: false,
    },
    user2: {
      session: '',
      lives: 0,
      checked: false,
    },
  },
});
