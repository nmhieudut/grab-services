import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VendorsScreen from './VendorsScreen';
import VendorsDetailScreen from './VendorsDetailScreen';

const Stack = createStackNavigator();

const ServiceStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="VendorsScreen"
                component={VendorsScreen}
                options={{ title: 'Nhà cung cấp', headerShown: false }}
            />
            <Stack.Screen
                name="VendorsDetailScreen"
                component={VendorsDetailScreen}
                options={{ title: 'Chi tiết', headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default ServiceStackNavigator;