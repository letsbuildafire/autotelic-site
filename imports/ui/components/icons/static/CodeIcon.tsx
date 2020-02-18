import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../theme';

type Props = {
  readonly className?: string
};

export const CodeIcon: React.FC<Props> = (props: Props, context) => {
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
    fill: none;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-width: 16px;
  `;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180.8 155.872">
      <path css={style} d="M5,25.024V16.1A11.129,11.129,0,0,1,16.1,5H164.7a11.129,11.129,0,0,1,11.1,11.1v26.96H5v96.717a11.129,11.129,0,0,0,11.1,11.1H164.7a11.129,11.129,0,0,0,11.1-11.1V61.993"/>
      <path css={style} d="M61.03,125.453,33.13,97.017h-.039l27.9-28.434"/>
      <path css={style} d="M119.5,68.583l27.9,28.435h.039l-27.9,28.435"/>
      <path css={style} d="M78.827,125.453l20.451-56.87"/>
      <line css={dot} x1="30.98" y1="24.54" x2="30.98" y2="24.54" />
      <line css={dot} x1="52.44" y1="24.54" x2="52.44" y2="24.54" />
      <line css={dot} x1="73.90" y1="24.54" x2="73.90" y2="24.54" />
    </svg>
  );
};
