import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const FlaskIcon: React.FC<Props> = (props: Props, context) => {
  const { className } = props;

  const style = (theme: Theme) => css`
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 10px;
  `;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.2 168.5">
      <path css={style} d="M91,40.71v13.2c0,9.91,3.66,25.66,9.4,36.31s19.86,30.54,27.65,42.13c8.38,12.47,7.58,31.18-9.45,31.13-13.43,0-32.73-.07-51.78-.06-17.5,0-34.78,0-47.12.06-17,.05-17.83-18.66-9.45-31.13C18,120.76,32.11,100.87,37.85,90.22s9.39-26.4,9.39-36.31V24.17H40.46a8.9,8.9,0,0,1-8.87-8.87V13.87A8.91,8.91,0,0,1,40.46,5H98.9a8.91,8.91,0,0,1,8.87,8.87V15.3a8.9,8.9,0,0,1-8.87,8.87H68.11"/>
      <path css={style} d="M49.1,100.09a26.11,26.11,0,0,1,14.06,2.08c10.17,4.18,22.7,7,29.74,3.65"/>
    </svg>
  );
};
