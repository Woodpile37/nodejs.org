'use client';
import {
  CloudArrowDownIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import Select from '@/components/Common/Select';
import Tabs from '@/components/Common/Tabs';
import OsSelect from '@/components/Downloads/OsSelect';
import PlatformSelect from '@/components/Downloads/PlatformSelect';
import { useClientContext, useDetectOS } from '@/hooks';
import type { NodeRelease } from '@/types';
import type { UserOS } from '@/types/userOS';
import { downloadUrlByOS } from '@/util/downloadUrlByOS';

import DefaultLayout from './Default';
import styles from './layouts.module.css';

type _DownloadLayoutProps = {
  release: NodeRelease[];
};

type OsVariant = 'silicon' | 'intel' | 'x64' | 'x86';

type UserSelection = {
  os: UserOS;
  osVariant?: OsVariant;
  bitness: number;
  releaseData: NodeRelease;
  packageManager?: 'nvm' | 'homebrew' | 'fvm';
};

const OsName = {
  MAC: 'MacOS',
  WIN: 'Windows',
  LINUX: 'Linux',
  OTHER: 'Other',
};

const MacosVariant = ['silicon', 'intel'];

const WindowsVariant = ['x64', 'x86'];

const DownloadLayout: FC<_DownloadLayoutProps> = ({ release }) => {
  const router = useRouter();
  const { os, bitness } = useDetectOS();
  const { frontmatter } = useClientContext();
  const LTS = release.find(release => release.isLts) ?? release[0];
  const [userSelection, setUserSelection] = useState<UserSelection>({
    os,
    bitness,
    releaseData: LTS,
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
          <TabsPrimitive.Content
            value="prebuilt"
            className="my-6 flex flex-col items-start justify-start gap-6"
          >
            <p className="inline-flex items-center justify-center gap-[10px]">
              I want the{' '}
              <Select
                inline
                defaultValue={userSelection.releaseData.versionWithPrefix}
                values={release.map(release => ({
                  value: release.versionWithPrefix,
                  label: `${release.version}${release.isLts ? ' (LTS)' : ''}`,
                }))}
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
              <OsSelect
                onChange={v =>
                  setUserSelection({
                    ...userSelection,
                    os: v as UserOS,
                  })
                }
                defaultValues={userSelection.os}
              />
              {(userSelection.os === 'MAC' || userSelection.os === 'WIN') && (
                <>
                  running
                  <Select
                    inline
                    defaultValue={
                      userSelection.os === 'MAC' ? 'silicon' : 'x64'
                    }
                    values={
                      userSelection.os === 'MAC'
                        ? MacosVariant.map(v => ({ value: v, label: v }))
                        : WindowsVariant.map(v => ({ value: v, label: v }))
                    }
                    onChange={v => {
                      if (userSelection.os === 'MAC') {
                        setUserSelection({
                          ...userSelection,
                          osVariant: v as OsVariant,
                        });
                      }
                      if (userSelection.os === 'WIN') {
                        console.log(v);
                        setUserSelection({
                          ...userSelection,
                          bitness: v === 'x64' ? 64 : v === 'x86' ? 86 : 0,
                        });
                      }
                    }}
                  />
                </>
              )}
            </p>
            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => {
                router.push(
                  downloadUrlByOS(
                    userSelection.releaseData.versionWithPrefix,
                    userSelection.os,
                    userSelection.bitness
                  )
                );
              }}
            >
              <CloudArrowDownIcon className="size-5" />
              Download{' '}
              {LTS === userSelection.releaseData
                ? 'lasted'
                : userSelection.releaseData.versionWithPrefix}{' '}
              Node.js for {OsName[userSelection.os]}
            </Button>
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value="package" className="my-6">
            <p className="inline-flex items-center justify-center gap-[10px]">
              Install Node version
              <Select
                inline
                defaultValue={userSelection.releaseData.versionWithPrefix}
                values={release.map(release => ({
                  value: release.versionWithPrefix,
                  label: `${release.version}${release.isLts ? ' (LTS)' : ''}`,
                }))}
                onChange={v => {
                  setUserSelection({
                    ...userSelection,
                    releaseData: release.find(
                      release => release.versionWithPrefix === v
                    )!,
                  });
                }}
              />
              on
              <OsSelect
                onChange={v =>
                  setUserSelection({
                    ...userSelection,
                    os: v as UserOS,
                  })
                }
                defaultValues={userSelection.os}
              />
              Using
              <PlatformSelect
                onChange={v =>
                  setUserSelection({
                    ...userSelection,
                    packageManager: v as 'nvm' | 'homebrew' | 'fvm',
                  })
                }
                defaultValues={userSelection.packageManager ?? 'nvm'}
              />
            </p>
            {/* CODE SNIPET */}
          </TabsPrimitive.Content>
          <TabsPrimitive.Content
            value="source"
            className="my-6 flex flex-col items-start justify-start gap-6"
          >
            <p className="inline-flex items-center justify-center gap-[10px]">
              I want the
              <Select
                inline
                defaultValue={userSelection.releaseData.versionWithPrefix}
                values={release.map(release => ({
                  value: release.versionWithPrefix,
                  label: `${release.version}${release.isLts ? ' (LTS)' : ''}`,
                }))}
                onChange={v => {
                  setUserSelection({
                    ...userSelection,
                    releaseData: release.find(
                      release => release.versionWithPrefix === v
                    )!,
                  });
                }}
              />
              version of the Node.js source code.
            </p>
            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => {
                router.push(
                  downloadUrlByOS(
                    userSelection.releaseData.versionWithPrefix,
                    'OTHER',
                    0
                  )
                );
              }}
            >
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
            <ArrowUpRightIcon className="m-1 inline size-4" />
          </p>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default DownloadLayout;
