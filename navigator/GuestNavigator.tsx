import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GuestNavigatorParamList } from '../types/guestNavigatorTypes';

import LandingScreen, {
  screenOptions as screenOptionsLanding,
} from '../screens/guest/LandingScreen';

import SearchScreen, {
  screenOptions as screenOptionsSearch,
} from '../screens/guest/SearchScreen';

import StarProfileVOScreen, {
  screenOptions as screenOptionsStarProfileVO,
} from '../screens/guest/StarProfileVOScreen';

import VenueProfileVOScreen, {
  screenOptions as screenOptionsVenueProfileVO,
} from '../screens/guest/VenueProfileVOScreen';

import NextPerformanceScreen, {
  screenOptions as screenOptionsNextPerformance,
} from '../screens/guest/NextPerformanceScreen';

import RegisterScreen, {
  screenOptions as screenOptionsRegister,
} from '../screens/guest/RegisterScreen';

import EULAScreen, {
  screenOptions as screenOptionsEULA,
} from '../screens/guest/EULAScreen';

import SignUpScreen, {
  screenOptions as screenOptionsSignUp,
} from '../screens/guest/SignUpScreen';

import LoginScreen, {
  screenOptions as screenOptionsLogin,
} from '../screens/guest/LoginScreen';
import EULAWelcomeScreen from '../screens/guest/EULAWelcomeScreen';
import SignUp2Screen from '../screens/guest/SignUp2Screen';
import SignUp3StarScreen from '../screens/guest/SignUp3StarScreen';
import SignUp3VenueScreen from '../screens/guest/SignUp3VenueScreen';
import VPCRNoticeScreen from '../screens/guest/VPCRNoticeScreen';

const GuestStack = createStackNavigator<GuestNavigatorParamList>();

const GuestStackNavigator = () => {
  return (
    <GuestStack.Navigator
      initialRouteName='Landing'
      screenOptions={{ headerShown: false }}>
      <GuestStack.Screen name='Landing' component={LandingScreen} />
      <GuestStack.Screen name='Search' component={SearchScreen} />
      <GuestStack.Screen name='StarPVO' component={StarProfileVOScreen} />
      <GuestStack.Screen name='VenuePVO' component={VenueProfileVOScreen} />
      <GuestStack.Screen
        name='NextPerformance'
        component={NextPerformanceScreen}
      />
      <GuestStack.Screen name='Register' component={RegisterScreen} />
      <GuestStack.Screen name='EULA' component={EULAScreen} />
      <GuestStack.Screen name='EULAWelcome' component={EULAWelcomeScreen} />
      <GuestStack.Screen name='SignUp' component={SignUpScreen} />
      <GuestStack.Screen name='SignUp2' component={SignUp2Screen} />
      <GuestStack.Screen name='SignUp3Star' component={SignUp3StarScreen} />
      <GuestStack.Screen name='SignUp3Venue' component={SignUp3VenueScreen} />
      <GuestStack.Screen name='VPCRNotice' component={VPCRNoticeScreen} />
      <GuestStack.Screen name='Login' component={LoginScreen} />
    </GuestStack.Navigator>
  );
};

export default GuestStackNavigator;
