import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import color from '../../../../constants/Colours';
import {Avatar, Button, Card, Paragraph, Chip} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  item: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
export default function Service({item}) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ServicesDetailsScreen', {item: item})
        }>
        <Card style={{borderRadius: 20}}>
          <Card.Cover source={{uri: item.service.pictureUrl}} />
          <Card.Title
            title={item.service.name}
            subtitle={`Thời gian: ${item.service.duration} phút.`}
          />
          <Card.Content>
            <Paragraph>Mô tả: {item.service.description}</Paragraph>
          </Card.Content>
          <Chip
            mode="flat"
            style={{
              flex: 1,
              borderRadius: 0,
              backgroundColor: '#e0e0e0',
              margin: 12,
            }}
            icon="currency-usd">
            {' '}
            Giá: {item.service.price} $
          </Chip>
          <View style={{height: 15}}></View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
