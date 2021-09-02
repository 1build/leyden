import { Datum, Sheet } from 'datum-react';
import React, { FC, useState } from 'react';
import { Descendant } from 'slate';

import { newSheet } from './data/generate';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([newSheet(50, 50)]);

    return (
        <Datum
            value={descendants}
            onChange={setDescendants}
        >
            <Sheet />
        </Datum>
    );
};
