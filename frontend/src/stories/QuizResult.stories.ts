import { StoryObj, Meta } from '@storybook/react';
import QuizResult from '../components/features/Quiz/QuizResult/QuizResult';

export default { component: QuizResult };
export const meta: Meta<typeof QuizResult> = {
  title: 'default',
  component: QuizResult,
};

type Story = StoryObj<typeof QuizResult>;

const Template: Story = {
  name: 'Default',
  args: {},
};

export const CorrectNumTen: Story = {
  ...Template,
  name: '맞춘개수 10개',
  args: {
    correctNum: 10,
  },
};

export const CorrectNumOneHundred: Story = {
  ...Template,
  name: '맞춘개수 100개',
  args: {
    correctNum: 100,
  },
};
