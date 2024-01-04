import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import PlatformSelect from '@/components/Downloads/PlatformSelect';

type Story = StoryObj<typeof PlatformSelect>;
type Meta = MetaObj<typeof PlatformSelect>;

export const Default: Story = {
  args: {
    defaultValues: 'nvm',
  },
};

export default { component: PlatformSelect } as Meta;
