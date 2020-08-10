import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Home from '../../static/icons/home.png';
import User from '../../static/icons/user-brown.png';
import Dates from '../../static/icons/book-brown.png';
import Graph from '../../static/icons/graph-brown.png';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
             <View style={[styles.navBar]}>
                 <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Dashboard")}>
                    <Image style={[styles.navBarItem]} source={Home} />
                 </TouchableWithoutFeedback>
                 <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Dates")}>
                    <Image style={[styles.navBarItem]} source={Dates} />
                 </TouchableWithoutFeedback>
                 <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Graph")}>
                    <Image style={[styles.navBarItem]} source={Graph} />
                 </TouchableWithoutFeedback>
                 <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("User")}>
                    <Image style={[styles.navBarItem]} source={User} />
                 </TouchableWithoutFeedback>
             </View>
        );
    }
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#FFF",
        width: "100%",
        paddingHorizontal: 50,
        paddingVertical: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    navBarItem: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
});