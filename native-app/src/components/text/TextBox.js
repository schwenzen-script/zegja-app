import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import * as Font from 'expo-font';

export default class TextBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontBold": require('../../../assets/fonts/Poppins-Bold.ttf'),
            "fontLight": require('../../../assets/fonts/Poppins-Regular.ttf')                        
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
             <View style={[styles.textBox]}>
                 <Text style={[styles.title]}>{this.props.title}</Text>
                 <Text style={[styles.subtitle]}>{this.props.subtitle}</Text>
             </View>
        );
    };
};

const styles = StyleSheet.create({
    textBox: {
        marginTop: 60,
        marginLeft: 20,
    },
    title: {
        fontFamily: "fontLight",
        fontSize: 20,
    },
    subtitle: {
        fontFamily: "fontBold",
        fontSize: 20,
    },
});