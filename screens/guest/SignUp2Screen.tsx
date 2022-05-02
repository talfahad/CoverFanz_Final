import React, { useState, useRef, Ref, useEffect } from 'react';
import { Buffer } from 'buffer';
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
import { SignUp2ScreensProps } from '../../types/guestNavigatorTypes';
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
import {
  resetRegistrationState,
  updateRegistrationState,
} from '../../store/reducer/register';
import UploadImage from '../../components/UploadImage/UploadImage';
import * as ImagePicker from 'expo-image-picker';
import { gql, useMutation } from '@apollo/client';
import { authenticate } from '../../store/reducer/auth';

interface SUFormValues {
  name: string;
  description: string;
}

const AFValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .required('Name is required')
    .label('Name'),
  description: Yup.string()
    .min(30, ({ min }) => `Description must be at least ${min} characters`)
    .required('Description is required')
    .label('Description'),
});
const REGISTERUSER_QUERY = gql`
  mutation registerUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      _id
      name
      email
      identifier
      username
    }
  }
`;

const SignUp2Screen: React.FC<SignUp2ScreensProps> = ({
  route,
  navigation,
}: SignUp2ScreensProps) => {
  const registrationData = useSelector((state: RootState) => state.register);
  const [registerUser, registeredUserData] = useMutation(REGISTERUSER_QUERY);
  const { avatar, name, description, userType } = registrationData;
  const appBarTitle = registrationData.userType?.toUpperCase() + ' PROFILE';
  const descriptionInputRef = React.useRef<RNTextInput>(null);
  const [image, setImage] = useState(avatar ?? '');
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: SUFormValues = {
    name: name ?? '',
    description: description ?? '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);
      dispatch(updateRegistrationState({ ...values, avatar: image }));
      if (userType === 'venue') {
        setIsSubmitting(false);
        navigation.navigate('SignUp3Venue');
      } else if (userType === 'star') {
        setIsSubmitting(false);
        navigation.navigate('SignUp3Star');
      } else {
        const userData = {
          ...registrationData,
          name: values.name,
          avatar: image,
        };

        try {
          const user = await registerUser({
            variables: {
              input: userData,
            },
          });
          dispatch(
            authenticate({
              isAuthenticated: true,
              user: user.data.registerUser,
            })
          );
          dispatch(resetRegistrationState());
        } catch (e) {
          //console.error(e);
          // TODO: ADD MODAL
        }

        setIsSubmitting(false);
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

  const choosePhotoFromLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // FIXME: Next Update Veryfyy Image size
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.cancelled && pickerResult.base64) {
      const imageData = Buffer.from(pickerResult.base64, 'base64').toString(
        'base64'
      );
      setImage(imageData);
    }
  };

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
                  icon='person-outline'
                  error={errors.name}
                  touched={touched.name}
                  placeholder={
                    userType === 'fan'
                      ? 'FAN NAME'
                      : userType === 'star'
                      ? 'STAGE NAME'
                      : 'NAME OF VENUE'
                  }
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='name'
                  keyboardType='default'
                  returnKeyType='next'
                  textContentType='name'
                  returnKeyLabel='Next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    descriptionInputRef.current?.focus();
                  }}
                />

                {errors.name && touched.name && (
                  <Text style={styles.redColorText}>{errors.name}</Text>
                )}
              </View>

              <View
                style={{
                  marginBottom: 16,
                  width: '100%',
                }}>
                <TextInput
                  icon='pencil-outline'
                  error={errors.description}
                  touched={touched.description}
                  placeholder={
                    userType === 'fan'
                      ? 'TELL US ABOUT YOURSELF'
                      : userType === 'star'
                      ? 'TELL US ABOUT YOURSELF'
                      : 'BUSINESS DESCRIPTION'
                  }
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  keyboardType='default'
                  returnKeyType='go'
                  textContentType='none'
                  ref={descriptionInputRef}
                  returnKeyLabel='Enter'
                  blurOnSubmit={false}
                  onSubmitEditing={() => handleSubmit()}
                />

                {errors.description && touched.description && (
                  <Text style={styles.redColorText}>{errors.description}</Text>
                )}
              </View>
            </View>
          </Card>

          <View style={styles.picContainer}>
            <UploadImage onPress={choosePhotoFromLibrary} image={image} />
            <Text style={styles.bottomText}>LOGO OR FACE PICS ONLY</Text>

            {userType === 'venue' && (
              <Text
                style={{
                  fontFamily: FontNames.MyriadProRegular,
                  color: Colors.primaryColor,
                  textTransform: 'uppercase',
                  fontSize: 11,
                  marginVertical: 5,
                }}>
                Subscription needed to show logo in profile
              </Text>
            )}
          </View>

          <GlobalButton
            width='80%'
            title='Next'
            isLoading={isSubmitting}
            disabled={!(isValid && initialIsValid)}
            color={Colors.primaryColor}
            onPress={() => handleSubmit()}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: SignUp2ScreensProps) => {
  return {
    headerTitle: 'SignUp2 Screen',
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
  picContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomText: {
    fontFamily: FontNames.MyriadProBold,
    fontSize: 20,
    color: Colors.primaryColor,
  },
});
export default SignUp2Screen;
