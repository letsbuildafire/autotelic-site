import { styled, mq } from '../../theme';

// components
import { Dots } from './Dots';

export const PageDots = (props) => {
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
    <StyledDots
      variants={variants}
      initial="hidden"
      exit="hidden"
      {...props}
    />
  );
};

const StyledDots = styled(Dots)`
  color: ${({ theme }) => theme.colors.dots};

  ${mq.sm} {
    opacity: 0.5;
  }
`;
