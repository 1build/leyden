import React, { FC, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { newMockTable } from './data/generate';
import { useEditor, useRender } from './Datum';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([newMockTable(20, 20)]);

    const editor = useEditor();
    const render = useRender();

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={newVal => setDescendants(newVal)}
        >
            <Editable {...render} />
        </Slate>
    );
};
