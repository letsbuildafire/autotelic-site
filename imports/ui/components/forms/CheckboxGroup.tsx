import * as React from 'react';

// components
import { CheckboxField } from './CheckboxField';

type Option = {
  label?: string,
  value: string
};

type Props = {
  readonly name: string,
  readonly options: Array<Option>,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckboxGroup: React.FC<Props> = (props) => {
  const { id, name, options, ...rest } = props;

  return (
    <>
      {options.map((option: Option) => (
        <CheckboxField
          key={`opt-${option.value}`}
          name={name}
          id={`${name}-opt-${option.value}`}
          label={option.label || option.value}
          value={option.value}
          {...rest}
        />
      ))}
    </>
  );
};
