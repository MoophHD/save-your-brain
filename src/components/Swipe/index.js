import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Arrows from './components/Arrows';
import { direction, result } from 'config/Swipe';
import { objectChance, arrayChance } from 'config/gist'; 
import GestureRecognizer, { swipeDirections } from '../GestureRecognizer';

const MyGestureRecognizer = styled(GestureRecognizer)`
    flex-grow: 1;
`

let dirKeys = Object.keys(direction);
let lastReal = arrayChance(dirKeys);
class Swipe extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            realDir: '',
            fakeDir: '',
            result: ''
        }
        
        this.handleSwipe = this.handleSwipe.bind(this);
    }
    
    handleSwipe(gestureName, gestureState) {
        if (!gestureName) return;
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        let realDir = this.state.realDir;
        switch (gestureName) {
          case SWIPE_UP:
            this.setState(() => ({result: realDir == direction.up ? result.win : result.lose}));
            break;
          case SWIPE_DOWN:
            this.setState(() => ({result: realDir == direction.down ? result.win : result.lose}));
            break;
          case SWIPE_LEFT:
            this.setState(() => ({result: realDir == direction.left ? result.win : result.lose}));
            break;
          case SWIPE_RIGHT:
            this.setState(() => ({result: realDir == direction.right ? result.win : result.lose}));
            break;
        }
        
        this.setNewDirs();
    }
    
    setNewDirs() {
        let variants = [...dirKeys];
        variants.splice(dirKeys.indexOf(lastReal), 1);
        
        let realKey = arrayChance(variants);
        lastReal = realKey;
        
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
        const { fakeDir, realDir, result } = this.state;
        return(
            <MyGestureRecognizer onSwipe={this.handleSwipe}>
                <Arrows result={result} fakeDir={fakeDir} realDir={realDir}/>
            </MyGestureRecognizer>
        )
    }
}


// style={{transform: [{translateX: this.offsetX}, {translateY: this.offsetY}]}}
                        
export default Swipe;