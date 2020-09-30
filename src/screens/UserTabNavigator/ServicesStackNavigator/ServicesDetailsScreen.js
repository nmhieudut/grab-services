import React from 'react';
import {View, Text} from 'react-native';
import ServicesDetail from '../../../modules/main/components/ServicesDetail';
export default function ServicesDetailsScreen({route}) {
  const serviceId = route.params.serviceId;
  return (
    <View style={{flex: 1}}>
      <ServicesDetail serviceId={serviceId} />
    </View>
  );
}
