import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {RadioButton, Provider, Modal, Portal, Button} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import {Input} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import color from '../../../constants/Colours';
import styles from './styles';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {registerAction} from '../actions';

const heightScr = Dimensions.get('screen').height;
const widthScr = Dimensions.get('screen').width;

// YUP
const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password is required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long')
    .required('Name is required'),
  phone: Yup.string()
    .min(9, 'Phone is at least 9 numbers')
    .max(12, 'Too long!')
    .required('Phone is required'),
  roles: Yup.string().required('Choose one please'),
  gender: Yup.string().required('Choose one please'),
});

function Register() {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  //state
  const loading = useSelector((state) => state.registerReducer.loading);
  const success = useSelector((state) => state.registerReducer.success);
  const error = useSelector((state) => state.registerReducer.error);
  console.log('success', success);
  console.log('error', error);
  //Image Picker
  const pickImg = () => {
    ImagePicker.openCamera({
      width: widthScr / 6,
      height: heightScr / 6,
      cropping: true,
    }).then(async (image) => {
      console.log(image);
    });
  };

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  useEffect(() => hideModal(), []);
  //submit
  const signUp = (values) => {
    dispatch(registerAction(values));
    if (success) {
      showModal();
      console.log('Show');
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Text>{success ? 'Successfully register' : error}</Text>
        </Modal>
        <ScrollView>
          {/* LoginScreen */}
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              gender: '',
              roles: '',
              phone: 0,
              date: '2016-05-15',
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => signUp(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={styles.inputArea}>
                  {/* Email */}
                  <View style={styles.textInput}>
                    <View style={styles.inputTextContainer}>
                      <Input
                        label="Email"
                        labelStyle={{color: color.PRIMARY}}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        disable={loading}
                        placeholder="example@gmail.com"
                        inputContainerStyle={{color: 'black', fontSize: 18}}
                        errorStyle={{color: 'red', fontSize: 16}}
                        errorProps={errors.email && touched.email}
                        errorMessage={errors.email}
                      />
                    </View>
                  </View>
                  {/* UserName */}
                  <View style={styles.textInput}>
                    <View style={styles.inputTextContainer}>
                      <Input
                        label="Name"
                        labelStyle={{color: color.PRIMARY}}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        disable={loading}
                        placeholder="Nguyen Van A"
                        inputContainerStyle={{color: 'black', fontSize: 18}}
                        errorStyle={{color: 'red', fontSize: 16}}
                        errorProps={errors.username && touched.username}
                        errorMessage={errors.username}
                      />
                    </View>
                  </View>
                  {/* Password */}
                  <View style={styles.textInput}>
                    <View style={styles.inputTextContainer}>
                      <Input
                        label="Password"
                        labelStyle={{color: color.PRIMARY}}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        disable={loading}
                        secureTextEntry
                        placeholder="abc1234"
                        inputContainerStyle={{color: 'black', fontSize: 18}}
                        errorStyle={{color: 'red', fontSize: 16}}
                        errorProps={errors.password && touched.password}
                        errorMessage={errors.password}
                      />
                    </View>
                  </View>
                  <View style={styles.textInput}>
                    <View style={styles.inputTextContainer}>
                      <Input
                        keyboardType="phone-pad"
                        label="Phone number"
                        labelStyle={{color: color.PRIMARY}}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        disable={loading}
                        placeholder="0123456789"
                        inputContainerStyle={{color: 'black', fontSize: 18}}
                        errorStyle={{color: 'red', fontSize: 16}}
                        errorProps={errors.phone && touched.phone}
                        errorMessage={errors.phone}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.checkGender}>
                  <View>
                    <Text
                      style={{
                        color: color.PRIMARY,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      Gender:{' '}
                    </Text>
                  </View>
                  <RadioButton.Group
                    onValueChange={handleChange('gender')}
                    value={values.gender}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: 'grey'}}>Male</Text>
                      <RadioButton value="Male" />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: 'grey'}}>Female</Text>
                      <RadioButton value="Female" />
                    </View>
                  </RadioButton.Group>
                  {errors.gender && (
                    <Text style={{color: 'red'}}>{errors.gender}</Text>
                  )}
                </View>
                {/* Date */}
                <View style={styles.checkGender}>
                  <View>
                    <Text
                      style={{
                        color: color.PRIMARY,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      Date of birth:{' '}
                    </Text>
                  </View>
                  <DatePicker
                    style={{width: 200}}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-05-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    value={values.date}
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={handleChange('date')}
                  />
                </View>
                {/* users or workers ? */}
                <View style={styles.checkUser}>
                  <View>
                    <Text
                      style={{
                        color: color.PRIMARY,
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      You are:{' '}
                    </Text>
                  </View>
                  <RadioButton.Group
                    onValueChange={handleChange('roles')}
                    value={values.roles}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'grey'}}>User</Text>
                      <RadioButton value="user" />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'grey'}}>Worker</Text>
                      <RadioButton value="worker" />
                    </View>
                  </RadioButton.Group>
                  {errors.roles && (
                    <Text style={{color: 'red'}}>{errors.roles}</Text>
                  )}
                </View>
                {/* Button */}
                <View style={styles.registerButton}>
                  <Button
                    color="white"
                    onPress={handleSubmit}
                    style={{
                      // borderRadius: 8,
                      flex: 1,
                      height: 60,
                      backgroundColor: color.PRIMARY,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    loading={loading}
                    disabled={loading}>
                    {loading ? 'Registering' : 'Register'}
                  </Button>
                </View>
                <View style={styles.goBack}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('LoginScreen');
                    }}
                    style={{
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: widthScr / 3,
                    }}>
                    <Text style={{color: '#212121', fontSize: 18}}>
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </Portal>
    </Provider>
  );
}

export default Register;
