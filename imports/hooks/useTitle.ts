import * as React from 'react';

export const useTitle = (): [ string, React.Dispatch<React.SetStateAction<string>>] => {
  const [ title, setTitle ] = React.useState('autotelic interactive');
  React.useEffect(() => {
    if (document) { document.title = `${title + ' | '}autotelic interactive`; }
  });

  return [ title, setTitle ];
};
