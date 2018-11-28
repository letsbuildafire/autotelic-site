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

export const VideoIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185.15 176.43">
    <circle className={style(props)} cx="97.18" cy="35.51" r="30.51"/>
    <circle className={style(props)} cx="34.56" cy="48.53" r="17.49"/>
    <path className={style(props)} d="M148.38,156.87c6.43,2.68,14.32,6.11,19.17,7.71,4.24,1.4,9.2.8,11.51-5.37,1.27-3.38,1.08-9.1,1.08-15.54V108.58c0-8.25.28-15-1.95-18.52s-7-3.69-10.64-2.38c-6.05,2.16-14.93,5.82-23.53,9.5-6.25,2.67-12.59,5.13-12.59,11.4v50.26a12.62,12.62,0,0,1-12.59,12.59H17.59A12.62,12.62,0,0,1,5,158.84V93.44A12.62,12.62,0,0,1,17.59,80.85H118.85"/>
  </svg>
);
