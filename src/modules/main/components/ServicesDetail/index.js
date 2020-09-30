import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {Chip} from 'react-native-paper';
import color from '../../../../constants/Colours';
import {TabView, TabBar} from 'react-native-tab-view';
import FirestoreServices from '../../../../services/FirestoreServices';
import Loading from '../../../../components/Loading';
import FirstRouteScreen from './components/FirstRouteScreen';

const SecondRoute = ({data}) => (
  <View style={[styles.scene]}>
    <Text>{data.description} </Text>
  </View>
);
const initialLayout = {width: Dimensions.get('window').width, borderWidth: 1};
const ServicesDetail = (props) => {
  const id = props.serviceId;
  console.log('item:', id);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Thông tin'},
    {key: 'second', title: 'Chi tiết'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRouteScreen data={data} id={id} />;
      case 'second':
        return <SecondRoute data={data} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({route, focused}) => (
        <Text style={{color: `${color.PRIMARY}`, margin: 4, fontSize: 16}}>
          {route.title.toUpperCase()}
        </Text>
      )}
      indicatorStyle={{backgroundColor: `${color.PRIMARY}`}}
      style={{backgroundColor: 'white', fontColor: `${color.PRIMARY}`}}
    />
  );
  useEffect(() => {
    FirestoreServices.getServicesDetail(id)
      .then((service) => {
        setData(service);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{flex: 1}}>
      {!isLoading ? (
        <View style={{margin: 15}}>
          <Text
            style={{
              color: `${color.PRIMARY}`,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {data.name.toUpperCase()}
          </Text>
          <View>
            <Chip style={{marginTop: 10}} icon="currency-usd">
              Giá: {data.price} $
            </Chip>
            <Chip style={{marginTop: 10}} icon="timelapse">
              Thời gian : {data.duration} phút
            </Chip>
            <Chip style={{marginTop: 10}} icon="scale-bathroom">
              Loại phòng: Thường
            </Chip>
          </View>
        </View>
      ) : (
        <Loading />
      )}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
export default ServicesDetail;
