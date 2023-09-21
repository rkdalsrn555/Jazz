import { StoryObj, Meta } from '@storybook/react';
import MarathonResultBtn from 'components/features/Quiz/MarathonResult/MarathonResultBtn';

export default { component: MarathonResultBtn };
export const meta: Meta<typeof MarathonResultBtn> = {
  title: 'default',
  component: MarathonResultBtn,
};

type Story = StoryObj<typeof MarathonResultBtn>;

const Template: Story = {
  name: 'Default',
  args: {},
};

export const MarathonResultBtnStory: Story = {
  ...Template,
  name: '퀴즈 결과 완료 버튼',
  args: {},
};
