// ----------------------------------------------------------------------

export default function Radio(theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          svg: {
            fontSize: 24,
            color: 'currentColor',
            '&[font-size=small]': {
              fontSize: 20,
            },
          },
        },
      },
    },
  };
}
