import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { StandardLayout } from '../layouts';
import { Container, DateValues, DateText } from '../partials';
import { TextBox, MomentButton, SwitchButton } from '../components';

import { useApi, useAuth } from '../services';

import { dateContent } from '../dateContent';

export function Date ({navigation}) {
    const { showDate, createDate } = useApi();
    const { user } = useAuth();
    return <DateComponent user={user} showDate={showDate} createDate={createDate} navigation={navigation}></DateComponent>
};

export default class DateComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateCode: null,
            dateString: null,
            dateDetails: null,
            currentDate: null,
            currentMoment: 'ochtend',
            currentCat: 'energie',
        };

        this.getSpecificDateData = this.getSpecificDateData.bind(this);
        this.splitDates = this.splitDates.bind(this);
        this.setCat = this.setCat.bind(this);
        this.setMoment = this.setMoment.bind(this);
    };

    async getSpecificDateData() {
        const dateCode = await AsyncStorage.getItem('date');
        const checkDate = await this.props.showDate(dateCode, this.props.user.id);

        if (checkDate.error) {
            const createdDate = await createDate({
                "dateString": dateCode,
                "_userId": this.props.user.id,
            });

            this.setState({dateDetails: createdDate});
            return;
        };

        this.setState({dateDetails: checkDate});
    };

    async splitDates() {
        const dateCode = await AsyncStorage.getItem('date');
        const splitted = dateCode.split("-");

        let month;

        for (let i = 0; i < 12; i++) {
            if (dateContent.months[i].value === splitted[1]) {
                month = dateContent.months[i].month;
            };
        };

        this.setState({currentDate: {day: splitted[0], month: month}});
    };

    setCat(cat) {
        this.setState({currentCat: cat});
    };

    setMoment(moment) {
        this.setState({currentMoment: moment});
    };

    componentDidMount() {
        this.getSpecificDateData();
        this.splitDates();
    };

    render() {
        return (
             <StandardLayout navigation={this.props.navigation} authentication={true}>
                 <Container>
                     <TextBox
                        title={`Dit is ${this.state.currentDate.day} ${this.state.currentDate.month}`}
                        subtitle="aanvullen maar!"                     
                    />

                    <MomentButton
                        moment={this.state.currentMoment}
                        setMoment={this.setMoment}
                    />

                    <DateValues
                        moment={this.state.currentMoment}
                        data={
                            this.state.currentMoment === 'ochtend' ? this.state.dateDetails['morning'] : this.state.currentMoment === 'middag' ? this.state.dateDetails['noon'] : this.state.dateDetails['evening']
                        }
                        categorie={this.state.currentCat}
                    />

                    <DateText
                        moment={this.state.currentMoment}
                        data={
                            this.state.currentMoment === 'ochtend' ? this.state.dateDetails['morning'] : this.state.currentMoment === 'middag' ? this.state.dateDetails['noon'] : this.state.dateDetails['evening']
                        }
                        category={this.state.currentCat}
                    />

                    <SwitchButton
                        category={this.state.currentCat}
                        set={this.setCat}
                    />

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("DateEdit")}>
                        <Text>Bewerk...</Text>
                    </TouchableWithoutFeedback>
                 </Container>
             </StandardLayout>
        );
    }
}; 