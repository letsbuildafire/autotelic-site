import { styled } from '../theme';

export const Article = styled.article`
  height: auto;
  min-height: 100%;
  width: 100%;

  color: ${({ theme }) => theme.colors.foreground}

  z-index: 1;
`;
