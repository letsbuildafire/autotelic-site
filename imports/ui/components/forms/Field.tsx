import { styled } from '../../theme';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: stretch;

  position: relative;

  width: 100%;
  margin-bottom: 1.125rem;

  color: ${({ theme }) => theme.colors.foreground};
`;
