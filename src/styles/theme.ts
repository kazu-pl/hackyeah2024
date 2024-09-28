import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "rgb(198, 175, 233)",
      main: "rgb(230, 0, 126)",
      dark: "rgb(81, 0, 67)",
      contrastText: "rgb(255, 231, 255)",
    },
    secondary: {
      light: "rgb(5, 226, 232)",
      main: "rgb(2, 188, 193)",
      dark: "rgb(2, 114, 117)",
      contrastText: "rgb(2, 102, 105)",
    },
    // success: {},
    // warning: {},
    // error: {},
    text: {
      primary: "rgb(235,235,235)",
      // secondary: string;
      // disabled: string;
    },
  },
});

export default theme;
