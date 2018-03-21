import React, { Component } from 'react';
import { Animated } from 'react-native';
import Line from 'components/Line';

class ActiveLine extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            anchor: {},
            target: {}
        }
    }
    render() {
        return(
            <Line {...this.props}/>
        )
    }
}

export default ActiveLine;