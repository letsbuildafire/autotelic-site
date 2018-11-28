import * as React from 'react';
import { css } from 'emotion';

const style = (props: Partial<Props>) => css`
  fill: none;
  stroke: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke-width: 10px;
`;

type Props = {
  readonly className?: string
};

export const ImageIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.8 155.88">
    <path className={style(props)} d="M5,103.14V16.1A11.126,11.126,0,0,1,16.1,5H164.7a11.133,11.133,0,0,1,11.1,11.1V139.78a11.133,11.133,0,0,1-11.1,11.1H16.1A11.133,11.133,0,0,1,5,139.78V129.3L37.61,95.28,65.6,120.61l70.21-69.96,24.04,22.38"/>
    <path className={style(props)} d="M57.98,67.79a18.45,18.45,0,1,0-14.95-3.54"/>
  </svg>
);
