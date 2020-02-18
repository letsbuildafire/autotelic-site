import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const MountainIcon: React.FC<Props> = (props: Props, context) => {
  const { className } = props;

  const style = (theme: Theme) => css`
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 10px;
  `;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.86 151.84">
      <path css={style} d="M138.35,146.84h51.51l-46.2-89.61L128.74,94.91,111.7,61.17H87.78L116.74,5l16.63,32.26"/>
      <path css={style} d="M74.06,57.08,62.67,34.99,39.83,79.28H58.69l13.44,26.61L83.9,76.17l36.43,70.67H5L32.25,93.98"/>
    </svg>
  );
};
