import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const BrushIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.031 177.248">
      <path css={style} d="M39.26,104.29c-29.52,4.65-18.5,42.35-21.39,51.68C15.35,164.1,5,170.77,5,170.77c29.9,4.55,56.61-1.84,68.61-17.71,11.45-15.15,8.52-28.93,8.52-28.93L54.07,100.81,67.71,85.23,92.7,114.75s48.46-57.48,74.97-88.84c2.69-3.18,5.95-10.69,0-16.64-7.55-7.55-16.23-3.47-19.74,0C120.25,36.56,82.51,74.49,82.51,74.49"/>
    </svg>
  );
};
