import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateBookingDateBE } from '../../store/reducer/bookingEvent';

const EventCalendar: React.FC<{ seVisible: (visible: boolean) => void }> = ({
  seVisible,
}) => {
  const dispatch = useDispatch();
  return (
    <Agenda
      items={{
        '2022-04-12': [{ name: 'EVENT_ID_SHDGHDJGFHJ', height: 80, day: '12' }],
        '2022-04-13': [
          { name: 'EVENT_ID_SHDGHddffGFHJ', height: 80, day: '13' },
        ],
        '2022-04-16': [
          { name: 'EVENT_ID_SHDdjsfhjDJGFHJ', height: 80, day: '16' },
        ],

        '2022-04-17': [],
        '2022-04-18': [],
        '2022-04-19': [],
        '2022-04-20': [],
      }}
      loadItemsForMonth={(month) => {}}
      onDayPress={(day) => {
        dispatch(updateBookingDateBE({ date: day.dateString }));
        seVisible(true);
      }}
      selected={moment().format('YYYY-MM-DD')}
      minDate={moment().subtract(6, 'months').format('YYYY-MM-DD')}
      maxDate={moment().add(10, 'months').format('YYYY-MM-DD')}
      pastScrollRange={2}
      futureScrollRange={3}
      renderItem={(item, firstItemInDay) => {
        return (
          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: Colors.greyBackgroundColor,
                margin: 30,
                borderRadius: 10,
                height: 100,
              }}>
              <Text>{item.name}</Text>
            </View>
          </View>
        );
      }}
      renderDay={(day, item) => {
        return <View />;
      }}
      renderEmptyDate={() => {
        return (
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Text style={{ color: Colors.greyTextColorB70 }}>
                No event on this date
              </Text>
            </View>
          </View>
        );
      }}
      renderKnob={() => {
        return (
          <View
            style={{
              width: 50,
              height: 5,
              backgroundColor: Colors.secondaryColor,
              borderRadius: 100,
              marginVertical: 10,
            }}
          />
        );
      }}
      rowHasChanged={(r1: any, r2: any) => {
        return r1.text !== r2.text;
      }}
      hideKnob={false}
      showClosingKnob={true}
      markedDates={{
        '2022-04-12': { selected: false, marked: true },
        '2022-04-13': { marked: true },
        '2022-04-16': { marked: true },
        '2022-04-11': { disabled: true },
      }}
      disabledByDefault={false}
      style={{}}
      showOnlySelectedDayItems
    />
  );
};

export default EventCalendar;
