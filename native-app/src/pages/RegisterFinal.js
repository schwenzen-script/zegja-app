import React from 'react';
import { AsyncStorage } from 'react-native';

import { useAuth } from '../services';

import { EmptyLayout } from '../layouts';
import { GoBack, Logo, LongButton } from '../components';
import { Container, RegisterFinalForm } from '../partials';

export function RegisterFinal ({navigation}) {
    const { register } = useAuth();
    return <RegisterFinalComponent registerUser={register} navigation={navigation}></RegisterFinalComponent>
};

export class RegisterFinalComponent extends React.Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.handleStates = this.handleStates.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            email: "",
            password: "",
            username: "",
            validationFull: false,
        };
    };

    async componentDidMount() {
        const data = await this.getData("registerData");
        this.setState({email: data.email, password: data.password});
    };

    async getData(key) {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data);
    };

    handleStates(name, value) {
        this.setState({[name]: value});
    }; 

    async handleRegister() {
        if (this.state.username.length < 1) {
            this.setState({validationFull: true});
            return;
        };

        const checkRegister = await this.props.registerUser(this.state.email, this.state.password, this.state.username);
        console.log(checkRegister);
        if (!checkRegister.id) {
            this.setState({validationFull: true});
            return;
        };

        this.props.navigation.navigate("RegisterSucces");
    };

    render() {
        return (
             <EmptyLayout navigation={this.props.navigation} authentication={false}>
                 <GoBack navigation={this.props.navigation} />
                 <Logo title={"One more!"} text={"De laaste stap is hier!"} />
                 <Container>
                     <RegisterFinalForm navigation={this.props.navigation} set={this.handleStates} validationEmail={this.state.validationEmail} validationFull={this.state.validationFull} />
                 </Container>
                 <LongButton submit={this.handleRegister} navigation={this.props.navigation} text={"Betreed de applicatie!"} route={"RegisterSucces"} />
             </EmptyLayout>
        );
    };
};