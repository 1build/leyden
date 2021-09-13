import { HeaderRenderer } from 'leyden-react';
import React from 'react';

export const ColumnHeader: HeaderRenderer = ({ position }) => {
    const headerText = () => {
        switch(position) {
            case 0:
                return 'Name';
            case 1:
                return 'Quantity';
            case 2:
                return 'UOM';
            case 3:
                return 'CSI';
            case 4:
                return 'Total';
            default:
                return '';
        }
    };

    return (
        <div>
            {headerText()}
        </div>
    );
};
