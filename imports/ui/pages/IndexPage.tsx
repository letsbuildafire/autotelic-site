import * as React from 'react';
import { motion } from 'framer-motion';

// routing
import { RouteComponentProps } from '@reach/router';

// components
import { Page } from '../components/Page';
import { PageGrid } from '../components/PageGrid';
import { Item } from '../components/grid';
import { Heading, Subheading } from '../typography';

// icons
import { AboutIcon } from '../components/icons/animated/AboutIcon';

export const IndexPage: React.FC<RouteComponentProps> = (props) => (
  <Page key="index" colors={[['darkblue', 'navy', 'midnightblue'], 'darkblue']}>
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
        <Heading
          as={motion.h1}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            }
          }}
          initial="hidden"
          exit="hidden"
        >
          Who We Are
        </Heading>
        <Subheading
          as={motion.h2}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            }
          }}
          initial="hidden"
          exit="hidden"
        >
          Lorem ipsum dolor sit, amet consectetur.
        </Subheading>
        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            }
          }}
          initial="hidden"
          exit="hidden"
        >
          A team of strategists disguised as designers, developers
          and good old fashioned storytellers. We combine creative
          thinking with a really sharp backbone of great process,
          intelligent execution and a relentless attention to detail.
        </motion.p>
      </Item>
      <Item
        as={AboutIcon}
        stackOrder={1}
        gridRow={{
          xs: '1 / 2',
          sm: '1 / 3',
        }}
        gridColumn={{
          xs: '1 / 2',
          sm: '4 / 5',
        }}
        alignSelf="start"
      />
    </PageGrid>
  </Page>
);
