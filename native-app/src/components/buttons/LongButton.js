import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

import { Container } from '../../partials';

// This button can be used to submit a form or handle some other functions
export default class LongButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontBoldPoppins": require('../../../assets/fonts/Poppins-Bold.ttf'),
            "fontBoldRoboto": require('../../../assets/fonts/Roboto-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };
        
        return (
             <Container>
                 <TouchableOpacity onPress={this.props.submit}>
                    <LinearGradient colors={["#8d7b69", "#525252"]} style={[styles.longButton]}>
                        <Text style={[styles.longButtonText]}>
                            {this.props.text}
                        </Text>
                    </LinearGradient>
                 </TouchableOpacity>

                 {
                     this.props.nav ? (
                         <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.route)}>
                            <Text style={[styles.navText]}>{this.props.nav}</Text>
                         </TouchableOpacity>
                     ) : null
                 }
             </Container>
        );
    };
};

const styles = StyleSheet.create({
    longButton: {
        width: "100%",
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
    longButtonText: {
        color: "#FFF",
        textAlign: "center",
        paddingVertical: 10,
        fontSize: 11,
        fontFamily: "fontBoldPoppins",
    },
    navText: {
        color: "#3E3E3E",
        textAlign: "center",
        fontSize: 10,
        textDecorationLine: "underline",
        marginTop: 5,
        fontFamily: "fontBoldRoboto",
    },
});