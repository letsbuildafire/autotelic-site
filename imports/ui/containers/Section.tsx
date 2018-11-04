import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../theme';

// helpers
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
};

const style = (props: Partial<Props>) => css`
  ${FLUID_CONTAINER}
  flex: 1 1 auto;

  color: ${props.theme.color.body};

  padding-bottom: ${props.theme.grid.outerMargin * 2}px;
  overflow: hidden;

  ${props.className}
`;

const primaryStyle = css`
  max-width: 480px;
`;

const secondaryStyle = css`
  position: relative;

  height: 100%;
  width: 100%;
`;

const contentStyle = css`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'Section';

  render() {
    const { children, className, index, innerRef, theme, ...rest } = this.props;
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
            sm: `5% auto 1fr`,
          }}
          areas={{
            xs: `
              "secondary"
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
          justifyContent="center"
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
          {icon}
        </Item>
        <Item
          className={primaryStyle}
          area="primary"
          align={{
            xs: 'end',
            sm: 'center',
          }}
        >
          {heading}
          {subheading}
          <div className={contentStyle}>
            {content}
          </div>
          {action}
        </Item>
    </Grid>
    );
  }
}

export const Section = withTheme<Props, Theme>(Element);
