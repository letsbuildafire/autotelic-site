import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Field, FieldProps } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = {
  readonly labelOn?: string,
  readonly labelOff?: string,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldProps<any>;

const style = (props: Partial<PropsWithContext>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const inputStyle = (props: Partial<PropsWithContext>) => css`
  z-index: -9999;
  position: absolute;
  top: 0;
  left: 0;

  clip: rect(0, 0, 0, 0);
`;

const labelStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const labelTextStyle = css`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;

  transition: color 300ms ease-out;
`;

const labelTextActiveStyle = css`
  ${labelTextStyle}

  color: dodgerblue;
`;

const toggleStyle = (props: Partial<PropsWithContext>) => css`
  background: linear-gradient(to right, teal, dodgerblue 40%, dodgerblue 60%, #AD00A8);
  background-size: 400% 400%;
  background-position: 100% 50%;
  border-radius: 2rem;
  box-shadow:
      inset 0 3px 0 rgba(0, 0, 0, 0.125),
      0 1px 0 rgba(255, 255, 255, 0.25);

  height: auto;
  width: 3.5rem;
  padding: 0.125rem;
  overflow: hidden;

  position: relative;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  transition: background-position 280ms ease-out;

  cursor: pointer;

  input:checked ~ & {
    background-position: 0% 50%;
  }

  &:after {
    content: '';
    background: #e0e0e0;
    background: radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
    border: 2px solid #fafafa;
    border-radius: 50%;

    display: block;
    height: 1.5rem;
    width: 1.5rem;

    position: relative;
    margin: 0;

    transition: all 200ms ease-out;
    transform: translate3d(0, 0, 0);
  }

  input:checked ~ &:after {
    transform: translate3d(1.75rem, 0, 0);
  }
`;

class Element extends React.PureComponent<PropsWithContext> {
  public static displayName = 'ToggleInput';

  render() {
    const { id, form, field, labelOn, labelOff, ...rest} = this.props;
    const { value, ...fieldProps} = field;
    const invalid = !!form.errors[field.name];

    return (
      <div className={style(this.props)}>
        <Label className={labelStyle} htmlFor={id} error={invalid}>
          <input className={inputStyle(this.props)} type="checkbox" id={id} checked={field.value} {...fieldProps}/>
          {labelOff && <span className={field.value ? labelTextStyle : labelTextActiveStyle}>{labelOff}</span>}
          <div className={toggleStyle(this.props)}/>
          <span className={field.value ? labelTextActiveStyle : labelTextStyle}>{labelOn}</span>
        </Label>
        <FieldFeedback error={invalid && form.errors[field.name]}/>
      </div>
    );
  }
}

const FormikToggleField = (props: Props) => (
  <Field
    component={Element}
    {...props}
  />
);

export const ToggleField = withTheme<Props, Theme>(FormikToggleField);
