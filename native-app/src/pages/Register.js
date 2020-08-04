import React from 'react';
import { AsyncStorage } from 'react-native';

import { EmptyLayout } from '../layouts';
import { Logo, LongButton } from '../components';
import { Container, RegisterForm } from '../partials';

import { useApi } from '../services';

export function Register ({navigation}) {
    const { getUserByMail } = useApi();

    return <RegisterComponent checkUser={getUserByMail} navigation={navigation}></RegisterComponent>
};

export class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleStates = this.handleStates.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.storeData = this.storeData.bind(this);

        this.state = {
            email: "",
            password: "",
            passwordRepeat: "",
            privacy: false,
            validationEmail: false,
            validationFull: false,
        };
    };

    handleStates(name, value) {
        this.setState({[name]: value}); 
    };

    async storeData(data) {
        await AsyncStorage.setItem("registerData", JSON.stringify(data));
    };

    async handleRegister() {
        var re = /\S+@\S+\.\S+/;
        const emailValidation = re.test(this.state.email);
        const userValidation = await this.props.checkUser({email: this.state.email});

        if (emailValidation === false && this.state.password.length === 0 && this.state.passwordRepeat.length === 0) {
            this.setState({validationFull: true, validationEmail: true});
            return;
        };

        if (emailValidation === false) {
            this.setState({validationEmail: true});
            return;
        };

        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({validationFull: true});
            return;
        };

        if (this.state.password.length < 7) {
            this.setState({validationFull: true});
            return;        
        };

        if(userValidation) {
            this.setState({validationEmail: true});
            return;    
        };

        if (this.state.privacy === false) {
            return;
        };

        await this.storeData({
            email: this.state.email,
            password: this.state.password,
        });

        this.props.navigation.navigate("RegisterFinal");
    };

    render() {
        return (
             <EmptyLayout navigation={this.props.navigation} authentication={false}>
                <Logo title={"Een nieuweling?"} text={"Kom erbij!"} />
                <Container>
                    <RegisterForm navigation={this.props.navigation} set={this.handleStates} validationEmail={this.state.validationEmail} validationFull={this.state.validationFull} checked={this.state.privacy}/>
                </Container>
                <LongButton submit={this.handleRegister} navigation={this.props.navigation} text={"Finaliseer de registratie!"} nav={"Of heb je al een account?"} route={"Home"} />
             </EmptyLayout>
        );
    }
};