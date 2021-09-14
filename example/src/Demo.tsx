import { createEditor, Table } from 'leyden';
import { Leyden, Editable, withReact } from 'leyden-react';
import React, { FC, useMemo, useState } from 'react';
import { withHistory } from 'slate-history';

import { cellRenderers } from './cells';
import { newTable } from './data/generate';
import { elementRenderers } from './elements';
import { headerRenderers } from './headers';
import { textRenderers } from './text';
import { validators } from './data/validators';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<[Table]>([newTable()]);

    const editor = useMemo(() => (
        withHistory(
            withReact(
                createEditor({
                    validators,
                })
            )
        )
    ), []);

    return (
        <div style={{ backgroundColor: '#D7E1E5' }}>
            <Leyden
                editor={editor}
                value={descendants}
                onChange={setDescendants}
            >
                <Editable
                    cellRenderers={cellRenderers}
                    elementRenderers={elementRenderers}
                    headerRenderers={headerRenderers}
                    textRenderers={textRenderers}
                    tableOptions={{
                        cellGap: 1,
                    }}
                />
            </Leyden>
        </div>
    );
};
