import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
