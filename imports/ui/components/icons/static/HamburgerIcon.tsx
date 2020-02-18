import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const HamburgerIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.09 156.66">
      <path css={style} d="M176.09,131.43a20.285,20.285,0,0,1-20.23,20.23H25.06A20.114,20.114,0,0,1,5,131.61v-4.73a5.115,5.115,0,0,1,5.1-5.1H163.57"/>
      <path css={style} d="M97.67,82.34l16.08,8.89,15.72-8.89h31.75a10.874,10.874,0,0,1,10.84,10.84h0a10.874,10.874,0,0,1-10.84,10.84H20.96A10.874,10.874,0,0,1,10.12,93.18h0A10.874,10.874,0,0,1,20.96,82.34H80.68"/>
      <path css={style} d="M5,59.93H5C5,29.72,41.86,5,90.54,5c50.06,0,85.54,24.72,85.54,54.93h0c0,2.51-2.43,4.56-5.39,4.56H22.49"/>
    </svg>
  );
};
