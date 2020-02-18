import { motion } from 'framer-motion';
import { radialGradient } from 'polished';
import { styled } from '../theme';

type Props = {
  readonly colors?: [Array<string>, string], // [[...stops], fallback]
};

export const Page = styled<Props>(motion.section)`
  height: 100%;
  width: 100%;

  overflow: hidden;

  color: ${({ theme }) => theme.colors.foreground};
  ${({ colors, theme }) => colors && colors.length
    ? radialGradient({
        extent: 'circle at 100% 0'
        colorStops: colors[0],
        fallback: colors[1],
      })
    : `background: ${theme.colors.background};`
  }
`;

Page.defaultProps = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};
