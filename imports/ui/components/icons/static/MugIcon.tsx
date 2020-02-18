import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const MugIcon: React.FC<Props> = (props: Props, context) => {
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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.752 143.551">
      <path css={style} d="M147.91,87.91c4.74-2.29,18.09-10.17,21.96-27.53,3.95-17.72-7.55-35.63-30.23-32.21.13-5.43.1-9.75.1-12.56,0-12.09-12.86-10.54-12.86-10.54H17.86C17.86,5.06,5,3.52,5,15.61s-.51,52.2,12.86,87.94S43.06,138.52,50,138.52H94.74c6.94,0,18.77.77,32.14-34.97,7.37-19.7,10.52-40.74,11.87-57.67"/>
    </svg>
  );
};
