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

export const CaliperIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.577 164.335">
    <g transform="translate(-0.003 -0.003)">
      <path className={style(props)} d="M63.3,54.49l6.61-6.61,23.47,3.49,6.09-6.09,6.19-6.24-4.68-22.23,6.61-6.61a6.114,6.114,0,0,1,8.62,0L172.3,66.29a6.046,6.046,0,0,1,1.28,3.72l-.78,35.93c-3.78-3.69-13.38-13.37-19.72-19.98.08-1.49.64-7.8.64-7.8L128.97,53.41l-22.49,22.4,24.8,24.8s6.54-.64,7.8-.64c6.61,6.34,16.29,15.94,19.98,19.72H122.35a6.046,6.046,0,0,1-3.72-1.28L72.59,72.4h0L6.52,138.21a6.8,6.8,0,0,0,.3,8.92l10.43,10.43a6.114,6.114,0,0,0,8.62,0l51.65-51.65"/>
      <path className={style(props)} d="M138.56,6.78a6.114,6.114,0,0,1,8.62,0l10.43,10.43a6.114,6.114,0,0,1,0,8.62l-3.93,3.93"/>
    </g>
  </svg>
);
