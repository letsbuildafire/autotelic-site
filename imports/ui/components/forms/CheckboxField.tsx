import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Field, FieldProps } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = {
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly label?: string,
  readonly className?: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldProps<any>;

const style = (props: Partial<PropsWithContext>) => css`
  position: relative;
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

const inputStyle = (props: Partial<PropsWithContext>) => css`
  z-index: -9999;
  position: absolute;
  top: 0;
  left: 0;

  clip: rect(0, 0, 0, 0);
`;

const labelStyle = (props: Partial<PropsWithContext>) => css`
  background: white;
  border-radius: 2rem;

  color: gray;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1;

  display: block;
  padding: 1.25rem 2.5rem 1.25rem 3.125rem;

  user-select: none;
  transition: background 200ms ease-out;

  &:after {
    content: '+';
    font-size: 2rem;
    font-weight: normal;
    line-height: 1.25rem;

    height: 1.25rem;

    display: block;
    position: absolute;
    top: 50%;
    right: 1.25rem;

    transition: transform 200ms ease-out;
    transform: translate3d(0, -50%, 0) rotate(90deg);
    transform-origin; 50% 50%:
  }

  input:checked + & {
    background: linear-gradient(to right, dodgerblue, teal);
    color: white;
  }

  input:checked + &:after {
    content: '-';
    font-size: 2.75rem;
    line-height: 0.75rem;

    transform: translate3d(0, -50%, 0) rotate(180deg);
  }
`;

export class Element extends React.PureComponent<PropsWithContext> {
  public static displayName = 'CheckboxInput';

  render() {
    const { theme, variant, id, form, field, label } = this.props;
    const invalid = !!form.errors[field.name];

    return (
      <div className={style(this.props)}>
        <input className={inputStyle(this.props)} type="checkbox" id={id} {...field}/>
        <Label className={labelStyle(this.props)} htmlFor={id} error={invalid}>{label}</Label>
        <FieldFeedback error={invalid && form.errors[field.name]}/>
      </div>
    );
  }
}

const FormikCheckboxField = (props: Props) => (
  <Field
    component={Element}
    {...props}
  />
);

export const CheckboxField = withTheme<Props, Theme>(FormikCheckboxField);
