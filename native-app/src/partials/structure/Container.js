import React from 'react';
import { View, StyleSheet } from 'react-native';

/** This container gives the needed padding to the app */
export default class Container extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
             <View style={[styles.container]}>
                 {this.props.children}
             </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }
});