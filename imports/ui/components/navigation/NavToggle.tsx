import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, themes, Theme } from '../../theme';

type Props = {
  readonly className?: string,
  readonly focused?: boolean,
  readonly onClick?: (...args) => void,
};

const style = (props: Partial<Props>) => css`
  display: block;
  width: 32px;
  height: 22px;

  position: relative;
  margin-top: ${themes.global.grid.gutterWidth / 2}px;
  margin-bottom: ${themes.global.grid.gutterWidth / 2}px;

  color: black;

  & span {
    background-color: currentColor;
    border-radius: 4px;

    height: 3px;
    width: 100%;

    position: absolute;
    left: 0;
  }

  & span:nth-of-type(1) {
    top: 0;
  }

  & span:nth-of-type(2) {
    top: 10px;
  }

  & span:nth-of-type(3) {
    bottom: 0;
  }

  ${props.focused && `
    color: green;
  `}

  ${mq.sm(css`
    display: none;
  `)}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'NavToggle';

  render() {
    const { className, onClick, ...rest } = this.props;

    return (
      <a className={style(this.props)} onClick={onClick}>
          <span></span>
          <span></span>
          <span></span>
      </a>
    );
  }
}

export const NavToggle = withTheme<Props, Theme>(Element);
