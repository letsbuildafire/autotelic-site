import * as  React from 'react';
import { withTheme, OptionalThemeProps } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../theme';

export type Ref = SVGSVGElement;

type Props = {
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly className?: string,
  readonly onAppear?: (cb: () => void) => void,
  readonly onEnter?: (cb: () => void) => void,
  readonly onLeave?: (cb: () => void) => void,
};

const style = (props: Partial<Props>) => css`
  z-index: -1;
  position: fixed;
  top: -125vw;
  left: -150vw;

  width: 400vw;
  height: auto;

  fill: none;

  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { innerRef, theme, variant, className, ...rest } = props;
  return (
    <svg className={style(props)} ref={innerRef} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000">
      <linearGradient id="grad1" x1="3174.82" x2="3553.37" y1="256.29" y2="256.29" gradientTransform="matrix(-.8635 -.4986 -.4987 .8638 3474.649 1987.742)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ed5794"/><stop offset=".24" stopColor="#ff5d8c"/><stop offset=".51" stopColor="#fc7040"/><stop offset=".76" stopColor="#ff991e"/><stop offset="1" stopColor="#ffd135"/></linearGradient>
      <path fill="url(#grad1)" d="M518.8 206.8c88.9 55.4 170.4 401.1 15.9 511-43.5 31-167.9 70.9-221.2 80-68.9 11.8-143.7-38.1-116.3-160.2 30-133.8 220.9-493.5 321.6-430.8z"/>
      <linearGradient id="grad2" x1="3238.28" x2="3541.11" y1="194.09" y2="194.09" gradientTransform="matrix(-.8635 -.4986 -.4987 .8638 3474.649 1987.742)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ed5794"/><stop offset=".24" stopColor="#ff5d8c"/><stop offset=".51" stopColor="#fc7040"/><stop offset=".76" stopColor="#ff991e"/><stop offset="1" stopColor="#ffd135"/></linearGradient>
      <path fill="url(#grad2)" d="M512.3 205.3c71.1 44.3 136.3 320.9 12.7 408.8-34.8 24.8-134.3 56.7-177 64-55.1 9.4-115-30.5-93-128.2 24.1-107 176.8-394.7 257.3-344.6z"/>
      <linearGradient id="grad3" x1="3286.26" x2="3528.53" y1="142.73" y2="142.73" gradientTransform="matrix(-.8635 -.4986 -.4987 .8638 3474.649 1987.742)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#ed5794"/><stop offset=".24" stopColor="#ff5d8c"/><stop offset=".51" stopColor="#fc7040"/><stop offset=".76" stopColor="#ff991e"/><stop offset="1" stopColor="#ffd135"/>
      </linearGradient><path d="M510.3 204.1c56.9 35.4 109 256.7 10.2 327.1-27.8 19.8-107.5 45.4-141.6 51.2-44.1 7.5-92-24.4-74.4-102.6 19.2-85.5 141.4-315.7 205.8-275.7z" className="st2"/>
      <linearGradient id="SVGID_4_" x1="3081.01" x2="3459.55" y1="202.14" y2="202.14" gradientTransform="matrix(.8635 -.4986 .4987 .8638 -2383.878 1987.742)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ed5794"/><stop offset=".24" stopColor="#ff5d8c"/><stop offset=".51" stopColor="#fc7040"/><stop offset=".76" stopColor="#ff991e"/><stop offset="1" stopColor="#ffd135"/></linearGradient>
      <path fill="url(#grad3)" d="M464 206.8c-88.9 55.4-170.4 401.1-15.9 511 43.5 31 167.9 70.9 221.2 80 68.9 11.8 143.7-38.1 116.3-160.2-30.1-133.8-221-493.5-321.6-430.8z" />
    </svg>
  );
};

export const Eyecatch = withTheme<Props, Theme>(Element);
