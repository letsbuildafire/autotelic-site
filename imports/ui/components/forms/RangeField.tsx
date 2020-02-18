import * as React from 'react';
import { debounce } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { styled, Theme } from '../../theme';

// hooks
import { useField, useFormikContext } from 'formik';

// components
import { Field } from './Field';
import { RangeInput } from './RangeInput';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

const GRAD_SENSITIVITY = 0.05;
const GRAD_SCALE = 2;

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  readonly display?: (value: number) => number | string,
  readonly format?: (value: number) => number,
  readonly label?: string,
  readonly max: number,
  readonly min: number,
  readonly unit?: string,
};

export const RangeField: React.FC<Props> = (props) => {
  const [ { onChange, ...field }, meta ] = useField({ type: 'range', ...props });
  const formik = useFormikContext();
  const {
    format = (value: number) => value,
    display = (value: number) => value,
    id,
    label,
    min,
    max,
    name,
    step,
    unit,
    ...rest
  } = props;

  const sensitivity = GRAD_SENSITIVITY * (max - min + 1); // +1 for an inclusive scale
  const getProximity = (value: number, point: number): number => {
    return Math.abs(Math.abs(point - value) / sensitivity);
  };

  const proximities = {
    lo: (GRAD_SCALE - getProximity(field.value, min)),
    md: (GRAD_SCALE - getProximity(field.value, (max + min) / 2)),
    hi: (GRAD_SCALE - getProximity(field.value, max)),
  };

  const handleChange = debounce((value: number) => {
    formik.setFieldValue(field.name, value);
  }, 10);

  const valueVariants = {
    initial: {
      position: 'relative',
      transform: 'matrix(1.75,0,0,1.75,-50,0)',
      opacity: 0,
    },
    enter: {
      position: 'relative',
      transform: 'matrix(1,0,0,1,1,0)',
      opacity: 1,
    },
    exit: {
      transform: 'matrix(0.25,0,0,0.25,100,0)',
      position: 'absolute',
      opacity: 0,
    }
  };

  return (
    <Field>
      <Label htmlFor={id || name} error={meta.error}>{label}</Label>
      <Values>
        <AnimatePresence>
          <Value
            key={field.value}
            variants={valueVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {display(field.value)}
          </Value>
        </AnimatePresence>
        <Unit>{unit}</Unit>
      </Values>
      <Slider>
        <Rule>
          <Tick data-label={display(min)}/>
          <Tick data-label={display(Math.floor((max + min) / 2))}/>
          <Tick data-label={display(max)}/>
        </Rule>
        <RangeInput
          min={min}
          max={max}
          step={step}
          {...field}
          onChange={e => handleChange(e.currentTarget.valueAsNumber)}
        />
      </Slider>
      <FieldFeedback error={meta.touched && meta.error}/>
    </Field>
  );
};

const Values = styled.div`
  position: relative;
  margin: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: inherit;

  overflow: visible;
`;

const Value = styled(motion.span)`
  display: block;

  font-size: 8rem;
  font-weight: bold;
  line-height: 0.9;

  will-change: transform, filter;
`;

const Unit = styled.span`
  font-weight: bold;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;
`;

const Rule = styled.div`
  display: flex;
  flex: 0 0 100%;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

const Tick = styled.span`
  position: relative;
  width: 1.5rem;
  margin: 0 1.5rem;

  text-align: center;

  display: inline-flex;
  padding-bottom: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transform-origin: bottom center;
  will-change: transform;

  white-space: nowrap;

  &:before {
    content: attr(data-label);
    font-weight: bold;
    word-wrap: nowrap;
    text-align: center;

    transition: transform 100ms ease-out;
  }

  &:after {
    content: '';
    background: currentColor;

    display: block;
    width: 1px;
    height: 0.25rem;

    margin: 0 auto;
  }
`;

RangeField.defaultProps = {
  format: (value: number): number => value,
  display: (value: number): number | string => value,
};
