import React, { FC, useCallback, useState } from 'react';
import { Descendant } from 'slate';
import {
    Editable,
    RenderElementProps,
    RenderLeafProps,
    Slate,
} from 'slate-react';

import { newMockTable } from '@/Datum/data';
import { Element, Leaf, useEditor } from '@/Datum/editor';

export const Datum: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>([newMockTable(30, 20)]);

    const editor = useEditor();

    const renderElement = useCallback<(props: RenderElementProps) => JSX.Element>(props => (
        <Element {...props} />
    ), []);

    const renderLeaf = useCallback<(props: RenderLeafProps) => JSX.Element>(props => (
        <Leaf {...props} />
    ), []);

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
