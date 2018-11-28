import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../theme';

// components
import { NavLink } from 'react-router-dom';
import { Item } from '../components/grid';
import { AutotelicIcon } from '../components/icons/static/AutotelicIcon';

type Props = {
  readonly theme?: Theme,
};

const style = (props: Partial<Props>) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  height: auto;
  width: auto;

  color: ${props.theme.color.logo};
  text-decoration: none;

  user-select: none;
  -webkit-touch-callout: none;

  font-family:
    Archivo,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  font-size: 1.25rem;
  font-weight: normal;

  ${mq.sm(css`
    color: inherit;

    font-size: 1.5rem;
  `)}
`;

const logoStyle = css`
  height: 32px;
  width: 32px;

  fill: transparent;

  ${mq.sm(css`
    height: 48px;
    width: 48px;
  `)}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'Branding';

  render() {
    return (
    <Item area="primary" align="center" justify="start">
      <NavLink className={style(this.props)} to="/" exact>
        <AutotelicIcon className={logoStyle} />
        <span>autotelic</span>
      </NavLink>
    </Item>
    );
  }
}

export const Branding = withTheme<Props, Theme>(Element);
