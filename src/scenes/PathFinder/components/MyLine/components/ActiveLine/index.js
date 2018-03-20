import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import PropTypes from 'prop-types';
import PanWrapper from 'components/PanWrapper';

function extractPolyPoints(polyPoints) {
    return polyPoints.replace(/[^e]-/, ' -').split(/(?:\s+|\s*,\s*)/g).join(' ');
}

class ActiveLine extends Component {
    render() {
        const { anchor, target } = this.props;
        
        let {x: anchorX, y: anchorY} = anchor;
        let {x: targetX, y: targetY} = target;
        return (
            
                <Line 
                    x1={anchorX}
                    y1={anchorY}
                    x2={targetX}
                    y2={targetY}
                    stroke="red"
                    strokeWidth="2"/>
        )
    }
}

ActiveLine.propTypes = {
    anchor: PropTypes.object,
    target: PropTypes.object
}

export default ActiveLine;