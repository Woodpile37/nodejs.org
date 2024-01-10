import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import OsSelect from '@/components/Downloads/OsSelect';

type Story = StoryObj<typeof OsSelect>;
type Meta = MetaObj<typeof OsSelect>;

export const Default: Story = {
  args: {
    defaultValues: 'LINUX',
  },
};

export default { component: OsSelect } as Meta;
