import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import color from '../../../../constants/Colours';
import FIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirestoreServices from '../../../../services/FirestoreServices';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../../../components/Loading';
import Vendor from './Vendor';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  header: {
    fontSize: 17,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: 'white',
    height: 70,
  },
  shopSearch: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },
  workerSearch: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 90,
    flexDirection: 'row',
  },
  shopsIcon: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: `${color.PRIMARY}`,
    padding: 10,
  },
  workersIcon: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: `${color.PRIMARY}`,
    paddingHorizontal: 15,
    paddingTop: 9,
  },
  search: {
    marginHorizontal: 10,
  },
});

export default function index() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  React.useEffect(() => {
    FirestoreServices.getVendors().then((vendors) => {
      setLoading(false);
      setVendors(vendors);
    });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    FirestoreServices.getVendors().then((vendors) => {
      setRefreshing(false);
      setLoading(false);
      setVendors(vendors);
    });
  };

  //render items
  const renderItem = ({item}) => {
    return (
      <>
        <Vendor vendor={item} />
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.shopSearch}>
            <View style={styles.shopsIcon}>
              <FIcon name="shop" size={30} color="white" style={styles.image} />
            </View>
            <View style={styles.search}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>Shops</Text>
              <Text style={{fontSize: 14}}> Tìm kiếm</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.workerSearch}>
            <View style={styles.search}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>Workers</Text>
              <Text style={{fontSize: 14}}> Tìm kiếm</Text>
            </View>
            <View style={styles.workersIcon}>
              <Icon name="user" size={26} color="white" style={styles.image} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: '100%'}}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={vendors}
            renderItem={renderItem}
            keyExtractor={(item, index) => `service-${index}`}
            key={1}
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
