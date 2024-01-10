import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Apple from '@/components/Icons/Platform/Apple';
import GenericBlack from '@/components/Icons/Platform/GenericBlack';
import GenericWhite from '@/components/Icons/Platform/GenericWhite';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';
import NVM from '@/components/Icons/Platform/NVM';

export const PlatformLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <Linux width={64} height={64} />
        <Apple width={64} height={64} />
        <NVM width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Microsoft width={64} height={64} />
        <Homebrew width={64} height={64} />
        <GenericBlack width={64} height={64} className="dark:hidden" />
        <GenericWhite width={64} height={64} className="hidden dark:block" />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
