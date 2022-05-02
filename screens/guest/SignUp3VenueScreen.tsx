import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import { SignUp3VenueScreensProps } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import AppBar from '../../components/AppBar/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import GlobalButton from '../../components/Buttons/GlobalButton';
import Card from '../../components/Utils/Card';
import { globalStyles } from '../../styles/globalStyle';
import FontNames from '../../constants/FontNames';
import React, { useState } from 'react';
import TextInput from '../../components/Utils/TextInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { deviceHeight, deviceWidth } from '../../utils/utils';
import Modal from 'react-native-modal';
import { gql, useMutation } from '@apollo/client';
import { resetRegistrationState } from '../../store/reducer/register';

interface SUFormValues {
  location: string;
  phoneNumber: string;
}

const AFValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone Number is required.')
    .label('PhoneNumber'),
  location: Yup.string().required('Location is required.').label('Location'),
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

const SignUp3VenueScreen: React.FC<SignUp3VenueScreensProps> = ({
  route,
  navigation,
}: SignUp3VenueScreensProps) => {
  const registrationData = useSelector((state: RootState) => state.register);
  const { location, phoneNumber, userType } = registrationData;
  const appBarTitle = registrationData.userType?.toUpperCase() + ' PROFILE';
  const locationInputRef = React.useRef<RNTextInput>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [registerUser, registeredUserData] = useMutation(REGISTERUSER_QUERY);

  const initialValues: SUFormValues = {
    phoneNumber: phoneNumber ?? '',
    location: location ?? '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);
      const userData = {
        ...registrationData,
        ...values,
      };

      try {
        await registerUser({
          variables: {
            input: userData,
          },
        });
        dispatch(resetRegistrationState());
        setIsSubmitting(false);
        navigation.navigate('VPCRNotice');
      } catch (e) {
        //console.error(e);
        // TODO: ADD MODAL
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
            <View
              style={{
                width: '100%',
                marginBottom: 16,
              }}>
              <TextInput
                icon='call-outline'
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                placeholder='BUSINESS PHONE'
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                autoCorrect={false}
                autoCapitalize='none'
                autoCompleteType='off'
                keyboardType='default'
                returnKeyType='next'
                textContentType='name'
                returnKeyLabel='Next'
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  locationInputRef.current?.focus();
                }}
              />

              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.redColorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View
              style={{
                marginBottom: 16,
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <TextInput
                  icon='map-outline'
                  error={errors.location}
                  touched={touched.location}
                  placeholder='LOCATE ADDRESS ON MAP'
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values.location}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  keyboardType='default'
                  returnKeyType='go'
                  textContentType='none'
                  ref={locationInputRef}
                  editable={false}
                  onPressIn={() => setIsModalVisible(true)}
                  returnKeyLabel='Enter'
                  blurOnSubmit={false}
                  onSubmitEditing={() => handleSubmit()}
                />
              </TouchableOpacity>

              {errors.location && touched.location && (
                <Text style={styles.redColorText}>{errors.location}</Text>
              )}
            </View>
          </Card>

          <View>
            <Modal
              testID={'modal'}
              isVisible={isModalVisible}
              backdropColor={Colors.dark}
              deviceHeight={deviceHeight}
              deviceWidth={deviceWidth}
              backdropOpacity={0.8}
              animationIn='zoomInDown'
              animationOut='zoomOutUp'
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}>
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 1,
                  borderRadius: 10,
                  margin: 20,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <View style={{ width: '100%', flex: 1 }}>
                  <GooglePlacesAutocomplete
                    styles={{
                      textInput: {
                        fontFamily: FontNames.MyriadProRegular,
                        color: Colors.primaryColor,
                        backgroundColor: Colors.xlight,
                        borderColor: Colors.primaryColor,
                      },
                      textInputContainer: {},
                      listView: {},
                      row: {
                        backgroundColor: Colors.xlight,
                        marginBottom: 5,
                        borderRadius: 10,
                      },
                      separator: {
                        opacity: 0,
                      },
                    }}
                    placeholder='Start Typing....'
                    onPress={(data, details = null) => {
                      setIsModalVisible(false);
                      formik.setFieldValue('location', data.description, true);
                    }}
                    onFail={(error) => console.error(error)}
                    query={{
                      key: 'AIzaSyB7F2so8oIYXsEhcXjHMcv2ylHbQzPSY5A',
                      language: 'en',
                    }}
                  />
                </View>

                <GlobalButton
                  color={Colors.primaryColor}
                  title='CLOSE'
                  width={100}
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                />
              </View>
            </Modal>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: FontNames.MyriadProRegular,
                color: Colors.primaryColor,
                fontSize: 14,
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              You need location approval before using this profile Please
              provide authentic location
            </Text>
          </View>

          <GlobalButton
            width='80%'
            title='Next'
            isLoading={isSubmitting}
            color={Colors.primaryColor}
            disabled={!(isValid && initialIsValid)}
            onPress={() => handleSubmit()}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: SignUp3VenueScreensProps) => {
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

  dcontainer: {
    backgroundColor: Colors.xlight,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.primaryColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.xlight,
    fontFamily: FontNames.MyriadProBold,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.xlight,
    fontFamily: FontNames.MyriadProBold,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Colors.primaryColor,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: FontNames.MyriadProBold,
    color: Colors.primaryColor,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.primaryColor,
    fontFamily: FontNames.MyriadProBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default SignUp3VenueScreen;
