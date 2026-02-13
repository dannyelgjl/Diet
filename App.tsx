import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { theme } from './src/styles/theme/theme';
import { requestNotificationPermission } from './src/services/notifications';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
