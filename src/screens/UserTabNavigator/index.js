import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import color from '../../constants/Colours';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import VendorsStackNavigator from './VendorsStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import ProfileScreen from './ProfileScreen';
import ServicesStackNavigator from './ServicesStackNavigator';
import MapScreen from './MapScreen';
import OrderScreen from './OrderScreen';
import {useSelector} from 'react-redux';
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const addedItems = useSelector((state) => state.cartsReducer.addedItems);
  return (
    <Tab.Navigator
      activeColor={color.PRIMARY}
      inactiveColor="black"
      shifting={false}
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="VendorsStackNavigator"
        component={VendorsStackNavigator}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="home" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="ServicesStackNavigator"
        component={ServicesStackNavigator}
        options={{
          title: 'Sản phẩm',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="apps" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="google-maps" size={24} style={{color: color}} />;
          },
        }}
      />
      <Tab.Screen
        name="CartStackNavigator"
        component={CartStackNavigator}
        options={{
          title: 'Giỏ hàng',
          tabBarBadge: addedItems.length > 0 ? addedItems.length : false,
          tabBarIcon: ({focused, color}) => {
            return (
              <FIcon name="shopping-cart" size={20} style={{color: color}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({focused, color}) => {
            return (
              <FIcon name="shopping-bag" size={20} style={{color: color}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({focused, color}) => {
            return <Icon name="account" size={24} style={{color: color}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
