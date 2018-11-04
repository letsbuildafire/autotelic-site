import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../theme';

// helpers
import { FLUID_CONTAINER } from '../theme/grid';

// elements
import { Grid } from './grid';

type Props = {
  readonly children?: React.ReactNode,
  readonly className?: string,
  readonly theme?: Theme,
};

const style = (props: Partial<Props>) => css`
  ${FLUID_CONTAINER}

  background: rgba(255, 255, 255, 0.95);
  color: ${props.theme.color.body};

  height: 48px;
  overflow: visible;

  z-index: 5000;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  ${mq.sm(css`
    background: none;

    height: 64px;
  `)}

  ${props.className}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'Header';

  render() {
    const { children, className, theme, ...rest } = this.props;

    return (
      <Grid
        element="header"
        children={children}
        className={style(this.props)}
        columns={{
          xs: '1fr 64px',
          sm: '5% auto 1fr'
        }}
        areas={{
          xs: `
            "primary secondary"
          `,
          sm: `
            ". primary secondary"
          `
        }}
        gaps={{
          xs: `${theme.grid.gutterWidth}px 0`,
          sm: `${theme.grid.gutterWidth}px`,
        }}
        align="center"
        justify="space-between"
        justifyContent="start"
        {...rest}
      />
    );
  }
}

export const Header = withTheme<Props, Theme>(Element);
