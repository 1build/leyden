import { Datum, Sheet } from 'datum-react';
import React, { FC, useState } from 'react';

import { newSheet } from './data/generate';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState(newSheet(10, 15));

    return (
        <Datum
            value={descendants}
            onChange={setDescendants}
        >
            <Sheet />
        </Datum>
    );
};
