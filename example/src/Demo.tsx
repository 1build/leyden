import { Element, Leaf } from 'datum-react';
import React, { FC, useCallback, useState } from 'react';
import { Descendant } from 'slate';
import {
    Editable,
    Slate,
    RenderElementProps,
    RenderLeafProps,
} from 'slate-react';

import { newMockTable } from './data/generate';
import { useEditor } from './editor';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>(() => [newMockTable(50, 50)]);

    const editor = useEditor();

    const renderElement = useCallback<(rep: RenderElementProps) => JSX.Element>(rep => (
        <Element {...rep} />
    ), []);
    
    const renderLeaf = useCallback<(rlp: RenderLeafProps) => JSX.Element>(rlp => (
        <Leaf {...rlp} />
    ), []);

    return (
        <Slate
            editor={editor}
            value={descendants}
            onChange={value => setDescendants(value)}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
        </Slate>
    );
};
