import {useMemo} from 'react';
// @mui
import {CssBaseline} from '@mui/material';
import {createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, {customShadows} from './shadows';

// ----------------------------------------------------------------------


export default function ThemeProvider({children}) {


    const themeOptions = useMemo(
        () => ({
            palette: palette.light,
            typography,
            breakpoints,
            shape: {borderRadius: 0},
            shadows: shadows.light,
            customShadows: customShadows.light,
        }),
        []
    );

    const theme = createTheme(themeOptions);

    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
