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

export const MountainIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.86 151.84">
    <path className={style(props)} d="M138.35,146.84h51.51l-46.2-89.61L128.74,94.91,111.7,61.17H87.78L116.74,5l16.63,32.26"/>
    <path className={style(props)} d="M74.06,57.08,62.67,34.99,39.83,79.28H58.69l13.44,26.61L83.9,76.17l36.43,70.67H5L32.25,93.98"/>
  </svg>
);
