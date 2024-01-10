import type { FC } from 'react';

import Select from '@/components/Common/Select';
import GenericBlack from '@/components/Icons/Platform/GenericBlack';
import GenericWhite from '@/components/Icons/Platform/GenericWhite';
import Homebrew from '@/components/Icons/Platform/Homebrew';
import NVM from '@/components/Icons/Platform/NVM';

type OsSelectProps = {
  defaultValues: 'nvm' | 'homebrew' | 'fvm';
  onChange: (v: string) => void;
};

const PlatformSelect: FC<OsSelectProps> = ({ onChange, defaultValues }) => (
  <Select
    values={[
      {
        items: [
          {
            value: 'nvm',
            label: 'NVM',
            iconImage: <NVM width={16} height={16} />,
          },
          {
            value: 'homebrew',
            label: 'Homebrew',
            iconImage: <Homebrew width={16} height={16} />,
          },
          {
            value: 'fvm',
            label: 'FVM',
            iconImage: (
              <>
                <GenericBlack width={16} height={16} className="dark:hidden" />
                <GenericWhite
                  width={16}
                  height={16}
                  className="hidden dark:block"
                />
              </>
            ),
          },
        ],
      },
    ]}
    defaultValue={defaultValues}
    inline
    onChange={value => onChange(value)}
  />
);

export default PlatformSelect;
