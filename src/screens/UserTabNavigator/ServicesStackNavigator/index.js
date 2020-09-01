import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './DetailsScreen';
import ServicesScreen from './ServicesScreen'
const Stack = createStackNavigator();

const ServicesStackNavigator = ({ route, navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ServicesScreen"
                component={ServicesScreen}
                options={{
                    title: 'Sản phẩm & Dịch vụ',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#00bec5',
                        elevation: 0
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 20,
                    },
                }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ title: 'Details', headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default ServicesStackNavigator;