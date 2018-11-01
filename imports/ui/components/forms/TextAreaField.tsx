import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Field, FieldAttributes } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = {
  readonly columns?: number,
  readonly rows?: number,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldAttributes<any>;

const style = (props: Partial<PropsWithContext>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  ${!!props.form.errors[props.field.name] && `
    &:after {
      content: '+';

      position: absolute;
      right: 0.25rem;
      top 50%;

      color: red;
      font-size: 1.75rem;

      transform: translate3d(0, -50%, 0) rotate(45deg);
      transform-origin: 50% 50%;
    }
  `}
`;

const inputStyle = (props: Partial<PropsWithContext>) => css`
  background: none;
  border: none;
  border-bottom: 2px solid #000;
  ${!!props.form.values[props.field.name] && `
    border-bottom-color: green;
  `}

  font-weight: bold;
  font-size: 1rem;
  line-height: 1rem;

  padding: 0.5rem 1.25rem calc(0.5rem + 3px) 0.625rem;

  ${!!props.form.errors[props.field.name] && `
    border-bottom-color: red !important;
  `}

  &:focus{
    border-bottom-width: 4px;

    padding-bottom: 0.5rem;
  }

`;

const labelStyle = (props: Partial<PropsWithContext>) => css`
  color: gray;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;

  position: absolute;
  left: 0;
  top: 1rem;
  margin: 0;
  padding: 0.5rem 0.625rem;

  pointer-events: none;
  transform: none;
  transition: transform 200ms ease-out;
  will-change: font-size, transform;

  ${!!props.form.values[props.field.name] && `
    transform: translate3d(-0.46875rem, -1.5rem, 0) scale(0.75);
  `}

  ${!!props.form.errors[props.field.name] && `
    color: red;
  `}
`;

class Element extends React.PureComponent<PropsWithContext> {
  public static displayName = 'TextArea';

  render() {
    const {
      id,
      field,
      form,
      label,
      placeholder,
      theme,
      variant,
      ...rest
    } = this.props;

    const touched = !!form.touched[field.name];
    const invalid = !!form.errors[field.name];

    return (
      <div className={style(this.props)}>
        <textarea
          className={inputStyle(this.props)}
          id={id}
          placeholder={placeholder}
          {...rest}
          {...field}
        />
        <Label className={labelStyle(this.props)} htmlFor={id} error={invalid}>{label}</Label>
        <FieldFeedback error={touched && invalid && form.errors[field.name]}/>
      </div>
    );
  }
}

const FormikTextAreaField = (props: Props) => (
  <Field
    component={Element}
    {...props}
  />
);

export const TextAreaField = withTheme<Props, Theme>(FormikTextAreaField);
