// ----------------------------------------------------------------------

export default function Button(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 45,
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    borderRadius: '24px'
                },
                sizeLarge: {
                    height: 42,
                },
                // contained
                // containedInherit: {
                //   color: theme.palette.grey[800],
                //   // boxShadow: theme.customShadows.z8,
                //   '&:hover': {
                //     backgroundColor: theme.palette.grey[400],
                //   },
                // },
                containedPrimary: {
                    // boxShadow: theme.customShadows.primary,
                },
                containedSecondary: {
                    backgroundColor: '#fff',
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.info.lighter,
                    },
                    // boxShadow: theme.customShadows.secondary,
                },
                containedInfo: {
                    backgroundColor: theme.palette.secondary.main,
                    color: '#fff',
                    boxShadow: 'none',
                },
                containedSuccess: {
                    color: '#fff',
                    boxShadow: 'none',
                    // boxShadow: theme.customShadows.success,
                },
                containedWarning: {
                    // boxShadow: theme.customShadows.warning,
                },
                containedError: {
                    // boxShadow: theme.customShadows.error,
                },
                // outlined
                outlinedInherit: {
                    border: `1px solid ${theme.palette.grey[500_32]}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
                textInherit: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    },
                },
            },
        },
    };
}
