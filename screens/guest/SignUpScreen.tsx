import React, { useState, useRef, Ref, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SignUpScreensProps } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import AppBar from '../../components/AppBar/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GlobalButton from '../../components/Buttons/GlobalButton';
import { Formik, FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { globalStyles } from '../../styles/globalStyle';
import Card from '../../components/Utils/Card';
import TextInput from '../../components/Utils/TextInput';
import FontNames from '../../constants/FontNames';
import { updateRegistrationState } from '../../store/reducer/register';
import { gql, useMutation, useQuery } from '@apollo/client';

interface SUFormValues {
  username: string;
  email: string;
  password: string;
  venmoUsername: string;
}

const AFValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(50, ({ max }) => `Name must be less than ${max} characters`)
    .label('Username'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
  venmoUsername: Yup.string()
    .required('Venmo username is required.')
    .label('VenmoUsername'),
});

const GET_USERNAME_EXISTS = gql`
  mutation ($input: UsernameInput!) {
    getIsUsernameExists(input: $input)
  }
`;

const GET_EMAIL_EXISTS = gql`
  mutation ($input: EmailInput!) {
    getIsEmailExists(input: $input)
  }
`;

const SignUpScreen: React.FC<SignUpScreensProps> = ({
  route,
  navigation,
}: SignUpScreensProps) => {
  const [getIsEmailExists, emailDetails] = useMutation(GET_EMAIL_EXISTS);
  const [getIsUsernameExists, usernameDetails] =
    useMutation(GET_USERNAME_EXISTS);

  const registrationData = useSelector((state: RootState) => state.register);
  const { email, username, venmoUsername, password } = registrationData;
  const appBarTitle = registrationData.userType?.toUpperCase() + ' PROFILE';
  const usernameRef = React.useRef<RNTextInput>(null);
  const passwordInputRef = React.useRef<RNTextInput>(null);
  const venmoUsernameInputRef = React.useRef<RNTextInput>(null);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: SUFormValues = {
    email: email ?? '',
    username: username ?? '',
    password: password ?? '',
    venmoUsername: venmoUsername ?? '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);
      const isEmail = await getIsEmailExists({
        variables: {
          input: {
            email: values.email,
          },
        },
      });

      if (isEmail.data.getIsEmailExists) {
        setIsSubmitting(false);
        setErrors({ email: 'Email already exists!' });
      }

      const isUsername = await getIsUsernameExists({
        variables: {
          input: {
            username: values.username,
          },
        },
      });

      if (isUsername.data.getIsUsernameExists) {
        setIsSubmitting(false);
        setErrors({ username: 'Username already exists!' });
      }

      if (
        !isUsername.data.getIsUsernameExists &&
        !isEmail.data.getIsEmailExists
      ) {
        setIsSubmitting(false);
        dispatch(updateRegistrationState(values));
        navigation.navigate('SignUp2');
      }
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
    <SafeAreaView
      style={{ ...globalStyles.screen, ...styles.container, paddingTop: 10 }}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ ...styles.container }}>
        <KeyboardAvoidingView
          behavior='padding'
          style={{ ...styles.container, width: '100%' }}>
          <AppBar
            isLoggedIn={false}
            title={appBarTitle}
            color={Colors.greyBackgroundColor}
            cfColor={Colors.dark}
          />

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
                    usernameRef.current?.focus();
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
                  icon='at-outline'
                  error={errors.username}
                  touched={touched.username}
                  placeholder='YOUR USERNAME'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='username'
                  keyboardType='default'
                  returnKeyType='next'
                  textContentType='username'
                  ref={usernameRef}
                  returnKeyLabel='Next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                {errors.username && touched.username && (
                  <Text style={styles.redColorText}>{errors.username}</Text>
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
                  returnKeyType='next'
                  returnKeyLabel='Next'
                  onSubmitEditing={() => venmoUsernameInputRef.current?.focus()}
                  blurOnSubmit={false}
                  ref={passwordInputRef}
                />

                {errors.password && touched.password && (
                  <Text style={styles.redColorText}>{errors.password}</Text>
                )}
              </View>

              <View
                style={{
                  marginBottom: 16,
                  width: '100%',
                }}>
                <TextInput
                  icon='logo-vimeo'
                  error={errors.venmoUsername}
                  touched={touched.venmoUsername}
                  placeholder='VENMO USERNAME'
                  onChangeText={handleChange('venmoUsername')}
                  onBlur={handleBlur('venmoUsername')}
                  value={values.venmoUsername}
                  autoCapitalize='none'
                  textContentType='username'
                  autoCompleteType='username'
                  returnKeyType='go'
                  returnKeyLabel='Enter'
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                  ref={venmoUsernameInputRef}
                />

                {errors.venmoUsername && touched.venmoUsername && (
                  <Text style={styles.redColorText}>
                    {errors.venmoUsername}
                  </Text>
                )}
              </View>
            </View>
          </Card>

          <GlobalButton
            width='80%'
            title='Next'
            isLoading={isSubmitting}
            disabled={!(isValid && initialIsValid)}
            color={Colors.primaryColor}
            onPress={() => {
              handleSubmit();
            }}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: SignUpScreensProps) => {
  return {
    headerTitle: 'SignUp Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
export default SignUpScreen;

// EMAIL, USERNAME, PASSWORD, VENMOUSERNAME, NAME (FAN NAME), DESCRIPTION, AVATAR ===== FAN
// EMAIL, USERNAME, PASSWORD, VENMOUSERNAME, NAME (STAGE NAME), DESCRIPTION, AVATAR  | PERFORMANCE SUMMARY (TITLE) TYPE, MEDIA URL == STAR
// EMAIL, USERNAME, PASSWORD, VENMOUSERNAME, NAME (VENUE NAME), DESCRIPTION (BUSINESS DESCRIPTION),  | LOCATION (TITLE), PHONE === VENUE

/**
 * 
 
 USERNAME
 EMAIL
 PASSWORD
 VENMOUSERNAME
 
 NAME
 DESCRIPTION

 AVATAR
 LOCATION + PERFORMANCE SUMMARY
 MEDIA URL + PHONE

Fan
Avatar (Avatar)
FAN NAME (Name)
TEL ME ABOUT YOURSELF (Description) 

Star 
Avatar (Avatar)
STAGE NAME (Name)
TELL ME ABOUT YOURSELF (Description)

ENTERTRAINER TYPE
MEDIA URL

Venue
Avatar (Avatar) (With Note, To Show Need Premium)
NAME OF VENUE (Name)
BUSINESS DESCRUPTION (Description)

BUSINESS PHONE (phoneNumber)
LOCATE ADDRESS ON GOOGLE MAP (Location)

 */
