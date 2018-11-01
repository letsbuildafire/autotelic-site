import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { FormikErrors } from 'formik';

type Props = {
  readonly className?: string,
  readonly theme?: any,
  readonly error?: string | FormikErrors<any>,
};

const style = (props: Partial<Props>) => css`
  ${props.className}
`;

const Feedback: React.SFC<Props> = (props: Props) => props.error
  ? (<div className={style(props)}>{props.error}</div>)
  : null;

export const FieldFeedback = withTheme<Props>(Feedback);
