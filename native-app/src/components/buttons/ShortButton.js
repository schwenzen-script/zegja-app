import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import * as Font from 'expo-font';

export default class ShortButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };


    componentDidMount() {
        Font.loadAsync({
            "fontBold": require('../../../assets/fonts/Poppins-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        return (
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.buttonRoute)}>
                    <LinearGradient colors={["#8d7b69", "#525252"]} style={[styles.buttonShort]}>
                        <Text style={[styles.buttonText]}>{this.props.buttonTitle}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonShort: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    buttonText: {
        color: "#FFF",
        fontFamily: "fontBold",
        fontSize: 10,
    }
})