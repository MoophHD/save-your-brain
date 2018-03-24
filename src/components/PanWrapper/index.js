import React, { PureComponent } from 'react';
import { View, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import Vector from '../Vector';
import styled from 'styled-components';

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
`

let xyMinSum;
let lastDeltas = 0;
class PanWrapper extends PureComponent {
    componentWillMount() {
    const { onMove, onTap, onRelease, moveDelta } = this.props;
    
    if (moveDelta) xyMinSum = ~~Math.sqrt(moveDelta * moveDelta / 2);
    
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if (!onTap) return;
        
        onTap( new Vector(evt.nativeEvent.pageX, evt.nativeEvent.pageY) );
      },
      onPanResponderMove: (evt, gestureState) => {
        
        if (!onMove) return;
        
        
        if (moveDelta) {
          let thisDelta = gestureState.dx + gestureState.dy;
          
          if ( lastDeltas+=thisDelta < xyMinSum ) {
            return;
          } else {
            lastDeltas = 0;
          }
        }
          
        
        onMove( new Vector(evt.nativeEvent.pageX, evt.nativeEvent.pageY) );
        
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (!onRelease) return;
        
        onRelease();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }
  
  
  
    render() {
        const { children } = this.props;
        
      
        return(
             <Wrapper 
                {...this._panResponder.panHandlers}>
                
                {children}
              
              </Wrapper>
        )
    }
}
    
PanWrapper.propTypes = {
    onMove: PropTypes.func,
    onTap: PropTypes.func
}

export default PanWrapper;