import i18next from "i18next";
import React, { createContext, memo, useEffect, useState } from "react";
import themeConfig from "../assets/data/themeConfig";
import { CV_EDIT, LANGUAGE, THEME } from "../constants/CommonConstants";
import { GetItem, SetItem } from "../services/clientStorage";

const defaultState = {
  theme: "Light",
  setTheme: () => {},
  language: "vi",
  setLanguage: () => {},
  mode: CV_EDIT,
  setMode: () => {},
};

const SettingContext = createContext(defaultState);

const SettingProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultState.theme);
  const [language, setLanguage] = useState(defaultState.language);
  const [mode, setMode] = useState(CV_EDIT);

  useEffect(() => {
    const prefTheme = GetItem(THEME) || defaultState.theme;
    const prefLanguage = GetItem(LANGUAGE) || defaultState.language;
    setTheme(prefTheme);
    setLanguage(prefLanguage);
  }, []);

  useEffect(() => {
    SetItem(THEME, theme, "local");
    const colorConfig = themeConfig[theme];
    for (const [key, value] of Object.entries(colorConfig)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [theme]);

  useEffect(() => {
    SetItem(LANGUAGE, language, "local");
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        mode,
        setMode,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContext;

const memoizedProvider = memo(SettingProvider);

export { memoizedProvider as SettingProvider };
