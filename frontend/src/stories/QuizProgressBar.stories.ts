import { StoryObj, Meta } from '@storybook/react';
import QuizProgressBar from 'components/features/Quiz/QuizProgressBar/QuizProgressBar';

export default { component: QuizProgressBar };
export const meta: Meta<typeof QuizProgressBar> = {
  title: 'default',
  component: QuizProgressBar,
};

type Story = StoryObj<typeof QuizProgressBar>;

const Template: Story = {
  name: 'Default',
  args: {},
};
