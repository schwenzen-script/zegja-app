import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

import * as Font from 'expo-font';

import { EmptyLayout } from '../layouts';
import { Container } from '../partials';
import { LongButton } from '../components';

export function RegisterSucces ({navigation}) {
    return <RegisterSuccesComponent navigation={navigation}></RegisterSuccesComponent>
};

export class RegisterSuccesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontRegular": require('../../assets/fonts/Roboto-Regular.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    handleSubmit() {
        this.props.navigation.navigate("Dashboard");
    };

    render() {
        return (
             <EmptyLayout navigation={this.props.navigation} authentication={true}>
                 <View style={[styles.iconContainer]}>
                    <Image style={[styles.icon]} source={require("../static/icons/smile.png")} />
                 </View>
                 <Container>
                     <Text style={[styles.succesText]}>Voila, we zijn er! Je kan u nu naar het dashboard begeven!</Text>
                 </Container>
                 <LongButton submit={this.handleSubmit} navigation={this.props.navigation} text={"Ga naar het dashboard!"} route={"Dashboard"} />
             </EmptyLayout>
        );
    };
};

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    succesText: {
        textAlign: "center",
        color: "#3E3E3E",
        fontSize: 15,
    },
});