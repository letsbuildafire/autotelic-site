import * as React from 'react';
import { css } from 'emotion';
import { map } from 'lodash';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';

// components
import { Formik, FormikActions, withFormik, FormikProps } from 'formik';
import { Column, Row } from '../grid';
import { Props as StepProps } from './Step';
import { FlatButton } from '../buttons';
import { Dots } from '../pagination';

type Step = React.ReactElement<StepProps>;

type Props = {
  readonly children: Array<Step> | Step,
  readonly className?: string,
  readonly handleSubmit?: (values: any, actions: FormikActions<any>) => void,
  readonly initialValues?: {[key: string]: any},
};

type State = Readonly<typeof initialState>;
const initialState = {
  direction: true,
  step: 0,
};

const style = (props: Partial<Props>) => css`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;

  ${props.className}
`;

const controlsStyle = css`
  z-index: 5;
  position: absolute;
  bottom: 1rem;
  left: 50%;

  display: flex;
  flex-direction: row;

  align-self: stretch;
  justify-self: flex-end;
  order: 1;

  transform: translate3d(-50%, 0, 0);
`;

const paginationStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const dotsStyle = css`
  z-index: 1;

  flex: 0 0 auto;
`;

export class Wizard extends React.Component<Props, State> {
  readonly state: State = initialState;

  constructor(props: Props) {
    super(props);

    this.next = this.next.bind(this);
    this.isLast = this.isLast.bind(this);
    this.previous = this.previous.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  next() {
    this.setState(state => ({
      step: state.step + 1,
      direction: true,
    }));
  }

  previous() {
    this.setState(state => ({
      step: state.step - 1,
      direction: false,
    }));
  }

  isLast(): boolean {
    const { step } = this.state;

    const steps = React.Children.toArray(this.props.children);
    return (step === steps.length - 1);
  }

  handleSubmit(values: any, actions: FormikActions<any>) {
    const { children, handleSubmit } = this.props;
    const { step } = this.state;

    const steps = React.Children.toArray(children);
    const last = (step === steps.length - 1);

    if (last) {
      return handleSubmit(values, actions);
    } else {
      this.next();
      actions.setSubmitting(false);
    }
  }

  render() {
    const { initialValues, children } = this.props;
    const { step, direction } = this.state;

    const steps = React.Children.toArray(children);

    return (
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={(steps[step] as Step).props.schema || null}
        render={formik => (
          <TransitionGroupPlus
            component="form"
            transitionMode="out-in"
            className={style(this.props)}
            onSubmit={formik.handleSubmit}
            validate="novalidate"
          >
            {React.cloneElement((steps[step] as Step), {
              formik,
              transitionDirection: direction,
            }) || null}

            <Row className={controlsStyle}>
              <Column className={paginationStyle}>
                <FlatButton onClick={this.previous} disabled={step === 0}>back</FlatButton>
                <Dots
                  className={dotsStyle}
                  current={step}
                  diameter={20}
                  items={map(steps, item => (item as Step).props.title)}
                  />
                <FlatButton type="submit" disabled={formik.isSubmitting}>
                  {this.isLast() ? 'submit' : 'next'}
                </FlatButton>
              </Column>
            </Row>
          </TransitionGroupPlus>
        )}
      />
    );
  }
}
