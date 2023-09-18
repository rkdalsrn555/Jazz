import { StoryObj, Meta } from '@storybook/react';
import QuizResultBtn from 'components/features/Quiz/QuizResult/QuizResultBtn';

export default { component: QuizResultBtn };
export const meta: Meta<typeof QuizResultBtn> = {
  title: 'default',
  component: QuizResultBtn,
};

type Story = StoryObj<typeof QuizResultBtn>;

const Template: Story = {
  name: 'Default',
  args: {},
};

export const QuizResultBtnStory: Story = {
  ...Template,
  name: '퀴즈 결과 완료 버튼',
  args: {},
};
