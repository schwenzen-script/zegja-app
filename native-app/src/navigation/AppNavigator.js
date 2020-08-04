/** The main router that's being used */
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { ForgetPass, Info, HomeComponent, Register, RegisterFinal } from '../pages';

const RootStack = createStackNavigator({
  Home: { screen: HomeComponent},
  ForgetPass: { screen: ForgetPass},
  Info: { screen: Info },
  Register: { screen: Register },
  RegisterFinal: { screen: RegisterFinal },
}, {
  headerMode: "none",
  initialRouteName: "Home",
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;