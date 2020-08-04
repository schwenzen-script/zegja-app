import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { InputText } from '../../components';

import * as Font from 'expo-font';

export default class RegisterFinalForm extends React.Component {
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
                <View style={[styles.inputContainer, this.props.validationFull ? (styles.inputContainerError) : (null)]}>
                    <InputText name="username" type="text" placeholder="Uw gebruikersnaam" handleChange={this.handleChange} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {infoTitle: "Een gebruikersnaam?", infoText: "Voer hier een leuke gebruikersnaam toe. Maak hem uniek! Wees origineel!"})}>
                        <Image style={[styles.inputImage]} source={require("../../static/icons/user.png")} />
                    </TouchableOpacity>
                </View>
            </View>        
        );
    }
}

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
});