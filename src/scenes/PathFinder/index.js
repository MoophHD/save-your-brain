import React, { Component } from 'react';
import { Container } from 'native-base';
import styled from 'styled-components';
import Background from 'components/Background';
import Dot from './components/Dot';
import MyLine from './components/MyLine';
import PanWrapper from 'components/PanWrapper';
import { dotSide } from 'config/PathFinder';
import Vector from 'components/Vector';
import Line from 'components/Line';

let x1 = 0;
let x2 = 100;
let y1 = 50;
let y2 = 100;

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
            byid: {},
            linePath: '',
            target: new Vector(0, 0)
        }
        
        this.handleMove = this.handleMove.bind(this);
    }
    
    handleMove(pos) {
        const { ids, byid, linePath} = this.state;
        
        //check colission
        for(let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let dot = byid[id];
            
            if (dot.state == "win" || dot.state == "lose") continue;
            
            let centerDotX = dot.x + dotRadius;
            let centerDotY = dot.y + dotRadius;
            let distX = pos.x - centerDotX;
            let distY = pos.y - centerDotY;
            let distSqr = distX*distX + distY*distY;
            
            
            this.setState(() => ({target: pos}));
            //colission
            if (distSqr < dotRadiusSqr) {
                //draw line
                let nextLinePath = linePath.slice();
                if (linePath) {
                    nextLinePath += ` ${centerDotX},${centerDotX}`;
                } else {
                    nextLinePath = `${centerDotX},${centerDotX}`;
                }
                
                
                this.setState(() => ({linePath: nextLinePath}));
                //next in order
                if (dot.order - lastOrder == 1) {
                    lastOrder = dot.order;
                    
                    //win
                    this.setState(() => ({
                        byid: {...byid, [id]: {...byid[id], state: dotState.win}}
                    }))
                } else {
                    //lose
                    this.setState(() => ({
                        byid: {...byid, [id]: {...byid[id], state: dotState.lose}}
                    }))
                }
                
                break;
            }
            
        }
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
        const { ids, byid, linePath, target } = this.state;
        
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
            
            <Container style={{position: 'absolute', backgroundColor: 'crimson', height:'100%', width: '100%'}}>
                <Line x1={x1} x2={x2} y1={y1} y2={y2} width={10} fill={'black'}/>
            </Container>
            // <Container>
            //     <PanWrapper
            //         onTap={this.handleMove}
            //         onMove={this.handleMove}>
            //         <Background />
            //         <MyLine 
            //             path={linePath}
            //             target={target}
            //             />
            //         {dots}
            //     </PanWrapper>
            // </Container>
        )
    }
}

export default PathFinder;