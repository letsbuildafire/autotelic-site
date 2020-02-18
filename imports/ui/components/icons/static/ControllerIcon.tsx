import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const ControllerIcon: React.FC<Props> = (props: Props, context ) => {
  const { className } = props;

  const style = (theme: Theme) => css`
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 10px;
  `;

  const dot = (theme: Theme) => css`
    fill: #000;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 14px;
  `;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189.966 163.94">
      <path css={style} d="M10.05,51.05v-.73A36.861,36.861,0,0,1,46.8,13.57H67.54S73.52,5,94.95,5c20.94,0,25.15,8.57,25.15,8.57h23a36.861,36.861,0,0,1,36.75,36.75l.09.73s1.94,8.13,3.88,28.02,3.25,51.66-11.4,51.66c-15.52,0-20.49-23.87-24.01-33.96-4.09-11.71-24.5-13.58-28.52,3.45-2.84,12.03-10.79,58.72-24.89,58.72-15.33,0-22.05-46.69-24.89-58.72C68,91.26,61.35,87.53,54.93,87.71c-5.79.16-11.4,3.5-13.34,9.05-3.52,10.09-8.49,33.96-24.01,33.96-14.65,0-13.34-31.77-11.4-51.66.39-3.99.78-7.51,1.15-10.59"/>
      <circle css={style} cx="94.58" cy="90.58" r="11.58"/>
      <circle css={style} cx="44.58" cy="49.58" r="11.58"/>
      <line css={dot} x1="145.00" y1="37.00" x2="145.00" y2="37.00"/>
      <line css={dot} x1="157.00" y1="50.00" x2="157.00" y2="50.00"/>
      <line css={dot} x1="145.00" y1="62.00" x2="145.00" y2="62.00"/>
      <line css={dot} x1="131.00" y1="50.00" x2="131.00" y2="50.00"/>
    </svg>
  );
};
