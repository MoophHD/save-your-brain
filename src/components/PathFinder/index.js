import React, { Component } from 'react';
import { Container } from 'native-base';
import styled from 'styled-components';
import { dotSide } from 'config/PathFinder';
import Dot from './components/Dot';
import MyLine from './components/MyLine';
import PanWrapper from '../PanWrapper';
import Vector from '../Vector';
import ActiveLine from './components/ActiveLine';

const MyContainer = styled(Container)`
    position: relative;
`

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
let lastAnchor = {};
let target = new Vector(0, 0);

class PathFinder extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isDemo: true,
            ids: [],
            byid: {},
            linePath: '',
            lastTriggeredDot: -1
        }
        
        this.handleMove = this.handleMove.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }
    
    handleMove(pos) {
        console.log('move');
        const { ids, byid, linePath} = this.state;
        
        if (this.myLine) {
            target = pos;
            this.myLine.setNativeProps({ target });
        }
        
        //heck colission
        
        for(let i = 0; i < ids.length; i++) {
            console.log('loop', i);
            let id = ids[i];
            let dot = byid[id];
            
            if (dot.state == "win" || dot.state == "lose") continue;
            
            let centerDotX = dot.x + dotRadius;
            let centerDotY = dot.y + dotRadius;
            let distX = pos.x - centerDotX;
            let distY = pos.y - centerDotY;
            let distSqr = distX*distX + distY*distY;
            
            //colission
            if (distSqr < dotRadiusSqr) {
                console.log('colission');
                
              
                //draw line
                let nextLinePath = linePath.slice();
                if (linePath) {
                    nextLinePath += ` ${centerDotX},${centerDotX}`;
                } else {
                    nextLinePath = `${centerDotX},${centerDotX}`;
                }
                
                lastAnchor = { x: byid[id].x, y: byid[id].y };
                  return;
                
                this.setState(() => ({linePath: nextLinePath, lastTriggeredDot: id}));
                
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
                    
                    this.props.onLose();
                }
                
                if (dot.order == ids.length - 1) {
                    this.props.onWin();
                }
                
                break;
            }
            
        }
    }
    
    handleRelease() {
        if (Object.keys(lastAnchor).length) this.setState(() => ({target: lastAnchor}));
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
    
    componentWillUpdate(nextProps, nextState) {
        if (this.state.lastTriggeredDot != nextState.lastTriggeredDot) {
            let byid = nextState.byid;
            let lastTriggeredDot = byid[nextState.lastTriggeredDot];
            lastAnchor = new Vector(lastTriggeredDot.x + dotSide * .5, lastTriggeredDot.y + dotSide * .5);
        }
    }
    
    render() {
        const { ids, byid, linePath } = this.state;
        
        let self;
        let dots = ids.map((id) => {
            self = byid[id];
            
            return <Dot 
                    state={self.state}
                    key={`_dot${id}`} 
                    x={self.x} 
                    y={self.y} />
        });
        
        console.log(Object.keys(lastAnchor).length);
        return(
            <MyContainer>
                <PanWrapper
                    moveDelta={1}
                    onTap={this.handleMove}
                    onRelease={this.handleRelease}
                    onMove={this.handleMove}>
                        
                    { Object.keys(lastAnchor).length ?
                        <ActiveLine
                            ref={el =>{ console.log(el);  this.myLine = el}}
                            anchor={lastAnchor}
                            target={target} />
                            :null
                    }
                            
                    {dots}
                </PanWrapper>
            </MyContainer>
        )
    }
}

export default PathFinder;