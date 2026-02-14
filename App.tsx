import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { requestNotificationPermission } from './src/services/notifications';
import { AppThemeProvider } from './src/styles/provider/themeProvider';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer>
      <AppThemeProvider>
        <Routes />
      </AppThemeProvider>
    </NavigationContainer>
  );
};

export default App;
