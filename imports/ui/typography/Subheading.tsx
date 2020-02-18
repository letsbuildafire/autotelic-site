import { styled, mq } from '../theme';

export const Subheading = styled.h2`
  color: ${({ theme }) => theme.colors.subheading};

  font-size: 1.875rem;
  font-weight: normal;
  line-height: 1.875rem;
  text-align: left;

  margin-top: 0;
  margin-bottom: 1.5rem;

  ${mq.md}{
    font-size: 2.625rem;
    line-height: 2.625rem;
  }
`;
