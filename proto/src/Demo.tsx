import React, { FC, useState } from 'react';
import { Descendant, Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';

import { newMockTable } from './data/generate';
import { useEditor, useRender } from './Datum';

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
                onKeyDown={e => {
                    const { selection } = editor;
                    if (e.defaultPrevented || !selection || !selection.focus.path.length) {
                        return;
                    }
                    switch (e.key) {
                        case 'ArrowUp':{
                            const { path } = selection.focus;
                            e.preventDefault();
                            e.stopPropagation();
                            Transforms.select(editor, [
                                path[0],
                                path[1]-1,
                                path[2],
                            ]);
                            break;
                        }
                        case 'ArrowDown':
                        case 'Enter': {
                            const { path } = selection.focus;
                            e.preventDefault();
                            e.stopPropagation();
                            Transforms.select(editor, [
                                path[0],
                                path[1]+1,
                                path[2],
                            ]);
                            break;
                        }
                        case 'Tab': {
                            const { path } = selection.focus;
                            e.preventDefault();
                            e.stopPropagation();
                            Transforms.select(editor, [
                                path[0],
                                path[1],
                                path[2]+1,
                            ]);
                            break;
                        }
                    }
                }}
            />
        </Slate>
    );
};
