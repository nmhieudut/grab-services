import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import color from '../../constants/Colours';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../modules/auth/actions';
import auth from '@react-native-firebase/auth';
import ProfileServices from '../../services/ProfileServices';

const styles = StyleSheet.create({
  picAndName: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.PRIMARY}`,
    height: 300,
  },
  imgContainer: {
    height: 125,
    width: 125,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 100,
    borderColor: '#757575',
    marginVertical: 25,
  },
  image: {
    height: 115,
    width: 115,
    borderRadius: 100,
  },
  name: {
    marginVertical: 15,
  },
  info: {
    backgroundColor: '#eeeeee',
  },
  detailInfo: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  font: {
    fontSize: 18,
    flex: 1,
  },
  infoView: {
    fontSize: 18,
    color: 'grey',
    opacity: 0.7,
  },
  logOutButton: {
    margin: 40,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${color.PRIMARY}`,
    borderRadius: 30,
  },
});

const ProfileScreen = ({navigation}) => {
  const [userProps, setUserProps] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const uri = 'https://www.w3schools.com/w3images/avatar2.png';
  const dispatch = useDispatch();

  //REDUX
  const user = useSelector((state) => state.authReducer.loggedInUser);
  console.log('user:', user);
  //load User Information
  useEffect(() => {
    ProfileServices.getProfile(user.uid).then((result) => {
      setUserProps(result);
      setIsLoading(true);
      console.log('user2:', userProps);
    });
  }, []);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logoutAction());
      });
  };
  return (
    <ScrollView>
      {isLoading && (
        <View style={{flex: 1}}>
          {/* Header */}
          <View style={styles.picAndName}>
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={{uri: uri}}></Image>
            </View>
            <View style={styles.name}>
              <Text style={{fontSize: 26, color: 'white'}}>
                {userProps.displayName}
              </Text>
            </View>
          </View>
          {/* Body */}
          <View style={styles.info}>
            <View style={styles.detailInfo}>
              <Text style={styles.font}>Loại tài khoản</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.infoView}>{userProps.roles}</Text>
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.font}>Họ và tên</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.infoView}>{userProps.displayName}</Text>
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.font}>Giới tính</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.infoView}>{userProps.gender}</Text>
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.font}> Email</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.infoView}>{userProps.email}</Text>
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.font}>Sinh nhật</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                {userProps.birthday ? (
                  <Text style={styles.infoView}>
                    {moment(
                      new Date(userProps.birthday._seconds * 1000),
                    ).format('MMM Do YYYY')}
                  </Text>
                ) : (
                  <Text>N/A</Text>
                )}
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.font}>Số điện thoại</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.infoView}>{userProps.phone}</Text>
                <Icon
                  name="right"
                  size={16}
                  color="grey"
                  style={{marginTop: 5, marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logOutButton} onPress={logOut}>
              <Text style={{fontSize: 20, color: 'white'}}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
