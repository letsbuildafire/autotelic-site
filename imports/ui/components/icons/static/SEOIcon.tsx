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

export const SEOIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.95 182.47">
    <circle className={style(props)} cx="30.82" cy="151.65" r="25.82"/>
    <path className={style(props)} d="M53.9,21.18a16.19,16.19,0,1,0-6,12.54h0L59.05,44.83"/>
    <circle className={style(props)} cx="156.94" cy="26.04" r="16.18"/>
    <path className={style(props)} d="M132.89,47.77,122.44,58.22l0,0A32.38,32.38,0,0,1,91.6,111.42"/>
    <path className={style(props)} d="M108.19,49a32.37,32.37,0,0,0-31.75,54.73h0l-17,17"/>
    <path className={style(props)} d="M159.79,160.17a13.94,13.94,0,1,0,4.34-15.1h0L134,115"/>
  </svg>
);
