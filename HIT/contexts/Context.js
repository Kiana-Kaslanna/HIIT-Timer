import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React, { Component, createContext, useEffect, useState } from 'react';

import { dbdel, dbget, dbset, getAllKeys } from '../database/Database';

export const Context = createContext();

export default function ContextProvider(props) {



    // state
    const [countdownVoiceEnabled, setCountdownVoiceEnabled] = useState(props.preLoad.countdownVoiceEnabled || true);
    const [screenAwakeEnabled, setScreenAwakeEnabled] = useState(props.preLoad.screenAwakeEnabled || true);
    const [finishVoiceEnabled, setFinishVoiceEnabled] = useState(props.preLoad.finishVoiceEnabled || true);
    const [timerList, setTimerList] = useState(props.preLoad.timerList || []);
    const [selectedTimer, setSelectedTimer] = useState(props.preLoad.selectedTimer || 0);

    // setters
    const enableCountdownVoice = () => setCountdownVoiceEnabled(enabled => {
        dbset('countdownVoiceEnabled', !enabled);
        return !enabled;
    });
    const enableScreenAwake = () => setScreenAwakeEnabled((enabled) => {
        if (enabled) {
            deactivateKeepAwake();
        } else {
            activateKeepAwake();
        }
        dbset('screenAwakeEnabled', !enabled);
        return !enabled;
    });
    const enableFinishVoice = () => setFinishVoiceEnabled(enabled => {
        dbset('finishVoiceEnabled', !enabled);
        return !enabled;
    });
    const addTimer = (timer) => setTimerList(tL => {
        dbset('timerList', [...tL, timer]);
        return [...tL, timer];
    });
    const deleteTimer = (name) => {
        var result = timerList.filter(e => e.name != name);
        dbset('timerList', result);
        setTimerList(result);
    }
    const selectTimer = (index) => {
        dbset('selectedTimer', index);
        setSelectedTimer(index);
    }

    // reset
    const reset = () => {
        setCountdownVoiceEnabled(true);
        setScreenAwakeEnabled(true);
        setFinishVoiceEnabled(true);
        setTimerList([]);
        setSelectedTimer(0);
    }



    return (
        <Context.Provider value={{
            //
            countdownVoiceEnabled: countdownVoiceEnabled,
            screenAwakeEnabled: screenAwakeEnabled,
            finishVoiceEnabled: finishVoiceEnabled,
            timerList: timerList,
            selectedTimer: selectedTimer,
            //
            setCountdownVoiceEnabled: setCountdownVoiceEnabled,
            setScreenAwakeEnabled: setScreenAwakeEnabled,
            setFinishVoiceEnabled: setFinishVoiceEnabled,
            setTimerList: setTimerList,
            setSelectedTimer: setSelectedTimer,
            //
            enableCountdownVoice: enableCountdownVoice,
            enableScreenAwake: enableScreenAwake,
            enableFinishVoice: enableFinishVoice,
            addTimer: addTimer,
            deleteTimer: deleteTimer,
            selectTimer: selectTimer,
            //
            reset: reset
        }}>
            {props.children}
        </Context.Provider>
    );
}
