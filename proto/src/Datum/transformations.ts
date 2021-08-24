import { Table } from 'datum';
import { CSSProperties } from 'react';

export const convertTableStyle = (table: Table): CSSProperties => {
    // placeholder
    return {
        marginTop: table.children.length,
    };
};
