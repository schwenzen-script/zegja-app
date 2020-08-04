import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class InputCheck extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
             <TouchableOpacity onPress={() => this.props.set("privacy", this.props.checked ? false : true)}>
                 <Icon size={25} style={{marginRight: 10}} color="#BCBCBC" name={this.props.checked ? 'check-box' :'check-box-outline-blank' } />
             </TouchableOpacity>
        );
    };
};