import { createEditor } from 'datum';
import { Datum, Editable, withReact } from 'datum-react';
import React, { FC, useMemo, useState } from 'react';
import { withHistory } from 'slate-history';

import { cellRenderers } from './cells';
import { newSheet } from './data/generate';
import { elementRenderers } from './elements';
import { textRenderers } from './text';
import { withExample } from './withExample';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState(newSheet());

    const editor = useMemo(() => (
        withExample(
            withHistory(
                withReact(
                    createEditor<3, 6>()
                )
            )
        )
    ), []);

    return (
        <Datum
            editor={editor}
            value={descendants}
            onChange={setDescendants}
        >
            <Editable
                cellRenderers={cellRenderers}
                elementRenderers={elementRenderers}
                textRenderers={textRenderers}
            />
        </Datum>
    );
};
