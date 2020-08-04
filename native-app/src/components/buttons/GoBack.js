import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class GoBack extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {        
        return (
            <TouchableOpacity style={[styles.goBack]} onPress={() => this.props.navigation.goBack(null)}>
               <Image style={[styles.goBackImg]} source={require("../../static/icons/goback.png")} />
            </TouchableOpacity>
        );
    };
};

const styles = StyleSheet.create({
    goBack: {
        width: 20,
        height: 20,
        position: "absolute",
        top: 60,
        left: 30,
    },
    goBackImg: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    }
})