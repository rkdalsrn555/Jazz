import { StoryObj, Meta } from '@storybook/react';
import MatchingProfile from '../../components/features/Game/MatchingProfile/MatchingProfile';

export default { component: MatchingProfile };
export const meta: Meta<typeof MatchingProfile> = {
  title: 'default',
  component: MatchingProfile,
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
    bgColor: '#8CC8DC',
  },
};

type Story = StoryObj<typeof MatchingProfile>;

const Template: Story = {
  name: 'Default',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
    bgColor: '#8CC8DC',
  },
};

export const CircleCharactor: Story = {
  name: '동그리 캐릭터',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'circle.png',
    bgColor: '#BD6598',
  },
};

export const RectangleCharactor: Story = {
  name: '네모 캐릭터',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'rectangle.png',
    bgColor: '#F66639',
  },
};

export const TriangleCharactor: Story = {
  name: '세모 캐릭터',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'triangle.png',
    bgColor: '#FFC702',
  },
};

export const WarrierCharactor: Story = {
  name: '전사 캐릭터',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'warrier.png',
    bgColor: '#EA7C71',
  },
};

export const RockCharactor: Story = {
  name: '바위 캐릭터',
  args: {
    level: 15,
    nickname: '재린이',
    charactor: 'rock.png',
    bgColor: '#1FC9F1',
  },
};
