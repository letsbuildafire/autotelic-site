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

export const CloudIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184.36 155.53">
    <path className={style(props)} d="M118.36,91.03,100.08,72.76,81.81,91.03"/>
    <path className={style(props)} d="M72.08,132.25l18.27,18.28,18.27-18.28"/>
    <path className={style(props)} d="M90.26,126.62a14.779,14.779,0,0,0-14.74-14.74H34.97a29.97,29.97,0,1,1,6.61-59.21l-.01-.73a46.938,46.938,0,0,1,89.12-20.59h0a40.654,40.654,0,1,1,8.02,80.51H114.82a14.779,14.779,0,0,1-14.74-14.74"/>
  </svg>
);
