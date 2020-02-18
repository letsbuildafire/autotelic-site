import React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../theme';

// components
import { useField } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Option = {
  label?: string,
  value: string
};

type RadioProps = {
  readonly name: string,
  readonly label?: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  const [ field ] = useField({ type: 'radio', ...props });
  const { id, label } = props;

  const style = (theme: Theme) => css``;

  const inputStyle = css`
    z-index: -9999;
    position: absolute;
    top: 0;
    left: 0;

    clip: rect(0, 0, 0, 0);
  `;

  const radioStyle = (theme: Theme) => css`
    display: inline-block;
    height: 2rem;
    width: 2rem;
    overflow: hidden;
    padding: 0.125rem;
    vertical-align: middle;

    background: rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
    box-shadow:
        inset 0 3px 0 rgba(0, 0, 0, 0.125),
        0 1px 0 rgba(255, 255, 255, 0.25);

    position: relative;
    margin-right: 0.75rem;
    margin-left: 0.75rem;

    cursor: pointer;

    will-change: background;
    transition: background 300ms ease-in-out;

    &:after {
      content: '';
      background: #ffffff;
      background: radial-gradient(circle at center, #e0e0e0, #ffffff 70%);
      background-clip: padding-box;
      display: block;
      width: 2rem;
      height: 2rem;
      border 0.5rem solid transparent;
      position: relative;
      transform: scale(0);
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      transition: transform 600ms cubic-bezier(0.000, 0.405, 0.000, 1.285);

      will-change: transform;
    }

    ${field.checked && `
      background: teal;
      transition: background 300ms linear 300ms;

      &:after {
        transform: scale(1);
      }
    `}
  `;

  return (
    <Label htmlFor={id} css={style}>
      <input css={inputStyle} type="radio" id={id} {...field}/>
      <div css={radioStyle}></div>
      {label || field.value }
    </Label>
  );
};

type Props = {
  readonly options: Array<Option>,
} & RadioProps;

export const RadioGroup: React.FC<Props> = (props: Props) => {
  const { className, id, label, name, options, ...rest} = props;

  const style = (theme: Theme) => css`
    position: relative;
    margin-bottom: 0.75rem;
    padding-top: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center:
    align-items: stretch;
  `;

  return (
    <div css={style} className={className}>
      {options.map((option: Option) => (
        <Radio
          key={`opt-${option.value}`}
          name={name}
          id={`${name}-opt-${option.value}`}
          label={option.label || option.value}
          value={option.value}
          {...rest}
        />
      ))}
    </div>
  );
};
