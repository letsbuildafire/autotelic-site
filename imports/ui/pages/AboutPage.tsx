import * as React from 'react';
import { findIndex } from 'lodash';
import { styled } from '../theme';
import { useTitle } from '../../hooks';
import { motion, AnimatePresence } from 'framer-motion';

// routing
import { RouteComponentProps } from '@reach/router';

// components
import { Page } from '../components/Page';
import { PageGrid } from '../components/PageGrid';
import { Item } from '../components/grid';
import { PageDots } from '../components/pagination';
import { Heading, Subheading } from '../typography';
import { NavButton } from '../components/buttons';

// icons
import { AboutIcon } from '../components/icons/animated/AboutIcon';
import { PartnershipIcon } from '../components/icons/animated/PartnershipIcon';
import { AboutIconGrid } from '../components/AboutIconGrid';

type Props = RouteComponentProps<{ readonly '*': string }>;
export const AboutPage: React.FC<Props> = (props) => {
  const { '*': section, navigate } = props;
  const sections = [
    {
      path: '',
      url: '/about',
      title: 'About Us',
      component: AboutUs,
    },
    {
      path: 'who-we-are',
      url: '/about/who-we-are',
      title: 'Who We Are',
      component: WhoWeAre,
      icon: AboutIcon,
    },
    {
      path: 'partnerships',
      url: '/about/partnerships',
      title: 'Partnerships',
      component: Partnerships,
      icon: PartnershipIcon,
    },
  ];

  const [ previous, setPrevious ] = React.useState(-1);

  const navigateTo = (index: number, section: typeof sections[0]) => {
    setPrevious(index);
    navigate!(section.url);
  };

  const getSection = (): [number, typeof sections[0]] => {
    const i = findIndex(sections, s => s.path === section);

    return [ i, sections[i] ];
  };

  const [index, { component: Section, icon: Icon }] = getSection();
  const [ ,setTitle ] = useTitle();
  React.useEffect(() => {
    setTitle(sections[index].title);
    const [ prev ] = getSection();

    setPrevious(prev);
  }, [section]);

  const handleSwipeUp = (current: number) => {
    if (current + 1 === sections.length) { return; }
    navigateTo(current, sections[current + 1]);
  };

  const handleSwipeDown = (current: number) => {
    if (current === 0) { return; }
    navigateTo(current, sections[current - 1]);
  };

  return (
    <Page
      key="about"
      drag="y"
      dragElastic={0}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.y, velocity.y);
        if (swipe < -swipeConfidenceThreshold) {
          handleSwipeUp(index);
        } else if (swipe > swipeConfidenceThreshold) {
          handleSwipeDown(index);
        }
      }}
      colors={[['purple', 'darkmagenta', 'darkorchid'], 'purple']}
    >
      <AboutIconGrid />
      <PageGrid>
        { Icon &&
          <Item
            as={Icon}
            gridColumn={{
              xs: '1 / 2',
              sm: '3 / 4',
            }}
            gridRow="1 / 3"
            alignSelf="start"
            stackOrder={0}
          />
        }
        <AnimatePresence custom={index > previous}>
          <Item
            gridColumn={{
              xs: '1 / 2',
              sm: '2 / 3'
            }}
            gridRow={{
              xs: '3 / 4',
              sm: '2 / 3',
            }}
            stackOrder={2}
            as={motion.section}
            key={section}
            custom={index > previous}
            variants={{
              initial: (dir: boolean) => ({
                y: dir ? '75%' : '-75%',
                opacity: 0,
                transition: {
                  damping: 200,
                },
              }),
              hidden: (dir: boolean) => ({
                y:!dir ? '75%' : '-75%',
                opacity: 0,
                transition: {
                  damping: 200,
                },
              }),
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  damping: 200,
                },
              },
              active: {
                background: 'green',
              },
            }}
            initial="initial"
            exit="hidden"
          >
            <Section />
          </Item>
        </AnimatePresence>
        <Item
          stackOrder={1}
          gridColumn={{
            xs: '2 / 3',
            sm: '1 / 2',
          }}
          gridRow="2 / 3"
          alignSelf={{
            xs: 'start',
            sm: 'center',
          }}
          as={PageDots}
          items={sections.map(s => s.path)}
          current={section}
          vertical
        />
      </PageGrid>
    </Page>
  );
};

const AboutUs = () => (
  <section>
    <Heading>About Us</Heading>
    <Subheading>We build stuff. And break stuff. And build it again.</Subheading>
    <motion.p>
      A team of strategists disguised as designers, developers
      and good old fashioned storytellers. We combine creative
      thinking with a really sharp backbone of great process,
      intelligent execution and a relentless attention to detail.
    </motion.p>
    <NavButton to="/about/who-we-are">Who We Are</NavButton>
  </section>
);

const WhoWeAre = () => (
  <section>
    <Heading>Who We Are</Heading>
    <Subheading>This is who we are. Deal with it.</Subheading>
    <motion.p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Ducimus laboriosam modi illo, facere accusantium veritatis
      exercitationem corporis? Possimus commodi impedit obcaecati
      sequi exercitationem reprehenderit placeat at molestiae omnis..
    </motion.p>
    <NavButton to="/about/partnerships">Partnerships</NavButton>
  </section>
);

const Partnerships = () => (
  <section>
    <Heading>Partnerships</Heading>
    <Subheading>Our partnerships produce visible results.</Subheading>
    <motion.p>
      Our business is built on relationships. Whether they’re a
      short term engagement to accomplish discrete, high-profile
      tasks or the kind that cross many paths and endure for years.
    </motion.p>
    <NavButton to="/services">Our Services</NavButton>
  </section>
);

const swipeConfidenceThreshold = 100000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
