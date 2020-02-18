import * as React from 'react';
import { styled, mq } from '../theme';

// components
import { Link } from '@reach/router';
import { AutotelicIcon } from '../components/icons/AutotelicIcon';

export const Branding: React.FC = () => {
  const StyledLink = styled(Link)`
    display: flex;
    gap: 0 8px;
    column-gap: 8px;
    flex-direction: row;
    justify-items: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.logo};
    text-decoration: none;

    user-select: none;
    -webkit-touch-callout: none;

    font-family: Archivo, sans-serif;
    font-size: 1.5rem;
    font-weight: normal;

    grid-area: branding;
    justify-self: start;

    z-index: 1;

    &:hover {
      color: ${({ theme }) => theme.colors.logo};
    }

    ${mq.sm} {
      font-size: 2.0rem;
    }
  `;

  return (
    <StyledLink to="/">
      <AutotelicIcon/>
      <span>autotelic</span>
    </StyledLink>
  );
};
