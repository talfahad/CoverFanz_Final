import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { doSomething } from '../store/reducer/calendar';
import { RootState } from '../store/store';

const Demo = () => {
  const { events } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

  console.log(events);

  return (
    <View style={styles.container}>
      <Text>Hello Coverfanz</Text>
      <Button title='Click' onPress={() => dispatch(doSomething())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Demo;
