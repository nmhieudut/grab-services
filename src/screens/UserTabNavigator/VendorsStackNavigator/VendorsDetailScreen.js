import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {List, Avatar, Checkbox} from 'react-native-paper';
export default function VendorsDetailScreen({route, navigation}) {
  const [checked, setChecked] = React.useState(false);
  const data = [
    {
      serviceImage:
        'https://media.allure.com/photos/5ee11520a9ba330008e32528/16:9/w_2992,h_1683,c_limit/massage.jpg',
      serviceName: 'Làm đẹp',
      prices: '200.000 VND',
    },
    {
      serviceImage:
        'https://media.allure.com/photos/5ee11520a9ba330008e32528/16:9/w_2992,h_1683,c_limit/massage.jpg',
      serviceName: 'Làm đẹp',
      prices: '200.000 VND',
    },
    {
      serviceImage:
        'https://media.allure.com/photos/5ee11520a9ba330008e32528/16:9/w_2992,h_1683,c_limit/massage.jpg',
      serviceName: 'Làm đẹp',
      prices: '200.000 VND',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.5,
            marginVertical: 5,
            borderColor: 'grey',
            backgroundColor: 'white',
          }}>
          <List.Item
            title={item.serviceName}
            description={item.prices}
            left={() => (
              <Avatar.Image
                style={{marginHorizontal: 10}}
                size={50}
                source={{uri: item.serviceImage}}
              />
            )}
            right={() => (
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            )}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{backgroundColor: '#eaeaea'}}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `item + ${index}`}
        renderItem={renderItem}
      />
    </View>
  );
}
