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
  args: {
    heartCntProps: 5,
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
  },
};

export const FullHeartProfile: Story = {
  ...Template,
  name: '하트 풀충전',
  args: {
    heartCntProps: 5,
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
  },
};

export const LooseHeartProfile: Story = {
  ...Template,
  name: '하트 줄어들었을때',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
  },
};

export const CircleCharactor: Story = {
  ...Template,
  name: '동그리',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
  },
};

export const RectangleCharactor: Story = {
  ...Template,
  name: '네모',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'rectangle.png',
  },
};

export const TriangleCharactor: Story = {
  ...Template,
  name: '세모',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'triangle.png',
  },
};

export const WarrierCharactor: Story = {
  ...Template,
  name: '전사',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'warrier.png',
  },
};

export const RockCharactor: Story = {
  ...Template,
  name: '바위',
  args: {
    heartCntProps: 3,
    level: 15,
    nickname: '재린이',
    charactor: 'rock.png',
  },
};
