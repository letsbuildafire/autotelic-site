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
import { ServicesIcon } from '../components/icons/animated/ServicesIcon';
import { UserExperienceIcon } from '../components/icons/animated/UserExperienceIcon';
import { CreativeIcon } from '../components/icons/animated/CreativeIcon';
import { InteractiveIcon } from '../components/icons/animated/InteractiveIcon';
import { InsightsIcon } from '../components/icons/animated/InsightsIcon';

type Props = RouteComponentProps<{ readonly '*': string }>;
export const ServicesPage: React.FC<Props> = (props) => {
  const [ previous, setPrevious ] = React.useState(-1);
  const { '*': section, navigate } = props;
  const sections = [
    {
      path: '',
      url: '/services',
      title: 'Services',
      component: Services,
      icon: ServicesIcon,
    },
    {
      path: 'user-experience',
      url: '/services/user-experience',
      title: 'User Experience',
      component: UserExperience,
      icon: UserExperienceIcon,
    },
    {
      path: 'creative',
      url: '/services/creative',
      title: 'Creative',
      component: Creative,
      icon: CreativeIcon,
    },
    {
      path: 'interactive',
      url: '/services/interactive',
      title: 'Interactive',
      component: Interactive,
      icon: InteractiveIcon,
    },
    {
      path: 'insights',
      url: '/services/insights',
      title: 'Data / Insights',
      component: Insights,
      icon: InsightsIcon,
    },
  ];

  const navigateTo = (index: number, section: typeof sections[0]) => {
    setPrevious(index);
    navigate!(section.url);
  };

  const getSection = (): [number, typeof sections[0]] => {
    const i = findIndex(sections, s => s.path === section);

    return [ i, sections[i] ];
  };

  const handleSwipeUp = (current: number) => {
    if (current + 1 === sections.length) { return; }
    navigateTo(current, sections[current + 1]);
  };

  const handleSwipeDown = (current: number) => {
    if (current === 0) { return; }
    navigateTo(current, sections[current - 1]);
  };

  const [index, { component: Section, icon: Icon }] = getSection();
  const [ ,setTitle ] = useTitle();
  React.useEffect(() => {
    const [prev] = getSection();
    setTitle(sections[index].title);

    setPrevious(prev);
  }, [section]);

  return (
    <Page
      key="services"
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
      colors={[['teal', 'darkcyan', 'cadetblue'], 'teal']}
    >
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

const Services = () => {
  return (
    <section>
      <Heading>Services</Heading>
      <Subheading>We build stuff. And break stuff. And build it again.</Subheading>
      <motion.p>
        A team of strategists disguised as designers, developers
        and good old fashioned storytellers. We combine creative
        thinking with a really sharp backbone of great process,
        intelligent execution and a relentless attention to detail.
      </motion.p>
      <NavButton to="/services/user-experience">Who We Are</NavButton>
    </section>
  );
};

const UserExperience = () => (
  <section>
    <Heading>User Experience</Heading>
    <Subheading>This is who we are. Deal with it.</Subheading>
    <motion.p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Ducimus laboriosam modi illo, facere accusantium veritatis
      exercitationem corporis? Possimus commodi impedit obcaecati
      sequi exercitationem reprehenderit placeat at molestiae omnis..
    </motion.p>
    <NavButton to="/services/creative">Partnerships</NavButton>
  </section>
);

const Creative = () => (
  <section>
    <Heading>Creative</Heading>
    <Subheading>Our partnerships produce visible results.</Subheading>
    <motion.p>
      Our business is built on relationships. Whether they’re a
      short term engagement to accomplish discrete, high-profile
      tasks or the kind that cross many paths and endure for years.
    </motion.p>
    <NavButton to="/services/interactive">Our Services</NavButton>
  </section>
);

const Interactive = () => (
  <section>
    <Heading>Interactive</Heading>
    <Subheading>This is who we are. Deal with it.</Subheading>
    <motion.p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Ducimus laboriosam modi illo, facere accusantium veritatis
      exercitationem corporis? Possimus commodi impedit obcaecati
      sequi exercitationem reprehenderit placeat at molestiae omnis..
    </motion.p>
    <NavButton to="/services/insights">Partnerships</NavButton>
  </section>
);

const Insights = () => (
  <section>
    <Heading>Data / Insights</Heading>
    <Subheading>Our partnerships produce visible results.</Subheading>
    <motion.p>
      Our business is built on relationships. Whether they’re a
      short term engagement to accomplish discrete, high-profile
      tasks or the kind that cross many paths and endure for years.
    </motion.p>
    <NavButton to="/contact">Contact Us</NavButton>
  </section>
);

const swipeConfidenceThreshold = 100000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
