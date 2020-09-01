
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import color from '../../constants/Colours'

const Stack = createStackNavigator();

export default function index() {
    return (
        <Stack.Navigator
            // headerMode="none"
            initialRouteName="LoginScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: 'Login', headerShown: false }}
            />
            <Stack.Screen
                initialParams={{ message: 'Init text' }}
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: '',
                    headerBackTitle: 'Back',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: color.PRIMARY,
                    },
                }}
            />
        </Stack.Navigator>
    );
}