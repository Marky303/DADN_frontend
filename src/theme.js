import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { deepOrange } from '@mui/material/colors'

const APP_BAR_HEIGHT = 70
const HOME_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT}px)`

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight: APP_BAR_HEIGHT,
    homeHeight: HOME_HEIGHT
  },
  palette: {
    primary: {
      main: '#0D6EFD'
      // main: deepOrange[500]
    }
  }
  // components: {
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       root: ({ theme }) => ({
  //         color: theme.palette.primary.main,
  //         fontSize: '1rem',
  //         // Khi input không focus thì border sẽ có màu ...
  //         '.MuiOutlinedInput-notchedOutline': {
  //           borderColor: theme.palette.primary.main
  //         },
  //         // Khi hover vào input thì border sẽ chuyển sang màu ...
  //         '&:hover .MuiOutlinedInput-notchedOutline': {
  //           borderColor: theme.palette.primary.main
  //         },
  //         '& fieldset': { //huy in dam border khi focus
  //           borderWidth: '1px !important'
  //         }
  //       })
  //     }
  //   },
  //   MuiInputLabel: {
  //     styleOverrides: {
  //       // Name of the slot
  //       root: ({ theme }) => ({
  //         color: theme.palette.primary.main,
  //         fontSize: '0.875rem'
  //       })
  //     }
  //   }
  // }
})

export default theme