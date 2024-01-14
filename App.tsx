import React from 'react';
import { View, Text,Image, StyleSheet} from 'react-native';
import Card from './components/Card';

const mycard =[
  {id :1,color:"blue"},
  {id :2,color:"green"},
  {id :3,color:"orange"},
  {id :4,color:"yellow"},
  {id :5,color:"red"},
]
const data = [
  { id: 1, image: 'tic_image' },
  { id: 2, image: 'cross_image' },
]

class App extends React.Component{
  renderCard(item){
    return(
      <View style={[styles.card, { backgroundColor: item.color }]}>
        {/* <Text>Hello</Text> */}
      </View>
    )
  }
  render(){
    return(
      <View style={styles.container}>
      <Card
        data={mycard}
        renderCards={this.renderCard}
      />
    </View>
  );
};
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    height: 350,
    marginTop: 80,
    margin: 10,
    borderRadius: 15,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
}
)
export default App;
