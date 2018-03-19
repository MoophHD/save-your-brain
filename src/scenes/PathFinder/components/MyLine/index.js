import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Svg, Line } from 'react-native-svg';
import { PanResponder } from 'react-native';

let anchors = [];

class MyLine extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pointsPath: ""
        }
    }
    
    componentWillReceiveProps(newProps) {
        
    }
    
    
    render() {
        const { anchor } = this.props;
        
        return(
            <Svg>
                <Polyline  
                    points="10,10 20,12 30,20 40,60 60,70 95,90"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"/>
            </Svg>
        )
    }
}

MyLine.propTypes = {
    anchor: PropTypes.object
}

export default MyLine;