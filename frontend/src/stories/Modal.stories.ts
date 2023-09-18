import { StoryObj, Meta } from '@storybook/react';
import Modal from '../components/utils/Modal/Modal';

export default { component: Modal };
export const meta: Meta<typeof Modal> = {
  title: 'default',
  component: Modal,
};

type Story = StoryObj<typeof Modal>;

const Template: Story = {
  name: 'Default',
  args: {},
};

export const WarningModal: Story = {
  ...Template,
  name: '경고 모달',
  args: {
    imoji: '😥',
    content: `문제를 그만 풀면 다이아를 못받아요. 그래도 끝내시겠어요?`,
    modalState: true,
  },
};

export const CheckModal: Story = {
  ...Template,
  name: '확인 모달',
  args: {
    imoji: '😎',
    content: `ㅇㅇㅇ해도 괜찮으시겠어요?`,
    modalState: true,
  },
};
