import * as React from 'react';

// helpers
import { connect, FieldAttributes, FormikContext } from 'formik';

type Props = {
  readonly children: React.ReactElement<any>,
  readonly show: (formik: FormikContext<any>) => boolean,
};

type PropsWithContext = Props & FieldAttributes<any>;

const Field: React.SFC<PropsWithContext> = (props: PropsWithContext, context) => {
  const { children, show, formik } = props;
  return show(formik)
    ? (children)
    : null;
};

export const ConditionalField = connect<Props>(Field);
