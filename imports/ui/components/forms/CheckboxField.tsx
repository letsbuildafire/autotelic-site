import * as React from 'react';
import { styled, Theme } from '../../theme';

// hooks
import { useField } from 'formik';

// components
import { HiddenInput as Input } from './HiddenInput';
import { Field } from './Field';
import { FieldFeedback } from './FieldFeedback';

type Props = {
  readonly label?: string,
  readonly name: string,
  readonly value: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckboxField: React.FC<Props> = (props) => {
  const [ field, meta ] = useField({ type: 'checkbox', ...props });
  const { className, id, label, name, ...rest } = props;

  return (
    <Field>
      <Input type="checkbox" id={id || name} {...field}/>
      <Label htmlFor={id || name} meta={meta}>
        {label || field.value}
      </Label>
      <FieldFeedback error={meta.touched && meta.error}/>
    </Field>
  );
};

const Label = styled.label`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 2rem;

  cursor: pointer;
  user-select: none;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.875rem;
  font-weight: bold;

  padding: 1.25rem 1.25rem 1.25rem 2.5rem;

  transition: background 400ms cubic-bezier(0.86, 0, 0.07, 1);
  will-change: background;

  &:after {
    content: '+';

    font-size: 2rem;
    font-weight: 600;
    line-height: 20px;

    display: block;
    height: 20px;
    width: 20px;

    transform: rotate(90deg);
    transform-origin: 10px 10px;

    transition: transform 300ms cubic-bezier(0.86, 0, 0.07, 1);
    will-change: transform;
  }

  input:checked + & {
    background: linear-gradient(to right, dodgerblue, teal);
  }

  input:checked + &:after {
    transform: rotate(225deg);
  }
`;
