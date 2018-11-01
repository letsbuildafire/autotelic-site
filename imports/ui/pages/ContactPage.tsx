import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';
import { matchPath, Prompt } from 'react-router-dom';
import * as Yup from 'yup';

// helpers
import { TweenLite, TimelineLite } from 'gsap';
import * as TransitionGroupPlus from 'react-transition-group-plus';
import { Transitionable } from '../helpers/Transitionable';

// components
import { Page, Ref as PageRef } from '../components/Page';
import { Section } from '../containers/Section';
import { Grid, Item } from '../components/grid';
import { SectionIcon } from '../components/icons';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { Button, NavButton } from '../components/buttons';
import { Eyecatch, Ref as EyecatchRef } from '../components/Eyecatch';

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

const style = (props: Partial<Props>) => css`
  justify-content: flex-start;
`;

const sectionStyle = (props: Partial<Props>) => css`
  padding-top: 32px;
  padding-bottom: 64px;
  min-height: 100%;

  justify-content: center;

  flex: 1 0 100%;
`;

const socialStyle = (props: Partial<Props>) => css`
  margin: 0 0.125rem;
`;

const wizardStyle = (props: Partial<Props>) => css`
  background: linear-gradient(21deg, #3CE87F, #5DA8B5);

  flex: 1 1 auto;

  padding-top: 32px;
  padding-bottom: 64px;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : 'Required');

export class ContactPage extends React.Component<Props> {
  private ref = React.createRef<PageRef>();
  private eyecatch = React.createRef<EyecatchRef>();
  private defaultValues = {
    budget: 10000,
    timeframe: 4,
    name: 'Test',
    email: 'test@test.com',
    phone: '306 777 5555',
    method: false,
    timescale: false,
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

  componentDidMount() {
    TweenLite.set(this.ref.current, {
      opacity: 0,
    });
  }

  componentWillAppear(cb: () => void) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      y: '20px',
    }, {
      opacity: 1,
      y: 0,
      onComplete: cb
    });
  }

  componentWillEnter(cb: () => void) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      y: '20px',
    }, {
      opacity: 1,
      y: 0,
      onComplete: cb
    });
  }

  componentWillLeave(cb: () => void) {
    TweenLite.set(this.ref.current, {
      position: 'absolute',
      zIndex: 1,
    });

    TweenLite.to(this.ref.current, 0.3, {
      opacity: 0,
      y: '-20px',
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
          <Transitionable
            onMount={() => {
              TweenLite.set(this.eyecatch.current, {
                scale: 1.2,
                opacity: 0,
              });
            }}
            onAppear={() => {
              TweenLite.to(this.eyecatch.current, 0.3, {
                scale: 1,
                opacity: 1,
                clearProps: 'transform, opacity',
              });
            }}
            onEnter={cb => {
              TweenLite.fromTo(this.eyecatch.current, 0.3, {
                scale: 1.2,
                opacity: 0,
              }, {
                scale: 1,
                opacity: 1,
                clearProps: 'transform, opacity',
                onComplete: cb,
              });
            }}
            onLeave={cb => {
              TweenLite.to(this.eyecatch.current, 0.3, {
                scale: 1.2,
                opacity: 0,
                delay: 0.45,
                clearProps: 'transform, opacity',
                onComplete: cb,
              });
            }}
            render={state => (
              <Eyecatch
                innerRef={this.eyecatch}
                className={css`
                  z-index: -1;
                  position: absolute;
                  top: 50%;
                  left: 50%;

                  height: auto;
                  width: 350vw;

                  transform: translate3d(-45%, -60%, 0);
                  transform-origin: 50%, 100%;
                  `}
                />
          )} />
        )}
        {matchPath(location.pathname, {path: '/contact/', strict: false, exact: true}) && (
          <Section index={0} variant="light" className={sectionStyle(this.props)}>
            {{
              heading: <Heading variant="light">Contact Us</Heading>,
              subheading: <Subheading variant="light">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>,
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

const stepGrid = {
  rows: {
    xs: '64px auto',
    sm: '1fr auto 1fr',
    lg: '1fr auto 1fr',
  },
  columns: {
    xs: '30px auto 30px',
    sm: '30px 1.5fr 80px 2fr 30px',
    lg: '1fr 300px 80px 400px 1fr',
  },
  areas: {
    xs: `
      ". secondary ."
      ". primary ."
    `,
    sm: `
      ". . . . ."
      ". primary . secondary ."
      ". . . . ."
    `,
    lg: `
      ". . . . ."
      ". primary . secondary ."
      ". . . . ."
    `,
  },
  align: {
    xs: 'end',
    sm: 'end',
  },
  alignContent: {
    xs: 'end',
    sm: 'center',
  },
  justify: {
    xs: 'stretch',
    sm: 'stretch',
  },
};

const wideStepGrid = {
  ...stepGrid,
  columns: {
    xs: '30px auto 30px',
    sm: '30px 1.5fr 80px 2fr 30px',
    lg: '1fr 80px auto 80px 1fr',
  },
  areas: {
    xs: `
      ". secondary ."
      ". primary ."
    `,
    sm: `
      ". . . . ."
      ". primary . secondary ."
      ". . . . ."
    `,
    lg: `
      ". . . . ."
      ". . primary secondary ."
      ". . . . ."
    `,
  },
};

const stepStyle = css`
  position: relative;
  z-index: 1;

  flex: 0 0 100%;
  align-self: stretch;
  justify-self: stretch;

  user-select: none;
