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
  TouchableOpacity,
} from 'react-native';
import { BookingScreensProps } from '../../types/mainNavigatorTypes';
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
import Modal from 'react-native-modal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { deviceHeight, deviceWidth, isAndroid } from '../../utils/utils';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import InfoModal from '../../components/Modal/InfoModal';
import ErrorModal from '../../components/Modal/ErrorModal';
import StartTimePickerModal from './../../components/Modal/StartTimePickerModal';
import EndTimePickerModal from '../../components/Modal/EndTimePickerModal';

const GET_USER_BY_ID = gql`
  query ($input: UserIdInput!) {
    getUserById(input: $input) {
      _id
      avatar
      name
      email
      identifier
      mediaUrl
      userType
      location
      description
      entertrainerFeatures
      performanceSummary
      ratingByFan
      ratingByStar
      premium
      ratingByVenue
    }
  }
`;
interface SUFormValues {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
  payment: string;
}

const AFValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Tittle is required')
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .label('Title'),
  location: Yup.string().required('Location is required.').label('Location'),
  startTime: Yup.string().required('Start time is required').label('StartTime'),
  endTime: Yup.string().required('End time is required').label('EndTime'),
  description: Yup.string()
    .required('Description is required')
    .min(3, ({ min }) => `Description must be at least ${min} characters`)
    .label('Description'),
  payment: Yup.string().required('Payment amount is required').label('Payment'),
});

const CREATE_BOOKING = gql`
  mutation createBooking($input: BookingInput!) {
    createBooking(input: $input) {
      _id
      title
    }
  }
`;

