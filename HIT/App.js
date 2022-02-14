import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import ContextProvider from './contexts/Context';
import { dbget } from './database/Database';
import KeyboardDismiss from './helper/KeyboardDismiss';
import SettingsUI from './screens/SettingsUI';
import TimerUI from './screens/TimerUI';

const Tab = createBottomTabNavigator();

export default function App() {

    // font
    let [fontLoaded] = useFonts({
        'zhuzi': require('./assets/fonts/zhuzi.ttf'),
    });

    // async storage
    const [storageLoaded, setStorageLoaded] = useState(false);
    const [preLoad, setPreLoad] = useState(null);
    async function loadStorage() {
        try {
            setPreLoad({
                countdownVoiceEnabled: await dbget('countdownVoiceEnabled'),
                screenAwakeEnabled: await dbget('screenAwakeEnabled'),
                finishVoiceEnabled: await dbget('finishVoiceEnabled'),
                timerList: await dbget('timerList'),
                selectedTimer: await dbget('selectedTimer'),
            });
        } catch (e) {
        }
    }

    if (storageLoaded && fontLoaded && preLoad != null) {
        return (
            <KeyboardDismiss>
                <ContextProvider preLoad={preLoad}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#ddd"
                    />
                    <NavigationContainer>
                        <Tab.Navigator>
                            <Tab.Screen
                                name="TimerUI"
                                component={TimerUI}
                                options={{
                                    title: 'Timer',
                                    tabBarIcon: () => <Feather name="clock" size={24} color="black" />,
                                    headerShown: false,
                                    tabBarHideOnKeyboard: true
                                }}
                            />
                            <Tab.Screen
                                name="SettingsUI"
                                component={SettingsUI}
                                options={{
                                    title: 'Settings',
                                    tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
                                    headerShown: false
                                }}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </ContextProvider>
            </KeyboardDismiss>
        );
    } else {
        return (
            <AppLoading
                startAsync={loadStorage}
                onFinish={() => (setStorageLoaded(true))}
                onError={console.warn}
            />
        );
    }
}
