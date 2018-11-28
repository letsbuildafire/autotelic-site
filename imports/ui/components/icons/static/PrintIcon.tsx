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

export const PrintIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.81 180.42">
    <line className={style(props)} x1="55.11" y1="131.69" x2="122.26" y2="131.69"/>
    <path className={style(props)} d="M32.24,130.18V108.34H146.58V163a12.44,12.44,0,0,1-12.4,12.4H44.64A12.44,12.44,0,0,1,32.24,163V146H17.4A12.44,12.44,0,0,1,5,133.63v-62A12.44,12.44,0,0,1,17.4,59.2H32.23V17.4A12.44,12.44,0,0,1,44.63,5h89.53a12.44,12.44,0,0,1,12.4,12.4V44"/>
    <path className={style(props)} d="M161.41,146a12.44,12.44,0,0,0,12.4-12.4v-62a12.44,12.44,0,0,0-12.4-12.4H49.76"/>
    <line className={style(props)} x1="55.11" y1="152.81" x2="122.26" y2="152.81"/>
  </svg>
);
