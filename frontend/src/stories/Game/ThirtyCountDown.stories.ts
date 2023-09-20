import { StoryObj, Meta } from '@storybook/react';
import ThirtyCountDown from '../../components/features/Game/CountDown/ThirtyCountDown';

export default { component: ThirtyCountDown };
export const meta: Meta<typeof ThirtyCountDown> = {
  title: 'default',
  component: ThirtyCountDown,
};

type Story = StoryObj<typeof ThirtyCountDown>;

const Template: Story = {
  name: 'Default',
  args: {},
};
