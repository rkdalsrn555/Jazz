import { StoryObj, Meta } from '@storybook/react';
import QuizResult from '../../components/features/Quiz/QuizResult/QuizResult';

export default { component: QuizResult };
export const meta: Meta<typeof QuizResult> = {
  title: 'default',
  component: QuizResult,
};

type Story = StoryObj<typeof QuizResult>;

const Template: Story = {
  name: 'Default',
  args: {
    diamondCnt: 10,
    exp: 10,
  },
};

export const QuizResultStory: Story = {
  ...Template,
  name: '퀴즈 결과',
  args: {
    correctNum: 5,
    diamondCnt: 10,
    exp: 10,
  },
};
