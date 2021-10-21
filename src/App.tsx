import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { TodoScreen } from './screens/todo/TodoScreen';
import { LoginScreen } from './screens/identity/LoginScreen';
import { SettingsMainScreen } from './screens/settings/SettingsMainScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useWindowDimensions } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from './assets/colors/colors';
import { RegisterScreen } from './screens/identity/RegisterScreen';
import { AppContextProvider, IAppState, initialAppState } from './context/AppContext';
import { HomeScreen } from './screens/home/HomeScreen';
import { ILoginResponse } from './types/ILoginResponse';
import { TodoMakeScreen } from './screens/todo/TodoMakeScreen';
import { IToDo } from './types/IToDo';
import { CategoryMakeScreen } from './screens/todo/CategoryMakeScreen';
import { Priority } from './dto/Priority';
import { PriorityMakeScreen } from './screens/todo/PriorityMakeScreen';
import { ICategory } from './types/ICategory';
import { IPriority } from './types/IPriority';

Entypo.loadFont();
MaterialCommunityIcons.loadFont();

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const tabsConfig = () => {
  const { width } = useWindowDimensions()
  return {
    lazy: true,
    tabBarOptions: {
      showLabel: true,
      tabStyle: {
        // here you can set the tab width , in this case , 3 tabs , width / 3
        flex: 1,
        width: width / 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
      },
      indicatorStyle: {
        borderWidth: 1,
        borderColor: 'red',
      },
    },
  }
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabBar,
      //tabBarItemStyle: styles.tabBarItem,
      tabBarActiveTintColor: colors.orange,
      tabBarInactiveTintColor: colors.gray,
    }}>
      <Tab.Screen name="Todo" component={TodoScreen} options={{ tabBarShowLabel: false, tabBarIcon: ({ color }) => <Entypo name='home' size={24} color={color} /> }} />
      <Tab.Screen name="Settings" component={SettingsMainScreen} options={{ tabBarShowLabel: false, tabBarIcon: ({ color }) => <MaterialCommunityIcons name='cog' size={24} color={color} /> }} />
    </Tab.Navigator>
  );
}

const App = () => {

  const addTodo = (appState: IAppState, toDo: IToDo): void => {
    setAppState({ ...appState, toDos: [toDo, ...appState.toDos]})
  }
  const updateTodo = (appState: IAppState, toDo: IToDo): void => {
    let newToDos = appState.toDos.filter(item => item.id != toDo.id);
    setAppState({ ...appState, toDos: [...newToDos, toDo]})
  }
  const removeTodo = (appState: IAppState, toDo: IToDo): void => {
    let newToDos = appState.toDos.filter(item => item.id != toDo.id);
    setAppState({ ...appState, toDos: newToDos})
  }
  const addCategory = (appState: IAppState, category: ICategory): void => {
    setAppState({ ...appState, categories: [...appState.categories, category]})
  }
  const addPriority = (appState: IAppState, priority: IPriority): void => {
    setAppState({ ...appState, priorities: [...appState.priorities, priority]})
  }

  const setAuthInfo = (authInfo: ILoginResponse): void => {
    setAppState({ ...appState, authInfo});
  };

  const [appState, setAppState] = useState({ ...initialAppState, setAuthInfo, addTodo, removeTodo, updateTodo, addCategory, addPriority});

  return (
    <AppContextProvider value={appState} >
      <NavigationContainer>
        <Stack.Navigator>
          {(appState.authInfo?.token != null)
            ? 
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Todo" component={TodoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="TodoMake" component={TodoMakeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CategoryMake" component={CategoryMakeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PriorityMake" component={PriorityMakeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={SettingsMainScreen} options={{ headerShown: false }} />
            </>
            : null}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

          {/* <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    backgroundColor: colors.darkGray,
    borderRadius: 64,
    justifyContent: 'space-between'
  },
  tabBar: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-between'
  }
});

export default App;
