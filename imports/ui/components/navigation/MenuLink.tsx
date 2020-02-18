import { styled, mq } from '../../theme';
import { Link, LinkProps, LinkGetProps } from '@reach/router';

type Props = LinkProps<{}>;
export const MenuLink = styled<Props>(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px 0;
  row-gap: 4px;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.grid.gutter}px;

  color: ${({ theme }) => theme.colors.menu.foreground};
  font-size: 0.875rem;
  font-weight: bold;

  &[aria-current] {
    color: ${({ theme }) => theme.colors.menu.foreground};
  }

  ${mq.sm}{
    flex-direction: row;
    margin-right: 24px;

    font-size: 0.85rem;
  }
`;

const setActiveForNested = ({ isCurrent, isPartiallyCurrent }: LinkGetProps) => ({
  'aria-current': isCurrent || isPartiallyCurrent ? 'page' : null,
});

MenuLink.defaultProps = {
  getProps: setActiveForNested,
  role: 'menuitem',
};
