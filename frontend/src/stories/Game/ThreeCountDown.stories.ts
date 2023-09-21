import { StoryObj, Meta } from '@storybook/react';
import ThreeCountDown from '../../components/features/Game/CountDown/ThreeCountDown';

export default { component: ThreeCountDown };
export const meta: Meta<typeof ThreeCountDown> = {
  title: 'default',
  component: ThreeCountDown,
};

type Story = StoryObj<typeof ThreeCountDown>;

const Template: Story = {
  name: 'Default',
  args: {},
};
