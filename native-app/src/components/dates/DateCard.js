import React from 'react';

import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

import { useApi } from '../../services';

import * as Font from 'expo-font';

export function DateCard ({date, id, navigation}) {
    const { getUserDates } = useApi();

    return <DateCardComponent date={date} id={id} navigation={navigation} getUserDates={getUserDates}></DateCardComponent>
};

export default class DateCardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: {
                morning: false,
                noon: false,
                evening: false,
            }, 
            dateCode: `${this.props.date[0]}-${this.props.date[1]}`,
            fontsLoaded: false,
        }

        this.fetchUserDates = this.fetchUserDates.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    };

    async fetchUserDates() {
        const data = await this.props.getUserDates(this.props.id);

        for (let i = 0; i < data.length; i++) {
            let states = {
                "morning": false,
                "noon": false,
                "evening": false,
            };

            if (data[i].dateString === this.state.dateCode) {
                if (data[i].morning.energie.fysiek !== null && data[i].morning.stress.fysiek !== null) {
                    states.morning = true;
                };

                if (data[i].noon.energie.fysiek !== null && data[i].noon.stress.fysiek !== null) {
                    states.noon = true;
                };

                if (data[i].evening.energie.fysiek !== null && data[i].evening.stress.fysiek !== null) {
                    states.evening = true;
                };

                this.setState({data: {morning: states.morning, noon: states.noon, evening: states.evening}});

                return;
            };
        };
    };

    async componentDidMount () {
        await this.fetchUserDates();

        await Font.loadAsync({
            "fontBold": require('../../../assets/fonts/Poppins-Bold.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    async navigateTo() {
        await AsyncStorage.setItem('date', this.state.dateCode);
        this.props.navigation.navigate("Date");
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
            <TouchableOpacity style={[styles.dateCard]} onPress={() => this.navigateTo()}>
                <View>
                    <Text style={[styles.dateCardDate]}>
                        {this.props.date[0]}
                    </Text>
                    <Text style={[styles.dateCardDateTwo]}>
                        {this.props.date[1]}
                    </Text>
                </View>
                <View style={[styles.dateCardBorder]}></View>
                <View>
                    <Text style={[styles.dateCardMomentTitle]}>
                        Momenten
                    </Text>
                    <View style={[styles.dateCardMoments]}>
                        {
                            this.state.date.morning ? (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleGreen]}>
                                    <Text style={[styles.dateCardMomentText]}>O</Text>
                                </View>
                            ) : (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleRed]}>
                                    <Text style={[styles.dateCardMomentText]}>O</Text>
                                </View>                        
                            )
                        }
                        {
                            this.state.date.noon ? (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleGreen]}>
                                    <Text style={[styles.dateCardMomentText]}>M</Text>
                                </View>                            
                            ) : (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleRed]}>
                                    <Text style={[styles.dateCardMomentText]}>M</Text>
                                </View>                            
                            )
                        }
                        {
                            this.state.date.evening ? (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleGreen]}>
                                    <Text style={[styles.dateCardMomentText]}>A</Text>
                                </View>                            
                            ) : (
                                <View style={[styles.dateCardMomentCircle, styles.dateCardMomentCircleRed]}>
                                    <Text style={[styles.dateCardMomentText]}>A</Text>
                                </View>                            
                            )
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    dateCard: {
        borderRadius: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    dateCardDate: {
        textAlign: "center",
        fontSize: 25,
        color: "#8D7B69",
        fontFamily: "fontBold",
    },
    dateCardDateTwo: {
        color: "#F2C752",
        fontFamily: "fontBold",
        textAlign: "center",
        fontSize: 25,
        marginTop: -10,
    },
    dateCardBorder: {
        width: 2,
        height: 60,
        backgroundColor: "#BCBCBC",
        borderRadius: 10,
        marginHorizontal: 20,
    },
    dateCardMomentTitle: {
        fontSize: 12,
        fontFamily: "fontBold",
        marginBottom: 10,
    },
    dateCardMoments: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }, 
    dateCardMomentCircle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: "100%",
        marginRight: 5,
    },
    dateCardMomentText: {
        color: "#FFF",
        fontSize: 12,
        fontFamily: "fontBold",
    },
    dateCardMomentCircleGreen: {
        backgroundColor: "#31D596",
    },
    dateCardMomentCircleRed: {
        backgroundColor: "#FF6969",
    },
});