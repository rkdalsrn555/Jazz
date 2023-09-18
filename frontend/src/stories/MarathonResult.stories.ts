import { StoryObj, Meta } from '@storybook/react';
import MarathonResult from 'components/features/Quiz/MarathonResult/MarathonResult';

export default { component: MarathonResult };
export const meta: Meta<typeof MarathonResult> = {
  title: 'default',
  component: MarathonResult,
};

type Story = StoryObj<typeof MarathonResult>;

const Template: Story = {
  name: 'Default',
  args: {
    diamondCnt: 10,
    exp: 10,
  },
};

export const MarathonResultStory: Story = {
  ...Template,
  name: '마라톤 결과',
  args: {
    correctNum: 5,
    diamondCnt: 10,
    exp: 10,
  },
};
