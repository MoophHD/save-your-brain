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
    
    onLose() {
        this.setState(() => ({result: result.lose}))
    }
    
    onWin() {
        this.setState(() => ({result: result.win}))
    }
    
    handleSwipe(gestureName, gestureState) {
        if (!gestureName) return;
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        let realDir = this.state.realDir;
        switch (gestureName) {
          case SWIPE_UP:
            realDir == direction.up ? this.onWin() : this.onLose();
            break;
          case SWIPE_DOWN:
            realDir == direction.down ? this.onWin(): this.onLose();
            break;
          case SWIPE_LEFT:
            realDir == direction.left ? this.onWin(): this.onLose();
            break;
          case SWIPE_RIGHT:
            realDir == direction.right ?this.onWin() :this.onLose();
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


                        
export default Swipe;