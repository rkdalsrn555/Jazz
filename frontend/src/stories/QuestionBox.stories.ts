import { StoryObj, Meta } from '@storybook/react';
import { QuestionBox } from '../components/features/Quiz/QuestionBox/QuestionBox';

export default { component: QuestionBox };
export const meta: Meta<typeof QuestionBox> = {
  title: 'default',
  component: QuestionBox,
};

type Story = StoryObj<typeof QuestionBox>;

const Template: Story = {
  name: 'Default',
  args: {
    quizId: 1,
    question:
      '재무제표를 상호연결하는 고리 역할을 하는 항목(계정과목)은 무엇인가요?',
    content: ['당기 순이익'],
    caseNum: 1,
    isMulti: true,
    kind: 2,
    questionNumber: 1,
  },
};

export const MultipleQuestionShortAnswer: Story = {
  ...Template,
  name: '단어형 객관식',
  args: {
    ...Template.args,
    content: ['당기 순이익', '현금 흐름표', '자본 변동표', '당기 순이익'],
    kind: 1,
  },
};

export const MultipleQuestionLongAnswer: Story = {
  ...Template,
  name: '단어형 주관식',
  args: {
    ...Template.args,
    kind: 2,
  },
};

export const SubjectQuestionShortAnswer: Story = {
  ...Template,
  name: '서술형 객관식',
  args: {
    ...Template.args,
    content: [
      '연구 단계에서 인건비 및 사무실 경비로 5억원 지출',
      '개발 단계에서 개발비의 요건에 해당하는 시점 이후에 20억원 지출',
      '개발 단계에서 시제품 제작 직전에 시장성이 상실되어 개발 포기, 그때까지 지출 총액 10억원',
      '연구 단계에서 인건비 및 사무실 경비로 5억원 지출',
    ],
    kind: 3,
  },
};
