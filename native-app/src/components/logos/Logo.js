import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import * as Font from 'expo-font';
import { FadeIn } from '../../animations';

// This contains the logo of the app
export default class Logo extends React.Component {
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
            <FadeIn>
                <View style={[styles.logoContainer]}>
                    <View>
                        <Image
                            source={require("../../static/images/logo.png")}
                            style={[styles.logo]}
                        />
                    </View>
        
                    {
                        this.props.title ? (
                            <Text style={[styles.logoTitle]}>{this.props.title}</Text>
                        ) : null
                    }
            
                    {
                        this.props.text ? (
                            <Text style={[styles.logoText]}>{this.props.text}</Text>
                        ) : null
                    }
                </View>
            </FadeIn>
        );
    };
};

const styles = StyleSheet.create({
    logoContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    logo: {
        width: 60,
        height: 60,
    },
    logoTitle: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 17,
        color: "#8D7B69",
        fontFamily: "fontBold",
    },
    logoText: {
        color: "#3E3E3E",
        fontSize: 13,
        fontFamily: "fontLight"
    },
});
