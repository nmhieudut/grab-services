import React from 'react';
import useOneSignal from '../hooks/useOneSignal';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginStackNavigator from './LoginStackNavigator';
import UserTabNavigator from './UserTabNavigator';
import WorkerTabNavigator from './WorkerTabNavigator';
import {CartNotification} from './CartNotification';
import color from '../constants/Colours';
import * as routes from '../routes';
const Stack = createStackNavigator();

const AuthenticationStackNavigator = () => {
  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
  if (!loggedInUser) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={routes.AUTH_LOGIN_STACK_NAVIGATOR}
          component={LoginStackNavigator}
        />
      </Stack.Navigator>
    );
  }

  return loggedInUser.profile.roles === 'User' ? (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={routes.USER_TAB_NAVIGATOR}
        component={UserTabNavigator}
      />
      <Stack.Screen
        options={{
          title: 'THÔNG BÁO',
          headerLeft: null,
          headerStyle: {
            backgroundColor: `${color.PRIMARY}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
        name="CartNotification"
        component={CartNotification}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routes.WORKER_TAB_NAVIGATOR}
        component={WorkerTabNavigator}
      />
    </Stack.Navigator>
  );

  // return (
  //   <Stack.Navigator screenOptions={{headerShown: false}}>
  //     <Stack.Screen
  //       name={routes.USER_TAB_NAVIGATOR}
  //       component={UserTabNavigator}
  //     />
  //   </Stack.Navigator>
  // );
};

const AppNavigator = () => {
  useOneSignal();

  return (
    <NavigationContainer>
      <AuthenticationStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
