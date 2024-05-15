import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import HomePage from './page/Homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import DisplayMovie from './components/DisplayMovie';
import LikedMovies from './components/LikedMovies';


const client = new ApolloClient({
  uri: 'http://it2810-20.idi.ntnu.no:3001/movie',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#99c5f0', },  }} initialRouteName='Login'>

          <Stack.Screen name='HomePage'component={HomePage} options={{ title: 'M O V I E W O R L D', headerTitleStyle: {
              color: '#fff'
            },}}/>

          <Stack.Screen name="Login" component={Login} options={{ title: 'M O V I E W O R L D', headerTitleStyle: {
              color: '#fff'
            },}}/>

          <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'M O V I E W O R L D', headerTitleStyle: {
              color: '#fff'
            },}}/>

          <Stack.Screen name="DisplayMovie" component={DisplayMovie} options={{ title: 'M O V I E W O R L D', headerTitleStyle: {
              color: '#fff'
            },}}/>

          <Stack.Screen name="LikedMovies" component={LikedMovies} options={{ title: 'Favorite movies', headerTitleStyle: {
              color: '#fff'
            },}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
