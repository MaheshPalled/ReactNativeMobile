import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['test@gamil.co'],
            subject: 'Contact us:',
            body: 'To whom it may concern:'
        })
    }

    static navigationOptions = {
        title: 'Contact'
    }

    render() {
        //Directly returning a card for the contact component.
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card
                    title='Contact Information'
                    wrapperStyle={{ margin: 20 }}>
                    <View>
                        <Text style={{ marginBottom: 10 }}>
                        1 Nucamp Way
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                        Seattle, WA 98001
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                        U.S.A.
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                        Phone: 1-206-555-1234
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                        Email: campsites@nucamp.co  
                        </Text>
                        <Button
                        title="Send email"
                        buttonStyle={{backgroundColor:"#5637DD",margin: 40}}
                        icon={<Icon 
                                name="envelope-o"
                                type="font-awesome"
                                color="#fff"
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={()=> this.sendMail()}
                        />
                    </View>
                </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact;