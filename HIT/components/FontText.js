import React from 'react';
import { Text } from 'react-native';

export default function FontText(props) {
    return (
        <Text style={props.style}>
            <Text style={{ fontFamily: 'zhuzi' }}>
                {props.children}
            </Text>
        </Text>
    );
}