import React, { useCallback } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

import { Element } from './Element';
import { Leaf } from './Leaf';

export interface UseRenderPayload {
    renderElement: (props: RenderElementProps) => JSX.Element;
    renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

export const useRender = (): UseRenderPayload => ({
    renderElement: useCallback<(props: RenderElementProps) => JSX.Element>(props => (
        <Element {...props} />
    ), []),
    renderLeaf: useCallback<(props: RenderLeafProps) => JSX.Element>(props => (
        <Leaf {...props} />
    ), []),
});
