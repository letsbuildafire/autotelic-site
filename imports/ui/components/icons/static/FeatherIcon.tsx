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

export const FeatherIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.08 183.039">
    <path className={style(props)} d="M5,177.95c14.12-34.18,25.64-44.56,31.52-45.77,7.66-1.58,23.85,6.16,57.94-10.39,31.63-15.36,46.76-45.6,54.25-75.55,7.35-29.43,16.34-34.6,20.37-37.59-4.17-6.72-41.51-4.42-60.27,9.14C95.58,27.35,92.5,43.27,92.5,43.27S87.05,28.26,81.19,25.56C69.77,39.84,39.91,68.58,37.76,108.13c-.64,11.74,4.76,10.61,7.94,6.79,12.71-15.27,26.35-32.17,52.06-48"/>
  </svg>
);
