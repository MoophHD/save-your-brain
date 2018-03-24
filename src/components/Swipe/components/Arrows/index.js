import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import PropTypes from 'prop-types';
import { direction, state } from 'config/Swipe';


class Swipe extends Component {
    componentWillReceiveProps(nextProps){
        if (this.props.fakeDir != nextProps.fakeDir) {
            //change dir
        }
        
        if (this.props.result != nextProps.result) {
            //play ani
            
            if (nextProps.result == state.win) {
                
            } else if (nextProps.result == state.lose){
                
            } else {
                
            }
            
        }
    }
    render() {
        return(
            <Animated.View>
                <Text style={{fontSize: 100}}>^</Text>
            </Animated.View>
        )
    }
}


Swipe.propTypes = {
    // enums
    fakeDir: PropTypes.number,
    result: PropTypes.number
}

export default Swipe;