import React from "react";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import "../css/settiing.css";

export const ThemeContext = createContext(null);

function Settings() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((color) => (color === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="App" id={theme}>
          <div className="switch">
            <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default Settings;
