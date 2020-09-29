import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ServicesDetailsScreen from './ServicesDetailsScreen';
import ServicesScreen from './ServicesScreen';
import color from '../../../constants/Colours';
const Stack = createStackNavigator();

const ServicesStackNavigator = ({route, navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ServicesScreen">
      <Stack.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{
          title: 'Sản phẩm & Dịch vụ',
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
        name="ServicesDetailsScreen"
        component={ServicesDetailsScreen}
        options={{
          title: 'Chi tiết sản phẩm',
          headerStyle: {
            backgroundColor: `${color.PRIMARY}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default ServicesStackNavigator;
