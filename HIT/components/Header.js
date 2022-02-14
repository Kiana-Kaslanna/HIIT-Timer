import React from 'react';
import { StyleSheet, View } from 'react-native';

import FontText from './FontText';

export default function Header(props) {
    return (
        <View style={styles.header}>
            <FontText style={styles.headerTitle}>{props.title || 'Untitled'}</FontText>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height:50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        padding: 5,
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },
    headerTitle: {
        marginTop:5,
        marginLeft: 15,
        opacity: 0.8,
        fontSize: 25,
    }
});
