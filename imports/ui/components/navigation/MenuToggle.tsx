import * as React from 'react';
import { Theme } from '../../theme';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { motion } from 'framer-motion';

type Props = {
  readonly on : boolean,
  readonly toggle: () => void
};
export const MenuToggle: React.FC<Props> = ({ on, toggle }) => {
  const theme = useTheme<Theme>();

  const style = (theme: Theme) => css`
    position: relative;
    margin-right: -${theme.grid.margin}px;

    width: 50px;
    height: 50px;

    z-index: 1;

    background: none;
    border: none;
    outline: none;

    user-select: none;
    cursor: pointer;
  `;

  const variants = {
    initial: { color: theme.colors.menu.toggle },
    active: { color: theme.colors.menu.toggle_active },
    tap: { scale: 0.8 },
  };

  return (
    <motion.button
      type="button"
      css={style}
      onClick={toggle}
      variants={variants}
      initial="initial"
      animate={on ? 'active' : 'initial'}
      whileTap="tap"
     >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            initial: { d: 'M 2 2.5 L 20 2.5' },
            active: {
              d: 'M 3 16.5 L 17 2.5',
              transition: {
                delay: 0.1,
              },
            }
          }}
        />
        <motion.path
          d="M 2 9.423 L 20 9.423"
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            initial: {
              opacity: 1,
              transition: {
                delay: 0.1,
              },
            },
            active: { opacity: 0 },
          }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            initial: { d: 'M 2 16.5 L 20 16.5' },
            active: {
              d: 'M 3 2.5 L 17 16.5',
              transition: {
                delay: 0.1,
              },
            }
          }}
        />
      </svg>
    </motion.button>
  );
};
