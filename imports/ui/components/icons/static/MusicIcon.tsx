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

export const MusicIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.771 170.298">
    <path className={style(props)} d="M42.08,122.68a35.624,35.624,0,0,0-13.42.27c-15.25,3.16-25.69,15-23.32,26.46s16.65,18.18,31.91,15.03c13.11-2.71,22.67-11.85,23.59-21.64l.07-2.05V46.82c0-6.6,5.28-9.75,11.15-12,0,0,78.36-28.51,82.39-29.58a4.551,4.551,0,0,1,3.88.36,4.013,4.013,0,0,1,1.4,3.34c0,2.89-.02,12.86-.02,12.86"/>
    <path className={style(props)} d="M78.5,67.51,159.64,37.8v82.36l-.04,1.1c-.91,9.79-10.47,18.93-23.59,21.64-15.25,3.16-29.54-3.57-31.91-15.03s8.07-23.3,23.32-26.46a35.623,35.623,0,0,1,13.42-.27"/>
  </svg>
);
