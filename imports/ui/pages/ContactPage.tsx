import * as React from 'react';

// routing
import { RouteComponentProps } from '@reach/router';

// components
import { Page } from '../components/Page';
import { PageGrid } from '../components/PageGrid';
import { Item } from '../components/grid';
import { Heading, Subheading } from '../typography';
import { NavButton } from '../components/buttons';
import { DribbbleIcon, FacebookIcon, GithubIcon, TwitterIcon } from '../components/icons/social';

export const ContactPage: React.FC<RouteComponentProps> = (props) => (
  <Page key="contact" colors={[['darkslateblue', 'slateblue'], 'darkslateblue']}>
    <PageGrid>
      <Item
        as="section"
        stackOrder={2}
        gridColumn={{
          xs: '1 / 2',
          sm: '1 / 3',
        }}
        gridRow={{
          xs: '3 / 4',
          sm: '2 / 3',
        }}
      >
        <Heading>Contact Us</Heading>
        <Subheading>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>
        <p>
          <a>+1 306 555-5555</a><br/>
          <a>info@autotelic.com</a>
        </p>
        <p>
          <DribbbleIcon />
          <FacebookIcon />
          <GithubIcon />
          <TwitterIcon />
        </p>
        <NavButton to="/quote">Get a quote</NavButton>
      </Item>
    </PageGrid>
  </Page>
);
