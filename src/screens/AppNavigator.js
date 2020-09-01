import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStackNavigator from './LoginStackNavigator';
import UserTabNavigator from './UserTabNavigator';
import * as routes from '../routes';
const Stack = createStackNavigator();

const AuthenticationStackNavigator = () => {
  const loggedInUser = useSelector(
    (state) => state.authReducer.loggedInUser,
  );
  if (!loggedInUser) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={routes.AUTH_LOGIN_STACK_NAVIGATOR}
          component={LoginStackNavigator}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.USER_TAB_NAVIGATOR}
        component={UserTabNavigator}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthenticationStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;



