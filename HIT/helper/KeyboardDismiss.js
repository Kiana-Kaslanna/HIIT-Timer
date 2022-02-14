import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function KeyboardDismiss(props) {
    const hideKeyboard = () => {
        Keyboard.dismiss();
        console.log('Keyboard dismiss');
    }
    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            {props.children}
        </TouchableWithoutFeedback>
    );
}
