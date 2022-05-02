import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PromotionScreensProps } from '../../types/mainNavigatorTypes';

import { globalStyles } from '../../styles/globalStyle';

const PromotionScreen: React.FC<PromotionScreensProps> = ({
  route,
  navigation,
}: PromotionScreensProps) => {
  return <View style={globalStyles.screen}>Promotion Screen</View>;
};

export const screenOptions = (navigator: PromotionScreensProps) => {
  return {
    headerTitle: 'Promotion Screen',
  };
};

const styles = StyleSheet.create({});
export default PromotionScreen;
