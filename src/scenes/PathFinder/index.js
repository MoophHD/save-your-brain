import React, { Component } from 'react';
import { Container } from 'native-base';
import styled from 'styled-components';
import Background from 'components/Background';
import Dot from './components/Dot';
import PanWrapper from 'components/PanWrapper';
import { dotSide } from 'config/PathFinder';

const dotState = {
    lose: 'lose',
    win: 'win',
    idle: 'idle',
    demo: 'demo'
}

let dots = 3;
const dotRadius = dotSide * 0.5;
const dotRadiusSqr = dotRadius * dotRadius;
let lastOrder = -1;

class PathFinder extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isDemo: true,
            ids: [],
            byid: {}
        }
        
        this.handleMove = this.handleMove.bind(this);
    }
    
    handleMove(pos) {
        const { ids, byid } = this.state;
        
        //check colission
        for(let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let dot = byid[id];
            
            if (dot.state == "win" || dot.state == "lose") continue;
            let distX = pos.x - (dot.x + dotRadius);
            let distY = pos.y - (dot.y + dotRadius);
            let distSqr = distX*distX + distY*distY;
            
            //colission
            if (distSqr < dotRadiusSqr) {
                //next in order
                if (dot.order - lastOrder == 1) {
                    lastOrder = dot.order;
                    
                    console.log('win');
                    //win
                    this.setState(() => ({
                        byid: {...byid, [id]: {...byid[id], state: dotState.win}}
                    }))
                } else {
                    console.log("lose");
                    //lose
                    this.setState(() => ({
                        byid: {...byid, [id]: {...byid[id], state: dotState.lose}}
                    }))
                }
                
                break;
            }
            
        }
    }
    
    handleTap(pos) {
        console.log("pos");
    }
    
    clearLine() {
        
    }
    
    gen() {
        lastOrder = -1;
        // array of nums [0.. dots - 1];
        let ids = Array.apply(null, {length: dots}).map(Function.call, Number);
        let byid = {};
        
        let tempX = 0;
        let tempY = 0;
        let delta = 100;
        ids.forEach((id, i) => {
            byid[id] = {};
            byid[id].x = tempX;
            byid[id].y = tempY;
            byid[id].order = i;
            byid[id].state = dotState.idle;
            
            tempX += delta;
            tempY += delta;
        })
        
        this.setState(() => ({byid, ids}));
    }
    
    componentDidMount() {
        this.gen();
    }
    
    render() {
        const { ids, byid } = this.state;
        
        let self;
        let dots = ids.map((id) => {
            self = byid[id];
            
            return <Dot
                state={self.state}
                key={`_dot${id}`} 
                x={self.x} 
                y={self.y} />
        });
        return(
            <Container>
                <PanWrapper onMove={this.handleMove}>
                    <Background />
                    {dots}
                </PanWrapper>
            </Container>
        )
    }
}

export default PathFinder;