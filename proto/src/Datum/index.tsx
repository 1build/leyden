import React, { FC, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { blankTable } from '@/Datum/data';
import { Leaf } from '@/Datum/editor/Leaf';
import { useEditor } from '@/Datum/editor';

export const Datum: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([blankTable]);

    const editor = useEditor();

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={setDescendants}
        >
            <Editable
                renderLeaf={(props) => <Leaf {...props} />}
            />
        </Slate>
    );
};
