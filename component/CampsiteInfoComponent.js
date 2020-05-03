import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Button, Modal } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites

    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
};

function RenderCampsite(props) {
    const { campsite } = props;
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{ uri: baseUrl + campsite.image }}>
                <Text style={{ margin: 10 }}>
                    {campsite.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.markFavorite()}
                    >
                    </Icon>
                    <Icon
                        style={styles.cardItem}
                        name={'pencil'}
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    >
                    </Icon>
                </View>

            </Card>
        );
    }
    return <View />;
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10}}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating style={{alignItems:'flex-start',
                paddingVertical:'5%'}}
                startingValue={item.rating} 
                imageSize={10}
                readonly
                />
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    }

    return (
        <Card title="COMMENTS">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id}>
            </FlatList>
        </Card>
    )
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal: false,
            rating:5,
            author:'',
            text:''
        }
    }

    static navigationOptions = {
        title: 'Campsite Information'
    };

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(campsiteId){
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm(){
        this.setState({
            rating:5,
            author:'',
            text:''
        })
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        console.log(JSON.stringify(campsiteId));
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={()=> this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                        showRating
                        startingValue={this.state.rating}
                        imageSize={40}
                        onFinishRating={(value)=>this.setState({rating: value})} 
                        style={{paddingVertical: 10}}
                        />
                        <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle ={{paddingRight:20}}
                        onChangeText={(value)=> this.setState({author:value})}
                        value
                        />

                        <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{paddingRight:20}}
                        onChangeText={(value)=> this.setState({text:value})}
                        value
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                        title='Submit'
                        color='#5637DD'
                        onPress={()=>{
                            this.handleComment(campsiteId);
                            this.resetForm();
                        }}
                        />
                    </View>
                    <View style={{margin: 10}}>
                    <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#808080'
                            title='CANCEL'
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    cardRow :{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        margin:20
    },
    cardItem:{
        flex:1,
        margin:10
    },
    modal:{
        justifyContent:'center',
        margin:20
    }

}
)

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);