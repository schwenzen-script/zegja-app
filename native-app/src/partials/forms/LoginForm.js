import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import * as Font from 'expo-font';

import { InputText } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

// This form is being used to login the user
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            fontsLoaded: false,
        };
    };

    handleChange(event = {}, name) {
        this.props.set(name, event);
    };

    componentDidMount() {
        Font.loadAsync({
            "fontBold": require('../../../assets/fonts/Roboto-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
            <View style={[styles.formContainer]}>
                <View style={[styles.inputContainer, this.props.validationEmail ? (styles.inputContainerError) : (null)]}>
                    <InputText name="email" type="email" placeholder="Uw e-mail" handleChange={this.handleChange} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een e-mailadres?", infoText: "Voer hier een geldig e-mailadres in om u aan te melden. Heb je nog geen account? Maak er dan gerust eentje aan door onderstaande knop te volgen!", buttonTitle: "Maak een account!", buttonRoute: "Register"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/user.png")} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, this.props.validationFull ? (styles.inputContainerError) : (null)]}>
                    <InputText name="password" type="password" placeholder="Uw wachtwoord" handleChange={this.handleChange} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een wachtwoord?", infoText: "Voer hier uw wachtwoord in. Let op voor de hoofdletters en witruimtes! Deze zijn vrij gevoelig. Bent u uw wachtwoord vergeten? No worries, volg onderstaande knop om een nieuwe te maken.", buttonTitle: "Wachtwoord vergeten?", buttonRoute: "ForgetPass"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/password.png")} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={[styles.forgetPassText]} onPress={() => this.props.navigation.navigate("ForgetPass")}>Wachtwoord vergeten?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderColor: "#BCBCBC",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    inputContainerError: {
        borderColor: "#FF6969",
        borderWidth: 2,
    },
    inputImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    forgetPassText: {
        marginLeft: 10,
        color: "#3E3E3E",
        fontSize: 9,
        textDecorationLine: "underline",
        fontFamily: "fontBold",
    }
});