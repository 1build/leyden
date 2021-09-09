import { CellRenderers } from 'datum-react';

import { CSICell } from './CSICell';
import { QuantityCell } from './QuantityCell';
import { UnitOfMeasureCell } from './UnitOfMeasureCell';

export const cellRenderers: CellRenderers = {
    'CSI': CSICell,
    'Quantity': QuantityCell,
    'UnitOfMeasure': UnitOfMeasureCell
};
