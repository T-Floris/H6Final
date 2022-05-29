import React, { useState } from "react";

import { GlobalStyle } from "./components/Assets/GlobalStyles";
import NavigateRoutes from "./NavigateRoutes";
import { darkTheme, lightTheme } from "../src/components/Assets/theme";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthProvider";

export const ThemeContext = React.createContext(null);

function App() {
  //Theme
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <GlobalStyle />
          <AuthProvider>
            <NavigateRoutes />
          </AuthProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
