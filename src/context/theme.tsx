import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};




const lightThemeToken = {
  colorBgBase: "#fff",
  colorBgGrey: "rgb(249, 250, 251)",
  colorBtnBase: "rgba(0,0,0, .88)",
  colorTextLight: "rgba(0,0,0, .65)",
  colorTextFull: "#4A4A4A",
};

const darkThemeToken = {
  colorBgBase: "#000",
  colorBgGrey: "#121212",
  colorBtnBase: "rgba(255,255,255, .88)",
  colorTextLight: "rgba(255,255,255, .65)",
  colorTextFull: "#fff",
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme,
  };

  const lightTheme = {
    cssVar: true,
    algorithm: theme.defaultAlgorithm,
    token: lightThemeToken,
  };

  const darkTheme = {
    cssVar: true,
    algorithm: theme.darkAlgorithm,
    token: darkThemeToken,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};