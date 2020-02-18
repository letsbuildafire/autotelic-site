import React from 'react';
import { useFormikContext, FormikContext } from 'formik';

type Props = {
  readonly children: React.ReactNode,
  readonly show: (formik: FormikContext<any>) => boolean,
};

export const ConditionalField: React.ReactNode = (props: Props) => {
  const formik = useFormikContext<any>();
  const { children, show } = props;

  return show(formik) ? (children) : null;
};
