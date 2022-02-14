import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { Animated, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { ScrollView } from "react-native-gesture-handler";

import FontText from "../components/FontText";
import Header from "../components/Header";
import { Context } from '../contexts/Context';
import KeyboardDismiss from "../helper/KeyboardDismiss";
import Color from "../styles/Color";

// globals
let COUNTDOWN_TIMER;
let CYCLE_TIMER;
const TimerStack = createNativeStackNavigator();

function Timer({ route, navigation }) {

    // sound init
    async function playCountSound(play = true) {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sound/touch.mp3')
        );
        play ? await sound.playAsync() : null;
    }
    async function playEndSound(play = true) {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sound/end.mp3')
        );
        play ? await sound.playAsync() : null;
    }
    useEffect(() => {
        playCountSound(false);
        playEndSound(false);
    })

    // params & context & state
    const { name, tm1, tm2, cq } = route.params;
    const {
        countdownVoiceEnabled,
        screenAwakeEnabled,
        finishVoiceEnabled,
    } = useContext(Context);
    const [timerStarted, setTimerStarted] = useState(false);
    const [isTimer1Playing, setIsTimer1Playing] = useState(false);
    const [isTimer2Playing, setIsTimer2Playing] = useState(false);
    const [cycleLeft, setCycleLeft] = useState(cq);
    const [key, setKey] = useState(0);

    // timer init
    const startTimer = () => {
        setCycleLeft(cq);
        setTimerStarted(true);
        playCountSound(countdownVoiceEnabled);
        setIsTimer1Playing(true);
        COUNTDOWN_TIMER = setInterval(() => {
            playCountSound(countdownVoiceEnabled);
        }, 1000);
        CYCLE_TIMER = setInterval(() => {
            setCycleLeft((cq) => {
                if (cq == 1) {
                    clearInterval(CYCLE_TIMER);
                    clearInterval(COUNTDOWN_TIMER);
                }
                return cq - 1
            });
        }, (tm1 + tm2) * 1000);
        setTimeout(() => {
            setIsTimer2Playing(true);
        }, tm1 * 1000);
    }
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            clearInterval(CYCLE_TIMER);
            clearInterval(COUNTDOWN_TIMER);
        }));

    return (
        <View style={{ display: 'flex', flex: 1 }}>
            <Header title={name}>
                <TouchableOpacity onPress={() => { navigation.navigate('TimerHome') }}>
                    <View style={styles.closeButton}>
                        <Feather name="x" size={24} color={Color().darkRed} />
                    </View>
                </TouchableOpacity>
            </Header>
            <View style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                margin: 15,
                borderRadius: 20
            }}>
                <CountdownCircleTimer
                    isPlaying={isTimer1Playing}
                    duration={tm1}
                    colors={[
                        [Color().darkRed, 0.3],
                        [Color().darkYello, 0.35],
                        [Color().darkGreen, 0.35],
                    ]}
                    onComplete={() => {
                        playEndSound(finishVoiceEnabled);
                        return cycleLeft > 1 ? [true, tm2 * 1000] : [false]
                    }}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
                            {remainingTime}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
                <View style={styles.status}>
                    <View style={styles.statusIcon}>
                        {countdownVoiceEnabled ? <Feather name="volume-2" size={24} color={Color().lightGreen} /> : <Feather name="volume-x" size={24} color={Color().lightRed} />}
                    </View>
                    <View style={styles.statusIcon}>
                        {screenAwakeEnabled ? <Feather name="eye" size={24} color={Color().lightGreen} /> : <Feather name="eye-off" size={24} color={Color().lightRed} />}
                    </View>
                    <View style={styles.statusIcon}>
                        {finishVoiceEnabled ? <Feather name="bell" size={24} color={Color().lightGreen} /> : <Feather name="bell-off" size={24} color={Color().lightRed} />}
                    </View>

                </View>
                <View style={{
                    padding: 5,
                    margin: 5
                }}>
                    <View style={styles.column2Container}>
                        <FontText style={styles.column2ContainerItem}>Cycle Left</FontText>
                        <FontText style={styles.column2ContainerValue}>{cycleLeft}</FontText>
                    </View>
                </View>
                <CountdownCircleTimer
                    isPlaying={isTimer2Playing}
                    duration={tm2}
                    colors={[
                        [Color().darkRed, 0.3],
                        [Color().darkYello, 0.35],
                        [Color().darkGreen, 0.35],
                    ]}
                    onComplete={() => {
                        playEndSound(finishVoiceEnabled);
                        return cycleLeft > 0 ? [true, tm1 * 1000] : false
                    }}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
                            {remainingTime}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
                {
                    timerStarted &&
                    <TouchableOpacity onPress={
                        () => {
                            navigation.pop();
                            navigation.navigate('Timer', { name: name, tm1: tm1, tm2: tm2, cq: cq })
                        }
                    }>
                        <View style={styles.timerButton}>
                            <FontText style={styles.timerButtonText}>Reset</FontText>
                        </View>
                    </TouchableOpacity>
                }{
                    !timerStarted &&
                    <TouchableOpacity onPress={startTimer}>
                        <View style={styles.timerButton}>
                            <FontText style={styles.timerButtonText}>START</FontText>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

function AddTimer({ navigation }) {

    // context & state
    var { addTimer, timerList } = useContext(Context)
    const [timerName, setTimerName] = useState('');
    const [timer1, setTimer1] = useState('');
    const [timer2, setTimer2] = useState('');
    const [cycleTimes, setCycleTimes] = useState('');
    const [showTimerAlert, setShowTimerAlert] = useState(false);
    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showNameExistAlert, setShowNameExistAlert] = useState(false);

    // validate timer
    const validTimer = (second, set) => {
        while (second[0] == '0') second = second.slice(1);
        set(second.replace(/[^0-9]/g, ''));
    }
    const confirmAddTimer = () => {
        if (timerName && timer1 && timer2 && cycleTimes) {
            addTimer({ name: timerName, tm1: timer1, tm2: timer2, cq: cycleTimes });
            navigation.navigate('TimerHome');
        } else if (!timerName) {
            setShowNameAlert(true);
        } else if (timerList.findIndex((e) => e.name == timerName) != -1) {
            setShowNameExistAlert(true);
        } else {
            setShowTimerAlert(true);
        }
    }

    return (
        <KeyboardDismiss style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={""}>
                <Header title='New Timer'>
                    <TouchableOpacity onPress={() => { navigation.navigate('TimerHome') }}>
                        <View style={styles.closeButton}>
                            <Feather name="x" size={24} color={Color().darkRed} />
                        </View>
                    </TouchableOpacity>
                </Header>
                <ScrollView style={{ display: 'flex', flex: 1, paddingTop: 20 }}>
                    <View style={styles.setting}>
                        <FontText style={styles.settingText}>Name</FontText>
                        <TextInput
                            style={styles.settingEntry}
                            placeholder="Excercise Name (max length 8)"
                            value={timerName}
                            maxLength={8}
                            onChangeText={(value) => setTimerName(value)}
                        />
                    </View>
                    <View style={styles.setting}>
                        <FontText style={styles.settingText}>Timer1</FontText>
                        <TextInput
                            style={styles.settingEntry}
                            placeholder="Duration in Seconds (max 999)"
                            keyboardType="numeric"
                            value={timer1}
                            maxLength={3}
                            onChangeText={(value) => validTimer(value, setTimer1)}
                        />
                    </View>
                    <View style={styles.setting}>
                        <FontText style={styles.settingText}>Timer2</FontText>
                        <TextInput
                            style={styles.settingEntry}
                            placeholder="Duration in Seconds (max 999)"
                            keyboardType="numeric"
                            value={timer2}
                            maxLength={3}
                            onChangeText={(value) => validTimer(value, setTimer2)}
                        />
                    </View>
                    <View style={styles.setting}>
                        <FontText style={styles.settingText}>Cycle</FontText>
                        <TextInput
                            style={styles.settingEntry}
                            placeholder="How many cycles (max 99)"
                            keyboardType="numeric"
                            value={cycleTimes}
                            maxLength={2}
                            onChangeText={(value) => validTimer(value, setCycleTimes)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={confirmAddTimer}>
                            <View style={styles.settingButton}>
                                <FontText style={styles.settingButtonText}>CONFIRM</FontText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <AwesomeAlert
                    show={showNameAlert}
                    title="No Name"
                    message="QAQ Please give me a name >_< !"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="(ー_ー)"
                    onConfirmPressed={() => {
                        setShowNameAlert(false);
                    }}
                    confirmButtonColor={Color().mediumRed}
                    titleStyle={{ fontFamily: 'zhuzi', fontSize: 25, textAlign: 'center' }}
                    messageStyle={{ fontSize: 16 }}
                />
                <AwesomeAlert
                    show={showNameExistAlert}
                    title="Name Already Exist"
                    message="QAQ Please give me another name >_< !"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="(ー_ー)"
                    onConfirmPressed={() => {
                        setShowNameExistAlert(false);
                    }}
                    confirmButtonColor={Color().mediumRed}
                    titleStyle={{ fontFamily: 'zhuzi', fontSize: 25, textAlign: 'center' }}
                    messageStyle={{ fontSize: 16 }}
                />
                <AwesomeAlert
                    show={showTimerAlert}
                    title="Invalid Timer"
                    message="QAQ I cannot have 0 second timer or 0 cycle >_< !"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="(ー_ー)"
                    onConfirmPressed={() => {
                        setShowTimerAlert(false);
                    }}
                    confirmButtonColor={Color().mediumRed}
                    titleStyle={{ fontFamily: 'zhuzi', fontSize: 25, textAlign: 'center' }}
                    messageStyle={{ fontSize: 16 }}
                />
            </KeyboardAvoidingView>
        </KeyboardDismiss >
    );
}

function TimerScreen({ navigation }) {

    // context
    const { timerList,
        deleteTimer } = useContext(Context);

    return (
        <View style={{
            display:'flex',
            flex:1,
        }}>
            <Header title="Timer">
                <TouchableOpacity onPress={() => { navigation.navigate('AddTimer') }}>
                    <View style={styles.addTimerButton}>
                        <Feather name="plus" size={24} color={Color().darkGreen} />
                    </View>
                </TouchableOpacity>
            </Header>
            <ScrollView style={{
                display:'flex'
            }}>
                {
                    timerList.map((e) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Timer', { name: e.name, tm1: parseInt(e.tm1), tm2: parseInt(e.tm2), cq: parseInt(e.cq) })}>
                            <View style={{
                                padding: 10,
                                margin: 10,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                borderColor: 'silver',
                                borderWidth: 1,
                                borderStyle: 'dotted'
                            }}>
                                <FontText style={{
                                    fontSize: 20,
                                    padding: 5,
                                }}>{e.name}</FontText>
                                <View style={styles.column2Container}>
                                    <FontText style={styles.column2ContainerItem}>Execise 1</FontText>
                                    <FontText style={styles.column2ContainerValue}>{e.tm1}s</FontText>
                                </View>
                                <View style={styles.column2Container}>
                                    <FontText style={styles.column2ContainerItem}>Execise 2</FontText>
                                    <FontText style={styles.column2ContainerValue}>{e.tm2}s</FontText>
                                </View>
                                <View style={styles.column2Container}>
                                    <FontText style={styles.column2ContainerItem}>Cycle</FontText>
                                    <FontText style={styles.column2ContainerValue}>{e.cq}</FontText>
                                </View>

                                <View style={{
                                    position: 'absolute',
                                    alignSelf: 'flex-end',
                                    paddingRight: 5,
                                    marginTop: 5,
                                    opacity: .6
                                }}>
                                    <TouchableOpacity onPress={() => deleteTimer(e.name)}>
                                        <View style={{
                                            padding: 5,
                                            paddingRight: 10,
                                        }}>
                                            <Feather name="delete" size={28} color={Color().darkRed} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </View>
    );
}

export default function TimerUI() {
    return (
        <TimerStack.Navigator>
            <TimerStack.Screen
                name="TimerHome"
                component={TimerScreen}
                options={{
                    headerShown: false
                }}
            />
            <TimerStack.Screen
                name="AddTimer"
                component={AddTimer}
                options={{
                    headerShown: false,
                }}
            />
            <TimerStack.Screen
                name="Timer"
                component={Timer}
                options={{
                    headerShown: false,
                }}
            />
        </TimerStack.Navigator>
    );
}

const styles = StyleSheet.create({
    status: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        top: 0,
        position: "absolute"
    },
    statusIcon: {
        margin: 10
    },
    addTimerButton: {
        backgroundColor: Color().lightGreen,
        padding: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Color().darkGreen,
        marginRight: 15,
    },
    closeButton: {
        backgroundColor: Color().lightRed,
        padding: 2,
        borderRadius: 10,
        borderColor: Color().darkRed,
        borderWidth: 1,
        marginRight: 15,
    },
    setting: {
        flex: 1,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        backgroundColor: "#fefefe"
    },
    settingText: {
        fontSize: 20,
        flex: 1
    },
    settingEntry: {
        flex: 1,
        fontSize: 15,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontFamily: 'zhuzi',
    },
    settingButton: {
        margin: 10,
        borderRadius: 3,
        borderColor: Color().darkGreen,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 2,
        backgroundColor: Color().lightGreen,
    },
    settingButtonText: {
        textAlign: 'center',
        color: Color().darkGreen,
        fontSize: 20
    },
    column2Container: {
        alignContent: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    column2ContainerItem: {
        minWidth: 100,
        padding: 5,
        paddingBottom: 1,
        margin: 5,
        borderColor: 'silver',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        textAlign: 'center',
        backgroundColor: 'silver',
        color: 'white',
    },
    column2ContainerValue: {
        padding: 5,
        paddingBottom: 1,
        margin: 5,
        marginLeft: -13,
        paddingLeft: 8,
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 80,
        textAlign: 'center',
    },
    timerButton: {
        minWidth: 200,
        margin: 10,
        marginTop: 20,
        borderRadius: 3,
        borderColor: 'grey',
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 2,
        backgroundColor: '#fcfcfc',
    },
    timerButtonText: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20
    }


});