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


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = (): void => {
    setIsDarkMode(prev => !prev);
  };

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};