/** Our standard layout...
 * -----------------------------------------------
 * Used in following pages:
 *  - Dashboard
 */

import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { NavBar } from '../partials';

import { useAuth } from '../services';

import Path from '../static/images/path.svg';

export function StandardLayout({children, navigation, authentication}) {
    const { user } = useAuth();

    return (
        <StandardLayoutComponent navigation={navigation} authentication={authentication} user={user}>
            {children}
        </StandardLayoutComponent>
    )
};

export class StandardLayoutComponent extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        const user = this.props.user;
        
        if (this.props.authentication === false) {
            // If user is logged in, redirect them to the dashboard
            if (user) {
                this.props.navigation.navigate("Dashboard");
            };
        } else {
            // If user isn't logged in, redirect them to start
            if (!user) {
                this.props.navigation.navigate("Home");
            };
        };
    };

    render() {
        return (
             <View style={[styles.standardContainer]}>
                 <ScrollView>
                     <View style={[styles.viewContainer]}>
                        <ImageBackground source={Path} style={[styles.standardStart]} resizeMode="cover" />
                        {this.props.children}
                     </View>
                 </ScrollView>
                 <NavBar navigation={this.props.navigation}/>
             </View>
        );
    }
};

const styles = StyleSheet.create({
    standardContainer: {
        flex: 1,
    },
    viewContainer: {
        paddingHorizontal: 30,
        paddingTop: 120,
        paddingBottom: 30,
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
    },
    standardStart: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        left: 0,
        top: 0,
    },
});