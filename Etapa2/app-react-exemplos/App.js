import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
} from 'react-native';

import List from './components/List';

export default function App() {

    return (
        <View style={styles.container}>
            <List />
            <View style={styles.redBox} />
            <View style={styles.bluebox} />
            <View style={styles.blackbox} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 600,
        marginTop: 150,
    },
    redBox: {
        width: 100,
        height: 100,
        backgroundColor: 'lightcoral',
    },
    bluebox: {
        width: 100,
        height: 100,
        backgroundColor: 'lightblue',
    },
    blackbox: {
        width: 100,
        height: 100,
        backgroundColor: 'lightslategrey',
    },
});

// onPress = OnClick