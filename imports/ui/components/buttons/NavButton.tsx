import * as React from 'react';

import { Link, LinkProps } from '@reach/router';
import { Button, Props as ButtonProps } from '.';

type Props = {
  readonly as?: React.ComponentType<ButtonProps>,
} & LinkProps<{}>;

export const NavButton: React.FC<Props> = ({ as: Component, to, ...rest}) => (
  <Link to={to}><Component {...rest}/></Link>
);

NavButton.defaultProps = {
  as: Button,
};
