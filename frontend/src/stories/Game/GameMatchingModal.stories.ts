import { StoryObj, Meta } from '@storybook/react';
import GameMatchingModal from '../../components/features/Game/GameMatchingModal/GameMatchingModal';

export default { component: GameMatchingModal };
export const meta: Meta<typeof GameMatchingModal> = {
  title: 'default',
  component: GameMatchingModal,
};

type Story = StoryObj<typeof GameMatchingModal>;

const Template: Story = {
  name: 'Default',
  args: {
    me: {
      level: 15,
      nickname: '재린이',
      charactor: 'triangle.png',
      bgColor: '#FFC702',
    },
    other: {
      level: 15,
      nickname: '바위맨',
      charactor: 'rock.png',
      bgColor: '#1FC9F1',
    },
    isMatching: false,
  },
};

export const BeforeMatching: Story = {
  ...Template,
  name: '매칭전',
  args: {
    me: {
      level: 15,
      nickname: '재린이',
      charactor: 'triangle.png',
      bgColor: '#FFC702',
    },
    isMatching: false,
  },
};

export const Matching: Story = {
  ...Template,
  name: '매칭성공',
  args: {
    me: {
      level: 15,
      nickname: '재린이',
      charactor: 'triangle.png',
      bgColor: '#FFC702',
    },
    other: {
      level: 15,
      nickname: '바위맨',
      charactor: 'rock.png',
      bgColor: '#1FC9F1',
    },
    isMatching: true,
  },
};