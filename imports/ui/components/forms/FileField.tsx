import * as React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../theme';

// components
import { useField, useFormikContext } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';
import { Button } from '../buttons';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  readonly button?: string,
  readonly name: string,
  readonly label?: string,
};

export const FileField: React.FC<Props> = (props: Props, context) => {
  const [ { onChange, value, ...field }, meta ] = useField({ type: 'file', ...props });
  const { setFieldValue } = useFormikContext();

  const {
    button = 'Add files',
    id,
    label = 'or drag and drop files here.',
    name,
    ...rest
  } = props;

  const style = (theme: Theme) => css`
    position: relative;
    margin-bottom: 0.75rem;
    padding-top: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  const inputStyle = (theme: Theme) => css`
    position: absolute;
    left: 0;
    top: 0;

    height: 100%;
    width: 100%;

    cursor: pointer;

    opacity: 0;

    &:focus {
      outline: none;
    }
  `;

  const labelStyle = (theme: Theme) => css`
  `;

  const fileListStyle = (theme: Theme) => css`
    list-style: none;
  `;

  const fileStyle = (theme: Theme) => css`
    &:before {
      content: '+';

      position: relative;
      display: inline-block;

      color: red;
      font-size: 1.75rem;
      font-weight: bold;

      transform: rotate(45deg);
      transform-origin: 50% 50%;
    }
  `;

  const handleChange = (e: React.ChangeEvent<any>) => {
    const files = Array.from(e.currentTarget.files);
    setFieldValue(field.name, files, false);
  };

  return (
      <div css={style}>
        <ul css={fileListStyle}>
          {value && value.map((file, idx) =>
              <li css={fileStyle} key={file.name}>{file.name}</li>
          )}
        </ul>
        <Label css={labelStyle} htmlFor={id || name} error={meta.error}>
          <input css={inputStyle} type="file" id={id || name} multiple onChange={onChange} {...rest} {...field}/>
          <Button css={labelStyle}>{button}</Button>
          {meta.touched && meta.error
            ? <FieldFeedback error={meta.error}/>
            : <span>{label}</span>
          }
        </Label>
      </div>
  );
};

FileField.defaultProps = {
  button: 'Add files',
  label: 'or drag and drop files here.',
};
