import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Arrows from './components/Arrows';
import { direction, state } from 'config/Swipe';
import { objectChance, arrayChance } from 'config/gist'; 
import GestureRecognizer, { swipeDirections } from '../GestureRecognizer';

const MyGestureRecognizer = styled(GestureRecognizer)`
    flex-grow: 1;
    background-color: crimson;
`

class Swipe extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            realDir: -1,
            fakeDir: -1,
            state: state.idle
        }
        
        this.handleSwipe = this.handleSwipe.bind(this);
    }
    
    handleSwipe(gestureName, gestureState) {
        if (!gestureName) return;
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        let realDir = this.state.realDir;
        
        switch (gestureName) {
          case SWIPE_UP:
            this.setState(() => {state: realDir == direction.up ? state.win : state.lose});
            break;
          case SWIPE_DOWN:
            this.setState(() => {state: realDir == direction.down ? state.win : state.lose});
            break;
          case SWIPE_LEFT:
            this.setState(() => {state: realDir == direction.left ? state.win : state.lose});
            break;
          case SWIPE_RIGHT:
            this.setState(() => {state: realDir == direction.right ? state.win : state.lose});
            break;
        }
    }
    
    setNewDirs() {
        let realKey = arrayChance(Object.keys(direction));
        let fakeObj = {...direction};
        delete fakeObj[realKey];
        
        let realDir = direction[realKey];
        let fakeDir = objectChance(fakeObj);
        
        this.setState(() => ({ realDir, fakeDir }))  
    }

    componentDidMount() {
        this.setNewDirs();
    }
    
    render(){
        const { fakeDir, realDir } = this.state;
        
        return(
            <MyGestureRecognizer onSwipe={this.handleSwipe}>
                <Arrows fakeDir={fakeDir} realDir={realDir}/>
            </MyGestureRecognizer>
        )
    }
}

export default Swipe;