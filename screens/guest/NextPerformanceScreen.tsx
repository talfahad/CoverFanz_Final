import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { NextPerformanceScreensProps } from '../../types/guestNavigatorTypes';

import { globalStyles } from '../../styles/globalStyle';
import Colors from '../../constants/Colors';
import NextPerformance from '../../components/Profile/NextPerformance';

const NextPerformanceScreen: React.FC<NextPerformanceScreensProps> = ({
  route,
  navigation,
}: NextPerformanceScreensProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <NextPerformance sNavigation={navigation} sRoute={route} />
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: NextPerformanceScreensProps) => {
  return {
    headerTitle: 'NextPerformance Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
});

export default NextPerformanceScreen;
