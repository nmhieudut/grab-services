import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import styles from './styles';
import color from '../../../constants/Colours';
import LIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../actions';

// YUP
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password is required'),
});

function Login() {
  //navigation
  const navigation = useNavigation();

  //Redux
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  //submit
  const handleSubmit = (values) => {
    dispatch(loginAction(values.email, values.password));
  };
  return (
    <ScrollView>
      {/* LoginScreen */}
      <TouchableOpacity activeOpacity={0.9} style={{flex: 1}}>
        {/* Welcome */}
        <View style={styles.welcome}>
          <FIcon name="racing-helmet" size={80} color="white" />
          <View style={{marginVertical: 12}}>
            <Text style={{fontSize: 30, color: 'white', fontWeight: '700'}}>
              GRAB SERVICES
            </Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
              SIGN IN
            </Text>
          </View>
        </View>
        {/*-- Form Area -- */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => handleSubmit(values)}>
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
                      leftIcon={
                        <LIcon
                          name="user"
                          size={24}
                          style={{color: `${color.PRIMARY}`}}
                        />
                      }
                      errorStyle={{color: 'red', fontSize: 16}}
                      errorProps={errors.email && touched.email}
                      errorMessage={errors.email}
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
                      secureTextEntry
                      disable={loading}
                      placeholder="abc123"
                      inputContainerStyle={{color: 'black', fontSize: 18}}
                      leftIcon={
                        <MCIcon
                          name="lock"
                          size={24}
                          color="black"
                          style={{color: `${color.PRIMARY}`}}
                        />
                      }
                      errorStyle={{color: 'red', fontSize: 16}}
                      errorProps={errors.password && touched.password}
                      errorMessage={errors.password}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.loginButtonContainer}>
                <Button
                  mode="contained"
                  loading={loading}
                  disabled={loading}
                  onPress={handleSubmit}
                  style={styles.loginButton}>
                  {loading ? 'LOGINNING' : 'LOGIN'}
                </Button>
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.registerButtonContainer}>
          <Text style={{flex: 1.5, textAlign: 'right'}}>
            Not have account yet ?{' '}
          </Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            <Text style={{color: color.PRIMARY, fontWeight: '700'}}>
              JOIN NOW
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
export default Login;
