// tslint:disable:no-unused-expression
import { injectGlobal } from 'emotion';

injectGlobal`
@font-face {
  font-family: 'Archivo';
  font-weight: 400;
  font-style: normal;
  src: local('Archivo Regular'), local('Archivo-Regular'),
  url('../fonts/archivo-v3-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/archivo-v3-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'),
  url('../fonts/montserrat-v12-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  font-weight: 300;
  src: local('Montserrat Light Italic'), local('Montserrat-LightItalic'),
  url('../fonts/montserrat-v12-latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: local('Montserrat Regular'), local('Montserrat-Regular'),
  url('../fonts/montserrat-v12-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  font-weight: 400;
  src: local('Montserrat Italic'), local('Montserrat-Italic'),
  url('../fonts/montserrat-v12-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  src: local('Montserrat Bold'), local('Montserrat-Bold'),
  url('../fonts/montserrat-v12-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  font-weight: 700;
  src: local('Montserrat Bold Italic'), local('Montserrat-BoldItalic'),
  url('../fonts/montserrat-v12-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/montserrat-v12-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}


html,
body,
#app {
  height: auto;
  max-height: 100%;
  width: 100vw;
  min-width: 320px;
  overflow: hidden;

  touch-action: none;
  -webkit-overflow-scrolling: auto;

  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

body,
button,
input,
select,
textarea {
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

code,
pre {
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
}

body {
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.6;
  color: black;
}

p {
  margin-top: 0;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: red;
  &:hover {
    color: orange;
  }
  strong {
    color: currentColor;
  }
}

code {
  font-size: 18px;
  font-weight: normal;
  padding: 1rem;
  color: black;
  background-color: transparent;
}

hr {
  display: block;
  height: 1px;
  margin: 1rem;
  border: none;
  background-color: black;
}

img {
  max-width: 100%;
  height: auto;
}

input[type='checkbox'],
input[type='radio'] {
  vertical-align: baseline;
}

small {
  font-size: 0.875em;
}

span {
  font-weight: inherit;
  font-style: inherit;
}

strong {
  font-weight: bold;
  color: black;
}

pre {
  -webkit-overflow-scrolling: touch;
  font-size: 0.875em;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  white-space: pre;
  word-wrap: normal;
  color: black;
  background-color: transparent;
  code {
    font-size: 1em;
    padding: 0;
    color: currentColor;
    background-color: transparent;
  }
}

table {
  td,
  th {
    text-align: left;
    vertical-align: top;
  }
  th {
    color: bold;
  }
}
`;
