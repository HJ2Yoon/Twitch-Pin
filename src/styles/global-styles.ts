import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

${reset}

:root {
  --radius-s: 4px;
  --radius-m: 8px;
  --radius-l: 10px;
  --radius-xl: 16px;

  /* Font families */
  --font-basic-theme: 'Roboto Mono', sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}
* {
  box-sizing: border-box;
}
html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
a, dl, dt, dd, ol, ul, li, form, label, table {
  margin: 0;
  padding: 0; 
  border: 0;
  vertical-align: baseline;
}
body {
  //Please delete when you start your project
  //#region -- DEFAULT BOX --
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 150px;
  img {
    width: 100px;
    height: 100px;
  }
  input {
    width: 150px;
  }
  //#endregion

  line-height: 1;
  font-family: var(--font-basic-theme);
}
ol, ul {
  list-style: none;
}
button {
  border: 0;
  background: transparent;
  cursor: pointer;
}
`;

export default GlobalStyle;
