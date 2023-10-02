import { StoryObj, Meta } from '@storybook/react';
import DiamondMoney from '../../components/features/Store/DiamondMoney/DiamondMoney';

export default { component: DiamondMoney };
export const meta: Meta<typeof DiamondMoney> = {
  title: 'default',
  component: DiamondMoney,
};

type Story = StoryObj<typeof DiamondMoney>;

const Template: Story = {
  name: 'Default',
  args: {
    diamond: 100,
  },
};

export const Diamond: Story = {
  ...Template,
  name: '지갑',
  args: {
    diamond: 500,
  },
};

export const RichDiamond: Story = {
  ...Template,
  name: '돈 개많을때',
  args: {
    diamond: 50000000000,
  },
};
