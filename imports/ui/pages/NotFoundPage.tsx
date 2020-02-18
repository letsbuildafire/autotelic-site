import * as React from 'react';

// routing
import { RouteComponentProps } from '@reach/router';

// components
import { Page } from '../components/Page';
import { PageGrid } from '../components/PageGrid';
import { Item } from '../components/grid';
import { Heading, Subheading } from '../typography';
import { NavButton } from '../components/buttons';

export const NotFoundPage: React.FC<RouteComponentProps> = (props) => (
  <Page key="not-found">
    <PageGrid>
      <Item
        as="section"
        stackOrder={2}
        gridColumn={{
          xs: '1 / 3',
          sm: '2 / 4',
        }}
        gridRow={{
          xs: '3 / 4',
          sm: '2 / 3',
        }}
      >
        <Heading>404 &mdash; Page Not Found</Heading>
        <Subheading>Sorry, it doesn't look like we can find that page.</Subheading>
        <p>
          A team of strategists disguised as designers, developers
          and good old fashioned storytellers. We combine creative
          thinking with a really sharp backbone of great process,
          intelligent execution and a relentless attention to detail.
        </p>
        <NavButton to="/">Go home</NavButton>
      </Item>
    </PageGrid>
  </Page>
);

