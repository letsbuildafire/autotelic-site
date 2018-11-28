import * as React from 'react';
import { css } from 'emotion';

const style = (props: Partial<Props>) => css`
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke-width: 2px;
`;

type Props = {
  readonly className?: string
};

export const AutotelicIcon = (props: Props) => (
  <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.375 31.395">
    <path className={style(props)} d="M14.347,1.388C10,4.1,6.015,21,13.569,26.381,15.7,27.9,21.78,29.849,24.387,30.3c3.368.576,7.028-1.866,5.687-7.837C28.6,15.915,19.267-1.676,14.347,1.388Z"/>
    <path className={style(props)} d="M17.025,1.388C21.373,4.1,25.357,21,17.8,26.381,15.675,27.9,9.592,29.849,6.985,30.3,3.614,30.87-.043,28.433,1.3,22.458,2.767,15.915,12.105-1.676,17.025,1.388Z"/>
    <path className={style(props)} d="M16.709,1.317c3.479,2.166,6.665,15.693.622,19.994-1.7,1.212-6.569,2.774-8.654,3.131-2.695.461-5.622-1.492-4.55-6.269C5.3,12.939,12.772-1.134,16.709,1.317Z"/>
    <path className={style(props)} d="M16.612,1.26c2.783,1.733,5.332,12.554.5,16a24.307,24.307,0,0,1-6.924,2.5c-2.155.368-4.5-1.194-3.639-5.015C7.488,10.557,13.463-.7,16.612,1.26Z"/>
  </svg>
);
