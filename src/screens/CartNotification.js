import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import color from '../constants/Colours';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
export const CartNotification = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: `${color.PRIMARY}`,
          height: 200,
          width: 200,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="check" size={100} color="white" />
      </View>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 20}}>Thanh toán thành công</Text>
        <Button
          style={{marginTop: 50, backgroundColor: `${color.PRIMARY}`}}
          icon="arrow-left"
          mode="contained"
          onPress={() => navigation.navigate('VendorsStackNavigator')}>
          Trở về trang chủ
        </Button>
      </View>
    </View>
  );
};
