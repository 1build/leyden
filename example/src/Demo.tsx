import { Datum, Sheet } from 'datum-react';
import React, { FC, useState } from 'react';
import { Descendant } from 'slate';

import { newMockTable } from './data/generate';
import { useEditor } from './editor';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>(() => [newMockTable(10, 10)]);

    const editor = useEditor();

    return (
        <Datum
            editor={editor}
            value={descendants}
            onChange={value => setDescendants(value)}
        >
            <Sheet />
        </Datum>
    );
};
