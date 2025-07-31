import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ title: "Place finder assessment" }} component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default RootStack;