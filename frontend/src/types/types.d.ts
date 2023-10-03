import { QuestionBoxProps } from 'types/types';
import { themeProps } from '@emotion/react';
import { TempUserGameInfo } from '../atoms/atoms';

type userType = {
  ableCharacterList: number[] | number;
  ablePrefixTitleList: string[] | string;
  ableSuffixTitleList: string[] | string;
  bookmarkCnt: number;
  collectQuizRecord: number;
  diamond: number;
  expPoint: number;
  level: number;
  mailCnt: number;
  marathonOneDay: number;
  nickname: string;
  rank: string;
  rankPoint: number;
  takeCharacterId: number;
  takePrefixContent: string;
  takePrefixTitleId: number;
  takeSuffixContent: string;
  takeSuffixTitleId: number;
  userUUID: string;
  winningPercentage: number;
};

type btnProps = {
  title: string;
  content: string;
  color: string;
  img: React.HTMLAttributes;
  width: string;
  destination: string;
  onClickEvent?: () => void;
};

type innerContainerProps = {
  title: string;
  width: string;
  height: string;
  minWidth: string;
  minHeight: string;
  backgroundColor: string;
  content: React.HTMLAttributes;
};

type profileBlockInfoProps = {
  marathon: number;
  correctRate: number;
  solved: number;
  favorite: number;
};

type companyProps = {
  id: number;
  name: string;
  totalAssets: number;
  totalDebt: number;
  totalCapital: number;
};

type StatementType = {
  name: string;
  ref: RefObject<HTMLDivElement>;
};
type QuestionListProps = {
  quizId: number;
  question: string;
  content: string[] | string;
  isMulti: boolean;
  isBookmark?: boolean | null;
  finiancialType: number;
  caseNum?: number | null;
  kind: number;
  questionNumber: number;
};

type QuestionBoxProps = {
  messageType?: string;
  quizId: number;
  question: string;
  content: string[] | string;
  isMulti: boolean;
  isBookmark?: boolean | null;
  finiancialType: number;
  caseNum?: number;
  kind: number;
  questionNumber?: number;
  isJudge?: boolean;
  answer?: string | number;
  setAnswer?: (arg: string | number) => void;
  isCorrect?: boolean | null;
  correctContent?: string;
  correctExplanation?: string;
  wrongContent?: string;
  wrongExplanation?: string;
};

type gameClientProfile = {
  level: number;
  nickname: string;
  currentCharactor: number;
};

type gameMatchingModal = {
  isToggled: boolean;
  closeModal: () => void;
};

type TempInitGameMessage = {
  session: string;
  message: string;
  messageType: string;
  winner: string;
  round: number;
  user1: {
    session: string;
    lives: number;
    checked: false;
  };
  user2: {
    session: string;
    lives: number;
    checked: false;
  };
};

type TempUserGameInfoType = {
  gameRoomId: string;
  me: gameClientProfile;
  other: gameClientProfile;
};

type TempGameSessionType = {
  mySession: string;
};

type BattleResultType = {
  user1Cnt: {
    win: number;
    lose: number;
    draw: number;
  };
  user2Cnt: {
    win: number;
    lose: number;
    draw: number;
  };
};
