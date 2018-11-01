import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../theme';

// helpers
import { mq } from '../theme/media';
import { FLUID_CONTAINER } from '../theme/grid';

// components
import { Row, Column, Grid, Item } from '../components/grid';
import { Props as HeadingProps } from '../components/Heading';
import { Props as SubheadingProps } from '../components/Subheading';
import { SectionIconProps } from '../components/icons';
import { NavButtonProps } from '../components/buttons';

export type Ref = HTMLElement;

export type Props = {
  readonly children: {
    icon?: React.ReactElement<SectionIconProps>,
    heading?: React.ReactElement<HeadingProps>,
    subheading: React.ReactElement<SubheadingProps>,
    content: React.ReactNode,
    action?: React.ReactElement<NavButtonProps>,
  },
  readonly className?: string,
  readonly index: number,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const style = (props: Partial<Props>) => css`
  ${FLUID_CONTAINER}
  flex: 1 1 auto;

  min-height: 100vh;
  overflow: hidden;

  padding-bottom: 60px;

  ${props.className}
`;

const secondaryStyle = css`
  position: relative;
`;

const primaryStyle = (props: Partial<Props>) => css`
  max-width: 480px;
`;

const iconStyle = css`
  height: 130vmin;
  width: 130vmin;
  min-height: 400px;
  min-width: 400px;

  position: absolute;
  top: 50%;
  left: 0;

  z-index: -1;
  transform: translate3d(-10%, -50%, 0);

  ${mq.sm(css``)}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'Section';
  public static defaultProps: Partial<Props> = {
    variant: 'dark',
  };

  render() {
    const { innerRef, theme, variant, className, index, children, ...rest } = this.props;
    const { icon, heading, subheading, content, action } = children;

    return (
        <Grid
          innerRef={innerRef}
          element="section"
          className={style(this.props)}
          rows={{
            xs: '120px auto',
            sm: '120px 1fr auto 1fr',
          }}
          columns={{
            xs: `auto`,
            sm: `0.25fr auto 2fr`,
          }}
          areas={{
            xs: `
              "."
              "primary"
            `,
            sm: `
              ". . secondary"
              ". . secondary"
              ". primary secondary"
              ". . secondary"
            `,
          }}
          gaps={{
            xs: `${theme.grid.gutterWidth}px 0`,
            sm: `${theme.grid.gutterWidth}px`
          }}
          align="center"
          justify="space-between"
          justifyContent="start"
          {...rest}
        >
        <Item
          className={secondaryStyle}
          area="secondary"
          align="stretch"
          justify="stretch"
          order={{
            xs: -1,
            sm: 1
          }}
        >
          {icon && React.cloneElement<SectionIconProps>(icon, {className: iconStyle})}
        </Item>
        <Item
          className={primaryStyle(this.props)}
          area="primary"
          align="center"
        >
          {heading}
          {subheading}
          {content}
          {action}
        </Item>
    </Grid>
    );
  }
}

export const Section = withTheme<Props, Theme>(Element);
