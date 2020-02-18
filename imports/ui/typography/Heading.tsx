import { styled, mq } from '../theme';

export const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.heading};

  font-size: 0.625rem;
  font-weight: bold;
  line-height: 0.625rem;
  text-align: left;
  text-transform: uppercase;

  margin-bottom: 0.625rem;

  ${mq.md}{
    font-size: 0.875rem;
    line-height: 0.875rem;
  }
`;
