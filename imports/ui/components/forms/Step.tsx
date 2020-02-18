import * as React from 'react';
import { useFormikContext, FormikContextType } from 'formik';

type Props = {
  readonly children: (props: PropsWithFormik) => JSX.Element,
  readonly schema?: any, // expects a Yup validation schema
  readonly title?: string,
};

type PropsWithFormik = Props & {
  formik: FormikContextType<any>
};

export const Step: React.FC<Props> = (props) => {
  const formik = useFormikContext<any>();
  const { children } = props;

  return children({ formik: formik, ...props });
};

Step.defaultProps = {
  schema: {},
};
