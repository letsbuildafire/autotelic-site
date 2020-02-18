import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const LaptopIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188.4 163.02">
      <path css={style} d="M153.95,79.87V22.34H34.45V99.66h119.5v-.04h12.52c6.21,0,9.57,3.74,11.29,12.21l5.64,33.98c0,6.72-5.08,12.21-11.29,12.21H16.29c-6.21,0-11.29-5.5-11.29-12.21l5.64-33.98c.96-5.48,2.95-9.14,6.07-10.93V18.33A13.384,13.384,0,0,1,30.04,5H158.36a13.371,13.371,0,0,1,13.33,13.33V87.36"/>
    </svg>
  );
};
