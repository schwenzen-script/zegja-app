/** Our empty layout...
 * -----------------------------------------------
 * Used in following pages:
 *  - Login
 *  - Register
 *  - Info
 *  - SuccesRegister
 *  - Forget password
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { useAuth } from '../services';

export function EmptyLayout({children, navigation, authentication}) {
    const { user } = useAuth();

    return (
        <EmptyLayoutComponent navigation={navigation} authentication={authentication} user={user}>
            {children}
        </EmptyLayoutComponent>
    )
};

export class EmptyLayoutComponent extends React.Component {
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
             <View style={[styles.emptyContainer]}>
                 {this.props.children}
             </View>
        );
    }
};

const styles = StyleSheet.create({
    emptyContainer: {
        paddingHorizontal: 60,
        paddingTop: 120,
        paddingBottom: 30,
        display: "flex",
        overflow: "hidden",
        justifyContent: "space-between",
        flex: 1,
    },
});