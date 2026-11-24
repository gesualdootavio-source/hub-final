import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ListaQuestoesScreen from './src/screens/ListaQuestoesScreen';
import DetalheQuestaoScreen from './src/screens/DetalheQuestaoScreen';
import BuscaScreen from './src/screens/BuscaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#f8fafc' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Moléculas em Prova' }} />
          <Stack.Screen name="ListaQuestoes" component={ListaQuestoesScreen} options={{ title: 'Questões' }} />
          <Stack.Screen name="DetalheQuestao" component={DetalheQuestaoScreen} options={{ title: 'Detalhe' }} />
          <Stack.Screen name="Busca" component={BuscaScreen} options={{ title: 'Buscar' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
