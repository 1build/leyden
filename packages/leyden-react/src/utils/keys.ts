import { Direction2D } from 'leyden';

export const cellNavigationKeys: Record<string, Direction2D> = {
    'Tab': Direction2D.Right,
    'ArrowUp': Direction2D.Up,
    'ArrowDown': Direction2D.Down,
    'Enter': Direction2D.Down,
};
