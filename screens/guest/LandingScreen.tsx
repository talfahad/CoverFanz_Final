import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { LandingScreensProps } from '../../types/guestNavigatorTypes';
import Colors from '../../constants/Colors';
import { Button, Text } from '@rneui/themed';
import FontNames from '../../constants/FontNames';

const LandingScreen: React.FC<LandingScreensProps> = ({
  route,
  navigation,
}: LandingScreensProps) => {
  return (
    <SafeAreaView style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.gif')}
      />
      <Button
        title='Login'
        buttonStyle={{
          backgroundColor: Colors.primaryColor,
          borderRadius: 3,
          justifyContent: 'flex-start',
          height: 60,
        }}
        titleStyle={{
          fontFamily: FontNames.FuturaBook,
          fontSize: 20,
        }}
        containerStyle={{
          width: '95%',
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />

      <Button
        title='Register'
        buttonStyle={{
          backgroundColor: Colors.secondaryColor,
          borderRadius: 3,
          justifyContent: 'flex-start',
          height: 60,
        }}
        titleStyle={{
          fontFamily: FontNames.FuturaBook,
          fontSize: 20,
        }}
        containerStyle={{
          width: '95%',
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate('Register');
        }}
      />

      <Button
        TouchableComponent={TouchableWithoutFeedback}
        titleStyle={{
          color: Colors.greyBackgroundColor,
          fontFamily: FontNames.FuturaBook,
          fontStyle: 'italic',
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        title='Continue as guest'
        onPress={() => {
          navigation.navigate('Search');
        }}
        type='clear'
      />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: LandingScreensProps) => {
  return {
    headerTitle: 'Landing Screen',
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logo: {
    width: '75%',
    height: '50%',
    position: 'absolute',
    bottom: '45%',
  },
});
export default LandingScreen;
