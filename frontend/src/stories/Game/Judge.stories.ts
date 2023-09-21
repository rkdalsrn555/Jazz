import { StoryObj, Meta } from '@storybook/react';
import Judge from '../../components/features/Game/Judge/Judge';

export default { component: Judge };
export const meta: Meta<typeof Judge> = {
  title: 'default',
  component: Judge,
  args: {
    state: 'win',
  },
};

type Story = StoryObj<typeof Judge>;

const Template: Story = {
  name: 'Default',
  args: {
    state: 'win',
  },
};

export const Win: Story = {
  ...Template,
  name: '이겼을때',
  args: {
    state: 'win',
  },
};

export const Lose: Story = {
  ...Template,
  name: '졌을때',
  args: {
    state: 'lose',
  },
};

export const Draw: Story = {
  ...Template,
  name: '무승부',
  args: {
    state: 'draw',
  },
};
