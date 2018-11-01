import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Field, FieldAttributes } from 'formik';
import { Label } from './Label';
import { FieldFeedback } from './FieldFeedback';

type Props = {
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly error?: boolean,
} & FieldAttributes<any>;

const style = (props: Props) => css``;

const SelectInput: React.SFC<Props> = (props: Props, context) => {
  const { id, form, field, onChange, label, ...rest} = props;
  const empty = form.values[field.name].length;
  const invalid = !!form.errors[field.name];

  return (
    <div className={style(props)}>
      <Label htmlFor={id} error={invalid}>{label}</Label>
      <select
        id={id}
        {...field}
      ></select>
      <FieldFeedback error={invalid && form.errors[field.name]}/>
    </div>
  );
};

const FormikSelectField = (props: Props) => (
  <Field
    component={SelectInput}
    {...props}
  />
);

export const SelectField = withTheme(FormikSelectField);
