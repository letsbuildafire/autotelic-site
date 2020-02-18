import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const DumbbellIcon: React.FC<Props> = (props: Props, context ) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.23 160.56">
      <path css={style} d="M67.31,68.14h63.04v76.11a11.344,11.344,0,0,0,11.31,11.31h.32a11.344,11.344,0,0,0,11.31-11.31V40.76A11.344,11.344,0,0,1,164.6,29.45h.32a11.344,11.344,0,0,1,11.31,11.31v79.05a11.357,11.357,0,0,1-8.21,10.88"/>
      <path css={style} d="M153.31,16.31A11.344,11.344,0,0,0,142,5h-.32a11.344,11.344,0,0,0-11.31,11.31V52.65"/>
      <path css={style} d="M114.63,92.32H50.9v51.93a11.344,11.344,0,0,1-11.31,11.31h-.32a11.344,11.344,0,0,1-11.31-11.31V40.76A11.344,11.344,0,0,0,16.65,29.45h-.32A11.342,11.342,0,0,0,5,40.76v79.05a11.357,11.357,0,0,0,8.21,10.88"/>
      <path css={style} d="M27.95,16.31A11.344,11.344,0,0,1,39.26,5h.32A11.344,11.344,0,0,1,50.89,16.31V76.5"/>
    </svg>
  );
};
