//      

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning';
import createTypography from 'material-ui/styles/createTypography';
import createBreakpoints from 'material-ui/styles/createBreakpoints';
import createPalette from 'material-ui/styles/createPalette';
import createMixins from 'material-ui/styles/createMixins';
import shadows from 'material-ui/styles/shadows';
import transitions from 'material-ui/styles/transitions';
import zIndex from 'material-ui/styles/zIndex';
import spacing from 'material-ui/styles/spacing';

function createMuiTheme(options         = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    shadows: shadowsInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme = {
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {}, // Inject custom styles
    palette,
    props: {}, // Inject custom properties
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput),
    ...deepmerge(
      {
        transitions,
        spacing,
        zIndex,
      },
      other,
    ),
  };

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  );

  return muiTheme;
}

export default createMuiTheme;
