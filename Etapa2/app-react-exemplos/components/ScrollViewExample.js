import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

class ScrollViewExample extends Component {
    state = {
        names: [
            {'name': 'Kenji', 'id': 1},
            {'name': 'Juliette', 'id': 2},
            {'name': 'Aaron', 'id': 3},
            {'name': 'Adam', 'id': 4},
            {'name': 'Haider', 'id': 5},
            {'name': 'Nazeera', 'id': 6},
            {'name': 'Castle', 'id': 7},
            {'name': 'Sonia', 'id': 8},
            {'name': 'Winston', 'id': 9},
            {'name': 'Brendan', 'id': 10},
            {'name': 'James', 'id': 11},
            {'name': 'Sara', 'id': 12} 
        ]
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View
                                key={item.id}
                                style={styles.item}
                            >
                                <Image source={require('../assets/favicon.png')} />
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#B03060',
        borderWidth: 1,
        backgroundColor: 'lavenderblush',
    },
    text: {
        fontFamily: 'cursive',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ScrollViewExample;