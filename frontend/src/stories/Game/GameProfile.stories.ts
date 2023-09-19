import { StoryObj, Meta } from '@storybook/react';
import GameProfile from '../../components/features/Game/GameProfile/GameProfile';

export default { component: GameProfile };
export const meta: Meta<typeof GameProfile> = {
  title: 'default',
  component: GameProfile,
};

type Story = StoryObj<typeof GameProfile>;

const Template: Story = {
  name: 'Default',
  args: { heartCntProps: 5, level: 15, nickname: '재린이' },
};

export const FullHeartProfile: Story = {
  ...Template,
  name: '하트 풀충전',
  args: { heartCntProps: 5, level: 15, nickname: '재린이' },
};

export const LooseHeartProfile: Story = {
  ...Template,
  name: '하트 줄어들었을때',
  args: { heartCntProps: 3, level: 15, nickname: '재린이' },
};
