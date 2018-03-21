import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';

let xOffset = 0;

const LineBody = styled(View)`
    position: absolute;
    background-color: ${pr => pr.fill};
    height: ${pr  => pr.width}px;
    width: ${pr => pr.length}px;
    top: ${pr => pr.shiftY}px;
    left: ${pr => pr.shiftX}px;
    transform: rotate(${pr => pr.angle}deg);
`

const Line = (props) => {
    
    const { x1, y1, x2, y2 } = props;
    
    let dx = x2 - x1;
    let dy = y2 - y1;
    
    let angleRad = Math.atan2(dy, dx);
    let angle = angleRad*180/Math.PI;
    
    let length = Math.sqrt(dx*dx + dy*dy);
    
    let shiftX = (x1 > x2 ? x2 : x1)-(length - Math.abs(Math.cos(angleRad)*length))*0.5;
    let shiftY = (y1 > y2 ? y2 : y1) + Math.abs(dy * 0.5);
    return <LineBody 
                shiftX={shiftX}
                shiftY={shiftY}
                length={length} 
                angle={angle}
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