import {
    InsertAbove,
    InsertBelow,
    InsertRowPosition,
} from './types';

export const insertRowPositionIsAbove = (pos: InsertRowPosition): pos is InsertAbove => {
    return Reflect.has(pos, 'above');
};

export const insertRowPositionIsBelow = (pos: InsertRowPosition): pos is InsertBelow => {
    return Reflect.has(pos, 'below');
};
