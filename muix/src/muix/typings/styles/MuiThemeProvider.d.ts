import { StyleSheet } from 'jss';
import * as React from 'react';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { StyleRules, StylesCreator } from 'reactxx-muix/typings/styles/withStyles';

interface SheetManagerTheme {
  refs: number;
  sheet: StyleSheet<string>;
}

export interface MuiThemeProviderProps {
  theme: Theme | ((outer: Theme | null) => Theme);
  sheetsManager?: Map<StylesCreator, Map<Theme, SheetManagerTheme>>;
  disableStylesGeneration?: boolean;
  children: React.ReactNode;
}

declare const MuiThemeProvider: React.ComponentType<MuiThemeProviderProps>;

export default MuiThemeProvider;
