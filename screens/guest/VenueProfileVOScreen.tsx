import React from 'react';
import VenueProfileVO from '../../components/Profile/VenueProfileVO';
import Colors from '../../constants/Colors';
import { VenuePVOScreensProps } from '../../types/guestNavigatorTypes';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
} from 'react-native';

const VenuePVOScreen: React.FC<VenuePVOScreensProps> = ({
  route,
  navigation,
}: VenuePVOScreensProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <VenueProfileVO sNavigation={navigation} sRoute={route} />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: VenuePVOScreensProps) => {
  return {
    headerTitle: 'VenuePVO Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 15,
  },
});
export default VenuePVOScreen;
