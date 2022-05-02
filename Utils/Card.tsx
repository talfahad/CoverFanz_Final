import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';

const Card: React.FC<{ style: ViewStyle }> = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
});

export default Card;
