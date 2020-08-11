import React from 'react';
import { View, StyleSheet } from 'react-native';

// Importing layout
import { StandardLayout } from '../layouts';

// Importing structure
import { Container } from '../partials';

// Importing components
import { Logo, TextBox, DashboardButton } from '../components';

// Importing services
import { useAuth } from '../services';

// Images
import Graph from '../static/icons/graph.png';
import Book from '../static/icons/book.png';

export function Dashboard ({navigation}) {
    const { user } = useAuth();

    return <DashboardComponent user={user} navigation={navigation}></DashboardComponent>
};

export class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        };
    };

    componentDidMount() {
        this.setState({username: this.props.user.username});
    };
    
    render() {
        return (
            <StandardLayout navigation={this.props.navigation} authentication={false}>
                <Container>
                    <Logo />
                    <TextBox 
                        title="Welkom terug,"
                        subtitle={this.state.username}
                    />
                </Container>
                <Container>
                    <View style={[styles.buttonsContainer]}>
                        <DashboardButton 
                            image={Graph} 
                            title="Bekijk hier jouw grafieken!" 
                            route="Graph"
                            navigation={this.props.navigation}
                        />
                        <DashboardButton 
                            image={Book}
                            title="Bekijk hier jouw dagboek!"
                            route="Dates"
                            navigation={this.props.navigation}
                        />
                    </View>
                </Container>
                <Container>

                </Container>
            </StandardLayout>
        );
    }
};

const styles = StyleSheet.create({
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 100,
    }
});