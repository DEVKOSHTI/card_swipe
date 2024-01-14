import React from 'react';
import { View, Text, StyleSheet,PanResponder,Animated,Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_LIMIT = SCREEN_WIDTH/5;
class Card extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        }
        const position =new Animated.ValueXY
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderMove:(e,gesture)=>{
                position.setValue({x:gesture.dx,y:0})
            },
            onPanResponderRelease:(e,gesture)=>{
                if(gesture.dx>SWIPE_LIMIT){
                    console.log("right")
                    this.swiped('right')
                }else if(gesture.dx<-SWIPE_LIMIT){
                    console.log("left")
                    this.swiped('left')
                }else{
                    this.resetPosition()
                }
            }
        })
        this.position=position
    }
    swiped(direction){
        const x = direction === 'right'? SCREEN_WIDTH*2 : -SCREEN_WIDTH*2
        Animated.timing(this.position,{
            toValue:{x:x,y:0}
        }).start(()=>{
            this.position.setValue({x:0,y:0})
            this.setState({index:this.state.index+1})
        })
    }
    resetPosition(){
        Animated.spring(this.position,{
            toValue:{x:0,y:0}
        }).start()
    }
    MyCardStyle(){
        const rotate =this.position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:["-120deg","0deg","120deg"]
        })
        return {
            ...this.position.getLayout(),
            transform:[{rotate:rotate}],
        }
    }
    rendercard(){
        return this.props.data.map((item,i)=>{
            if(i<this.state.index){
                return null
            }
            if(i===this.state.index){
                return(
                    <Animated.View  
                style={[this.MyCardStyle(),styles.cardStyle,{width:SCREEN_WIDTH-(i*20)}]} 
                {...this.panResponder.panHandlers}
                >
                    {this.props.renderCards(item)}
                </Animated.View>
                )
            }
            return (
                <View style={[styles.cardStyle,{top:10*(i-this.state.index)},{width:SCREEN_WIDTH-(i*20)},{left:9*(i-this.state.index)}]}>
                    {this.props.renderCards(item)}
                </View>
            )
            }).reverse()
    }
    render(){
        return(
            <View>
                {this.rendercard()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cardStyle:{
        position:"absolute"
    },
})

export default Card