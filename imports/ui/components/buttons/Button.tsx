import * as React from 'react';
import { styled, mq } from '../../theme';
import { shade, readableColor } from 'polished';

import { getColor } from './util';

type Props = { readonly color?: string };
export const Button = styled.button<Props>`
  background-color: ${getColor};
  border-color: ${getColor};
  border-radius: 1.75rem;
  border: none;

  min-width: 10rem;
  padding: 1.25rem 2rem;

  color: ${(props: Props) => readableColor(getColor(props))};
  font-size: 0.625rem;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;

  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props: Props) => shade(0.05, getColor(props))};
    border-color: ${(props: Props) => shade(0.05, getColor(props))};

    color: ${(props: Props) => readableColor(getColor(props))};
  }

  &:disabled {
    opacity: 0.3;
  }

  ${mq.md}{
    padding: 1.25rem 2.5rem;

    font-size: 0.8125rem;
  }
`;

Button.defaultProps = {
  type: 'button',
};
