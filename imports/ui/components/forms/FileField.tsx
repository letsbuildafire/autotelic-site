import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, } from '../../theme';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';
import { Transitionable } from '../../helpers/Transitionable';

// components
import { FieldArray, FieldProps } from 'formik';
import { FieldFeedback } from './FieldFeedback';
import { Label } from './Label';
import { Button } from '../buttons';

type Props = {
  readonly button?: string,
  readonly label?: string,
  readonly theme?: Theme,
} & React.InputHTMLAttributes<HTMLInputElement>;

const style = (props: Partial<Props>) => css`
  position: relative;
  margin-bottom: 0.75rem;
  padding-top: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const inputStyle = (props: Partial<Props>) => css`
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

const labelStyle = (props: Partial<Props>) => css`
  pointer-events: none;
  transform: none;
  transition: transform 200ms ease-out;
`;

const fileListStyle = css`
  list-style: none;
`;

const fileStyle = css`
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

class Element extends React.PureComponent<Props> {
  public static displayName = 'FileInput';
  public static defaultProps = {
    button: 'Add files',
    label: 'or drag and drop files here.',
  };

  render() {
    const {
      button,
      id,
      label,
      name,
      theme,
      ...rest
    } = this.props;

    return (
      <FieldArray
        name={name}
        render={({unshift, remove, form}) => (
          <div>
            <TransitionGroupPlus component="ul" transitionMode="out-in" className={fileListStyle}>
              {form.values[name].map((file, idx) =>
                <Transitionable key={idx} onEnter={() => console.log('test')} render={() =>
                  <li className={fileStyle} onClick={() => remove(idx)}>{file.name}</li>
                }/>
              )}
            </TransitionGroupPlus>
            <Label className={style(this.props)} htmlFor={id} error={!!form.errors[name]}>
              <input className={inputStyle(this.props)} type="file" id={id} {...rest} onChange={e => {
                Array.from(e.currentTarget.files).forEach(file => {
                  unshift(file);
                });
              }}/>
              <Button className={labelStyle(this.props)}>{button}</Button>
              {form.touched[name] && form.errors[name]
                ? <FieldFeedback error={form.errors[name]}/>
                : <span>{label}</span>
              }
            </Label>
          </div>
        )}
      />
    );
  }
}

export const FileField = withTheme<Props, Theme>(Element);
