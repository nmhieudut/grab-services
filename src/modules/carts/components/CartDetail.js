import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {List, Avatar, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import color from '../../../constants/Colours';
import firestore from '@react-native-firebase/firestore';
import FirestoreServices from '../../../services/FirestoreServices';
import {clearCart} from '../actions';
import {useNavigation} from '@react-navigation/native';
export default function CartDetail(props) {
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;
  const navigation = useNavigation();
  const [dateTimePicker, setDateTimePicker] = useState(date);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = useSelector((state) => state.authReducer.loggedInUser);
  const data = useSelector((state) => state.cartsReducer.addedItems);
  const dispatch = useDispatch();
  const properties = [
    {
      key: 'Đơn hàng',
      icon: 'inbox',
      detail: dateTime,
    },
    {
      key: 'Trị giá',
      icon: 'right',
      detail: props.total + ' VND',
    },
    {
      key: 'Trạng thái',
      icon: 'right',
      detail: 'Pending',
    },
    {
      key: 'Thanh toán',
      icon: 'right',
      detail: 'Pending',
    },
    {
      key: 'Thực hiện',
      icon: 'right',
      detail: 'Not Yet Shipped',
    },
  ];
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'space-between',
          backgroundColor: 'white',
        }}>
        {properties.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: '#e0e0e0',
              paddingHorizontal: 10,
            }}>
            <View style={{flex: 1}}>
              <Icon name={item.icon} size={20} color="#424242" />
            </View>
            <View style={{flex: 4}}>
              <Text style={{fontWeight: 'bold'}}>{item.key}</Text>
            </View>
            <View style={{flex: 3, alignItems: 'flex-end'}}>
              <Text style={{color: '#9e9e9e'}}>{item.detail}</Text>
            </View>
          </View>
        ))}
      </View>
      <View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18, padding: 18}}>
            Danh sách dịch vụ / sản phẩm
          </Text>
          <View style={{backgroundColor: '#eeeeee'}}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  marginVertical: 10,
                }}>
                <List.Item
                  title={item.item.name.toUpperCase()}
                  description={`${item.item.price} VND`}
                  left={() => (
                    <Avatar.Image
                      style={{margin: 5}}
                      size={40}
                      source={{uri: item.item.pictureUrl}}
                    />
                  )}
                />
              </View>
            ))}
          </View>
          <View style={{alignItems: 'center', paddingHorizontal: 18}}>
            <Text
              style={{
                color: '#757575',
                fontSize: 16,
              }}>
              Lịch hẹn (Ngày / Giờ)
            </Text>
            <DatePicker
              style={{
                width: '90%',
                margin: 10,
              }}
              date={dateTimePicker}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(datePicker) => {
                setDateTimePicker(datePicker);
              }}
            />
          </View>
          <Button
            mode="contained"
            style={{backgroundColor: `${color.PRIMARY}`}}
            loading={isLoading}
            onPress={() => {
              setIsLoading(true);
              // Create order
              FirestoreServices.createOrder({
                createdDate: firestore.Timestamp.now(),
                schedule: moment().add(1, 'd'),
                services: data,
                status: 'confirmed',
                uid: loggedInUser.uid,
              }).then((createdOrder) => {
                dispatch(clearCart());
                setIsLoading(false);
                navigation.navigate('CartNotification');
              });
            }}>
            Thanh toán
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
