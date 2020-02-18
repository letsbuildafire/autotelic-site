import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '../../theme';

// helpers
import {
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikValues,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';

// components
import { Grid, Item } from '../grid';
import { FlatButton } from '../buttons';
import { WizardDots } from './WizardDots';

type Props = {
  readonly children: React.ReactElement | Array<React.ReactElement>,
  readonly onSubmit?: (values: FormikValues) => void,
  readonly initialValues?: {[key: string]: any},
} & FormikProps<any>;

export const Wizard: React.FC<Props> = (props) => {
  const [ [ step, direction ], setStep ] = React.useState([0, 0]);
  const {
    children,
    initialValues,
    onSubmit = (values: FormikValues) => {},
    ...rest
  } = props;

  const steps = React.Children.toArray(children);

  const next = () => setStep([Math.min(step + 1, steps.length - 1), 1]);
  const previous = () => setStep([Math.max(step - 1, 0), -1]);
  const last = () => (step === steps.length - 1);

  const validate = (values: FormikValues): FormikErrors<FormikValues> | void => {
    if (!steps[step].props.schema) { return; }

    try {
      validateYupSchema(values, steps[step].props.schema, true);
    } catch (err) {
      return yupToFormErrors(err);
    }
  };

  const submit = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ): void => {
    if (last()) { return onSubmit(values); }

    setSubmitting(false);
    next();
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={initialValues}
      validate={validate}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Grid
          as={Form}
          columns={{
            xs: '100%',
            sm: '400px 1fr',
            lg: '640px 1fr',
          }}
          rows={{
            xs: '80px 1fr 3fr 72px',
            sm: '120px 1fr 72px',
          }}
          areas={{
            xs: `
              " secondary "
              " secondary "
              " step "
              " navigation "
            `,
            sm: `
              " . secondary "
              " step secondary "
              " navigation secondary "
            `,
          }}
          rowGap="0"
          fluid={false}
          justify="center"
          onSubmit={handleSubmit}
          noValidate
          {...rest}
         >
          <AnimatePresence initial={false} custom={direction}>
            <Item
              key={`step-${step}`}
              as={FormStep}
              alignSelf="stretch"
              area="step"
              custom={direction}
            >
              {steps[step]}
            </Item>
          </AnimatePresence>
          <Item
            as={Grid}
            area="navigation"
            align="center"
            justify="center"
            flow="column"
          >
            <FlatButton onClick={previous} disabled={step === 0}>
              back
            </FlatButton>
            <WizardDots
              current={steps[step].props.title}
              items={steps.map(s => s.props.title)}
            />
            <FlatButton type="submit" disabled={isSubmitting}>
              {last() ? 'submit' : 'next'}
            </FlatButton>
          </Item>
        </Grid>
      )}
    </Formik>
  );
};

Wizard.defaultProps = {
  enableReinitialize: false,
  initialValues: {},
  onSubmit: (values: FormikValues) => {},
  validateOnBlur: false,
  validateOnChange: false,
};

const Form = styled.form`
  height: 100%;
`;

const FormStep = styled(motion.section)`
  width: 100%;
  margin: 0 auto;

  user-select: none;
`;

FormStep.defaultProps = {
  variants: {
    initial: (dir: number) => ({
      x: `${dir * 100}%`,
      opacity: 0,
      transition: {
        damping: 200,
      },
    }),
    hidden: (dir: number) => ({
      x: `${dir * -100}%`,
      opacity: 0,
      transition: {
        damping: 200,
      },
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        damping: 200,
      },
    },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden'
};
