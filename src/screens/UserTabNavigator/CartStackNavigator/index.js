import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartsScreen from './CartsScreen';
import CartDetailScreen from './CartDetailScreen';

import color from '../../../constants/Colours';

const Stack = createStackNavigator();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="CartsScreen">
      <Stack.Screen
        name="CartsScreen"
        component={CartsScreen}
        options={{
          title: 'GIỎ HÀNG',
          headerShown: true,
          headerStyle: {
            backgroundColor: `${color.PRIMARY}`,
            elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="CartDetailScreen"
        component={CartDetailScreen}
        options={{
          title: 'CHI TIẾT ĐƠN HÀNG',
          headerStyle: {
            backgroundColor: `${color.PRIMARY}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
