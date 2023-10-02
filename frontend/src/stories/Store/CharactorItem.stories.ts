import { StoryObj, Meta } from '@storybook/react';
import CharactorItem from '../../components/features/Store/CharactorItem/CharactorItem';

export default { component: CharactorItem };
export const meta: Meta<typeof CharactorItem> = {
  title: 'default',
  component: CharactorItem,
};

type Story = StoryObj<typeof CharactorItem>;

const Template: Story = {
  name: 'Default',
  args: {
    charactorNumber: 1,
  },
};

export const Circle: Story = {
  ...Template,
  name: '동그리',
  args: {
    charactorNumber: 1,
  },
};
