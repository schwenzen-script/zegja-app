import React from 'react';

import { EmptyLayout } from '../layouts';
import { InfoSection } from '../partials';
import { GoBack } from '../components';

export function Info ({navigation}) {
    return <InfoComponent navigation={navigation} authentication={false}></InfoComponent>
};

export class InfoComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            context: null,
            buttonTitle: null,
            buttonRoute: null,
        };
    };

    componentDidMount() {
        const { infoTitle, infoText, buttonTitle, buttonRoute } = this.props.navigation.state.params;

        if (infoTitle !== undefined) {
            this.setState({title: infoTitle, context: infoText, buttonRoute: buttonRoute, buttonTitle: buttonTitle});
        };
    }

    render() {        
        return (
             <EmptyLayout navigation={this.props.navigation} authentication={false}>
                 <GoBack navigation={this.props.navigation} />
                 {
                     this.state.title ? (<InfoSection title={this.state.title} context={this.state.context} buttonRoute={this.state.buttonRoute} buttonTitle={this.state.buttonTitle} navigation={this.props.navigation} />) : null
                 }
             </EmptyLayout>
        );
    }
};