import React, { Component } from 'react';
import { Animated, Text, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { direction, result } from 'config/Swipe';
import { Image } from 'react-native';
import styled from 'styled-components';
import ArrowTrail from '../ArrowTrail';
import { arrowTrailW } from 'config/Swipe';

const Wrapper = styled(View)`
    flex-grow: 1;
    display: flex;
`

const AniView = styled(Animated.View)`
    position: relative;
    flex-grow: 1;
`

class Swipe extends Component {
    constructor(props) {
        super(props);
        
        this.offsetX = new Animated.Value(0);
        this.offsetY = new Animated.Value(0);
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.fakeDir != nextProps.fakeDir) {
            //change dir
            this.changeFakeDir(nextProps.fakeDir);
        }
        
        //play ani
        if (nextProps.result == result.win) {
            console.log('win')
        } else if (nextProps.result == result.lose){
            console.log('lose')
        }
            
    }
    
    changeFakeDir(dir){
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
              duration: 4000 * 75,
              easing: Easing.linear
            }
          ).start();
    }
    
    render() {
        const { fakeDir, realDir } = this.props;
        
        let angle = getAngle(realDir);
        return(
            <Wrapper>
                <AniView style={{ transform: [ {translateX: this.offsetX}, {translateY: this.offsetY} ] }}>
                    <ArrowTrail angle={angle}/>
                </AniView>
            </Wrapper>
        )
    }
}


Swipe.propTypes = {
    // enums
    realDir: PropTypes.string,
    fakeDir: PropTypes.string,
    result: PropTypes.string
}

export default Swipe;

function getAngle(dir) {
    switch (dir) {
        case direction.up:
            return -90;
        case direction.down:
            return 90;
        case direction.left:
            return 180;
        case direction.right:
            return 0;
        
        default:
          break;
    }
}