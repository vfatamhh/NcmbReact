import React, { useState } from 'react'
import { Provider } from 'react-native-paper'
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/core/theme'
import NCMB, { NCMBUser, NCMBObject, NCMBQuery, 
  NCMBFile, NCMBAcl, NCMBRole, 
  NCMBRequest, NCMBRelation, NCMBGeoPoint, 
  NCMBInstallation, NCMBPush } from 'ncmb-react-native';
  const applicationKey = 'd7f031319c60a703a8ca4561d32f62867deb0848285b31ecfba0daf07147d26f';
  const clientKey = '25d648fb177723719ea1b056c08305a442d02e06c695d7a111c41ba8dca093e6';
  new NCMB(applicationKey, clientKey);
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

const Stack = createNativeStackNavigator();

function App() {

  const [isLogged, setIsLogged] = useState(false);

  (async () => {
    try {
      const user = await NCMBUser.currentUser();
      console.log(user);
      if (!user) {
        setIsLogged(true);
      }
   }
   catch(err) {
      setIsLogged(false);
   }
   console.log(isLogged);
  })();

  return (
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName={isLogged ? 'Dashboard' : 'StartScreen'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
