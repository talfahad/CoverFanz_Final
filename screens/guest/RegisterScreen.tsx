import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { RegisterScreensProps } from '../../types/guestNavigatorTypes';
import { Button } from '@rneui/themed';
import Colors from '../../constants/Colors';
import FontNames from '../../constants/FontNames';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateRegistrationState } from '../../store/reducer/register';
import { UserTypeEnum } from '../../types/globalTypes';

const RegisterScreen: React.FC<RegisterScreensProps> = ({
  route,
  navigation,
}: RegisterScreensProps) => {
  const registrationData = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.gif')}
      />
      <Button
        title={`I'm a Fan`}
        iconRight={true}
        icon={{
          name: 'chevron-forward-outline',
          type: 'ionicon',
          size: 30,
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: Colors.secondaryColor,
          borderRadius: 3,
          justifyContent: 'space-between',
          height: 50,
        }}
        titleStyle={{
          fontFamily: FontNames.FuturaBook,
          fontSize: 20,
        }}
        containerStyle={{
          width: '95%',
          marginVertical: 5,
        }}
        onPress={() => {
          dispatch(updateRegistrationState({ userType: UserTypeEnum.FAN }));
          navigation.navigate('EULA');
        }}
      />

      <Button
        title={`I'm a Star`}
        iconRight={true}
        icon={{
          name: 'chevron-forward-outline',
          type: 'ionicon',
          size: 30,
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: Colors.primaryColor,
          borderRadius: 3,
          justifyContent: 'space-between',
          height: 50,
        }}
        titleStyle={{
          fontFamily: FontNames.FuturaBook,
          fontSize: 20,
        }}
        containerStyle={{
          width: '95%',
          marginVertical: 5,
        }}
        onPress={() => {
          dispatch(updateRegistrationState({ userType: UserTypeEnum.STAR }));
          navigation.navigate('EULA');
        }}
      />

      <Button
        title={`I'm a Venue`}
        iconRight={true}
        icon={{
          name: 'chevron-forward-outline',
          type: 'ionicon',
          size: 30,
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: Colors.accentColor,
          borderRadius: 3,
          justifyContent: 'space-between',
          height: 50,
        }}
        titleStyle={{
          fontFamily: FontNames.FuturaBook,
          fontSize: 20,
        }}
        containerStyle={{
          width: '95%',
          marginVertical: 5,
          paddingBottom: 10,
        }}
        onPress={() => {
          dispatch(updateRegistrationState({ userType: UserTypeEnum.VENUE }));
          navigation.navigate('EULA');
        }}
      />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: RegisterScreensProps) => {
  return {
    headerTitle: 'Register Screen',
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },

  logo: {
    width: '75%',
    height: '50%',
    position: 'absolute',
    bottom: '45%',
  },
});
export default RegisterScreen;
