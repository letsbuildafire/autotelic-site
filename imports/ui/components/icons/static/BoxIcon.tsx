import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const BoxIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.416 179.427">
      <path css={style} d="M69.7 71.2 5 42.2V134.1L86.5 174.4 168.2 134.1l0.1-73.7"/>
      <path css={style} d="M26.3 32.5 86.5 5 168.4 42.2 86.5 78.7v74.4"/>
    </svg>
  );
};
