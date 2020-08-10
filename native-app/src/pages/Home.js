import React from 'react';

// Importing layout
import { EmptyLayout } from '../layouts';

// Importing structure
import { Container, LoginForm } from '../partials';

// Importing components
import { Logo, LongButton } from '../components';

// Importing important services
import { useAuth } from '../services';

export function HomeComponent ({navigation}) {
    const { login } = useAuth();

    return <Home login={login} navigation={navigation}></Home>
};

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleStates = this.handleStates.bind(this);

        this.state = {
            email: "",
            password: "",
            validationEmail: false,
            validationFull: false,
        };
    };

    // Handling the login and checking for mistakes
    async handleLogin() {
        var re = /\S+@\S+\.\S+/;
        const emailValidation = re.test(this.state.email);

        if (emailValidation === false && this.state.password.length === 0) {
            this.setState({validationFull: true, validationEmail: true});
            return;
        };

        if (emailValidation === false) {
            this.setState({validationEmail: true});
            return;
        };

        if (this.state.password.length === 0) {
            this.setState({validationFull: true});
            return;
        };

        const checkLogin = await this.props.login(this.state.email, this.state.password);

        if (!checkLogin.id) {
            this.setState({validationFull: true});
            return;
        };

        this.props.navigation.navigate("Dashboard");
    };

    handleStates(name, value) {
        this.setState({[name]: value});
    }; 

    render() {
        return (
            <EmptyLayout navigation={this.props.navigation} authentication={false}>
                <Logo title={"Ola, amigo!"} text={"Blij je terug te zien!"} />
                <Container>
                    <LoginForm navigation={this.props.navigation} set={this.handleStates} validationEmail={this.state.validationEmail} validationFull={this.state.validationFull}/>
                </Container>
                <LongButton submit={this.handleLogin} navigation={this.props.navigation} text={"Betreed de applicatie!"} nav={"Of heb je nog geen account?"} route={"Register"} />
            </EmptyLayout>
        );
    }
};