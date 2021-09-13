import { CellRenderers } from 'leyden-react';

import { CSI } from './CSI';
import { Name } from './Name';
import { Quantity } from './Quantity';
import { UnitOfMeasure } from './UnitOfMeasure';
import { WholeDollars } from './WholeDollars';

export const cellRenderers: CellRenderers = {
    CSI,
    Name,
    Quantity,
    UnitOfMeasure,
    WholeDollars,
};
