import React from 'react';
import { StarPVOScreensProps } from '../../types/guestNavigatorTypes';
import StarProfileVO from '../../components/Profile/StarProfileVO';
import { SafeAreaView, Text, StyleSheet, View, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';

const StarPVOScreen: React.FC<StarPVOScreensProps> = ({
  route,
  navigation,
}: StarPVOScreensProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StarProfileVO sNavigation={navigation} sRoute={route} />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: StarPVOScreensProps) => {
  return {
    headerTitle: 'StarPVO Screen',
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
});

export default StarPVOScreen;
