import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {List, IconButton, Avatar, Button} from 'react-native-paper';
import color from '../../../constants/Colours';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {removeItemAction} from '../actions';

const Carts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state) => state.cartsReducer.addedItems);
  console.log('cart', data);

  const getTotal = () => {
    let result = data.reduce(
      (total, item) => total + item.item.price * item.quantity,
      0,
    );
    return result;
  };
  const renderItem = ({item}) => {
    return (
      <View style={{backgroundColor: 'white', margin: 10}}>
        <List.Item
          title={item.item.name}
          description={`${item.item.price} VND x ${item.quantity}`}
          left={(props) => (
            <Avatar.Image
              style={{margin: 5}}
              size={40}
              source={{uri: item.item.pictureUrl}}
            />
          )}
          right={() => (
            <IconButton
              icon="delete"
              size={20}
              onPress={() => dispatch(removeItemAction(item.item.id))}
            />
          )}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 8, backgroundColor: '#eeeeee'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fafafa',
          justifyContent: 'center',
          padding: 10,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Tổng cộng: {getTotal()} VND
          </Text>
        </View>
        <View style={{marginTop: 5}}>
            <Button
              icon="cart"
              disabled={data.length === 0}
              style={{backgroundColor: `${color.PRIMARY}`}}
              mode="contained"
              onPress={() =>
                navigation.navigate('CartDetailScreen', {total: getTotal()})
              }>
              Tiến hành đặt hàng
            </Button>
        </View>
      </View>
    </View>
  );
};

export default Carts;
