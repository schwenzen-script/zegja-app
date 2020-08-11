import React from 'react';
import { View, StyleSheet, Text, InteractionManager } from 'react-native';

import { StandardLayout } from '../layouts';
import { Container } from '../partials';
import { TextBox, DateCard } from '../components';

import { useDate, useAuth } from '../services';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Font from 'expo-font';

export function Dates ({navigation}) {
    const { user } = useAuth();
    const { arraySplittedDates, getDates, plusIndex } = useDate();

    return (
        <DatesComponent 
            navigation={navigation}
            user={user}
            arraySplittedDates={arraySplittedDates}
            getDates={getDates}
            plusIndex={plusIndex}
        >
        </DatesComponent>
    )
};

export default class DatesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dates: null,
            index: 4,
            fontsLoaded: false,
        };

        this.shownDates = this.shownDates.bind(this);
    };

    async shownDates () {
        const dates = await this.props.getDates(this.state.index);
        const array_of_dates = await this.props.arraySplittedDates(dates);

        this.setState({dates: array_of_dates});
    };

    async changeIndex (number) {
        this.setState({ index: await this.props.plusIndex(number) });
        await this.shownDates();
    };

    componentDidMount() {
        this.shownDates();

        Font.loadAsync({
            "fontBold": require('../../assets/fonts/Poppins-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
             <StandardLayout navigation={this.props.navigation} authentication={true}>
                <Container>
                    <TextBox 
                        title="Hier vind je een overzicht,"
                        subtitle="aanvullen maar!"
                    />

                    <View style={[styles.datesContainer]}>
                        {
                            this.state.dates && this.state.dates.map((date, index) => {
                                return <DateCard key={index} date={date} id={this.props.user.id} />
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.changeIndex(this.state.index)}>
                        <Text style={[styles.seeMore]}>
                            Toon meer...
                        </Text>
                    </TouchableOpacity>
                </Container>
             </StandardLayout>
        );
    }
};

const styles = StyleSheet.create({
    datesContainer: {
        marginTop: 50,
        marginBottom: 10,
    },
    seeMore: {
        fontFamily: "fontBold",
        fontSize: 12,
        textAlign: "center",
        color: "#FFF",
        textDecorationLine: "underline",
        textDecorationColor: "#FFF",
    }
})