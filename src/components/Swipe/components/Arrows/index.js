import React, { Component } from 'react';
import { Animated, Text, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { direction, state } from 'config/Swipe';
import { Image } from 'react-native';
import styled from 'styled-components';
import ArrowTrail from '../ArrowTrail';
import { arrowTrailW } from 'config/Swipe';

const Wrapper = styled(View)`
    flex-grow: 1;
    display: flex;
`

const AniView = styled(Animated.View)`
background-color: crimson;
    position: relative;
`

class Swipe extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            offsetX: new Animated.Value(0),
            offsetY: new Animated.Value(0)
        }
        
        this.offsetX = new Animated.Value(0);
        this.offsetY = new Animated.Value(0);
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.fakeDir != nextProps.fakeDir) {
            //change dir
            this.changeFakeDir(nextProps.fakeDir);
        }
        
        if (this.props.result != nextProps.result) {
            //play ani
            
            if (nextProps.result == state.win) {
                
            } else if (nextProps.result == state.lose){
                
            } else {
                
            }
            
        }
    }
    
    changeFakeDir(dir){
        console.log('changeDor');
      this.offsetX.setValue(0);
      this.offsetY.setValue(0);
      let target, sideSign;
      switch (dir) {
          case direction.up:
              target = this.offsetY;
              sideSign = -1;
              break;
          case direction.down:
               target = this.offsetY;
              sideSign = 1;
              break;
          case direction.left:
               target = this.offsetX;
              sideSign = -1;
              break;
          case direction.right:
              target = this.offsetX;
              sideSign = 1;
              break;
          
          default:
              break;
      }
      
      Animated.timing(
        target,
            {
              toValue: sideSign * arrowTrailW,
              duration: 400000,
              easing: Easing.linear
            }
          )
    }
    
    render() {
        const { fakeDir } = this.props;
        return(
            <Wrapper>
                <AniView>
                    <ArrowTrail />
                </AniView>
            </Wrapper>
        )
    }
}


Swipe.propTypes = {
    // enums
    fakeDir: PropTypes.number,
    result: PropTypes.number
}

export default Swipe;