export default {
  /**
   * 该对象为material-ui的默认主题对象，可以通过修改该对象定制主题，也可以直接在该对象上添加新的键值对以添加自定义的全局样式变量，若要定制某一组件的样式，可以使用overrides属性，
   * 具体使用请参考material-ui文档
  */

  // 断点
  breakpoints: {
    keys: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  direction: 'ltr',
  // 混入
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48
      },
      '@media (min-width:600px)': {
        minHeight: 64
      }
    }
  },
  // 组件样式覆盖
  overrides: {
    MuiDrawer: {
      modal: {
      }
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      },
      colorDefault: {
        backgroundColor: 'rgb(255,255,255)'
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'none',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0
      }
    }
  },
  // 调色
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    type: 'main',
    primary: {
      light: '#38cd7f',
      main: '#07C160',
      dark: '#048743',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#fff',
      default: '#fafafa'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.14)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)'
    }
  },
  props: {},
  // 阴影
  // shadows: [
  //   'none',
  //   '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
  //   '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
  //   '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
  //   '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  //   '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  //   '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  //   '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  //   '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  //   '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  //   '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  //   '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  //   '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  //   '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  //   '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  //   '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  //   '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  //   '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  //   '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  //   '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  //   '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  //   '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  //   '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  //   '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  //   '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
  // ],
  shadows: ['none'],
  // 文字铸排
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '3.5rem',
      lineHeight: 1,
      letterSpacing: '-0.01562em',
      '@media (min-width:600px)': {
        fontSize: '4.75rem'
      },
      '@media (min-width:960px)': {
        fontSize: '5.5rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '6rem'
      }
    },
    h2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '2.375rem',
      lineHeight: 1,
      letterSpacing: '-0.00833em',
      '@media (min-width:600px)': {
        fontSize: '3rem'
      },
      '@media (min-width:960px)': {
        fontSize: '3.5rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '3.75rem'
      }
    },
    h3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 1.04,
      letterSpacing: '0em',
      '@media (min-width:600px)': {
        fontSize: '2.4038rem'
      },
      '@media (min-width:960px)': {
        fontSize: '2.6442rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '2.8846rem'
      }
    },
    h4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '1.5625rem',
      lineHeight: 1.17,
      letterSpacing: '0.00735em',
      '@media (min-width:600px)': {
        fontSize: '1.9231rem'
      },
      '@media (min-width:960px)': {
        fontSize: '1.9231rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '2.1368rem'
      }
    },
    h5: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.33,
      letterSpacing: '0em',
      '@media (min-width:600px)': {
        fontSize: '1.3158rem'
      },
      '@media (min-width:960px)': {
        fontSize: '1.5038rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '1.5038rem'
      }
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      '@media (min-width:600px)': {
        fontSize: '1.25rem'
      },
      '@media (min-width:960px)': {
        fontSize: '1.25rem'
      },
      '@media (min-width:1280px)': {
        fontSize: '1.25rem'
      }
    },
    subtitle1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em'
    },
    subtitle2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em'
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em'
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
      borderRadius: 0
    },
    caption: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em'
    },
    overline: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase'
    }
  },
  // 外形
  shape: {
    borderRadius: 4
  },
  // 过渡效果
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  // 层级
  zIndex: {
    mobileStepper: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  // 自定义全局变量
  customConfig: {
    iconSize: '2rem'
  }
}
