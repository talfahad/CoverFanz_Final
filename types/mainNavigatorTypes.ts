import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Navigation Params

// Main Stack Params
export type UserHomeStackParamList = {
  UserHome: undefined;
  Booking: undefined;
  Promotion: undefined;
};

export type UserHomeScreensProps = StackScreenProps<
  UserHomeStackParamList,
  'UserHome'
>;

export type BookingScreensProps = StackScreenProps<
  UserHomeStackParamList,
  'Booking'
>;

export type PromotionScreensProps = StackScreenProps<
  UserHomeStackParamList,
  'Promotion'
>;

// -----------

export type ActivityStackParamList = {
  Activity: undefined;
};

// List of screens
export type ActivityScreensProps = StackScreenProps<
  ActivityStackParamList,
  'Activity'
>;

// ---------

export type CalendarStackParamList = {
  Calendar: { star_id?: string };
};

// List of screens
export type CalendarScreensProps = StackScreenProps<
  CalendarStackParamList,
  'Calendar'
>;

// ----------
export type SettingStackParamList = {
  Settings: undefined;
};

// List of screens
export type SettingScreensProps = StackScreenProps<
  SettingStackParamList,
  'Settings'
>;

// --------------

export type LIUSearchStackParamList = {
  LIUSearch: { userId: undefined };
  LIUStarPVO: { userId: string };
  LIUVenuePVO: { userId: string };
  LIUNextPerformance: { userId: string };
};
export type LIUSearchStackParamType = keyof LIUSearchStackParamList;

export type LIUSearchScreensProps = StackScreenProps<
  LIUSearchStackParamList,
  'LIUSearch'
>;

export type LIUStarPVOScreensProps = StackScreenProps<
  LIUSearchStackParamList,
  'LIUStarPVO'
>;

export type LIUVenuePVOScreensProps = StackScreenProps<
  LIUSearchStackParamList,
  'LIUVenuePVO'
>;

export type LIUNextPerformanceScreensProps = StackScreenProps<
  LIUSearchStackParamList,
  'LIUNextPerformance'
>;

export type MainDrawerParamList = {
  HomeDr: NavigatorScreenParams<UserHomeStackParamList>;
  ActivityDr: NavigatorScreenParams<ActivityStackParamList>;
  SearchDr: NavigatorScreenParams<LIUSearchStackParamList>;
  CalendarDr: NavigatorScreenParams<CalendarStackParamList>;
  SettingsDr: NavigatorScreenParams<SettingStackParamList>;
};

export type MainDrawerProps = DrawerScreenProps<MainDrawerParamList>;
export type MainDrawerParamType = keyof MainDrawerParamList;
