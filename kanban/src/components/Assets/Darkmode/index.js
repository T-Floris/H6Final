import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../App";
import {
  SThemeToggler,
  DarkmodeContainer,
  LightBtn,
  DarkBtn,
} from "./DarkModeElements";

const DarkMode = () => {
  const { setTheme, Theme } = useContext(ThemeContext);
  const [DarkMode, setDarkMode] = useState(
    localStorage.getItem("darkmode") === "true"
  );

  //icons switch
  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
  };

  //theme update + local storage
  const toggleTheme = () => {
    const updatedTheme = DarkMode ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };

  //local storage + prefer color scheme(detect operating system setting light or dark mode)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  });

  //local storage for darkmode button
  useEffect(() => {
    localStorage.setItem("darkmode", DarkMode);
  }, [DarkMode]);

  return (
    <SThemeToggler isActive={Theme === "dark"} onClick={toggleTheme}>
      <DarkmodeContainer onClick={toggleDarkMode}>
        {DarkMode ? <LightBtn /> : <DarkBtn />}
      </DarkmodeContainer>
    </SThemeToggler>
  );
};

export default DarkMode;
