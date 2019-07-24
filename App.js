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

import { createStackNavigator, NavigationActions,createAppContainer } from 'react-navigation';


import  Detail  from './Detail';


 var deviceWidth = Dimensions.get("window").width/2;
var deviceHeight = Dimensions.get("window").height/2;

var moviesData = [];
var moviesPoster = [];


 
 class App extends Component {


 //Mark: Navigation title.
    static navigationOptions = {
      title: 'Home',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#40407a'
     },
    };


  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }

  componentDidMount() {

     var that = this;

     fetch('https://api.themoviedb.org/3/movie/popular?api_key=fb6254b194ccd973a10aa1cc7589020d&language=en-US&page=1')
    .then((response) => response.json())
    .then((responseJson) => {
      
    moviesData = responseJson['results'];

    that.setState({
      dataSource: moviesData,
    });

    })
    .catch((error) => {
      console.error(error);
    });

     
  }

 onSelected(item){
      this.props.navigation.navigate("Details",{detail:item})
 }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imageThumbnail} source={{ uri: "https://image.tmdb.org/t/p/w370_and_h556_bestv2/"+item.poster_path }} onStartShouldSetResponder={() => this.onSelected(item)}/>
              <Text style={{fontSize: 10}}>{item.title + "\n Rating: "+item.vote_average}</Text>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width:deviceWidth,
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Details: Detail
  },
  {
    initialRouteName: "Home"
  }
);


export default createAppContainer(AppNavigator);



