import withVBTheme, { createTheming } from 'react-jss';

export const theming = createTheming('__VB_THEME__');
export const { ThemeProvider: VBThemeProvider } = theming;

export default styles => withVBTheme(styles, { theming });
