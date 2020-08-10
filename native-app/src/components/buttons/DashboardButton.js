import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

// This button can be used within our dashboard
export default class DashboardButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontBoldPoppins": require('../../../assets/fonts/Poppins-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };
        
        return (
            <LinearGradient style={[styles.dashboardButton]} colors={["rgba(82,82,82,1)", "rgba(141,123,105,1)"]}>
                <Image style={[styles.image]} source={this.props.image}/>
                <Text style={[styles.title]}>{this.props.title}</Text>
            </LinearGradient>
        );
    };
};

const styles = StyleSheet.create({
    overlayButton: {
        borderRadius: 10,
        minWidth: "45% !important",
    },
    dashboardButton: {
        padding: 20,
        width: "48%",
        height: 150,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginBottom: 10,
    },
    title: {
        fontFamily: "fontBoldPoppins",
        fontSize: 13,
        color: "#FFF",
    }
});