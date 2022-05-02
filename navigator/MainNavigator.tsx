import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

// Navigation Types
import {
  UserHomeStackParamList,
  ActivityStackParamList,
  SettingStackParamList,
  CalendarStackParamList,
  MainDrawerParamList,
  LIUSearchStackParamList,
} from '../types/mainNavigatorTypes';

// Drawer Navigation
import UserHomeScreen, {
  screenOptions as screenOptionsUserHome,
} from '../screens/profile/UserHomeScreen';

import BookingScreen, {
  screenOptions as screenOptionsBooking,
} from '../screens/profile/BookingScreen';

import PromotionScreen, {
  screenOptions as screenOptionsPromotion,
} from '../screens/profile/PromotionScreen';

import ActivityScreen, {
  screenOptions as screenOptionsActivity,
} from '../screens/profile/ActivityScreen';

import CalendarScreen, {
  screenOptions as screenOptionsCalendar,
} from '../screens/profile/CalendarScreen';

import SettingScreen, {
  screenOptions as screenOptionsSetting,
} from '../screens/profile/SettingScreen';
import { isAndroid } from '../utils/utils';
import LIUSearchScreen from '../screens/search/LIUSearchScreen';
import LIUStarPVOScreen from '../screens/search/LIUStarProfileVOScreen';
import LIUNextPerformanceScreen from '../screens/search/LIUNextPerformanceScreen';
import GuestStackNavigator from './GuestNavigator';
import HeaderTitle from './../components/HeaderTitle/HeaderTitle';
import FontNames from '../constants/FontNames';
import LIUVenuePVOScreen from '../screens/search/LIUVenueProfileVOScreen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { resetAuth } from '../store/reducer/auth';

const UserHomeStack = createStackNavigator<UserHomeStackParamList>();
const ActivityStack = createStackNavigator<ActivityStackParamList>();
const SettingStack = createStackNavigator<SettingStackParamList>();
const CalenderStack = createStackNavigator<CalendarStackParamList>();
const LIUSearchStack = createStackNavigator<LIUSearchStackParamList>();

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const UserHomeStackNavigator = () => {
  return (
    <UserHomeStack.Navigator
      initialRouteName='UserHome'
      screenOptions={{ headerShown: false }}>
      <UserHomeStack.Screen
        name='UserHome'
        component={UserHomeScreen}
        options={screenOptionsUserHome}
      />

      <UserHomeStack.Screen
        name='Booking'
        component={BookingScreen}
        options={screenOptionsBooking}
      />

      <UserHomeStack.Screen
        name='Promotion'
        component={PromotionScreen}
        options={screenOptionsPromotion}
      />
    </UserHomeStack.Navigator>
  );
};

const ActivityStackNavigator = () => {
  return (
    <ActivityStack.Navigator
      initialRouteName='Activity'
      screenOptions={{ headerShown: false }}>
      <ActivityStack.Screen
        name='Activity'
        component={ActivityScreen}
        options={screenOptionsActivity}
      />
    </ActivityStack.Navigator>
  );
};

const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator
      initialRouteName='Settings'
      screenOptions={{ headerShown: false }}>
      <SettingStack.Screen
        name='Settings'
        component={SettingScreen}
        options={screenOptionsSetting}
      />
    </SettingStack.Navigator>
  );
};

const CalenderStackNavigator = () => {
  return (
    <CalenderStack.Navigator
      initialRouteName='Calendar'
      screenOptions={{ headerShown: false }}>
      <CalenderStack.Screen
        name='Calendar'
        component={CalendarScreen}
        options={screenOptionsCalendar}
      />
    </CalenderStack.Navigator>
  );
};

const LIUSearchStackNavigator = () => {
  return (
    <LIUSearchStack.Navigator
      initialRouteName='LIUSearch'
      screenOptions={{ headerShown: false }}>
      <LIUSearchStack.Screen name='LIUSearch' component={LIUSearchScreen} />
      <LIUSearchStack.Screen name='LIUStarPVO' component={LIUStarPVOScreen} />
      <LIUSearchStack.Screen name='LIUVenuePVO' component={LIUVenuePVOScreen} />
      <LIUSearchStack.Screen
        name='LIUNextPerformance'
        component={LIUNextPerformanceScreen}
      />
    </LIUSearchStack.Navigator>
  );
};

const MainNavigator = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <GuestStackNavigator />
      ) : (
        <Drawer.Navigator
          useLegacyImplementation={true}
          initialRouteName='HomeDr'
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label='Logout'
                  labelStyle={{
                    marginLeft: -20,
                    fontFamily: FontNames.MyriadProRegular,
                  }}
                  icon={({ focused, color, size }) => (
                    <Ionicons
                      name={
                        Platform.OS === 'android'
                          ? 'md-log-out-outline'
                          : 'ios-log-out-outline'
                      }
                      size={size}
                      color={color}
                    />
                  )}
                  onPress={() => {
                    dispatch(resetAuth());
                  }}
                />
              </DrawerContentScrollView>
            );
          }}
          screenOptions={({ route, navigation }) => ({
            drawerActiveTintColor: Colors.primaryColor,
            headerTintColor: Colors.secondaryColor,
            drawerLabelStyle: {
              fontFamily: FontNames.MyriadProRegular,
              marginLeft: -20,
            },
            headerLeftContainerStyle: {},
            headerTitleStyle: {
              marginLeft: isAndroid ? -20 : 0,
            },
          })}>
          <Drawer.Screen
            name='HomeDr'
            options={{
              title: 'Home',

              headerStyle: {
                backgroundColor: Colors.greyHeaderColorB80,
              },
              headerTitle: () => (
                <HeaderTitle title={`${user.userType.toUpperCase()} PROFILE`} />
              ),
              drawerLabel: 'Home',
              drawerIcon: (config) => (
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'home-outline'
                      : 'ios-home-outline'
                  }
                  size={config.size}
                  color={config.color}
                />
              ),
            }}
            component={UserHomeStackNavigator}
          />

          <Drawer.Screen
            name='ActivityDr'
            options={{
              title: 'Activity',
              headerShown: false,
              drawerLabel: 'Activity',
              drawerIcon: (config) => (
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'pulse-outline'
                      : 'ios-pulse-outline'
                  }
                  size={config.size}
                  color={config.color}
                />
              ),
            }}
            component={ActivityStackNavigator}
          />

          <Drawer.Screen
            name='SearchDr'
            options={{
              title: 'Search',
              headerShown: false,
              drawerLabel: 'Search',
              drawerIcon: (config) => (
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'search-outline'
                      : 'ios-search-outline'
                  }
                  size={config.size}
                  color={config.color}
                />
              ),
            }}
            component={LIUSearchStackNavigator}
          />

          <Drawer.Screen
            name='CalendarDr'
            options={{
              title: 'Calendar',
              headerStyle: {
                backgroundColor: Colors.greyHeaderColorB80,
              },
              headerTitle: () => <HeaderTitle title='Calendar' />,
              drawerLabel: 'Calendar',
              drawerIcon: (config) => (
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'calendar-outline'
                      : 'ios-calendar-outline'
                  }
                  size={config.size}
                  color={config.color}
                />
              ),
            }}
            component={CalenderStackNavigator}
          />

          <Drawer.Screen
            name='SettingsDr'
            options={{
              title: 'Settings',
              drawerLabel: 'Settings',
              drawerIcon: (config) => (
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'settings-outline'
                      : 'ios-settings-outline'
                  }
                  size={config.size}
                  color={config.color}
                />
              ),
            }}
            component={SettingStackNavigator}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
