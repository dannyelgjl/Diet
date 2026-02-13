import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Login from '../screens/login';

import Protocols from '../screens/protocols';
import { MealsScreen } from '../screens/meals';
import { HistoryScreen } from '../screens/history';

import { WeeklyChartScreen } from '../screens/weeklyChart';
import { useAuthStore } from '../store/auth/auth.simple.store';

const { Navigator, Screen } = createNativeStackNavigator();

const Routes = () => {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Screen name="Login" component={Login} />
      ) : (
        <>
          <Screen name="Home" component={Home} />
          <Screen name="Protocols" component={Protocols} />
          <Screen name="Meals" component={MealsScreen} />
          <Screen name="History" component={HistoryScreen} />
          <Screen name="WeeklyChart" component={WeeklyChartScreen} />
        </>
      )}
    </Navigator>
  );
};

export default Routes;
