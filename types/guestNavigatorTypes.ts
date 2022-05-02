import { StackScreenProps } from '@react-navigation/stack';

// Navigation Params

// Guest Screen Params
export type GuestNavigatorParamList = {
  Landing: undefined;
  Search: undefined;
  StarPVO: { userId: string };
  VenuePVO: { userId: string };
  NextPerformance: { userId: string };
  Register: undefined;
  EULA: undefined;
  EULAWelcome: undefined;
  SignUp: undefined;
  SignUp2: undefined;
  SignUp3Star: undefined;
  SignUp3Venue: undefined;
  VPCRNotice: undefined;
  Login: undefined;
};

export type GuestNavigatorParamType = keyof GuestNavigatorParamList;

// Screen List
export type LandingScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'Landing'
>;

export type SearchScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'Search'
>;

export type StarPVOScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'StarPVO'
>;

export type VenuePVOScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'VenuePVO'
>;

export type NextPerformanceScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'NextPerformance'
>;

export type RegisterScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'Register'
>;

export type EULAScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'EULA'
>;
export type EULAWelcomeScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'EULAWelcome'
>;

export type SignUpScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'SignUp'
>;

export type SignUp2ScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'SignUp2'
>;

export type SignUp3StarScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'SignUp3Star'
>;

export type SignUp3VenueScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'SignUp3Venue'
>;

export type VPCRNoticeScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'VPCRNotice'
>;

export type LoginScreensProps = StackScreenProps<
  GuestNavigatorParamList,
  'Login'
>;
