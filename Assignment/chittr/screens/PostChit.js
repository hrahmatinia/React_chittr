import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    Image
} from 'react-native';
import { gray } from 'color-name';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take picture use your camera',
    chooseFromLibraryButtonTitle: 'choose a picture from your phone',
   
    
  };
class PostChits extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chit_id: 0,
            timestamp: 0,
            chit_content: "",
            longitude: 0,
            latitude: 0,
            user_id: 0,
            given_name: "",
            family_name: "s",
            email: "",
            token: '',
            id: '',
            value: '',
            avatarSource: null,
            retrivedDraft:''
        }
        this.postChit = this.postChit.bind(this);
        this.GetUserDetails();
        this.postChit = this.postChit.bind(this);
        
    }

    //get the user data with an async method .these details have been set in Login page and profilescreen with another async method
    GetUserDetails = async () => {
        try {
            const userID = await AsyncStorage.getItem('id', (error, item) => console.log('profileid:' + item));
            const id = JSON.parse(userID);
            this.setState({
                userId: id
            })

            const usertoken = await AsyncStorage.getItem('userToken', (error, item) => console.log('profiletoken:' + item));
            const userToken = JSON.parse(usertoken);
            this.setState({
                token: userToken
            })
            const userGivenName = await AsyncStorage.getItem('userGivenName', (error, item) => console.log('profileGivenName:' + item));
            const GivenName = JSON.parse(userGivenName);
            this.setState({
                given_name: GivenName
            })

            const userFamilyName = await AsyncStorage.getItem('userFamilyName', (error, item) => console.log('profileFamilyName:' + item));
            const FamilyName = JSON.parse(userFamilyName);
            this.setState({
                family_name: FamilyName
            })
            const userEmail = await AsyncStorage.getItem('userEmail', (error, item) => console.log('profileEmail:' + item));
            const Email = JSON.parse(userEmail);
            this.setState({
                email: Email
            })



        } catch (error) {
            console.log(error);

        }
    }