const BookingScreen: React.FC<BookingScreensProps> = ({
  route,
  navigation,
}: BookingScreensProps) => {
  const [createBooking, bookingDetails] = useMutation(CREATE_BOOKING);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const { selectedDate, targetStarId } = useSelector(
    (state: RootState) => state.booking
  );

  const locationInputRef = React.useRef<RNTextInput>(null);
  const startTimeInputRef = React.useRef<RNTextInput>(null);
  const endTimeInputRef = React.useRef<RNTextInput>(null);
  const descriptionInputRef = React.useRef<RNTextInput>(null);
  const paymentInputRef = React.useRef<RNTextInput>(null);

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [pickStart, setStart] = useState<Date>(new Date(selectedDate));
  const [pickEnd, setEnd] = useState<Date>(new Date(selectedDate));

  const [isPickStartVisible, setIsPickStartVisible] = useState(false);
  const [isPickEndVisible, setIsPickEndVisible] = useState(false);

  const initialValues: SUFormValues = {
    title: '',
    location:
      user.userType === 'venue' && isAuthenticated ? user.location! : '',
    startTime: '',
    endTime: '',
    description: '',
    payment: '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const {
    data: t_user,
    loading: t_userLodaing,
    error: t_userError,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        _id: targetStarId ?? '625b814556ad4919749ea54b',
      },
    },
  });

  // @ts-ignore
  let userInfoX;

  if (t_user?.getUserById) {
    userInfoX = t_user.getUserById;
  }

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);

      try {
        const newBooking = {
          ...values,
          //@ts-ignore
          typeOfWork: userInfoX.entertrainerFeatures ?? 'music',
          date: moment(selectedDate),
          payment: +values.payment,
          startTime: moment(pickStart),
          endTime: moment(pickEnd),
          star_id: targetStarId,
        };

        await createBooking({
          variables: {
            input: newBooking,
          },
        });

        setIsSubmitting(false);
        resetForm();
        setIsInfoModalVisible(true);
      } catch (e: any) {
        // ADDMORE:

        console.log(e);
        console.log(e.message);
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

  const onStartChange = (event: DateTimePickerEvent, date?: Date) => {
    formik.setFieldValue(
      'startTime',
      moment(date).format('DD MMM, hh:mm:ss A'),
      true
    );
    // @ts-ignore
    setStart(date);
  };

  const onEndChange = (event: DateTimePickerEvent, date?: Date) => {
    formik.setFieldValue(
      'endTime',
      moment(date).format('DD MMM, hh:mm:ss A'),
      true
    );
    // @ts-ignore
    setEnd(date);
  };

  const showStartMode = () => {
    DateTimePickerAndroid.open({
      value: pickStart,
      mode: 'time',
      onChange: onStartChange,
    });
  };

  const showEndMode = () => {
    DateTimePickerAndroid.open({
      value: pickEnd,
      onChange: onEndChange,
      mode: 'time',
    });
  };

  return (
    <SafeAreaView
      style={{ ...globalStyles.screen, ...styles.container, paddingTop: 10 }}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ ...styles.container }}>
        <KeyboardAvoidingView
          behavior='height'
          style={{ ...styles.container, width: '100%' }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: FontNames.MyriadProBold,
                  color: Colors.primaryColor,
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                DETAILS OF THE BOOKING DEAL
              </Text>
            </View>

            <Card style={styles.authContainer}>
              <View>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 16,
                  }}>
                  <TextInput
                    icon='clipboard-outline'
                    error={errors.title}
                    touched={touched.title}
                    placeholder='BOOKING TITLE'
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    keyboardType='default'
                    returnKeyType='next'
                    textContentType='none'
                    returnKeyLabel='Next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      descriptionInputRef.current?.focus();
                    }}
                  />

                  {errors.title && touched.title && (
                    <Text style={styles.redColorText}>{errors.title}</Text>
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
                    placeholder='DETAILS OF BOOKING'
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoCompleteType='off'
                    keyboardType='default'
                    returnKeyType='next'
                    textContentType='none'
                    ref={descriptionInputRef}
                    returnKeyLabel='Next'
                    blurOnSubmit={false}
                    onSubmitEditing={() => paymentInputRef.current?.focus()}
                  />

                  {errors.description && touched.description && (
                    <Text style={styles.redColorText}>
                      {errors.description}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 16,
                    width: '100%',
                  }}>
                  <TextInput
                    icon='logo-usd'
                    error={errors.payment}
                    touched={touched.payment}
                    placeholder='PAYMENT ($/hour)'
                    onChangeText={handleChange('payment')}
                    onBlur={handleBlur('payment')}
                    value={values.payment}
                    autoCapitalize='none'
                    textContentType='username'
                    autoCompleteType='username'
                    returnKeyType='next'
                    returnKeyLabel='Next'
                    onSubmitEditing={() => {
                      locationInputRef.current?.focus();
                    }}
                    ref={paymentInputRef}
                  />

                  {errors.payment && touched.payment && (
                    <Text style={styles.redColorText}>{errors.payment}</Text>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 16,
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (user.userType !== 'venue') {
                        setIsModalVisible(true);
                      }
                    }}>
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
                      returnKeyType='next'
                      textContentType='none'
                      ref={locationInputRef}
                      editable={false}
                      onPressIn={() => {
                        if (user.userType !== 'venue') {
                          setIsModalVisible(true);
                        }
                      }}
                      returnKeyLabel='Next'
                      blurOnSubmit={false}
                      onSubmitEditing={() => startTimeInputRef.current?.focus()}
                    />
                  </TouchableOpacity>

                  {errors.location && touched.location && (
                    <Text style={styles.redColorText}>{errors.location}</Text>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 16,
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!isAndroid) {
                        setIsPickStartVisible(true);
                      } else {
                        showStartMode();
                      }
                    }}>
                    <TextInput
                      icon='stopwatch-outline'
                      error={errors.startTime}
                      touched={touched.startTime}
                      placeholder='START TIME'
                      onChangeText={handleChange('startTime')}
                      onBlur={handleBlur('startTime')}
                      value={values.startTime}
                      autoCorrect={false}
                      autoCapitalize='none'
                      autoCompleteType='off'
                      keyboardType='default'
                      returnKeyType='next'
                      textContentType='none'
                      editable={false}
                      onPressIn={() => {
                        if (!isAndroid) {
                          setIsPickStartVisible(true);
                        } else {
                          showStartMode();
                        }
                      }}
                      ref={startTimeInputRef}
                      returnKeyLabel='Next'
                      blurOnSubmit={false}
                      onSubmitEditing={() => endTimeInputRef.current?.focus()}
                    />
                  </TouchableOpacity>

                  {errors.startTime && touched.startTime && (
                    <Text style={styles.redColorText}>{errors.startTime}</Text>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 16,
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!isAndroid) {
                        setIsPickEndVisible(true);
                      } else {
                        showEndMode();
                      }
                    }}>
                    <TextInput
                      icon='time-outline'
                      error={errors.endTime}
                      touched={touched.endTime}
                      placeholder='END TIME'
                      onChangeText={handleChange('endTime')}
                      onBlur={handleBlur('endTime')}
                      value={values.endTime}
                      autoCorrect={false}
                      autoCapitalize='none'
                      autoCompleteType='off'
                      keyboardType='default'
                      returnKeyType='go'
                      textContentType='none'
                      editable={false}
                      onPressIn={() => {
                        if (!isAndroid) {
                          setIsPickEndVisible(true);
                        } else {
                          showEndMode();
                        }
                      }}
                      ref={endTimeInputRef}
                      returnKeyLabel='Enter'
                      blurOnSubmit={false}
                      onSubmitEditing={() => handleSubmit()}
                    />
                  </TouchableOpacity>

                  {errors.endTime && touched.endTime && (
                    <Text style={styles.redColorText}>{errors.endTime}</Text>
                  )}
                </View>

                {!isAndroid && (
                  <StartTimePickerModal
                    date={pickStart}
                    isVisible={isPickStartVisible}
                    onPress={() => setIsPickStartVisible(false)}
                    onDateChange={(event: DateTimePickerEvent, date?: Date) => {
                      //@ts-ignore
                      setStart(date);

                      formik.setFieldValue(
                        'startTime',
                        moment(date).format('DD MMM, hh:mm:ss A'),
                        true
                      );
                    }}
                  />
                )}

                {!isAndroid && (
                  <EndTimePickerModal
                    date={pickEnd}
                    isVisible={isPickEndVisible}
                    onPress={() => setIsPickEndVisible(false)}
                    onDateChange={(event: DateTimePickerEvent, date?: Date) => {
                      //@ts-ignore
                      setEnd(date);
                      formik.setFieldValue(
                        'endTime',
                        moment(date).format('DD MMM, hh:mm:ss A'),
                        true
                      );
                    }}
                  />
                )}
              </View>
            </Card>
          </View>

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

            <InfoModal
              message='Booking event created successfully.'
              isVisible={isInfoModalVisible}
              onPress={() => {
                setIsInfoModalVisible(false);
              }}
            />
          </View>

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

export const screenOptions = (navigator: BookingScreensProps) => {
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
export default BookingScreen;
