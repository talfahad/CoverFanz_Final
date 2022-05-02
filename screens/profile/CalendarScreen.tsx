import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { CalendarScreensProps } from '../../types/mainNavigatorTypes';
import Colors from '../../constants/Colors';
import EventCalendar from './../../components/Calendar/EventCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FAB } from 'react-native-paper';

const CalendarScreen: React.FC<CalendarScreensProps> = ({
  route,
  navigation,
}: CalendarScreensProps) => {
  const [show, setShow] = useState(false);
  const { targetStarId } = useSelector((state: RootState) => state.booking);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), 1 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <View style={styles.container}>
      {!show && (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          animating={true}
          color={Colors.primaryColor}
        />
      )}

      {show && <EventCalendar seVisible={setVisible} />}

      <FAB
        style={styles.fab}
        visible={targetStarId ? visible : false}
        small
        icon='plus'
        onPress={() => {
          navigation.getParent()?.navigate('Booking');
        }}
      />
    </View>
  );
};

export const screenOptions = (navigator: CalendarScreensProps) => {
  return {
    headerTitle: 'Calendar Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: Colors.white,
    backgroundColor: Colors.secondaryColor,
  },
});
export default CalendarScreen;
