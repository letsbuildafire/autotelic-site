import * as React from 'react';
import { styled } from '../../theme';

// hooks
import { useField } from 'formik';

// components
import { Field } from './Field';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = {
  readonly label?: string,
  readonly name: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<Props> = (props) => {
  const [ field, meta ] = useField({ ...props });
  const { id, label, name, type = 'text' } = props;

  return (
    <Field>
      <Label htmlFor={id || name} meta={meta}>{label || name}</Label>
      <Input type={type} id={id || name} meta={meta} {...field}/>
      <FieldFeedback error={meta.touched && meta.error}/>
    </Field>
  );
};

TextField.defaultProps = {
  type: 'text',
};

const Input = styled.input`
  background: none;

  border: none;
  border-radius: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.foreground};

  padding: 0.5rem 1.25rem calc(0.5rem + 2px) 0.625rem;

  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;

  ${({ value }) => value && `
    border-bottom-color: green;
  `}

  ${({ meta, theme }) => meta.error && meta.touched && `
    border-bottom-color: ${theme.colors.error} !important;
  `}

  &:focus{
    border-bottom-width: 4px;

    padding-bottom: 0.5rem;
  }
`;
