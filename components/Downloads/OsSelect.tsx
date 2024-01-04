import type { FC } from 'react';

import Select from '@/components/Common/Select';
import Apple from '@/components/Icons/Platform/Apple';
import GenericBlack from '@/components/Icons/Platform/GenericBlack';
import GenericWhite from '@/components/Icons/Platform/GenericWhite';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';
import type { UserOS } from '@/types/userOS';

type OsSelectProps = {
  defaultValues: UserOS;
  onChange: (v: string) => void;
};

const OsSelect: FC<OsSelectProps> = ({ onChange, defaultValues }) => (
  <Select
    values={[
      {
        items: [
          {
            value: 'LINUX',
            label: 'Linux',
            iconImage: <Linux width={16} height={16} />,
          },
          {
            value: 'MAC',
            label: 'MacOS',
            iconImage: <Apple width={16} height={16} />,
          },
          {
            value: 'WIN',
            label: 'Windows',
            iconImage: <Microsoft width={16} height={16} />,
          },
          {
            value: 'OTHER',
            label: 'Other',
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

export default OsSelect;
