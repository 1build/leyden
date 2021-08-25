import React, { FC, useState } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

import { blankTable } from '@/Datum/data';
import { Element, Leaf, useEditor } from '@/Datum/editor';

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
                renderElement={props => <Element {...props} />}
                renderLeaf={(props) => <Leaf {...props} />}
            />
        </Slate>
    );
};
