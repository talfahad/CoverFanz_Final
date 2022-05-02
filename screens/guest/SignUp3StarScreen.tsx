import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SignUp3StarScreensProps } from '../../types/guestNavigatorTypes';
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
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { resetRegistrationState } from '../../store/reducer/register';
import { gql, useMutation, useQuery } from '@apollo/client';
import { authenticate } from '../../store/reducer/auth';
interface SUFormValues {
  mediaUrl?: string;
  performanceSummary: string;
}

const AFValidationSchema = Yup.object().shape({
  mediaUrl: Yup.string().optional().label('MediaUrl'),
  performanceSummary: Yup.string()
    .min(7, ({ min }) => `Summary must be at least ${min} characters`)
    .required('Summary is required')
    .label('Summary'),
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

const FEATURE_GET_QUERY = gql`
  query {
    getAllFeatures {
      _id
      entertrainerFeature
    }
  }
`;

const SignUp3StarScreen: React.FC<SignUp3StarScreensProps> = ({
  route,
  navigation,
}: SignUp3StarScreensProps) => {
  const registrationData = useSelector((state: RootState) => state.register);
  const { mediaUrl, performanceSummary, entertrainerFeatures, userType } =
    registrationData;
  const appBarTitle = registrationData.userType?.toUpperCase() + ' PROFILE';
  const [value, setValue] = useState(entertrainerFeatures);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerUser, registeredUserData] = useMutation(REGISTERUSER_QUERY);
  const { loading, error, data: featureData } = useQuery(FEATURE_GET_QUERY);

  const initialValues: SUFormValues = {
    mediaUrl: mediaUrl ?? '',
    performanceSummary: performanceSummary ?? '',
  };

  let initialIsValid = AFValidationSchema.isValidSync(initialValues);

  const formik = useFormik({
    validationSchema: AFValidationSchema,
    initialValues,
    enableReinitialize: true,
    validateOnMount: initialIsValid,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setIsSubmitting(true);
      dispatch(resetRegistrationState());

      const userData = {
        ...registrationData,
        ...values,
        entertrainerFeatures: value,
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

  let featureDataArr = [
    { label: 'DANCER', value: 'dancer' },
    { label: 'MUSIC', value: 'music' },
    { label: 'OTHER', value: 'other' },
  ];

  if (featureData) {
    featureDataArr = featureData.getAllFeatures.map((f: any) => {
      return {
        label: f.entertrainerFeature.toUpperCase(),
        value: f.entertrainerFeature.toLowerCase(),
      };
    });
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

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ marginBottom: 50 }}>
              <Text
                style={{
                  fontFamily: FontNames.MyriadProBold,
                  color: Colors.primaryColor,
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                What Entertainer are You?
              </Text>
            </View>

            <Card style={styles.authContainer}>
              <View
                style={{
                  marginBottom: 16,
                  width: '100%',
                }}>
                <TextInput
                  icon='pencil-outline'
                  error={errors.performanceSummary}
                  touched={touched.performanceSummary}
                  placeholder='PERFORMANCE SUMMARY'
                  onChangeText={handleChange('performanceSummary')}
                  onBlur={handleBlur('performanceSummary')}
                  value={values.performanceSummary}
                  autoCorrect={false}
                  autoCapitalize='none'
                  autoCompleteType='off'
                  keyboardType='default'
                  returnKeyType='next'
                  textContentType='none'
                  returnKeyLabel='Next'
                  blurOnSubmit={false}
                  onSubmitEditing={() => {}}
                />

                {errors.performanceSummary && touched.performanceSummary && (
                  <Text style={styles.redColorText}>
                    {errors.performanceSummary}
                  </Text>
                )}
              </View>
              <View style={styles.dcontainer}>
                <Dropdown
                  style={[
                    styles.dropdown,

                    isFocus && { borderColor: Colors.secondaryColor },
                  ]}
                  placeholderStyle={{
                    ...styles.placeholderStyle,
                    color: isFocus
                      ? Colors.secondaryColor
                      : styles.placeholderStyle.color,
                  }}
                  selectedTextStyle={{
                    ...styles.selectedTextStyle,
                    color: isFocus
                      ? Colors.secondaryColor
                      : styles.selectedTextStyle.color,
                  }}
                  activeColor={Colors.xlight}
                  iconStyle={styles.iconStyle}
                  data={featureDataArr}
                  maxHeight={200}
                  containerStyle={{
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                  }}
                  labelField='label'
                  valueField='value'
                  placeholder={!isFocus ? 'ENTERTAINER TYPE' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={
                        isFocus ? Colors.secondaryColor : Colors.primaryColor
                      }
                      name='Safety'
                      size={20}
                    />
                  )}
                />
              </View>
              <View>
                {value === 'music' && (
                  <View
                    style={{
                      width: '100%',
                      marginTop: 16,
                    }}>
                    <TextInput
                      icon='browsers-outline'
                      error={errors.mediaUrl}
                      touched={touched.mediaUrl}
                      placeholder='MEDIA URL'
                      onChangeText={handleChange('mediaUrl')}
                      onBlur={handleBlur('mediaUrl')}
                      value={values.mediaUrl}
                      autoCorrect={false}
                      autoCapitalize='none'
                      autoCompleteType='off'
                      keyboardType='default'
                      returnKeyType='next'
                      textContentType='name'
                      returnKeyLabel='Next'
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        handleSubmit();
                      }}
                    />

                    {errors.mediaUrl && touched.mediaUrl && (
                      <Text style={styles.redColorText}>{errors.mediaUrl}</Text>
                    )}
                  </View>
                )}
              </View>
            </Card>
          </View>

          <GlobalButton
            width='80%'
            title='Next'
            isLoading={isSubmitting}
            color={Colors.primaryColor}
            disabled={!(isValid && initialIsValid && value)}
            onPress={() => handleSubmit()}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: SignUp3StarScreensProps) => {
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

export default SignUp3StarScreen;
