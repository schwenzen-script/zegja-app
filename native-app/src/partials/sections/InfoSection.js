import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import * as Font from 'expo-font';
import { ShortButton } from '../../components';

export default class InfoSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
        };
    };

    componentDidMount() {
        Font.loadAsync({
            "fontBold": require('../../../assets/fonts/Poppins-Bold.ttf'),
            "fontRegular": require('../../../assets/fonts/Roboto-Regular.ttf'),
        }).then(() => this.setState({fontsLoaded: true}));
    };

    render() {
        if (!this.state.fontsLoaded) {
            return null;
        };

        return (
             <View style={[styles.infoContainer]}>
                 <View>
                     <View style={[styles.infoImageContainer]}>
                        <Image style={[styles.infoImage]} source={require("../../static/icons/question.png")}/>
                     </View>
                    <Text style={[styles.infoTitle]}>{this.props.title}</Text>
                    <Text style={[styles.infoContext]}>{this.props.context}</Text>
                    
                    {
                        this.props.buttonTitle ? (
                            <ShortButton navigation={this.props.navigation} buttonTitle={this.props.buttonTitle} buttonRoute={this.props.buttonRoute} />
                        ) : null
                    }
                 </View>
             </View>
        );
    }
};

const styles = StyleSheet.create({
    infoContainer: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    infoImageContainer: {
        display: "flex",
        alignItems: "center",
    },
    infoImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    infoTitle: {
        fontFamily: "fontBold",
        color: "#3E3E3E",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
    },
    infoContext: {
        fontFamily: "fontRegular",
        color: "#3E3E3E",
        fontSize: 14,
        textAlign: "center",    
    }
});