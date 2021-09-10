import { ValidationFuncs } from 'leyden';

import { CSI, UOM } from '../types';

export const validators: ValidationFuncs = {
    csi: val => val in CSI,
    uom: val => val in UOM,
};
