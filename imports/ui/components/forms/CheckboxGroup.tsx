import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { FieldArray, FieldProps } from 'formik';
import { Element } from './CheckboxField';

type Props = {
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly className?: any,
  options: Array<{id: string, label: string}>,
} & React.InputHTMLAttributes<HTMLInputElement>;

type PropsWithContext = Props & FieldProps<any>;

const style = (props: Partial<PropsWithContext>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;
`;

class ElementGroup extends React.PureComponent<PropsWithContext> {
  public static displayName = 'CheckboxInputGroup';

  render() {
    const { name, options, ...rest} = this.props;

    return (
      <FieldArray
        name={name}
        render={({push, remove, form}) => (
          <div>
            {options.map((option, i) => (
              <Element
                key={`opt-${option.id}`}
                id={`opt-${option.id}`}
                label={option.label}
                form={form}
                field={{
                  name: `${name}[${i}]`,
                  value: option.id,
                  checked: form.values[name].includes(option.id),
                  onChange: (e) => {
                    if (e.target.checked) {
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
        )}
      />
    );
  }
}

export const CheckboxGroup = withTheme<Props, Theme>(ElementGroup);
