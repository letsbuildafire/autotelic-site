import * as React from 'react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { styled } from '../theme';

// routing
import { RouteComponentProps } from '@reach/router';

// components
import { Page } from '../components/Page';
import { Item } from '../components/grid';
import { Heading, Subheading } from '../typography';

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

const defaultValues = {
  budget: 10000,
  timeframe: 4,
  name: 'Test',
  email: 'test@test.com',
  phone: '',
  method: false,
  timey: false,
  test: false,
  services: [],
  comments: '',
  files: [],
};

type Props = RouteComponentProps;
export const QuotePage: React.FC<Props> = (props) => {
  const handleSubmit = (values: FormikValues) => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    sleep(300).then(() => {
      console.log(JSON.stringify(values, null, 2));
    });
  };

  return (
    <Page
      key="quote"
      colors={[['magenta', 'rebeccapurple'], 'rebeccapurple']}
    >
      <Wizard
        initialValues={defaultValues}
        onSubmit={handleSubmit}
      >
        {DetailsStep}
        {ServicesStep}
        {BudgetStep}
        {TimeframeStep}
        {CommentsStep}
        {ConfirmationStep}
      </Wizard>
    </Page>
  );
};

//
// Steps
//

const DetailsStep = (
  <Step
    title="Details"
    schema={
      Yup.object().shape({
        email: Yup.string()
          .when(['phone'], {
            is: phone => !phone,
            then: Yup.string()
              .required('How can we email you?')
              .email('Invalid email address')
          })
          .email("Doesn't look like an email to me!"),
        phone: Yup.string()
          .when(['email'], {
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
  >
    {({ formik }) => (
      <>
        <Heading>About You</Heading>
        <Subheading>Nice to meet you</Subheading>
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
      </>
    )}
  </Step>
);

const ServicesStep = (
  <Step title="Services">
    {({ formik }) => (
      <>
        <Heading>Services</Heading>
        <Subheading>How can we help?</Subheading>
        <CheckboxGroup
          name="services"
          options={[
            { value: 'user-experience', label: 'User Experience' },
            { value: 'creative', label: 'Creative' },
            { value: 'interactive', label: 'Interactive' },
            { value: 'data-insights', label: 'Data / Insights' },
          ]}
        />
      </>
    )}
  </Step>
);

const TimeframeStep = (
  <Step title="Timeframe">
    {({ formik }) => (
      <>
        <Heading>Yo</Heading>
        <Subheading>When do you want it dawg?</Subheading>
        <RangeField
          id="timeframe"
          name="timeframe"
          unit="weeks"
          min={2}
          max={8}
          step={1}
        />
      </>
    )}
  </Step>
);

const BudgetStep = (
  <Step title="Budget">
    {({ formik }) => (
      <>
        <Heading>Yo</Heading>
        <Subheading>How much money dawg?</Subheading>
        <RangeField
          id="budget"
          name="budget"
          unit="dollars"
          min={5000}
          max={55000}
          step={1000}
          display={(v: number) => `${Math.ceil(v / 1000)}k`}
        />
      </>
    )}
  </Step>
);

const CommentsStep = (
  <Step title="Comments">
    {({ formik }) => (
      <>
        <Heading>Comments</Heading>
        <Subheading>Can you give any additional detail?</Subheading>
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
          multiple={true}
          button="Add Files"
          label="or drag and drop here"
        />
      </>
    )}
  </Step>
);

const ConfirmationStep = (
  <Step title="Summary">
    {({ formik }) => (
      <>
        <Heading>Look alright?</Heading>
        <Subheading>Did we hear that right?</Subheading>
        <p>Name: {formik!.values.name}</p>
        <p>Phone: {formik!.values.phone}</p>
        <p>Email: {formik!.values.email}</p>
        <p>Services: {formik!.values.services}</p>
        <p>Budget: {formik!.values.budget}</p>
        <p>Timeframe: {formik!.values.timeframe}</p>
      </>
    )}
  </Step>
);
