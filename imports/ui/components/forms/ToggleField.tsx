import * as React from 'react';
import { motion } from 'framer-motion';
import { styled } from '../../theme';

// hoooks
import { useField } from 'formik';

// components
import { HiddenInput as Input } from './HiddenInput';
import { Field } from './Field';
import { FieldFeedback } from './FieldFeedback';

type Props = {
  readonly labelOn?: string,
  readonly labelOff?: string,
  readonly name: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ToggleField: React.FC<Props> = (props) => {
  const [ field, meta ] = useField({ type: 'checkbox', ...props });
  const { id, name, labelOn, labelOff, ...rest } = props;

  const toggleVariants = {
    unchecked: {
      transform: 'translate3d(0rem, 0, 0)',
    },
    checked: {
      transform: 'translate3d(1.75rem, 0, 0)',
    }
  };

  return (
    <Field>
      <Label htmlFor={id || name} error={meta.error}>
        <Input type="checkbox" id={id} {...field}/>
        {labelOff && <span>{labelOff}</span>}
        <Toggle>
          <Knob
            as={motion.span}
            variants={toggleVariants}
            initial={field.checked ? 'checked' : 'unchecked'}
            animate={field.checked ? 'checked' : 'unchecked'}
            exit="exit"
          />
        </Toggle>
        {labelOn && <span>{labelOn}</span>}
      </Label>
      <FieldFeedback error={meta.touched && meta.error}/>
    </Field>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  color: inherit;

  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
`;

const Toggle = styled.div`
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

  cursor: pointer;
`;

const Knob = styled.span`
  position:relative;
  margin: 0;

  display: block;
  height: 1.5rem;
  width: 1.5rem;

  overflow: visible;

  will-change: transform;

  &:before{
    content: '';

    background: linear-gradient(to right, teal, dodgerblue);

    display: block;
    height: 2rem;
    width: 7rem;

    position: absolute;
    margin: auto;
    left: 50%;
    top: 50%;

    transform: translate3d(-50%, -50%, 0);
  }

  &:after {
    content: '';

    position: relative;

    background: #e0e0e0;
    background: radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
    border: 2px solid #fafafa;
    border-radius: 50%;

    display: block;

    height: 100%;
    width: 100%;
  }
`;
