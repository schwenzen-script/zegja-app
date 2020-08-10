import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

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
                 <Image style={[styles.navBarItem]} source={Home} />
                 <Image style={[styles.navBarItem]} source={Dates} />
                 <Image style={[styles.navBarItem]} source={Graph} />
                 <Image style={[styles.navBarItem]} source={User} />
             </View>
        );
    }
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#FFF",
        width: "100%",
        position: ""
    },
    navBarItem: {

    },
});