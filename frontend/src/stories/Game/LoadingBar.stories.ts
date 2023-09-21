import { StoryObj, Meta } from '@storybook/react';
import LoadingBar from '../../components/features/Game/LoadingBar/LoadingBar';

export default { component: LoadingBar };
export const meta: Meta<typeof LoadingBar> = {
  title: 'default',
  component: LoadingBar,
};

type Story = StoryObj<typeof LoadingBar>;

const Template: Story = {
  name: 'Default',
  args: {},
};
