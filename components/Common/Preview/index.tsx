import classNames from 'classnames';
import type { CSSProperties, ComponentProps, FC } from 'react';

import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import type { BlogPreviewType } from '@/types';

import styles from './index.module.css';

type PreviewProps = {
  title: string;
  type?: BlogPreviewType;
  height: CSSProperties['height'];
  width: CSSProperties['width'];
} & Omit<ComponentProps<'div'>, 'children'>;

const Preview: FC<PreviewProps> = ({
  type = 'announcements',
  title,
  height = 400,
  width = 800,
  ...props
}) => (
  <div
    {...props}
    style={{ width, height, ...props.style }}
    className={classNames(styles.root, styles[type], props.className)}
  >
    <div className={styles.container}>
      <JsIconWhite className={styles.logo} />
      <h2>{title}</h2>
    </div>
  </div>
);

export default Preview;
