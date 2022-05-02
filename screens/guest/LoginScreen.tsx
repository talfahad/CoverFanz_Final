import React, { useState, useRef, Ref, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { LoginScreensProps } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import GlobalButton from '../../components/Buttons/GlobalButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { globalStyles } from '../../styles/globalStyle';
import Card from '../../components/Utils/Card';
import TextInput from '../../components/Utils/TextInput';
import FontNames from '../../constants/FontNames';

import { gql, useMutation } from '@apollo/client';
import { authenticate } from '../../store/reducer/auth';
import { resetRegistrationState } from '../../store/reducer/register';
import ErrorModal from '../../components/Modal/ErrorModal';
import MapModal from '../../components/Modal/MapModal';

const LOGIN_MUTATION = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      _id
      name
      email
      userType
      avatar
      username
      venmoUsername
      identifier
      description
      active
      premium
      entertrainerFeatures
      mediaUrl
      location
      phoneNumber
      ratingByStar
      ratingByVenue
      ratingByFan
    }
  }
`;

interface SUFormValues {
  email: string;
  password: string;
}

const AFValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string().required('Password is required').label('Password'),
});

const LoginScreen: React.FC<LoginScreensProps> = ({
  route,
  navigation,
}: LoginScreensProps) => {
  const passwordInputRef = React.useRef<RNTextInput>(null);
  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, registeredUserData] = useMutation(LOGIN_MUTATION);

  const initialValues: SUFormValues = {
    email: '',
    password: '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);
      try {
        const user = await login({
          variables: {
            input: values,
          },
        });

        dispatch(
          authenticate({
            isAuthenticated: true,
            user: user.data.login,
          })
        );
        dispatch(resetRegistrationState());
      } catch (e: any) {
        setErrorIsVisible(true);
        // console.log(e);
      }

      setIsSubmitting(false);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = formik;

  if (dirty) {
    initialIsValid = true;
  }

  return (
    <SafeAreaView style={{ ...styles.container, paddingTop: 10 }}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ ...styles.container }}>
        <KeyboardAvoidingView
          behavior='height'
          style={{ ...styles.container, width: '100%' }}>
          <View style={{ marginBottom: 25 }}>
            <Text
              style={{
                fontFamily: FontNames.MyriadProBold,
                color: Colors.primaryColor,
                fontSize: 40,
                textTransform: 'uppercase',
              }}>
              WELCOME BACK!
            </Text>
            {registeredUserData.error && (
              <ErrorModal
                isVisible={errorIsVisible}
                onPress={() => setErrorIsVisible(false)}
                message={registeredUserData.error.message}
              />
            )}
          </View>

          <Card style={styles.authContainer}>
            <View>
              <View
                style={{
                  width: '100%',
                  marginBottom: 16,
                }}>
                <TextInput
                  icon='mail-outline'
                  error={errors.email}
                  touched={touched.email}
                  placeholder='YOUR EMAIL'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='email'
                  keyboardType='email-address'
                  returnKeyType='next'
                  textContentType='emailAddress'
                  returnKeyLabel='Next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />

                {errors.email && touched.email && (
                  <Text style={styles.redColorText}>{errors.email}</Text>
                )}
              </View>

              <View
                style={{
                  marginBottom: 16,
                  width: '100%',
                }}>
                <TextInput
                  icon='key-outline'
                  error={errors.password}
                  touched={touched.password}
                  placeholder='YOUR PASSWORD'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize='none'
                  secureTextEntry
                  textContentType='password'
                  autoCompleteType='password'
                  returnKeyType='go'
                  returnKeyLabel='Enter'
                  onSubmitEditing={() => handleSubmit()}
                  blurOnSubmit={false}
                  ref={passwordInputRef}
                />

                {errors.password && touched.password && (
                  <Text style={styles.redColorText}>{errors.password}</Text>
                )}
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <GlobalButton
                  onPress={() => handleSubmit()}
                  title='Log in'
                  isLoading={isSubmitting}
                  color={Colors.primaryColor}
                  width='100%'
                  disabled={!(dirty && isValid)}
                  disabledColor={Colors.greyBackgroundColor}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                alignItems: 'flex-end',
              }}>
              <View>
                <Text
                  style={{
                    color: Colors.primaryColor,
                    fontFamily: FontNames.MyriadProRegular,
                    fontSize: 10,
                    marginBottom: 5,
                  }}>
                  Don't have an acccount?
                </Text>
                <Text
                  style={{
                    color: Colors.primaryColor,
                    fontFamily: FontNames.MyriadProBold,
                    fontSize: 12,
                    textTransform: 'uppercase',
                  }}
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  Sign up Now
                </Text>
              </View>
              <Text
                style={{
                  color: Colors.primaryColor,
                  fontFamily: FontNames.MyriadProBold,
                  fontSize: 12,
                  textTransform: 'uppercase',
                }}
                onPress={() => {}}>
                Forgot password?
              </Text>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: LoginScreensProps) => {
  return {
    headerTitle: 'SignUp Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    padding: 20,
  },

  redColorText: {
    color: Colors.accentColor,
    fontFamily: FontNames.MyriadProRegular,
  },
});
export default LoginScreen;
