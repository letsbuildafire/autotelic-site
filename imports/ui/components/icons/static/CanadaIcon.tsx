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

export const CanadaIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.43 177.14">
    <path className={style(props)} d="M70.88,133.44c-11.42,1.15-27.31,3.99-27.31,3.99,7.97-12.09-.51-17.23-.51-17.23L5,90.11s13.03-3.8,14.86-5.83C22.17,81.71,9.63,57.71,9.63,57.71S28.4,67.74,31.74,66.07c3.91-1.95,7.2-15.04,7.2-15.04,20.83,28.8,23.66,21.09,23.14,18s-7.46-43.2-7.46-43.2c11.83,9,14.4,7.2,16.97,5.66S85.18,5,85.18,5h.08S96.27,29.94,98.84,31.49s5.14,3.34,16.97-5.66c0,0-6.94,40.11-7.46,43.2s2.31,10.8,23.14-18c0,0,3.29,13.09,7.2,15.04,3.34,1.67,22.11-8.36,22.11-8.36s-12.55,24-10.23,26.57c1.83,2.03,14.86,5.83,14.86,5.83L127.37,120.2s-8.49,5.14-.51,17.23c0,0-36-6.43-38.57-3.86s-2.03,38.57-2.03,38.57"/>
  </svg>
);
