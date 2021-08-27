import React, { FC, useState } from 'react';
import { Descendant, Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';

import { newMockTable } from './data/generate';
import { useEditor, useRender } from './Datum';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<Descendant[]>(() => [newMockTable(30, 20)]);

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
                onKeyDown={e => {
                    if (e.defaultPrevented) {
                        return;
                    }
                    const { selection } = editor;
                    if (e.key === 'Enter' && selection && selection.focus.path.length >= 4) {
                        const { path } = selection.focus;
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(path);
                        Transforms.select(editor, [
                            ...path.slice(0, 2),
                            path[2]+1,
                            path[3],
                        ]);
                    }
                }}
            />
        </Slate>
    );
};
