import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { VPCRNoticeScreensProps } from '../../types/guestNavigatorTypes';
import { globalStyles } from '../../styles/globalStyle';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import AppBar from '../../components/AppBar/AppBar';
import { RootState } from '../../store/store';
import GlobalButton from '../../components/Buttons/GlobalButton';
import FontNames from '../../constants/FontNames';

const VPCRNoticeScreen: React.FC<VPCRNoticeScreensProps> = ({
  route,
  navigation,
}: VPCRNoticeScreensProps) => {
  const registrationData = useSelector((state: RootState) => state.register);
  const appBarTitle = registrationData.userType?.toUpperCase() + ' PROFILE';

  return (
    <SafeAreaView
      style={{ ...globalStyles.screen, ...styles.container, paddingTop: 10 }}>
      <AppBar
        isLoggedIn={false}
        title={appBarTitle}
        color={Colors.greyBackgroundColor}
        cfColor={Colors.dark}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          width: '90%',
        }}>
        <View style={{ marginBottom: 50 }}>
          <Text
            style={{
              fontFamily: FontNames.MyriadProBold,
              color: Colors.primaryColor,
              fontSize: 20,
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 30,
            }}>
            Please wait 24 hours to get approval form admin
          </Text>
        </View>
        <View>
          <Text style={styles.textStyle}>
            Every business has slow-downs including yours.
          </Text>
          <Text style={styles.textStyle}>
            We help subscribers build their Fans, Followers, Audiences, and pack
            the place out.
          </Text>
          <Text style={styles.textStyle}>
            Subscribe to CoverFanz. Share a special Offer with your stars. Stars
            share the offer with their Fans on their Social Media Pages.
          </Text>
          <Text style={styles.textStyle}>
            Do tthis often. It's free for subscribers.
          </Text>
        </View>
      </View>

      <GlobalButton
        width='80%'
        title='EXPLORE STARS'
        color={Colors.primaryColor}
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: VPCRNoticeScreensProps) => {
  return {
    headerTitle: 'VPCR Notice Screen',
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
  textStyle: {
    fontFamily: FontNames.MyriadProRegular,
    color: Colors.primaryColor,
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 20,
  },
});
export default VPCRNoticeScreen;
