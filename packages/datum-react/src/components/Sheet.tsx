import React, { FC } from 'react';
import { Transforms } from 'slate';
import { Editable, useSlateStatic } from 'slate-react';

import { useRender } from '../hooks/use-render';

export const Sheet: FC<Parameters<typeof Editable>[0]> = ({
    children,
    ...props
}) => {
    const editor = useSlateStatic();

    const {
        renderElement,
        renderLeaf,
    } = useRender();

    return (
        <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
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
            {...props}
        >
            {children}
        </Editable>
    );
};
