import React, { FC, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { useEditor } from '@/Datum/editor';

export const Datum: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([]);

    const editor = useEditor();

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={setDescendants}
        >
            <Editable />
        </Slate>
    );
};
