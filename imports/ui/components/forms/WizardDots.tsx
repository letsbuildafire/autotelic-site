import { css } from '@emotion/core';
import { Theme } from '../../theme';

import { Dots } from '../pagination';

export const WizardDots = (props) => {
  const style = (theme: Theme) => css`
      z-index: 1;

      color: ${theme.colors.dots};

      flex: 0 0 auto;
  `;

  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        when: 'beforeChildren',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Dots
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      css={style}
      {...props}
    />
  );
};
