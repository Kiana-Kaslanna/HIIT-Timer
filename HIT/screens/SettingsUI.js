import React, { useContext } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import FontText from "../components/FontText";
import Header from "../components/Header";
import { Context } from '../contexts/Context';
import { dbclearAll } from '../database/Database';
import Color from "../styles/Color";

export default function SettingsUI() {

    // context
    const {
        countdownVoiceEnabled,
        screenAwakeEnabled,
        finishVoiceEnabled,
        enableCountdownVoice,
        enableScreenAwake,
        enableFinishVoice,
        reset
    } = useContext(Context);

    // helper
    const switchText = (enabled) => enabled ? 'On' : 'Off';

    // clear all
    const clearAll = () => {
        dbclearAll();
        reset();
    }

    return (
        <View>
            <Header title="Settings" />
            <View style={styles.container}>
                <FontText style={styles.settingTitle}>General</FontText>
                <View style={styles.setting}>
                    <FontText style={styles.settingText}>Countdown Voice {switchText(countdownVoiceEnabled)}</FontText>
                    <Switch
                        trackColor={{ false: Color().lightRed, true: Color().lightGreen }}
                        thumbColor={countdownVoiceEnabled ? Color().mediumGreen : Color().mediumRed}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={enableCountdownVoice}
                        value={countdownVoiceEnabled}
                    />
                </View>
                <View style={styles.setting}>
                    <FontText style={styles.settingText}>Screen Awake {switchText(screenAwakeEnabled)}</FontText>
                    <Switch
                        trackColor={{ false: Color().lightRed, true: Color().lightGreen }}
                        thumbColor={screenAwakeEnabled ? Color().mediumGreen : Color().mediumRed}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={enableScreenAwake}
                        value={screenAwakeEnabled}
                    />
                </View>
                <View style={styles.setting}>
                    <FontText style={styles.settingText}>Finish Alert {switchText(finishVoiceEnabled)}</FontText>
                    <Switch
                        trackColor={{ false: Color().lightRed, true: Color().lightGreen }}
                        thumbColor={finishVoiceEnabled ? Color().mediumGreen : Color().mediumRed}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={enableFinishVoice}
                        value={finishVoiceEnabled}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <FontText style={styles.settingTitleDanger}>Danger Zone</FontText>
                <View style={styles.setting}>
                    <FontText style={styles.settingTextDanger}>Cache</FontText>
                    <TouchableOpacity onPress={clearAll}>
                        <View>
                            <FontText style={styles.buttonDanger}>Restore</FontText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        display: 'flex',
    },
    setting: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1,
        height: 50,
        paddingLeft: 5,
        paddingRight: 5,
    },
    settingTitle: {
        fontSize: 20,
        paddingBottom: 15,
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1,
    },
    settingTitleDanger: {
        fontSize: 20,
        paddingBottom: 15,
        color: Color().darkRed,
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1,
    },
    settingText: {
        fontSize: 16,
    },
    settingTextDanger: {
        fontSize: 16,
        color: Color().darkRed,
    },
    buttonDanger: {
        color: 'white',
        backgroundColor: Color().darkRed,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    }
});