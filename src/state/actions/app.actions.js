import { WIN, LOSE } from '../constants/app.constants';

export function onWin(id) {
    return {
        type: WIN,
        id
    }
}

export function onLose(id) {
    return {
        type: LOSE,
        id
    }
}