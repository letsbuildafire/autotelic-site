import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const GearIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.53 180.56">
      <path css={style} d="M63.05,70.86a29.42,29.42,0,1,0,17.41-9.7"/>
      <path css={style} d="M63,27.67v-.61C65.26,17.27,68.93,5,73.06,5H97.47c4.22,0,8,12.85,10.23,22.73l.85.31a66.35,66.35,0,0,1,18.1,10.27l1.54,1.27c9.69-3,22.71-6.17,24.83-2.51l12.2,21.15c2.12,3.65-7.15,13.34-14.58,20.24l.17,1a67.28,67.28,0,0,1-.18,22.65c7.44,6.9,16.71,16.59,14.59,20.25L153,143.49c-2.12,3.66-15.14.48-24.84-2.51l-.75.61a66.35,66.35,0,0,1-19.38,11.08l-.35.19c-2.26,9.88-6,22.71-10.23,22.71H73.06c-4.22,0-8-12.81-10.22-22.69l-1.14-.5A66.65,66.65,0,0,1,42.35,141v0c-9.7,3-22.72,6.17-24.83,2.51L5.31,122.35C3.19,118.69,12.46,109,19.9,102.1a67.35,67.35,0,0,1,0-23.65c-7.43-6.9-16.7-16.58-14.58-20.24l12.2-21.14c2.11-3.66,15.13-.47,24.83,2.51l.5-.42c.93-.77,1.88-1.52,2.85-2.24"/>
    </svg>
  );
};
