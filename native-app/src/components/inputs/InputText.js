import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import * as Font from 'expo-font';

// This is the input being used
export default class InputText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontRegular": require('../../../assets/fonts/Roboto-Regular.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
             <TextInput 
                name={this.props.name}
                style={[styles.inputStyle]} 
                placeholderTextColor="#3E3E3E"
                autoCompleteType={this.props.type} 
                placeholder={this.props.placeholder} 
                secureTextEntry={this.props.type === "password" ? true : false}
                onChangeText={(event) => this.props.handleChange(event, this.props.name)}
            />
        );
    };
};

const styles = StyleSheet.create({
    inputStyle: {
        color: "#3E3E3E",
        fontSize: 12,
        fontFamily: "fontRegular",
        position: "relative",
        zIndex: 1,
    },
});