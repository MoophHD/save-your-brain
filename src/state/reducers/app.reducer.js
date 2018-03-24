import { 
    WIN,
    LOSE
} from '../constants/app.constants';

const initialState = {
    ids: [0],
    byid: {
        0: {
            name: 'PathFinder',
            lvl: 0,
            exp: 0
        },
        1: {
            name: 'Swipe'
        }
    }
}
let expPerLvl = 75; 
let loseExpMod = .25;
let last, id, newLvl;

export default (state=initialState, action) => {
    switch(action.type) {
        case WIN: {
            
            id = action.id;
            last = state.byid[id];
            return { ...state, 
                byid: {
                    ...state.byid,
                    [id]: {
                        ...state.byid[id],
                        lvl: last.lvl + 1,
                        exp: last.exp + newLvl * expPerLvl
                    }
                }
            }
        }
        case LOSE: {
            id = action.id;
            last = state.byid[id];
            newLvl = last.lvl - 1 > -1 ? last.lvl - 1 : 0;
            return { ...state, 
                byid: {
                    ...state.byid,
                    [id]: {
                        ...state.byid[id],
                        lvl: newLvl,
                        exp: last.exp - (newLvl > 0 ? newLvl : 0.5) * expPerLvl * loseExpMod
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
}