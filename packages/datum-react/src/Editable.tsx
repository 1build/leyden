import React, { useCallback } from 'react';
import {
    Editable as SlateReactEditable,
    RenderElementProps,
    RenderLeafProps,
} from 'slate-react';

import { Element } from './render/Element';
import { Leaf } from './render/Leaf';

export const Editable: typeof SlateReactEditable = (props) => {
    const renderElement = useCallback<(rep: RenderElementProps) => JSX.Element>(rep => (
        <Element {...rep} />
    ), []);

    const renderLeaf = useCallback<(rlp: RenderLeafProps) => JSX.Element>(rlp => (
        <Leaf {...rlp} />
    ), []);

    return (
        <SlateReactEditable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            {...props}
        />
    );
};
