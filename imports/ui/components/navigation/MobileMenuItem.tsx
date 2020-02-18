import * as React from 'react';
import { css } from '@emotion/core';
import { motion } from 'framer-motion';

const variants = {
  visible: {
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 1.2,
    opacity: 0,
  },
  tap: {
    scale: 0.8,
  }
};

type Props = React.HTMLAttributes<HTMLLIElement>;
export const MobileMenuItem: React.FC<Props> = (props) => {
  const style = css`
    display: block;

    list-style: none;
  `;

  return (
    <motion.li css={style} variants={variants} whileTap="tap" {...props} />
  );
};
