import React, { FC, useCallback } from 'react';
import { Transforms } from 'slate';
import {
    Editable as SlateReactEditable,
    RenderElementProps,
    RenderLeafProps,
    useSlateStatic,
} from 'slate-react';

import { Element } from './render/Element';
import { Leaf } from './render/Leaf';

export interface UseRenderPayload {
    renderElement: (rep: RenderElementProps) => JSX.Element;
    renderLeaf: (rep: RenderLeafProps) => JSX.Element;
}

export const useRender = (): UseRenderPayload => {
    const renderElement = useCallback<(rep: RenderElementProps) => JSX.Element>(rep => (
        <Element {...rep} />
    ), []);
    
    const renderLeaf = useCallback<(rlp: RenderLeafProps) => JSX.Element>(rlp => (
        <Leaf {...rlp} />
    ), []);

    return {
        renderElement,
        renderLeaf,
    };
};

export const Editable: FC<Parameters<typeof SlateReactEditable>[0]> = ({
    children,
    ...props
}) => {
    const editor = useSlateStatic();

    const {
        renderElement,
        renderLeaf,
    } = useRender();

    return (
        <SlateReactEditable
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
        </SlateReactEditable>
    );
};
