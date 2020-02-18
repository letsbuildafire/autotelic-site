import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const BasketballIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.13 190.12">
      <g>
        <path css={style} d="M74.21,30.29A158.054,158.054,0,0,0,50.62,16.72h0A90.5,90.5,0,0,0,18.96,46.89"/>
        <path css={style} d="M94.8,66.88c-31.11,21.75-55.31,52.05-66.15,89.01h0a89.95,89.95,0,0,0,46.79,27.08"/>
        <path css={style} d="M118.49,75.28a188.83,188.83,0,0,0-12.2-15.86h0a215.21,215.21,0,0,1,56.54-23.67,90.111,90.111,0,0,0-36.79-25.28"/>
        <path css={style} d="M149.44,146.99a202.62,202.62,0,0,0-23.65-60.31h0c18.82-9.5,43.81-3.74,59.34,8.37a89.6,89.6,0,0,0-12.36-45.56"/>
        <path css={style} d="M114.77,97.33c-15.22,22.57-22.29,69.61-25.02,87.63l1.2.07c1.36.06,2.73.09,4.1.09a90.075,90.075,0,0,0,89.05-76.49"/>
        <path css={style} d="M96.88,49.27c-3.74-3.73-7.66-7.31-11.77-10.7h0c13.06-9.92,22.34-21.86,25.92-31.95l.04-.21A91.84,91.84,0,0,0,95.06,5,89.953,89.953,0,0,0,66.88,9.5"/>
        <path css={style} d="M72.61,45.41C49.16,55.46,11.18,62.22,11.18,62.22h0a90.235,90.235,0,0,0,6.96,79.71"/>
      </g>
    </svg>
  );
};
