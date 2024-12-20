import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      button: {
        fontSize: 12,
      },
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            flexGrow: 1,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            ':disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            },
          },
          containedPrimary: {
            background: '#323232',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            height: '40px',
            border: '2px solid #3B82F6',
            boxShadow: '4px 4px #323232',
            fontSize: '16px',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'all .2s ease-out,color .2s',
            '&::before': {
              content: `''`,
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '0',
              backgroundColor: '#3B82F6',
              zIndex: -1,
              WebkitBoxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              boxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              transition: 'all 250ms',
            },
            '&:hover': { color: '#323232' },
            '&:hover::before': { width: '100%' },
          },
          outlinedPrimary: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            height: '40px',
            border: '2px solid #3B82F6',
            backgroundColor: '#3B82F6',
            boxShadow: '4px 4px #323232',
            fontSize: '16px',
            fontWeight: 600,
            color: '#323232',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            transition: 'all .2s ease-out,color .2s ease-out',
            '&::before': {
              content: `''`,
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '0',
              backgroundColor: '#212121',
              zIndex: -1,
              WebkitBoxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              boxShadow: '4px 8px 19px -3px rgba(0, 0, 0, 0.27)',
              transition: 'all 250ms',
            },
            '&:hover': { color: '#e8e8e8' },
            '&:hover::before': { width: '100%' },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
    },
  })
)

export default theme
