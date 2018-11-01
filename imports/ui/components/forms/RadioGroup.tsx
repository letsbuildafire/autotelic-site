import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { FieldArray, FieldProps, FormikFormProps } from 'formik';
import { Label } from './Label';

type Props = {
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly className?: string,
  readonly label?: string,
  readonly options: Array<{id: string, label: string}>,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldProps<any>;

type RadioProps = {
  readonly className?: string,
  readonly theme?: any,
  readonly id: string,
  readonly label?: string,
} & FieldProps<any>;

const style = (props: Partial<PropsWithContext>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;
`;

const radioStyle = (props: Partial<RadioProps>) => css``;

class Element extends React.PureComponent<RadioProps> {
  public static displayName = 'RadioInput';

  render() {
    const { form, field, id, label } = this.props;

    return (
      <Label htmlFor={id} className={radioStyle(this.props)}>
        <input
          type="radio"
          id={`radio-${id}`}
          {...field}
        />
        {label}
      </Label>
    );
  }
}

class ElementGroup extends React.PureComponent<PropsWithContext> {
  public static displayName = 'RadioInputGroup';

  render() {
    const { id, name, label, options, ...rest} = this.props;

    return (
      <FieldArray
        name={name}
        render={({push, remove, form}) => (
          <div className={style(this.props)}>
            <Label htmlFor={id}>{label}</Label>
            <div>
              {options.map((option, i) => (
                <Element
                  key={`rdo-${option.id}`}
                  id={`rdo-${option.id}`}
                  label={option.label}
                  form={form}
                  field={{
                    name: `${name}[${i}]`,
                    value: option.id,
                    selected: form.values[name].includes(option.id),
                    onChange: (e) => {
                      if (e.target.selected) {
                        push(option.id);
                      } else {
                        const j = form.values[name].indexOf(option.id);
                        remove(j);
                      }
                    },
                  }}
                  {...rest}
                />
              ))}
            </div>
          </div>
        )}
      />
    );
  }
}

export const RadioGroup = withTheme<Props, Theme>(ElementGroup);
