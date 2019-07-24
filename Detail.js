import React, { Component } from 'react';
//import rect in our project

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var detail = {};
var moviesData = [];
var moviesPoster = [];


export default class Detail extends Component {

 //Mark: Navigation title.
    static navigationOptions = {
    	title: 'Details',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#40407a'
     },
    };


constructor(props) {
    	super(props);
        
        detail = {};
    	detail = this.props.navigation.state.params.detail ;


  }


    componentDidMount() {

     var that = this;

     var movie_Id = detail.id;
     let url = 'https://api.themoviedb.org/3/movie/' + movie_Id + '?' + 'api_key=fb6254b194ccd973a10aa1cc7589020d&language=en-US';

     fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      

    detail = responseJson;
  

    })
    .catch((error) => {
      console.error(error);
    });

     
  }

	render() {
	    return (	

    	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
         <Image style={styles.imageThumbnail} source={{ uri: "https://image.tmdb.org/t/p/w370_and_h556_bestv2/"+detail.poster_path }} />

         <View style={{ position: 'absolute', top: deviceHeight/2, left: 0, right: 0, height: deviceHeight/2, alignItems: 'center', justifyContent: 'center',fontSize: 24,fontWeight: 'bold',fontFamily: 'Cochin',backgroundColor: '#ffffff00' }}>
        <Text>{"Overview \n" + detail.overview + "\n\n RELEASE DATE: " + detail.release_date}</Text>
        </View>

       </View>

	   )
	   
   }    	

}

const styles = StyleSheet.create({
 
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width:deviceWidth,
    borderRadius:10,
  },
});