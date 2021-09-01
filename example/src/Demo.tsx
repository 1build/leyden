import { useRender } from 'datum-react';
import React, { FC, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { newMockTable } from './data/generate';
import { useEditor } from './editor';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>(() => [newMockTable(50, 50)]);

    const editor = useEditor();

    const render = useRender();

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={value => setDescendants(value)}
        >
            <Editable
                {...render}
            />
        </Slate>
    );
};
