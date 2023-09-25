import { QuestionBoxProps } from 'types/types';
import { themeProps } from '@emotion/react';

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
  totalValue: number;
  totalSale: number;
  starred: boolean;
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
  quizId: number;
  question: string;
  content: string[] | string;
  isMulti: boolean;
  isBookmark?: boolean | null;
  finiancialType: number;
  caseNum?: number | null;
  kind: number;
  questionNumber?: number;
  isJudge?: boolean;
  answer?: string | number;
  setAnswer?: (arg: string | number) => void;
  isCorrect?: boolean | null;
};
