import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ActivityScreensProps } from '../../types/mainNavigatorTypes';

import { globalStyles } from '../../styles/globalStyle';
import Colors from '../../constants/Colors';
import ActivityAppBar from '../../components/AppBar/ActivityAppBar';
import ActivityListView from '../../components/ListView/ActivityListView';

const ActivityScreen: React.FC<ActivityScreensProps> = ({
  route,
  navigation,
}: ActivityScreensProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.greyHeaderColorB80}
      />
      <ActivityAppBar />
      <ScrollView
        style={{ width: '100%', marginTop: 30 }}
        contentContainerStyle={{ alignItems: 'center', paddingTop: 10 }}>
        <View
          style={{
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityListView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = (navigator: ActivityScreensProps) => {
  return {
    headerTitle: 'Activity Screen',
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyBackgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },
});
export default ActivityScreen;
