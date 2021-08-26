import React, { FC, useCallback, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { newMockTable } from './stub';
import { useEditor } from './Datum/editor';
import { renderElement, renderLeaf } from './Datum/render';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([newMockTable(80, 30)]);

    const editor = useEditor();

    

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={newVal => setDescendants(newVal)}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
        </Slate>
    );
};