//upload Image
    UploadImage =() =>{
    
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    //postchit method.is responsible for posting chitts,using the url and api
    postChit = () => {
        console.log('UP Top Postchit print:' + this.state.token);
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                    chit_id: this.state.chit_id,
                    timestamp: this.state.timestamp,
                    chit_content: this.state.chit_content,
                   
                    location: {
                        longitude: this.state.longitude,
                        latitude: this.state.latitude
                    },
                    user: {
                        user_id: this.state.user_id,
                        given_name: this.state.given_name,
                        family_name: this.state.family_name,
                        email: this.state.email,
                    }

                })
            })
            //if response is 201 then it means the chit has been posted
            .then((response) => {
                this.PostChitImage();
                Alert.alert("Congratulation! You Just Chitted!" + this.state.date + this.state.given_name + this.state.family_name + this.state.email + this.state.chit_content);
                console.log('Response:   ' + response.status);
                if (response.status == 201) {
                    console.log("chit Posted: " + this.state.chit_content + response.status);
                    this.setState({ timestamp: this.state.date });
                    console.log("time: " + this.state.timestamp);
                    this.saveTime();
                    
                    this.props.navigation.navigate('App');
                }
                else {
                    console.log("Unauthorised User.you can not post a chit");
                }


            })
            .catch((error) => {
                console.error(error);
            });

    }


    //Post a chit Photo
    PostChitImage(chitID){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+chitID +'photo',
            {
                method: 'POST',
                headers: {
                    
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify({
                 avatarSource: this.state.avatarSource,
                })
            })
            .then((response) => {
                if(response.status === 200){
                    console.log(response)
                    return true;
                }else if(response.status === 404){
                    console.log("image not found")
                  return false;
                }
              
            })
            .catch((error) => {
                console.log(error);
            });

    }
    //save the current time
    saveTime = async () => {
        try {
            await AsyncStorage.setItem('timeStamp', JSON.stringify(this.state.timestamp));

            console.log('this is the time and date of the chit:' + this.state.timestamp);
        } catch (error) {
            console.log(error);

        }
    }

    //saveDraft
    saveDraft = async () =>{
        try {
            await AsyncStorage.setItem('chitDraft', JSON.stringify(this.state.chit_content));

            console.log('this is the chit_content saved in the chit:' + this.state.chit_content);
            this.props.navigation.navigate('App');
        } catch (error) {
            console.log(error);

        }
    }

    //calltheDraft
    Draft = async () =>{
        const Draft = await AsyncStorage.getItem('chitDraft', (error, item) => console.log('retrived draft:' + item));
        const retrivedD = JSON.parse(Draft);
        this.setState({
            chit_content: retrivedD,
            
        })
        console.log('retrived draft:' + this.state.chit_content)
    }
    //It is called once in the component life cycle and it signals that the component and all its sub-components have rendered properly. This is the best place to make API calls since, at this point, the component has been mounted and is available to the DOM
    componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
           
            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
       
    }
    render() {
        return (
            <View style= { styles.container } >
            <View style={ styles.headerContainer }>
                <Text style={ styles.header }> Dont't cheat! Chitt </Text>

                    < /View>
                    < View style = { styles.inputContainer } >
                        <TextInput name='Chit-_content' onChangeText = {(text) => this.setState({ chit_content: text })
    }
    value = { this.state.chit_content } style = { styles.textinput } placeholderTextColor = "white" placeholder = 'Start typing here...'
    underlineColorAndroid = { 'transparent'}
    multiline = { true}

    editable = { true}
    maxLength = { 141}
    height = { 180}
        />
        </View>

        < Text style = {{
    fontSize: 15,
        color: 'lightgrey',
            textAlign: 'right'
}}>

    Characters Left: { this.state.chit_content.length } /141

        < /Text>
        < View style = { styles.buttonContainer } >
            <TouchableOpacity style={ styles.chitButon } onPress = { this.postChit } >
                <Text style={ styles.addButonText }> CHITT < /Text>
                    < /TouchableOpacity>
                    < TouchableOpacity style = { styles.cancelButon }  onPress = {this.saveDraft} >
                        <Text style={ styles.addButonText }> Cancel < /Text>
                            < /TouchableOpacity>

                            <TouchableOpacity style={ styles.photoButon } onPress = { this.UploadImage } >
                            <Text style={ styles.addButonText }> UploadPhoto < /Text>
                                < /TouchableOpacity>

                                <TouchableOpacity style={ styles.draftButon } onPress = { this.saveDraft } >
                            <Text style={ styles.addButonText }> SaveDraft < /Text>
                                < /TouchableOpacity>
                                <TouchableOpacity style={ styles.retriveBraftButon } onPress = { this.Draft } >
                                <Text style={ styles.addButonText }> Retrive Draft < /Text>
                                    < /TouchableOpacity>
                                <Image source={this.state.avatarSource}
                                style={{width:200,height:200,margin:10, marginTop:150 }}/>
                            < /View>
                            < /View>
        );
    }
}

//stylesheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    },
    header: {
        fontSize: 20,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        top: 10,
        alignSelf: "center",
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 0,
        color: '#000',
        borderBottomColor: '#1a1a1a',
        borderBottomWidth: 1,
        paddingLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,

    },
    chitButon: {
        position: 'absolute',
        zIndex: 11,
        top: 20,
        right: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 60,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    cancelButon: {
        position: 'absolute',
        zIndex: 11,
        top: 20,
        left: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 60,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    photoButon: {
        position: 'absolute',
        zIndex: 11,
        top: 20,
        right: 120,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 90,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    draftButon: {
        position: 'absolute',
        zIndex: 11,
        top: 80,
        right: 150,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 80,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    retriveBraftButon:{
        position: 'absolute',
        zIndex: 11,
        top: 80,
        right: 20,
        bottom: 50,
        backgroundColor: '#3F65CD',
        width: 100,
        height: 30,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButonText: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textinput: {
        backgroundColor: 'white',
    }
});
export default PostChits;