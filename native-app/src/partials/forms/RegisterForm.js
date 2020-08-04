import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Font from 'expo-font';

import { InputText, InputCheck } from '../../components';

// This form is being used to register a user (only e-mail and password, username is next page)
export default class RegisterForm extends React.Component {
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een e-mailadres?", infoText: "Voer hier een geldig e-mailadres in om u aan te melden. Heb je al een account? Log dan gerust in met dit account.", buttonTitle: "Aanmelden", buttonRoute: "Home"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/user.png")} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, this.props.validationFull ? (styles.inputContainerError) : (null)]}>
                    <InputText name="password" type="password" placeholder="Uw wachtwoord" handleChange={this.handleChange} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een wachtwoord?", infoText: "Voer hier uw wachtwoord in. Kies een sterk wachtwoord. Hoe sterker, hoe veiliger!"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/password.png")} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, this.props.validationFull ? (styles.inputContainerError) : (null)]}>
                    <InputText name="passwordRepeat" type="password" placeholder="Herhaal uw wachtwoord" handleChange={this.handleChange} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een wachtwoord?", infoText: "Voer hier uw wachtwoord nogmaals in. Let op dat je hetzelfde wachtwoord invoert!"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/password.png")} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.checkBoxContainer]}>
                    <View style={[styles.checkBoxTextContainer]}>
                        <InputCheck checked={this.props.checked} set={this.props.set} />
                        <Text style={[styles.checkBoxText]}>Ga je akkoord met onze </Text>
                        <TouchableOpacity>
                            <Text style={[styles.checkBoxText, styles.checkBoxTextUnderlined]}>Privacy Policy?</Text>
                        </TouchableOpacity>
                    </View>
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
    checkBoxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    checkBoxTextContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    checkBoxText: {
        color: "#3E3E3E",
        fontSize: 10,
        fontFamily: "fontBold",
        marginTop: 5,
    },
    checkBoxTextUnderlined: {
        textDecorationLine: "underline",
    }
});