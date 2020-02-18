import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const PlaneIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.679 179.688">
      <path css={style} d="M55.05,73.58C37.59,87.46,7.78,111.37,6.11,114.1c-4.6,7.53,6.29,16.64,10.86,15.27,7.26-2.18,52.4-20.19,52.4-20.19l2.15,36.27S56.75,160,52.43,165.87c-2.81,3.82,2.86,9.14,5.41,8.78,6.6-.96,24.8-4.23,24.8-4.23s18.35,3.29,24.8,4.23c2.55.37,8.22-4.96,5.41-8.78-4.32-5.87-19.09-20.42-19.09-20.42l2.15-36.27s45.14,18.01,52.4,20.19c4.56,1.37,15.45-7.74,10.86-15.27-2.37-3.88-61.41-50.4-61.41-50.4s.67-28.75-1.54-39.34C93.16,9.61,88.56,5,82.64,5S72.13,9.61,69.06,24.36C66.85,34.95,67.52,63.7,67.52,63.7" transform="translate(0.202)"/>
    </svg>
  );
};
