import { createEditor } from 'datum';
import { Datum, Editable, withReact } from 'datum-react';
import React, { FC, useMemo, useState } from 'react';

import { newSheet } from './data/generate';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState(newSheet(10, 15, 150));

    const editor = useMemo(() => (
        withReact(
            createEditor<10, 15>()
        )
    ), []);

    return (
        <Datum
            editor={editor}
            value={descendants}
            onChange={setDescendants}
        >
            <Editable
                renderCell={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('test');
                }}
            />
        </Datum>
    );
};
