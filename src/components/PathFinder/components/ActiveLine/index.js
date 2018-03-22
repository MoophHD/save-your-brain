import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Svg, Line } from 'react-native-svg'
import PropTypes from 'prop-types';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'config/metrics';

class ActiveLine extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            target: new Animated.ValueXY()
        }
    }
    
    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        const { anchor, target } = this.props;
        return(
            <Svg style={{position: 'absolute'}} height={DEVICE_HEIGHT} width={DEVICE_WIDTH}>
                <Line 
                    x1={anchor.x}
                    y1={anchor.y}
                    x2={target.x}
                    y2={target.y}
                    strokeWidth={2}
                    stroke={'black'}
                    />
            </Svg>
        )
    }
}

ActiveLine.propTypes = {
    target: PropTypes.object
}

export default ActiveLine;