import React from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {Card, Title, Paragraph, Chip, Button} from 'react-native-paper';
import color from '../../../../constants/Colours';
import {useDispatch} from 'react-redux';
import {addItemAction} from '../../../../modules/carts/actions';

export default function FirstRouteScreen(props) {
  var {data, id} = props;
  data.id = id;
  const item = {...data};
  console.log('data:', item);
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView>
        <View>
          <Card style={{padding: 20}}>
            <Card.Cover source={{uri: data.pictureUrl}} />
            <Card.Content>
              <Paragraph>
                Thời gian: {data.duration} phút. {data.description}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      <Button
        style={{backgroundColor: `${color.PRIMARY}`}}
        icon="cart"
        mode="contained"
        onPress={() => {
          dispatch(addItemAction(item, 1));
          ToastAndroid.show(
            'Thêm vào giỏ hàng thành công!',
            ToastAndroid.SHORT,
          );
        }}>
        {'Thêm vào giỏ hàng'.toUpperCase()}
      </Button>
    </>
  );
}
