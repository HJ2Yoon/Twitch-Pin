import { ReactElement, MouseEventHandler } from 'react';
import { ThemeProvider } from 'styled-components';
import themeList, { Theme } from './theme';
import GlobalStyle from './global-styles';

interface Props {
  children?: ReactElement | ReactElement[] | string;
}
export default function GlobalThemeProvider({ children }: Props) {
  const curTheme = Theme.LIGHT; // Set your chrome storage
  return (
    <ThemeProvider
      theme={curTheme === Theme.LIGHT ? themeList.light : themeList.dark}
    >
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
