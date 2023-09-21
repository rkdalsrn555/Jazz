import { StoryObj, Meta } from '@storybook/react';
import QuizButton from '../../components/features/Quiz/QuizButton/QuizButton';

export default { component: QuizButton };
export const meta: Meta<typeof QuizButton> = {
  title: 'default',
  component: QuizButton,
};

type Story = StoryObj<typeof QuizButton>;

const Template: Story = {
  name: 'Default',
  args: {
    kind: 'hint',
    title: '힌트보기',
  },
};

export const HintButton: Story = {
  ...Template,
  name: '힌트 버튼',
  args: {
    ...Template.args,
    kind: 'hint',
    title: '힌트보기',
  },
};

export const AnswerCheckButton: Story = {
  ...Template,
  name: '정답보기 버튼',
  args: {
    ...Template.args,
    kind: 'answerCheck',
    title: '정답보기',
  },
};

export const StopButton: Story = {
  ...Template,
  name: '그만풀기 버튼',
  args: {
    ...Template.args,
    kind: 'stop',
    title: '그만풀기',
  },
};

export const FavoriteButton: Story = {
  ...Template,
  name: '즐겨찾기 버튼',
  args: {
    ...Template.args,
    kind: 'favorite',
    title: '즐겨찾기',
  },
};

export const NextButton: Story = {
  ...Template,
  name: '다음 버튼',
  args: {
    ...Template.args,
    kind: 'next',
    title: '다음문제',
  },
};
