import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';

let xOffset = 0;

const LineBody = styled(View)`
    background-color: ${pr => pr.fill};
    height: ${pr  => pr.width}px;
    width: ${pr => pr.length}px;
    top: ${pr => pr.y1 > pr.y2 ? pr.y2 : pr.y1 + (Math.abs(pr.dy) - pr.width) * 0.5}px;
    left: ${pr => pr.x1 > pr.x2 ? pr.x2 : pr.x1 + (Math.abs(pr.dx) - pr.width) * 0.5}px;
    transform: rotate(${pr => pr.angle}deg);
    
`

const Line = (props) => {
    let dx, dy, angle, length, shiftX, shiftY;
    dx = props.x2 - props.x1;
    dy = props.y2 - props.y1;
    angle = Math.atan2(dy, dx) * 180 / Math.PI;
    length = Math.sqrt(dx*dx + dy*dy);
    console.log('angle', angle);
    
    console.log('left', props.x1 > props.x2 ? props.x2 : props.x1)
    return <LineBody 
                shiftX={shiftX}
                shiftY={shiftY}
                length={length} 
                angle={angle} 
                dx={dx} 
                dy={dy} 
                {...props}/>
}

Line.propTypes = {
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number,
    fill: PropTypes.string,
    width: PropTypes.number
}

export default Line;