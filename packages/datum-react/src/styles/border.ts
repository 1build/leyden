import { ColorHelper } from 'csx';

export const solidBorder = (
    width: number,
    color: ColorHelper,
): string => (`${width}px solid ${color.toString()}`);
