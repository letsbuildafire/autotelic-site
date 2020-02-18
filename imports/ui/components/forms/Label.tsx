import * as React from 'react';
import { styled } from '../../theme';

type Props = {
  readonly meta: {
    error?: string,
    touched?: boolean,
    value?: string,
  },
};

export const Label = styled.label<Props>`
  display: inline-block;
  margin: 0;

  color: ${({ theme }) => theme.colors.foreground};

  font-size: 0.8125rem;
  line-height: 1;

  opacity: 0.5;

  transform: translate3d(0.5rem, 0, 0);

  will-change: transform;
  transition: transform 200ms ease-out;

  ${({ meta }) => !meta.value && `
    opacity: 1;

    transform: translate3d(3rem, 1.25rem, 0) scale(1.2307692307692308);
  `}

  ${({ meta, theme }) => meta.error && meta.touched && `
    color: ${theme.colors.error};
  `}
`;

Label.defaultProps = {
  meta: {
    error: undefined,
    touched: false,
};
