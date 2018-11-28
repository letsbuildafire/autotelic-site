import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';
import { matchPath, Prompt } from 'react-router-dom';
import * as Yup from 'yup';
import { themes } from '../theme';

// helpers
import { TweenLite, TimelineLite } from 'gsap';
import * as TransitionGroupPlus from 'react-transition-group-plus';

// components
import { Page, Ref as PageRef } from '../components/Page';
import { Section } from '../containers/Section';
import { CenteredSection } from '../containers/CenteredSection';
import { Grid, Item } from '../components/grid';
import { SectionIcon } from '../components/icons';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { Button, NavButton } from '../components/buttons';

// form components
import {
  Wizard,
  Step,
  ConditionalField,
  TextField,
  TextAreaField,
  RangeField,
  CheckboxGroup,
  RadioGroup,
  ToggleField,
  FileField,
} from '../components/forms';

// icon data
import {
  quoteAboutData,
  quoteBudgetData,
  quoteServicesData,
} from '../data/icons';

type Props = {
  readonly history?: History,
  readonly location?: Location,
};

type State = {};

const style = (props: Partial<Props>) => css`
  justify-content: flex-start;

  background: linear-gradient(32deg, magenta, chartreuse);
  background-size: 300% 300%;
  background-position-x: 0%;
  background-position-y: 50%;
`;

const sectionStyle = (props: Partial<Props>) => css`
  min-height: 100vh;
`;

const socialStyle = (props: Partial<Props>) => css`
  margin: 0 0.125rem;
`;

const wizardStyle = (props: Partial<Props>) => css`
  flex: 1 1 auto;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : 'Required');

export class ContactPage extends React.Component<Props> {
  private ref = React.createRef<PageRef>();
  private defaultValues = {
    budget: 10000,
    timeframe: 4,
    name: 'Test',
    email: 'test@test.com',
    phone: '306 777 5555',
    method: false,
    timey: false,
    services: [],
    comments: '',
    files: [],
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      blockNavigation: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // const { location: from } = prevProps;
    // const { active: previous } = prevState;

    // if (this.ref.current) {
    //   TweenLite.to(this.ref.current, 1, {
    //     backgroundPositionX: `${(active + 1) / sections.length * 100}%`,
    //   });
    // }
  }

  componentWillAppear(cb: () => void) {
    TweenLite.fromTo(this.ref.current.children, 0.3, {
      y: -20,
    }, {
      y: 0,
      clearProps: 'translate',
      onComplete: cb,
    });
  }

  componentWillEnter(cb: () => void) {
    TweenLite.fromTo(this.ref.current.children, 0.3, {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      clearProps: 'translate, opacity',
      onComplete: cb,
    });
  }

  componentWillLeave(cb: () => void) {
    TweenLite.set(this.ref.current, {
      position: 'absolute',
      zIndex: 2,
    });

    TweenLite.to(this.ref.current.children, 0.3, {
      opacity: 0,
      y: 20,
      onComplete: cb,
    });
  }

  handleSubmit(values, actions) {
    sleep(300).then(() => {
      console.log(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    });
  }

  render() {
    return (
      <TransitionGroupPlus
        innerRef={this.ref}
        className={style(this.props)}
        transitionMode="out-in"
        component={Page}
        childFactory={child => child}
      >
        {matchPath(location.pathname, {path: '/contact/', strict: false, exact: true}) && (
          <Section index={0} className={sectionStyle(this.props)}>
            {{
              heading: <Heading>Contact Us</Heading>,
              subheading: <Subheading>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>,
              content: (
                <div className={css`
                  margin-top: 2rem;
                  margin-bottom: 2rem;
                `}>
                  <p>
                    <a>+1 306 555-5555</a><br/>
                    <a>info@autotelic.com</a>
                  </p>
                  <p>
                    <img className={socialStyle(this.props)} src="https://via.placeholder.com/64x64/01e0a1/"/>
                    <img className={socialStyle(this.props)} src="https://via.placeholder.com/64x64/01e0a1/"/>
                    <img className={socialStyle(this.props)} src="https://via.placeholder.com/64x64/01e0a1/"/>
                    <img className={socialStyle(this.props)} src="https://via.placeholder.com/64x64/01e0a1/"/>
                  </p>
                </div>
              ),
              action: <NavButton to="/contact/quote" exact>Get a quote</NavButton>
            }}
          </Section>
        )}
        {matchPath(location.pathname, {path: '/contact/quote', strict: false, exact: true}) && (
          <Wizard className={wizardStyle(this.props)} initialValues={this.defaultValues} handleSubmit={this.handleSubmit}>
            {DetailsStep}
            {TimeframeStep}
            {ServicesStep}
            {BudgetStep}
            {CommentsStep}
            {ConfirmationStep}
          </Wizard>
        )}
      </TransitionGroupPlus>
    );
  }
}

const stepMount = (el: HTMLDivElement) => {
  TweenLite.set(el, {
    opacity: 0,
    position: 'absolute'
  });
};

const stepAppear = (el: HTMLDivElement, cb: () => void) => {
  TweenLite.set(el, {
    opacity: 1,
    position: 'relative',
    clearProps: 'opacity, position',
  });
};

const stepEnter = (el: HTMLDivElement, direction: boolean, cb: () => void) => {
  TweenLite.fromTo(el, 0.3, {
    position: 'relative',
    x: direction ? '100' : '-100',
    opacity: 0,
  }, {
    x: 0,
    opacity: 1,
    clearProps: 'transform, opacity, position',
    onComplete: cb
  });
};

const stepLeave = (el: HTMLDivElement, direction: boolean, cb: () => void) => {
  TweenLite.fromTo(el, 0.3, {
    x: 0,
    opacity: 1,
  }, {
    x: direction ? '-100' : '100',
    opacity: 0,
    onComplete: cb
  });
};

const stepStyle = css`
  min-height: 100%;

  user-select: none;
