import * as React from 'react';
import { css } from '@emotion/core';

type Props = {
  readonly className?: string,
  readonly error?: string,
};

export const FieldFeedback: React.FC<Props> = (props: Props, context) => {
  const { error, ...rest } = props;

  const style = (theme: Theme) => css``;

  return error ? ( <div css={style} {...rest}>{error}</div> ) : null;
};
