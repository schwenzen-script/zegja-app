import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MomentButton extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
             <View>
                 <TouchableOpacity 
                    style={[styles.momentButton, this.props.moment === 'ochtend' ? styles.momentButtonUsed : null ]} 
                    onPress={() => this.props.set('ochtend')}
                 >
                     <Text>Ochtend</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                    style={[styles.momentButton, this.props.moment === 'middag' ? styles.momentButtonUsed : null ]} 
                    onPress={() => this.props.set('middag')}
                 >
                     <Text>Middag</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                    style={[styles.momentButton, this.props.moment === 'avond' ? styles.momentButtonUsed : null ]} 
                    onPress={() => this.props.set('avond')}
                 >
                     <Text>Avond</Text>
                 </TouchableOpacity>
             </View>
        );
    }
};

const styles = StyleSheet.create({
    momentButton: {

    },
    momentButtonUsed: {

    },
});