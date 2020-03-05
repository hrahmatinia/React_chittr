import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
const AppStackNav = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    About: {
        screen: AboutScreen
    },
    SignUp: {
        screen: SignUp
    },
    Login: {
        screen: Login
    }
});const AppContainer = createAppContainer(AppStackNav);export default AppContainer;