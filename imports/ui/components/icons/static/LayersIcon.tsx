import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const LayersIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 155.53">
      <path css={style} d="M158.84,105.93,183,116.42,94,150.53,5,116.42l24.16-10.49"/>
      <path css={style} d="M158.84,69.55,183,80.04,94,114.15,5,80.04,29.16,69.55"/>
      <path css={style} d="M94,77.77,5,43.66,94,5l89,38.66L110.32,71.51"/>
    </svg>
  );
};