`;

const DetailsStep = (
  <Step
    title="Details"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    schema={
      Yup.object().shape({
        email: Yup.string().when(['phone'], {
          is: phone => !phone,
          then: Yup.string()
            .required('How can we email you?')
            .email('Invalid email address')
        }),
        phone: Yup.string().when(['email'], {
          is: email => !email,
          then: Yup.string()
            .required('Maybe a phone call works better?')
        }),
        name: Yup.string()
          .min(2, 'Must be longer than 2 characters')
          .max(32, 'Nice try, nobody has a name that long')
          .required('Required'),
      }, [['phone', 'email'], ['email', 'phone']])
    }
    render={(ref, ctx) => (
      <Section index={1} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteAboutData}/>,
          heading: <Heading>About You</Heading>,
          subheading: <Subheading>Nice to meet you.</Subheading>,
          content: (
            <>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Name"
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
              />
              <TextField
                id="phone"
                name="phone"
                type="text"
                label="Phone"
              />
              <ConditionalField show={c => c.values.email && c.values.phone}>
                <ToggleField
                  id="method"
                  name="method"
                  labelOff="email me"
                  labelOn="call me"
                />
              </ConditionalField>
            </>
          ),
        }}
      </Section>
    )}
  />
);

const TimeframeStep = (
  <Step
    title="Timeframe"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    render={(ref, ctx) => (
      <CenteredSection index={2} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteServicesData}/>,
          heading: <Heading>Yo</Heading>,
          subheading: <Subheading>When do you want it dawg?</Subheading>,
          content: (
            <>
              <RangeField
                id="timeframe"
                name="timeframe"
                unit={ctx.values.timey ? 'months' : 'weeks'}
                min={ctx.values.timey ? 2 : 4}
                max={ctx.values.timey ? 12 : 12}
                step={1}
              />
              <ToggleField
                id="timey"
                name="timey"
                labelOff="weeks"
                labelOn="months"
              />
            </>
          ),
        }}
      </CenteredSection>
    )}
  />
);

const ServicesStep = (
  <Step
    title="Services"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    render={(ref, ctx) => (
      <Section index={3} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteServicesData}/>,
          heading: <Heading>Services</Heading>,
          subheading: <Subheading>How can we help?</Subheading>,
          content: (
            <CheckboxGroup
              name="services"
              options={[
                { id: 'user-experience', label: 'User Experience'},
                { id: 'creative', label: 'Creative'},
                { id: 'interactive', label: 'Interactive'},
                { id: 'data-insights', label: 'Data / Insights'},
              ]}
            />
          ),
        }}
      </Section>
    )}
  />
);

const BudgetStep = (
  <Step
    title="Budget"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    render={(ref, ctx) => (
      <CenteredSection index={4} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteServicesData}/>,
          heading: <Heading>Yo</Heading>,
          subheading: <Subheading>How much money dawg?</Subheading>,
          content: (
            <RangeField
              id="budget"
              name="budget"
              unit="dollars"
              min={5000}
              max={55000}
              step={5000}
              format={value => Math.ceil(value / 1000) * 1000}
              display={value => `${Math.ceil(value / 1000)}k`}
            />
          ),
        }}
      </CenteredSection>
    )}
  />
);

const CommentsStep = (
  <Step
    title="Comments"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    render={(ref, ctx) => (
      <Section index={5} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteServicesData}/>,
          heading: <Heading>Comments</Heading>,
          subheading: <Subheading>Can you give any additional detail?</Subheading>,
          content: (
            <>
              <TextAreaField
                id="comments"
                name="comments"
                rows={5}
                cols={40}
                placeholder="Comments/questions..."
              />
              <FileField
                id="files"
                name="files"
                button="Add Files"
                label="or drag and drop here"
              />
            </>
          ),
        }}
      </Section>
    )}
  />
);

const ConfirmationStep = (
  <Step
    title="Summary"
    onMount={stepMount}
    onAppear={stepAppear}
    onEnter={stepEnter}
    onLeave={stepLeave}
    render={(ref, ctx) => (
      <Section index={6} innerRef={ref} className={stepStyle}>
        {{
          icon: <SectionIcon animationData={quoteServicesData}/>,
          subheading: <Subheading>Did we get that right?</Subheading>,
          content: (
            <>
              <p>Name: {ctx.values.name}</p>
              <p>Phone: {ctx.values.phone}</p>
              <p>Email: {ctx.values.email}</p>
              <p>Services: {ctx.values.services}</p>
              <p>Budget: {ctx.values.budget}</p>
              <p>Timeframe: {ctx.values.timeframe}</p>
            </>
          ),
        }}
      </Section>
    )}
  />
);
