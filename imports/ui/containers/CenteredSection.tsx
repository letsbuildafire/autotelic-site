import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../theme';
import { FLUID_CONTAINER } from '../theme/grid';

// components
import { Grid, Item } from '../components/grid';
import { Props as SectionProps } from './Section';

type Ref = React.Ref<HTMLElement>;
export type Props = {} & SectionProps;

export const CenteredSection: React.FC<Props> = React.forwardRef((props: Props, ref: Ref) => {
  const theme = useTheme<Theme>();
  const {
    extra,
    innerRef,
    primary,
    secondary,
    ...rest
  } = props;

  const style = (theme: Theme) => css`
    ${FLUID_CONTAINER}
    flex: 1 1 auto;

    color: ${theme.colors.body};

    padding-bottom: ${theme.grid.margin * 2}px;
    overflow: hidden;
  `;

  const primaryStyle = (theme: Theme) => css`
    max-width: 480px;
  `;

  const secondaryStyle = (theme: Theme) => css`
    position: relative;

    height: 100%;
    width: 100%;
  `;

  return (
    <Grid
      ref={ref || innerRef}
      component="section"
      css={style}
      rows={{
        xs: '120px auto',
        sm: '120px 1fr auto 1fr',
      }}
      columns={{
        xs: `auto`,
        sm: `1fr auto 1fr`,
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
        xs: `${theme.grid.gutter}px 0`,
        sm: `${theme.grid.gutter}px`
      }}
      align="center"
      justify="center"
      justifyContent="space-between"
      {...rest}
    >
      <Item
        css={secondaryStyle}
        area="secondary"
        align="stretch"
        justify="stretch"
        order={{
          xs: -1,
          sm: 1
        }}
      >
        { secondary && secondary(rest) }
      </Item>
      <Item
        css={primaryStyle}
        area="primary"
        align={{
          xs: 'end',
          sm: 'center',
        }}
      >
          { primary && primary(rest) }
      </Item>
      { extra && extra(rest) }
    </Grid>
  );
});
