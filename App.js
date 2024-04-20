import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import Home from './src/Home/Home';
import Cadastrar from './src/Cadastrar/Cadastrar';
import ExibirRegistros from './src/ExibirRegistros/ExibirRegistros';
import Pesquisar from './src/Pesquisar/Pesquisar';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Cadastrar'
            component={Cadastrar}
            options={{
              title: 'Cadastre-se',
            }}
          />




          <Stack.Screen
            name='ExibirRegistros'
            component={ExibirRegistros}
            options={{
              title: 'Exibir Registros',
            }}
          />


<Stack.Screen
            name='Pesquisar'
            component={Pesquisar}
            options={{
              title: 'Pesquisar',
            }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  alignVH: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
