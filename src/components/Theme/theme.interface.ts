import {ThemeColors} from "./theme.colors";

export type ThemeType = 'dark' | 'light';

export interface ITheme {
    '--primary': ThemeColors;
    '--border-pagination': ThemeColors;
    '--secondary': ThemeColors;
    '--auxiliary': ThemeColors;
    '--black': ThemeColors;
    '--background-wrap': ThemeColors;
    '--color-text-primary': ThemeColors;
    '--color-text-secondary': ThemeColors;
}
