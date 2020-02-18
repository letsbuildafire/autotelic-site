import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const CameraIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.4 135.52">
      <path css={style} d="M66.46,31.26H160.4a12.035,12.035,0,0,1,12,12v75.26a12.035,12.035,0,0,1-12,12H129.29"/>
      <path css={style} d="M55.85,114.38a41.5,41.5,0,1,1,32.84,16.13H17a12.035,12.035,0,0,1-12-12V43.26a12.035,12.035,0,0,1,12-12H43.88v.06s9.51-11.3,16.91-19.3a30.383,30.383,0,0,1,5.54-5.15c1.16-.76,3.2-1.71,7.57-1.77C79.71,5,86.07,5.02,91.05,5h.01c4.97.02,11.34,0,17.15.09,4.37.07,6.4,1.01,7.57,1.77a30.711,30.711,0,0,1,5.54,5.15c1.2,1.29,2.45,2.68,3.7,4.08"/>
    </svg>
  );
};
