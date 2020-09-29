import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import color from '../../../constants/Colours'
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/AntDesign'
import Loading from '../../../components/Loading'
import FirestoreServices from '../../../services/FirestoreServices';

//styles
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: `${color.PRIMARY}`,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  backButton: {
    flex: 1,
  },
  item: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  details: {
    margin: 10
  },
  image: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  name: {
    marginVertical: 10,
  },
  price: {
    marginTop: 10,
    backgroundColor: '#e0e0e0',
    padding: 5,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
})


const ServicesOfVendorsScreen = ({ route, navigation }) => {
  const { name } = route.params;
  //states
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  //get Data
  useEffect(() => {
    FirestoreServices.getServices().then((services) => {
      setLoading(false);
      setServices(services);
    });
  }, [])
  console.log('So vit: ', services);

  //render services
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.pictureUrl }} />
          </View>
          <View style={styles.details}>
            <View style={styles.name}>
              <Text style={{ color: '#00bec5', fontSize: 20, fontWeight: '700' }}>{item.name}</Text>
            </View>
            <View style={styles.description}>
              <Text style={{ fontSize: 16 }}>Thời gian: {item.duration} phút.</Text>
              <Text style={{ fontSize: 16 }}>Mô tả: {item.description}</Text>
            </View>
            <View style={styles.price}>
              <Icon style={{ flex: 1 }} name="dollar" size={20} />
              <Text style={{ flex: 7 }}>
                Giá: {item.price} $
            </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  //main render
  return (
    <View style={{ flex: 1, backgroundColor: '#eeeeee', }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FIcon name="arrowleft" size={24} color="white"></FIcon>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, color: 'white', flex: 6 }}>{JSON.stringify(name)}</Text>
      </View>
      {loading
        ? (<Loading />)
        : (<FlatList
          style={{ flex: 1 }}
          data={services}
          keyExtractor={(item, index) => item.name}
          renderItem={renderItem}
          key={1} />)
      }
    </View>
  );
};

export default ServicesOfVendorsScreen;
