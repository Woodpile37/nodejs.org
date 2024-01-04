'use client';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import Select from '@/components/Common/Select';
import Tabs from '@/components/Common/Tabs';
import Apple from '@/components/Icons/Platform/Apple';
import GenericBlack from '@/components/Icons/Platform/GenericBlack';
import GenericWhite from '@/components/Icons/Platform/GenericWhite';
import Linux from '@/components/Icons/Platform/Linux';
import Microsoft from '@/components/Icons/Platform/Microsoft';
import { useClientContext, useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import type { UserOS } from '@/types/userOS';

import DefaultLayout from './Default';
import styles from './layouts.module.css';

type _DownloadLayoutProps = {
  release: NodeRelease[];
};

type UserSelection = {
  os: UserOS;
  bitness: number;
  releaseData: NodeRelease;
};

const DownloadLayout: FC<_DownloadLayoutProps> = ({ release }) => {
  const { os, bitness } = useDetectOS();
  const { frontmatter } = useClientContext();
  const [userSelection, setUserSelection] = useState<UserSelection>({
    os,
    bitness,
    releaseData: release.find(release => release.isLts) ?? release[0],
  });

  useEffect(() => {
    setUserSelection({
      os,
      bitness,
      releaseData: release.find(release => release.isLts) ?? release[0],
    });
  }, [os, bitness, release]);

  return (
    <DefaultLayout>
      <main className={styles.downloadLayout}>
        <div>
          <h1 className="text-3xl font-semibold">{frontmatter.title}</h1>
          <p className="text-lg font-medium">{frontmatter.description}</p>
        </div>
        <Tabs
          headerClassName="border-b border-neutral-200 dark:border-neutral-700 mb-6"
          defaultValue="prebuilt"
          tabs={[
            {
              key: 'prebuilt',
              label: 'Prebuilt Installer',
            },
            {
              key: 'package',
              label: 'Package Manager',
            },
            {
              key: 'source',
              label: 'Source Code',
            },
          ]}
          className="mt-6"
        >
          <TabsPrimitive.Content value="prebuilt">
            <p className="inline-flex items-center justify-center gap-[10px]">
              I want the{' '}
              <Select
                inline
                defaultValue={userSelection.releaseData.versionWithPrefix}
                values={release.map(release => release.versionWithPrefix)}
                onChange={v => {
                  setUserSelection({
                    ...userSelection,
                    releaseData: release.find(
                      release => release.versionWithPrefix === v
                    )!,
                  });
                }}
              />{' '}
              version of Node For{' '}
              <Select
                values={[
                  {
                    label: 'Platform',
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
                            <GenericBlack
                              width={16}
                              height={16}
                              className="dark:hidden"
                            />
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
                defaultValue={userSelection.os}
                inline
                onChange={v => {
                  setUserSelection({
                    ...userSelection,
                    os: v as UserOS,
                  });
                }}
              ></Select>{' '}
              running <Select inline></Select>
            </p>
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value="package" className="my-6">
            Package Manager
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value="source" className="my-6">
            <Button className="flex items-center justify-center gap-2">
              <CloudArrowDownIcon className="size-5" />
              Download latest source code
            </Button>
          </TabsPrimitive.Content>
        </Tabs>
        <div>
          <p>
            Node {userSelection.releaseData.version} includes npm{' '}
            {userSelection.releaseData.npm}
          </p>
          <p>
            Learn how to{' '}
            <Link href="https://github.com/nodejs/node#verifying-binaries">
              verify signed SHASUMS
            </Link>
          </p>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default DownloadLayout;
