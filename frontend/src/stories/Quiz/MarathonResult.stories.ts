import { StoryObj, Meta } from '@storybook/react';
import MarathonResult from '../../components/features/Quiz/MarathonResult/MarathonResult';

export default { component: MarathonResult };
export const meta: Meta<typeof MarathonResult> = {
  title: 'default',
  component: MarathonResult,
};

type Story = StoryObj<typeof MarathonResult>;

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