`;

const stepIconStyle = css`
  top: 50%;

  width: 100vw;
  max-width: 300px;

  transform: translate3d(-25%, 33.3%, 0);
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
      <Grid innerRef={ref} className={stepStyle} {...stepGrid}>
        <Item area="secondary">
          <SectionIcon className={stepIconStyle} animationData={quoteAboutData}/>
        </Item>
        <Item area="primary">
            <Heading>About You</Heading>
            <Subheading>Nice to meet you.</Subheading>
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
        </Item>
      </Grid>
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
      <Grid innerRef={ref} className={stepStyle} {...wideStepGrid}>
        <Item area="secondary">
          {ctx.values.timeframe > 7 && ctx.values.timeframe <= 10 &&
            <SectionIcon className={stepIconStyle} animationData={quoteServicesData}/>
          }
          {ctx.values.timeframe > 10 &&
            <SectionIcon className={stepIconStyle} animationData={quoteAboutData}/>
          }
        </Item>
        <Item area="primary">
          <Heading>Yo</Heading>
          <Subheading>When do you want it dog?</Subheading>
          <RangeField
            variant="light"
            id="timeframe"
            name="timeframe"
            unit={ctx.values.timescale ? 'months' : 'weeks'}
            min={ctx.values.timescale ? 2 : 4}
            max={ctx.values.timescale ? 12 : 12}
            step={1}
          />
          <ToggleField
            id="timescale"
            name="timescale"
            labelOff="weeks"
            labelOn="months"
          />
        </Item>
      </Grid>
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
      <Grid innerRef={ref} className={stepStyle} {...stepGrid}>
        <Item area="secondary">
          <SectionIcon className={stepIconStyle} animationData={quoteServicesData}/>
        </Item>
        <Item area="primary">
          <Heading>Services</Heading>
          <Subheading>How can we help?</Subheading>
          <CheckboxGroup
            name="services"
            options={[
              { id: 'user-experience', label: 'User Experience'},
              { id: 'creative', label: 'Creative'},
              { id: 'interactive', label: 'Interactive'},
              { id: 'data-insights', label: 'Data / Insights'},
            ]}
          />
        </Item>
      </Grid>
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
      <Grid innerRef={ref} className={stepStyle} {...wideStepGrid}>
        <Item area="secondary">
          <SectionIcon className={stepIconStyle} animationData={quoteServicesData}/>
        </Item>
        <Item area="primary">
          <Heading>Yo</Heading>
          <Subheading>How much money dog?</Subheading>
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
        </Item>
      </Grid>
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
      <Grid innerRef={ref} className={stepStyle} {...stepGrid}>
        <Item area="secondary">
          <SectionIcon className={stepIconStyle} animationData={quoteServicesData}/>
        </Item>
        <Item area="primary">
          <Heading>Comments</Heading>
          <Subheading>Can you give any additional detail?</Subheading>
          <TextAreaField
            id="comments"
            name="comments"
            rows={5}
            columns={40}
            placeholder="Comments/questions..."
          />
          <FileField
            id="files"
            name="files"
            button="Add Files"
            label="or drag and drop here"
          />
        </Item>
      </Grid>
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
      <Grid innerRef={ref} className={stepStyle} {...stepGrid}>
        <Item area="primary">
          <SectionIcon className={stepIconStyle} animationData={quoteServicesData}/>
          <Subheading>Did we get that right?</Subheading>
          <span>Name: {ctx.values.name}</span>
          <span>Phone: {ctx.values.phone}</span>
          <span>Email: {ctx.values.email}</span>
          <span>Services: {ctx.values.services}</span>
          <span>Budget: {ctx.values.budget}</span>
          <span>Timeframe: {ctx.values.timeframe}</span>
        </Item>
      </Grid>
    )}
  />
);
