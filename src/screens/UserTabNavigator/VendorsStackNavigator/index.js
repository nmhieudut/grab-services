import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import color from '../../../constants/Colours';
import VendorsScreen from './VendorsScreen';
import VendorsDetailScreen from './VendorsDetailScreen';

const Stack = createStackNavigator();

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorsScreen"
        component={VendorsScreen}
        options={{title: 'Nhà cung cấp', headerShown: false}}
      />
      <Stack.Screen
        name="VendorsDetailScreen"
        component={VendorsDetailScreen}
        options={({route}) => ({
          title: route.params.vendor.name.toUpperCase(),
          headerStyle: {
            backgroundColor: `${color.PRIMARY}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;
