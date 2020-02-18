import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../theme';

// components
import { useField } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  readonly cols?: number,
  readonly label?: string,
  readonly rows?: number,
};

export const TextAreaField: React.FC<Props> = (props: Props, context) => {
  const [ field, meta ] = useField({ type: 'textarea', ...props });
  const {
    id,
    label,
    name,
    placeholder,
    ...rest
  } = props;

  const style = (theme: Theme) => css`
    position: relative;
    margin-bottom: 0.75rem;
    padding-top: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    ${meta.error && `
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

  const inputStyle = (theme: Theme) => css`
    background: none;
    border: none;
    border-bottom: 2px solid #000;
    ${field.value.length && `
      border-bottom-color: green;
    `}

    font-weight: bold;
    font-size: 1rem;
    line-height: 1rem;

    padding: 0.5rem 1.25rem calc(0.5rem + 3px) 0.625rem;

    ${meta.errors && `
      border-bottom-color: red !important;
    `}

    &:focus{
      border-bottom-width: 4px;

      padding-bottom: 0.5rem;
    }
  `;

  const labelStyle = (theme: Theme) => css`
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

    ${field.value.length && `
      transform: translate3d(-0.46875rem, -1.5rem, 0) scale(0.75);
    `}

    ${meta.errors && `
      color: red;
    `}
  `;

  return (
    <div css={style}>
      <textarea
        css={inputStyle}
        id={id || name}
        name={name}
        placeholder={placeholder}
        {...rest}
        {...field}
      />
      <Label css={labelStyle} htmlFor={id || name} error={meta.error}>{label}</Label>
      <FieldFeedback error={meta.touched && meta.error}/>
    </div>
  );
};
