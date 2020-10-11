import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FirestoreServices from '../../../../services/FirestoreServices';
import color from '../../../../constants/Colours';
import {Card, Chip} from 'react-native-paper';
import Loading from '../../../../components/Loading';
import moment from 'moment';
const styles = StyleSheet.create({
  item: {
    margin: 10,
    padding: 10,
  },
});
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    FirestoreServices.getOrders().then((res) => {
      console.log('res', res);
      setOrders(res);
      setIsLoading(false);
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <Card>
            <Card.Title
              title={item.services[0] && item.services[0].item.name}
              titleStyle={{
                fontSize: 14,
                color: `${color.PRIMARY}`,
              }}
              right={() => (
                <Text style={{paddingRight: 10, color: '#757575'}}>
                  {moment(new Date(item.createdDate.seconds * 1000)).format(
                    'lll',
                  )}
                </Text>
              )}></Card.Title>
            <Card.Content>
              <Chip
                mode="flat"
                style={{
                  flex: 1,
                  borderRadius: 0,
                  backgroundColor: '#e0e0e0',
                  margin: 4,
                }}
                icon="currency-usd">
                {' '}
                Giá: {item.services[0] && item.services[0].item.price}
              </Chip>
              <Chip
                mode="flat"
                style={{
                  flex: 1,
                  borderRadius: 0,
                  backgroundColor: '#e0e0e0',
                  margin: 4,
                }}
                icon="ticket-confirmation">
                {' '}
                Trạng thái: {item.status}
              </Chip>
              <Chip
                mode="flat"
                style={{
                  flex: 1,
                  borderRadius: 0,
                  backgroundColor: '#e0e0e0',
                  margin: 4,
                }}
                icon="book-minus">
                {' '}
                Số lượng: {item.services[0] && item.services[0].quantity}
              </Chip>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
      <View
        style={{
          backgroundColor: `${color.PRIMARY}`,
          height: 56,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 18,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>ĐƠN HÀNG</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isLoading ? (
          <View style={{flex: 1}}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </View>
    </View>
  );
}
